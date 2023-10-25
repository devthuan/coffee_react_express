import React from "react";
import classNames from "classnames/bind";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "./Chart.module.scss";
import Title from "../Title/Title";
const cx = classNames.bind(styles);

const LineChart = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Doanh thu",
        data: [12, 35, 67, 50, 90, 45],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div className={cx("box__chart")}>
      <Title className={cx("title__chart")} text="Thống kê doanh thu theo tháng" />
      <Line data={data} options={options} />
    </div>
  );
};
export default LineChart;
