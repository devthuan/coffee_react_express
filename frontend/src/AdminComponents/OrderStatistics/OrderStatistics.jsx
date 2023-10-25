import classNames from "classnames/bind";
import styles from "./OrderStatistics.module.scss";
import styleDashboard from "../Dashboard/Dashboard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { format, isValid } from "date-fns";
import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import Pagination from "../../components/Pagination/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { GetOrdersAPI, GetOrdersDetailAPI } from "../../services/UseServices";
import { addOrderStatistic } from "../../redux/features/order/orderStatisticSlice";
const cx = classNames.bind(styles);
const cxDashboard = classNames.bind(styleDashboard);

const OrderStatistics = () => {
  const dispatch = useDispatch();
  const dataOrder = useSelector((state) => state.orderStatistic.data);
  const dataOrderSuccessful =
    dataOrder.filter((order) => order.order_status === "Successful").length ||
    0;
  const dataOrderFailed =
    dataOrder.filter((order) => order.order_status === "Failed").length || 0;
  const dataOrderProcessing =
    dataOrder.filter((order) => order.order_status === "Processing").length ||
    0;
  const memoizedOrderData = useMemo(() => dataOrder, [dataOrder]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataOrder.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await GetOrdersAPI();
        if (res && res.status === 200 && res.data) {
          const data = res.data.data;
          data.forEach(async (item) => {
            const order_id = item.id;
            const orderDetail = await GetOrdersDetailAPI(order_id);
            const itemOrderDetail = orderDetail.data.data;
            if (orderDetail && orderDetail.data) {
              dispatch(
                addOrderStatistic({
                  id: item.id,
                  product: itemOrderDetail,
                  full_name: item.full_name,
                  phone_number: item.phone_number,
                  delivery_address: item.delivery_address,
                  total_payment: item.total_payment,
                  order_date: item.order_date,
                  payment_methods: item.payment_methods,
                  order_status: item.order_status,
                })
              );
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!memoizedOrderData.length) {
      fetchAPI();
    }
  }, [dispatch, memoizedOrderData]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Title className={cx("title")} text="Thống kê đơn hàng" />
        <div className={cxDashboard("box__statistical")}>
          <div className={cxDashboard("box__item")}>
            <div className={cxDashboard("box__icon")}>
              <FontAwesomeIcon
                className={cxDashboard("icon", "success")}
                icon={faCheck}
              />
            </div>
            <div className={cxDashboard("box__text")}>
              <Title
                className={cxDashboard("title")}
                text="Đơn hàng thành công"
              />
              <p className={cxDashboard("number")}>{dataOrderSuccessful}</p>
            </div>
          </div>
          <div className={cxDashboard("box__item")}>
            <div className={cxDashboard("box__icon")}>
              <FontAwesomeIcon
                className={cxDashboard("icon", "pending")}
                icon={faSpinner}
              />
            </div>
            <div className={cxDashboard("box__text")}>
              <Title
                className={cxDashboard("title")}
                text="Đơn hàng đang chờ"
              />
              <p className={cxDashboard("number")}>{dataOrderProcessing}</p>
            </div>
          </div>
          <div className={cxDashboard("box__item")}>
            <div className={cxDashboard("box__icon")}>
              <FontAwesomeIcon
                className={cxDashboard("icon", "failed")}
                icon={faXmark}
              />
            </div>
            <div className={cxDashboard("box__text")}>
              <Title className={cxDashboard("title")} text="Đơn hàng bị huỷ" />
              <p className={cxDashboard("number")}>{dataOrderFailed}</p>
            </div>
          </div>
        </div>

        <div className={cx("box__table")}>
          {currentItems && currentItems.length > 0 ? (
            <table className={cx("table")}>
              <tbody>
                <tr className={cx("group__title")}>
                  <th className={cx("title__text")}>id</th>
                  <th className={cx("title__text")}>sản phẩm</th>
                  <th className={cx("title__text")}>Số tiền</th>
                  <th className={cx("title__text")}>thông tin người nhận</th>
                  <th className={cx("title__text")}>trạng thái</th>

                  <th className={cx("title__text")}>Ngày tạo</th>
                </tr>
                {currentItems.map((item, index) => {
                  return (
                    <tr key={index} className={cx("group__row")}>
                      <td className={cx("item")}>{item.id}</td>
                      <td className={cx("item")}>
                        <div className={cx("image__name-product")}>
                          <div className={cx("box__infoProduct")}>
                            <div className={cx("box__detail")}>
                              <p className={cx("name__product")}>
                                {item.product_name}
                              </p>
                              <div className={cx("amount")}>
                                <p className={cx("quantity__product")}>
                                  {item.quantity}
                                </p>
                              </div>
                            </div>
                            <p className={cx("price__product")}>{item.price}</p>
                          </div>
                        </div>
                        {item.product.map((product, indexOrder) => {
                          return (
                            <div
                              key={indexOrder}
                              className={cx("image__name-product")}
                            >
                              <img
                                height={65}
                                className={cx("img_product")}
                                src={product.image_product}
                                alt=""
                              />
                              <div className={cx("box__infoProduct")}>
                                <div className={cx("box__detail")}>
                                  <p className={cx("name__product")}>
                                    {product.name_product}
                                  </p>
                                  <div className={cx("amount")}>
                                    <p className={cx("quantity__product")}>
                                      X {product.quantity}
                                    </p>
                                  </div>
                                </div>
                                <p className={cx("price__product")}>
                                  {parseFloat(product.price).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </td>
                      <td className={cx("item")}>
                        {parseFloat(item.total_payment).toLocaleString()}
                      </td>
                      <td className={cx("item")}>
                        <div className={cx("box__address")}>
                          <p>{item.full_name},</p>
                          <p>{item.phone_number},</p>
                          <p>{item.delivery_address}</p>
                        </div>
                      </td>
                      <td className={cx("item")}>
                        <Button
                          className={cx("btn", {
                            successful: item.order_status === "Successful",
                            failed: item.order_status === "Failed",
                            pending: item.order_status === "Processing",
                          })}
                          text={item.order_status}
                        />
                      </td>
                      <td className={cx("item")}>
                        {isValid(new Date(item.order_date))
                          ? format(
                              new Date(item.order_date),
                              "hh:mm, dd/MM/yyyy"
                            )
                          : ""}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <Title
              className={cx("title")}
              text="No users registered for an account..."
            />
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={dataOrder.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default OrderStatistics;
