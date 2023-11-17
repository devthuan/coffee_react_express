import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

import Title from "../../components/Title/Title";
import PieChart from "../../components/Chart/PieChart";
import LineChart from "../../components/Chart/LineChart";
import BarChart from "../../components/Chart/BarChart";
import { useEffect, useMemo, useState } from "react";
import { GetUser } from "../../services/UseServices";
import { useSelector, useDispatch } from "react-redux";
import { addTotalData } from "../../redux/features/user/userSlice";
import { GetOrdersAPI, GetOrdersDetailAPI } from "../../services/UseServices";
import { addOrderStatistic } from "../../redux/features/order/orderStatisticSlice";
const cx = classNames.bind(styles);

const Dashboard = () => {
  const dispatch = useDispatch();
  const totalUser = useSelector((state) => state.user.totalData);
  const totalOrder = useSelector((state) => state.orderStatistic.totalData);
  const success_order = useSelector((state) => state.orderStatistic.success);
  const failed_order = useSelector((state) => state.orderStatistic.failed);
  const processing_order = useSelector(
    (state) => state.orderStatistic.processing
  );
  const totalSales = useSelector((state) => state.orderStatistic.totalSales);

  const memoizedUserDataUser = useMemo(() => totalUser, [totalUser]);
  const memoizedUserDataOrder = useMemo(() => totalOrder, [totalOrder]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await GetOrdersAPI();
        if (res && res.status === 200 && res.data) {
          const data = res.data.data;
          const totalData = res.data.total;
          let success = 0,
            failed = 0,
            processing = 0;
          let list_data = [];
          let totalSales = 0;
          for (const item of data) {
            if (item.order_status === "Successful") {
              success += 1;
              totalSales += parseFloat(item.total_payment);
            } else if (item.order_status === "Failed") {
              failed += 1;
            } else if (item.order_status === "Processing") {
              processing += 1;
            }

            const order_id = item.id;
            const orderDetail = await GetOrdersDetailAPI(order_id);
            const itemOrderDetail = orderDetail.data.data;
            if (orderDetail && orderDetail.data) {
              list_data.push({
                id: item.id,
                product: itemOrderDetail,
                full_name: item.full_name,
                phone_number: item.phone_number,
                delivery_address: item.delivery_address,
                total_payment: item.total_payment,
                order_date: item.order_date,
                payment_methods: item.payment_methods,
                order_status: item.order_status,
              });
            }
          }
          dispatch(
            addOrderStatistic({
              data: list_data,
              totalData,
              totalSales,
              success,
              failed,
              processing,
            })
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (memoizedUserDataOrder === 0) {
      fetchAPI();
    }
  }, [dispatch, memoizedUserDataOrder]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const users = await GetUser(1);
        if (users && users.status === 200) {
          const data = users.data.total;
          dispatch(addTotalData(data));
        }
      } catch (error) {
        console.error("Có lỗi xảy ra:", error);
      }
    };
    if (memoizedUserDataUser === 0) {
      fetchAPI();
    }
  }, [dispatch, memoizedUserDataUser]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("box__statistical")}>
          <div className={cx("box__item")}>
            <div className={cx("box__icon")}>
              <FontAwesomeIcon className={cx("icon")} icon={faMoneyBill} />
            </div>
            <div className={cx("box__text")}>
              <Title className={cx("title")} text="Tổng doanh thu" />
              <p className={cx("number")}>{totalSales.toLocaleString()} VNĐ</p>
            </div>
          </div>
          <div className={cx("box__item")}>
            <div className={cx("box__icon")}>
              <FontAwesomeIcon className={cx("icon")} icon={faUser} />
            </div>
            <div className={cx("box__text")}>
              <Title className={cx("title")} text="Tổng thành viên" />
              <p className={cx("number")}>{totalUser}</p>
            </div>
          </div>
          <div className={cx("box__item")}>
            <div className={cx("box__icon")}>
              <FontAwesomeIcon className={cx("icon")} icon={faCartShopping} />
            </div>
            <div className={cx("box__text")}>
              <Title className={cx("title")} text="tổng đơn hàng" />
              <p className={cx("number")}>{totalOrder}</p>
            </div>
          </div>
        </div>
        <div className={cx("box__barChart")}>
          <BarChart />
        </div>
        <div className={cx("box__lineChart")}>
          <LineChart />
        </div>
        <div className={cx("box__chart")}>
          <div className={cx("chart__item")}>
            <PieChart
              success={success_order}
              failed={failed_order}
              processing={processing_order}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
