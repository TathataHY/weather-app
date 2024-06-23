"use client";

import defaultStates from "@/utils/default-states";
import axios from "axios";
import { debounce } from "lodash";
import { createContext, useContext, useEffect, useState } from "react";

interface GlobalContextType {
  forecast: ForecastData | null;
  airQuality: AirQualityData | null;
  fiveDayForecast: WeatherData | null;
  uvIndex: UvIndexData | null;
  geoCodedList: any;
  inputValue: string;
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface GlobalContextUpdateType {
  setActiveCityCoords: (newCoords: number[]) => void;
}

const GlobalContext = createContext<GlobalContextType>({
  forecast: null,
  airQuality: null,
  fiveDayForecast: null,
  uvIndex: null,
  geoCodedList: null,
  inputValue: "",
  handleInput: () => {},
});
const GlobalContextUpdate = createContext<GlobalContextUpdateType>({
  setActiveCityCoords: () => {},
});

export const GlobalContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [activeCityCoords, setActiveCityCoords] = useState<number[]>([
    51.752021, -1.257726,
  ]);
  const [geoCodedList, setGeoCodedList] = useState(defaultStates);
  const [inputValue, setInputValue] = useState("");

  const [forecast, setForecast] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);
  const [uvIndex, setUvIndex] = useState(null);

  const fetchForecast = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);
      setForecast(res.data);
    } catch (error: any) {
      console.error("Error fetching forecast data: ", error.message);
    }
  };
  const fetchAirQuality = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);
      setAirQuality(res.data);
    } catch (error: any) {
      console.error("Error fetching air quality data: ", error.message);
    }
  };
  const fetchFiveDayForecast = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`api/fiveday?lat=${lat}&lon=${lon}`);
      setFiveDayForecast(res.data);
    } catch (error: any) {
      console.error("Error fetching five day forecast data: ", error.message);
    }
  };
  const fetchUvIndex = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`);
      setUvIndex(res.data);
    } catch (error) {
      console.error("Error fetching the forecast:", error);
    }
  };
  const fetchGeoCodedList = async (search: string) => {
    try {
      const res = await axios.get(`/api/geocoded?search=${search}`);
      setGeoCodedList(res.data);
    } catch (error: any) {
      console.error("Error fetching geocoded list: ", error.message);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (e.target.value === "") {
      setGeoCodedList(defaultStates);
    }
  };

  useEffect(() => {
    const debouncedFetch = debounce((search) => {
      fetchGeoCodedList(search);
    }, 500);

    if (inputValue) {
      debouncedFetch(inputValue);
    }

    // cleanup
    return () => debouncedFetch.cancel();
  }, [inputValue]);

  useEffect(() => {
    fetchForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
    fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
  }, [activeCityCoords]);

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airQuality,
        fiveDayForecast,
        uvIndex,
        geoCodedList,
        inputValue,
        handleInput,
      }}
    >
      <GlobalContextUpdate.Provider value={{ setActiveCityCoords }}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
