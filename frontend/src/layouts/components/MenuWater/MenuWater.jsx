import { useState, useEffect, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";

import classNames from "classnames/bind";
import styles from "./MenuWater.module.scss";
import Button from "../../../components/Button/Button";
import HearIcon from "../../../assets/images/icon-hear.svg";
import { addProductCake } from "../../../redux/features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { AddCartAPI } from "../../../services/UseServices";
import { GetProductAPI } from "../../../services/UseServices";
import { addItem } from "../../../redux/features/cart/cartSlice";

const cx = classNames.bind(styles);

const MenuWater = () => {
  const dispatch = useDispatch();
  const dataProducts = useSelector((state) => state.product.data);
  const memoizedProductData = useMemo(() => dataProducts, [dataProducts]);
  const [activeTabs, setActiveTabs] = useState("cà phê");

  let handleClickBtn = async (
    product_id,
    image_product,
    name_product,
    price
  ) => {
    try {
      let quantity = 1;
      const res = await AddCartAPI(product_id, quantity);

      if (res && res.status === 200) {
        toast.success("Thêm sản phẩm thành công");
        dispatch(
          addItem({
            product_id,
            name_product,
            image_product,
            price,
            quantity,
          })
        );
      } else {
        toast.error("Có lỗi xảy ra!!!");
      }
    } catch (error) {
      toast.warning("Bạn cần đăng nhập trước khi đặt hàng");
      return;
    }
  };

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await GetProductAPI(1);

        if (res && res.status === 200 && res.data) {
          const data = res.data.data;
          data.forEach((item) =>
            dispatch(
              addProductCake({
                id: item.id,
                name_product: item.name_product,
                price: item.price,
                image_product: item.image_product,
                category: item.category,
                is_active: item.is_active,
              })
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    // check if data is available before calling api
    if (!memoizedProductData.length) {
      fetchAPI();
    }
  }, [dispatch, memoizedProductData]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <h1 id="menu" className={cx("title")}>
          có gì trong thực đơn ?
        </h1>
        <div className={cx("group__btn")}>
          <Button
            onClick={() => setActiveTabs("cà phê")}
            className={activeTabs === "cà phê" ? cx("active_btn") : cx("btn")}
            text="Cà Phê"
          />
          <Button
            onClick={() => setActiveTabs("trà sữa")}
            className={activeTabs === "trà sữa" ? cx("active_btn") : cx("btn")}
            text="Trà Sữa"
          />
          <Button
            onClick={() => setActiveTabs("soda")}
            className={activeTabs === "soda" ? cx("active_btn") : cx("btn")}
            text="Soda"
          />
        </div>
        <div className={cx("group__card")}>
          {dataProducts &&
            dataProducts.map((item, index) => {
              if (item.category === activeTabs) {
                return (
                  <div key={index} className={cx("item")}>
                    <div className={cx("background__image")}>
                      <img
                        width={61}
                        height={130}
                        className={cx("item__image")}
                        src={item.image_product}
                        alt=""
                      />
                    </div>
                    <p className={cx("name")}>{item.name_product}</p>
                    <p className={cx("price")}>
                      {parseInt(item.price).toLocaleString()} VND
                    </p>
                    <img className={cx("item__icon")} src={HearIcon} alt="" />
                    <Button
                      onClick={() =>
                        handleClickBtn(
                          item.id,
                          item.image_product,
                          item.name_product,
                          item.price
                        )
                      }
                      className={cx("btn__add-cart")}
                      text="Thêm vào giỏ hàng"
                    />
                  </div>
                );
              }
              return null;
            })}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};
export default MenuWater;
