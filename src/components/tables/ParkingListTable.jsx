import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddVehicleForm from "components/forms/AddVehicleForm";
import { useParkingsContext } from "hooks/useParking";
import moment from "moment/moment";
import React, { useState } from "react";

const ParkingListTable = () => {
  const { parkings } = useParkingsContext();
  const [editVehicleModal, setEditVehicleModal] = useState(null);

  return (
    <TableContainer component={Paper} sx={{ p: 4 }}>
      {parkings?.length ? (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Owner Name</TableCell>
              <TableCell align="right">Vehicle Type</TableCell>
              <TableCell align="right">License No</TableCell>
              <TableCell align="right">Entry Time</TableCell>
              <TableCell align="right">Exit Time</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parkings?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.owner_name}
                </TableCell>
                <TableCell align="right">{row.vehicle_type}</TableCell>
                <TableCell align="right">{row.license_number}</TableCell>
                <TableCell align="right">
                  {moment(row.entry_time).format("DD MM YYYY hh:mm:ss")}
                </TableCell>
                <TableCell align="right">
                  {moment(row.exit_time).format("DD MM YYYY hh:mm:ss")}
                </TableCell>
                <TableCell align="right">
                  {row.status === "in" ? (
                    <Chip label="In" color="success" />
                  ) : (
                    <Chip label="Out" color="error" />
                  )}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() => setEditVehicleModal(row)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        "No data to show."
      )}
      <Dialog
        open={editVehicleModal}
        onClose={() => setEditVehicleModal(null)}
        maxWidth={"md"}
        fullWidth
      >
        <DialogContent>
          <AddVehicleForm
            data={editVehicleModal}
            handleClose={() => setEditVehicleModal(null)}
          />
        </DialogContent>
      </Dialog>
    </TableContainer>
  );
};

export default ParkingListTable;
