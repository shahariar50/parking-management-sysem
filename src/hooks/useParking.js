import constate from "constate";
import { useState } from "react";
import {
  getLocalStorgeData,
  setLocalStorgeData,
} from "utils/localStorageUtils";

const useAuth = () => {
  const [parkings, setParkings] = useState(getLocalStorgeData("parkings"));

  const replaceParkings = (data) => {
    setLocalStorgeData("parkings", data);
    setParkings(data);
  };
  const addParking = (data) => {
    data.id = parkings?.length ? parkings[parkings.length - 1].id + 1 : 0;
    const finalData = [...parkings, data];
    setLocalStorgeData("parkings", finalData);
    setParkings(finalData);
  };
  const updateParking = (data) => {
    const finalData = parkings.map((row) =>
      row.id === data.id ? { ...row, ...data } : row
    );
    console.log(data, finalData);
    setLocalStorgeData("parkings", finalData);
    setParkings(finalData);
  };

  return { parkings, replaceParkings, addParking, updateParking };
};

export const [ParkingsProvider, useParkingsContext] = constate(useAuth);
