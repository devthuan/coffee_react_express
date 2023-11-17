// LineChart.js
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const LineChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Thứ 2",
          "Thứ 3",
          "Thứ 4",
          "Thứ 5",
          "Thứ 6",
          "Thứ 7",
          "Chủ nhật",
        ],
        datasets: [
          {
            label: "Tổng đơn hàng theo ngày trong tuần",
            data: [65, 59, 80, 81, 56],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup on component unmount
    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default LineChart;
