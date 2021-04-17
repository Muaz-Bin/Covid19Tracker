import React from "react";
import { Bar, Line } from "react-chartjs-2";

const Chart = ({ dailyData, countryData, countryName }) => {
  const barData = {
    labels: ["confirmed", "recovered", "deaths"],
    datasets: [
      {
        label: "people",
        backgroundColor: [
          "rgba(0, 0, 255, 0.5)",
          "rgba(0, 255, 0, 0.5)",
          "rgba(255, 0, 0, 0.5)",
        ],
        borderWidth: 3,
        data: countryData && [
          countryData.confirmed.value,
          countryData.recovered.value,
          countryData.deaths.value,
        ],
      },
    ],
  };

  const lineData = {
    labels: dailyData && dailyData.map((value) => value.reportDate),
    datasets: [
      {
        label: "confirmed",
        backgroundColor: "rgba(137, 137, 240,0.5)",
        borderColor: "#8989F0",
        borderWidth: 2,
        data: dailyData && dailyData.map((value) => value.totalConfirmed),
      },
      {
        label: "deaths",
        backgroundColor: "rgba(254, 42, 42,0.7)",
        borderColor: "#FE2A2A",
        borderWidth: 2,
        data: dailyData && dailyData.map((value) => value.deaths.total),
      },
      {
        label: "recovers",
        backgroundColor: "rgba(62, 190, 62,0.7)",
        borderColor: "#3EBE3E",
        borderWidth: 2,
        data: dailyData && dailyData.map((value) => value.totalRecovered),
      },
    ],
  };
  return (
    <div>
      {countryData && (
        <Bar
          data={barData}
          options={{
            title: {
              display: true,
              text: countryName,
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "top",
            },
          }}
        />
      )}

      {dailyData && (
        <Line
          data={lineData}
          options={{
            title: {
              display: true,
              text: "Global",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "top",
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
