import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useParkingsContext } from "hooks/useParking";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const AddVehicleForm = ({ data, handleClose }) => {
  const [inTime, setIntime] = useState(null);
  const [exitTime, setExitTime] = useState(null);
  const { addParking, updateParking } = useParkingsContext();

  useEffect(() => {
    console.log(data?.entry_time);
    setIntime(data?.entry_time);
  }, [data?.entry_time]);

  const defaultValues = {
    license_number: data?.license_number || "",
    vehicle_type: data?.vehicle_type || "",
    owner_name: data?.owner_name || "",
    owner_phone: data?.owner_phone || "",
    status: data?.status || "",
    address: data?.address || "",
    city: data?.city || "",
    country: data?.country || "",
    zip: data?.zip || "",
    entry_time: data?.entry_time || null,
    exit_time: data?.exit_time || null,
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues,
  });

  const onSubmit = (newData) => {
    if (data) {
      updateParking({ ...data, ...newData });
      handleClose();
    } else {
      addParking(newData);
      handleClose();
    }
  };

  console.log(
    moment(data?.exit_time).diff(moment(data?.entry_time), "seconds")
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          {data ? "Update" : "Add A"} Vehicle
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Controller
              name="license_number"
              control={control}
              render={({ field }) => (
                <TextField
                  error={errors?.license_number}
                  helperText={errors?.license_number?.message}
                  fullWidth
                  label="License Number *"
                  {...field}
                />
              )}
              rules={{ required: "License number is missing!" }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="vehicle_type"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={errors?.vehicle_type}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Vehicle Type
                  </InputLabel>
                  <Select fullWidth label="Vehicle Type" {...field}>
                    <MenuItem value="microbus">Microbus</MenuItem>
                    <MenuItem value="car">Car</MenuItem>
                    <MenuItem value="truck">Truck</MenuItem>
                  </Select>
                  {errors?.vehicle_type && (
                    <FormHelperText>
                      {errors?.vehicle_type.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
              rules={{ required: "Vehicle type is missing!" }}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="owner_name"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  error={errors?.owner_name}
                  helperText={errors?.owner_name?.message}
                  label="Vehicle Owner Name"
                  {...field}
                />
              )}
              rules={{ required: "Owner name is missing!" }}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="owner_phone"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  error={errors?.owner_phone}
                  helperText={errors?.owner_phone?.message}
                  label="Vehicle Owner Phone"
                  {...field}
                />
              )}
              rules={{ required: "Owner phone number is missing!" }}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={errors?.status}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Status
                  </InputLabel>
                  <Select fullWidth label="Status" {...field}>
                    <MenuItem value="in">In</MenuItem>
                    <MenuItem value="out">Out</MenuItem>
                  </Select>
                  {errors?.status && (
                    <FormHelperText>{errors?.status.message}</FormHelperText>
                  )}
                </FormControl>
              )}
              rules={{ required: "Please select a status." }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  error={errors?.address}
                  helperText={errors?.address?.message}
                  label="Address Line 1"
                  {...field}
                />
              )}
              rules={{ required: "Address is missing!" }}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  error={errors?.city}
                  helperText={errors?.city?.message}
                  label="City"
                  {...field}
                />
              )}
              rules={{ required: "Type your city name." }}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={errors?.country}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Country *
                  </InputLabel>
                  <Select fullWidth label="Country *" {...field}>
                    <MenuItem value="bd">Bangladesh</MenuItem>
                    <MenuItem value="un">England</MenuItem>
                    <MenuItem value="us">USA</MenuItem>
                  </Select>
                  {errors?.country && (
                    <FormHelperText>{errors?.country.message}</FormHelperText>
                  )}
                </FormControl>
              )}
              rules={{ required: "Select your country." }}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="zip"
              control={control}
              render={({ field }) => (
                <TextField
                  error={errors?.zip}
                  helperText={errors?.zip?.message}
                  fullWidth
                  label="Zip Code *"
                  {...field}
                />
              )}
              rules={{ required: "Zip code is missing!" }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="entry_time"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <DateTimePicker
                  onChange={(val) => {
                    setIntime(val);
                    onChange(val);
                  }}
                  {...field}
                  label="Entry Time *"
                  renderInput={(params) => (
                    <TextField
                      error={errors?.entry_time}
                      helperText={errors?.entry_time?.message}
                      sx={{
                        width: "100%",
                        fieldset: {
                          borderColor: errors?.entry_time
                            ? "#d32f2f"
                            : "rgba(0, 0, 0, 0.87)",
                        },
                        "label, button, p": {
                          color: errors?.entry_time
                            ? "#d32f2f"
                            : "rgba(0, 0, 0, 0.87)",
                        },
                      }}
                      {...params}
                    />
                  )}
                />
              )}
              rules={{ required: "Pick an entry time." }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="exit_time"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <DateTimePicker
                  onChange={(val) => {
                    setExitTime(val);
                    onChange(val);
                  }}
                  {...field}
                  label="Exit Time *"
                  minDate={moment(inTime).format("ll") || ""}
                  renderInput={(params) => (
                    <TextField
                      error={errors?.exit_time}
                      helperText={errors?.exit_time?.message}
                      sx={{
                        width: "100%",
                        fieldset: {
                          borderColor: errors?.exit_time
                            ? "#d32f2f"
                            : "rgba(0, 0, 0, 0.87)",
                        },
                        "label, button, p": {
                          color: errors?.exit_time
                            ? "#d32f2f"
                            : "rgba(0, 0, 0, 0.87)",
                        },
                      }}
                      {...params}
                    />
                  )}
                />
              )}
              rules={{ required: "Pick an exit time." }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <Typography variant="h5">
              <Box component="span" sx={{ fontWeight: 600 }}>
                Total charge:
              </Box>{" "}
              $100
            </Typography>
            <Button type="submit" variant="contained" size="large">
              {data ? "update" : "Add"} Vehicle
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddVehicleForm;
