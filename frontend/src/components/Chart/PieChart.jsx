import React from "react";
import classNames from "classnames/bind";
import { Pie } from "react-chartjs-2";
import styles from "./Chart.module.scss";
import Title from "../Title/Title";
const cx = classNames.bind(styles);

const PieChart = () => {
  const data = {
    labels: ["Successful", "Failed", "Pending"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#609966", "#DF2E38", "#FFA500"],
        hoverBackgroundColor: ["#609967", "#DF2E38", "#FFA500"],
      },
    ],
  };

  return (
    <div className={cx("box__chart")}>
      <Title className={cx("title__chart")} text="Thống kê đơn hàng" />
      {/* <Pie data={data} /> */}
    </div>
  );
};
export default PieChart;
