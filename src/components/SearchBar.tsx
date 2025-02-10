import { useState, useEffect, useMemo, useCallback } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { CompareArrows, PersonOutline, Search } from "@mui/icons-material";
import axios from "axios";

import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Snackbar, Alert } from "@mui/material";
import FlightResultsAccordion from "./FlightsResults";

export default function SearchBar() {
  const [trip, setTrip] = useState("");
  const [passenger, setPassenger] = useState(1);
  const [type, setType] = useState("");

  const [departure, setDeparture] = useState<Dayjs | null>(dayjs(null));
  const [returnDate, setReturnDate] = useState<Dayjs | null>(dayjs(null));

  const [origin, setOrigin] = useState<string | null>("");
  const [originInputValue, setOriginInputValue] = useState("");
  const [destinationInputValue, setDestinationInputValue] = useState("");
  const [destination, setDestination] = useState<string | null>("");
  const [flights, setFlights] = useState([]);

  const [originId, setOriginId] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [originOptions, setOriginOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);

  const [originSkyId, setOriginSkyId] = useState("");
  const [destinationSkyId, setDestinationSkyId] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  // Snackbar state for error handling
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleTrip = (event: SelectChangeEvent) => {
    setTrip(event.target.value);
  };

  const handleFlightType = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  // Shared function to fetch airports based on input value
  // Memoize the fetchAirports function
  const fetchAirports = useCallback(async (query: string) => {
    try {
      const response = await axios.get(
        `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${query}&locale=en-US`,
        {
          headers: {
            "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
            "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching airport data:", error);
      setSnackbarMessage("Error fetching airport data.");
      setSnackbarOpen(true);
      return [];
    }
  }, []);

  // Memoize airport options based on input values
  const memoizedOriginOptions = useMemo(() => {
    if (originInputValue.length > 2) {
      return fetchAirports(originInputValue);
    }
    return [];
  }, [originInputValue, fetchAirports]);

  const memoizedDestinationOptions = useMemo(() => {
    if (destinationInputValue.length > 2) {
      return fetchAirports(destinationInputValue);
    }
    return [];
  }, [destinationInputValue, fetchAirports]);

  useEffect(() => {
    const fetchOptions = async () => {
      const fetchedOriginOptions = await memoizedOriginOptions;
      setOriginOptions(fetchedOriginOptions);

      const fetchedDestinationOptions = await memoizedDestinationOptions;
      setDestinationOptions(fetchedDestinationOptions);
    };
    fetchOptions();
  }, [memoizedOriginOptions, memoizedDestinationOptions]);

  const handleSearch = async () => {
    const params = {
      originSkyId: originSkyId,
      originEntityId: originId,
      destinationEntityId: destinationId,
      destinationSkyId: destinationSkyId,
      date: departure ? departure.format("YYYY-MM-DD") : "",
      returnDate: returnDate ? returnDate.format("YYYY-MM-DD") : "",
      cabinClass: type.toLowerCase(),
      adults: passenger,
      sortBy: "best",
      currency: "INR",
      market: "en-US",
      countryCode: "IND",
    };

    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights",
        {
          params,
          headers: {
            // put the api key in an env file
            "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
            "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
          },
        }
      );
      setFlights(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching flights:", error);
      setSnackbarMessage("Error fetching flights.");
      setSnackbarOpen(true);
    }
  };
  //   console.log(origin);
  //   console.log(destinationId);
  //   console.log(origin);
  //   console.log(type.toLowerCase());
  //   console.log(passenger);
  //   console.log(departure ? departure.format("YYYY-MM-DD") : "");

  // TO DO: days should be calculated from the depature date and return date
  // TO DO: options in autocomplete should come from the Search Airport API in the Flights collection.

  return (
    <>
      <div className="container mx-auto flex justify-center items-center p-2 md:p-0">
        <div className="border border-gray-300 p-6 grid grid-cols-1 gap-6 bg-white shadow-lg rounded-lg">
          <div className="flex flex-row md:flex-row">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="demo-simple-select-standard-label">
                <CompareArrows /> Round trip{" "}
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={trip}
                onChange={handleTrip}
                label="Trip"
              >
                <MenuItem value="Round trip">
                  <em>Round trip</em>
                </MenuItem>
                <MenuItem value={"One way"}>One way</MenuItem>
                <MenuItem value={"Multi-city"}>Multi-way</MenuItem>
                {/* <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </FormControl>
            <div className="pt-6 md:pt-0 md:pl-6">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 24 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  <PersonOutline />{" "}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={passenger}
                  onChange={(e) => setPassenger(Number(e.target.value))}
                  label="Passenger"
                >
                  <MenuItem value={1}>
                    <em>1</em>
                  </MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  {/* <MenuItem value={3}>4</MenuItem> */}
                </Select>
              </FormControl>
            </div>
            <div className="pt-6 md:pt-0 md:pl-6">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Economy
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={type}
                  onChange={handleFlightType}
                  label="Age"
                >
                  <MenuItem value="economy">
                    <em>Economy</em>
                  </MenuItem>
                  <MenuItem value={"premium_economy"}>Premium Economy</MenuItem>
                  <MenuItem value={"business"}>Business</MenuItem>
                  <MenuItem value={"first"}>First</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid grid-cols-2 gap-2 border border-gray-200 p-2 rounded">
              <div className="flex rounded bg-none items-center p-2 ">
                <Autocomplete
                  id="manageable-states-demo"
                  value={origin}
                  inputValue={originInputValue}
                  onInputChange={(_event, newInputValue) => {
                    setOriginInputValue(newInputValue);
                  }}
                  sx={{ width: 200 }}
                  options={originOptions}
                  getOptionLabel={(option: any) =>
                    option?.presentation?.suggestionTitle || ""
                  }
                  onChange={(_event, value: any | null) => {
                    setOrigin(value);
                    setOriginId(value?.entityId || "");
                    setOriginSkyId(value?.skyId);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Where from?" />
                  )}
                />
              </div>
              <div className="flex rounded bg-none items-center p-2 ">
                <Autocomplete
                  id="manageable-states-demo"
                  value={destination}
                  inputValue={destinationInputValue}
                  onInputChange={(_event, newInputValue) => {
                    setDestinationInputValue(newInputValue);
                  }}
                  sx={{ width: 200 }}
                  options={destinationOptions}
                  getOptionLabel={(option: any) =>
                    option?.presentation?.suggestionTitle || ""
                  }
                  onChange={(_event, value: any | null) => {
                    setDestination(value);
                    setDestinationId(value?.entityId || "");
                    setDestinationSkyId(value?.skyId);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Where to?" />
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 border border-gray-200 p-2 rounded">
              <div className="flex rounded bg-none items-center p-2 ">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker", "DatePicker"]}>
                    <DatePicker
                      value={departure}
                      onChange={(newValue) => setDeparture(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="flex rounded bg-none items-center p-2 ">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker", "DatePicker"]}>
                    <DatePicker
                      value={returnDate}
                      onChange={(newValue) => setReturnDate(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-[-20px]">
        <button
          onClick={handleSearch}
          className="flex justify-items-center px-3 gap-2 p-2 border w-36 rounded-full bg-blue-500 text-white"
        >
          <Search />
          <p className="my-auto">{isLoading ? "Searching..." : "Explore"}</p>
        </button>
        {/* Snackbar for error handling */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
      {/* flights card */}
      <FlightResultsAccordion flights={flights} />
    </>
  );
}
