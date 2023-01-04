import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import AddVehicleForm from "components/forms/AddVehicleForm";
import ParkingListTable from "components/tables/ParkingListTable";
import React, { useState } from "react";

const ParkingListPage = () => {
  const [addVehicleModalOpen, setAddVehicleModalOpen] = useState(null);

  return (
    <Box>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          Parking List
        </Typography>
        <Button
          variant="contained"
          onClick={() => setAddVehicleModalOpen(true)}
        >
          Add a Vehicle
        </Button>
      </Box>
      <Box>
        <ParkingListTable />
      </Box>
      <Dialog
        open={addVehicleModalOpen}
        onClose={() => setAddVehicleModalOpen(null)}
        maxWidth={"md"}
        fullWidth
      >
        <DialogContent>
          <AddVehicleForm handleClose={() => setAddVehicleModalOpen(null)} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ParkingListPage;
