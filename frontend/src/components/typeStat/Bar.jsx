import React, { useRef } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const labels = ["Likes", "Neutrals", "Dislikes"];

export const BarStats = ({ likes, neutrals, dislikes }) => {
  const ref = useRef();

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Stats",
        data: [likes.length, neutrals.length, dislikes.length],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ],
        borderColor: [
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(255, 99, 132)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Bar
      ref={ref}
      data={data}
      options={{
        plugins: { legend: { display: false } },
        scales: { y: { ticks: { precision: 0 } } },
      }}
    />
  );
};
