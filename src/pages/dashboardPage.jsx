import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ParkSummeryChart from "components/pages/dashboardPage/ParkSummeryChart";
import PieChart from "components/pages/dashboardPage/PieChart";
import React from "react";

const DashboardPage = () => {
  return (
    <Box>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          Dashboard
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <ParkSummeryChart />
        </Grid>
        <Grid item xs={4}>
          <PieChart />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
