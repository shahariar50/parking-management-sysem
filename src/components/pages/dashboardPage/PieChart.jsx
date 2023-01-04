import { Paper } from "@mui/material";
import React from "react";
import Chart from "react-apexcharts";

const PieChart = () => {
  const options = {
    labels: ["Empty", "Parked"],
  };

  const series = [75, 25];

  return (
    <Paper sx={{ p: 3 }}>
      <Chart options={options} series={series} type="pie" />
    </Paper>
  );
};

export default PieChart;
