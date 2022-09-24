import React, {useEffect, useState } from "react";
import { render } from "react-dom";
import "@fontsource/roboto";
import "./popup.css";
import WeatherCard from "../components/WeatherCard";
import { Box, Paper, InputBase, Grid, IconButton } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { setStoredCities, getStoredCities } from "../utils/storage";

const App: React.FC<{}> = () => {
    const [cities, setCities] = useState<string[]>([
        "Toronto",
        "New York",
        "Error",
    ]);
    const [cityInput, setCityInput] = useState<string>('')

    useEffect(() => {
        getStoredCities().then(cities => {
            setCities(cities)
        })
    }, [])

    const handleCityButtonClick = () => {
        if (cityInput === '') {
            return
        }
        const updatedCities = [...cities, cityInput]
        setStoredCities(updatedCities). then(() => {
            setCities(updatedCities)
            setCityInput('')
        })
    }

    const handleCityDeleteButtonClick = (index: number) => {
        cities.splice(index, 1)
        const updatedCities = [...cities]
        setStoredCities(updatedCities). then(() => {
            setCities(updatedCities)
            // setCityInput('')
        })
    }

    return (
        <Box mx="4px" my="16px">
            <Grid container>
                <Grid item>
                    <Paper
                        component="form"
                        sx={{
                            p: "2px 4px",
                            display: "flex",
                            alignItems: "center",
                            width: "485",
                        }}
                    >
                        <IconButton
                            sx={{ p: "10px" }}
                            aria-label="menu"
                        ></IconButton>
                        <InputBase
                            // sx={{ ml: 1, flex: 1 }}
                            placeholder="Add a city name"
                            value={cityInput}
                            onChange={(event) => setCityInput(event.target.value)}
                            // inputProps={{ "aria-label": "search google maps" }}
                        />
                        <IconButton onClick={handleCityButtonClick}
                            type="button"
                            sx={{ p: "10px" }}
                            aria-label="search"
                        >
                            <AddIcon />
                        </IconButton>
                    </Paper>
                </Grid>
            </Grid>

            {cities.map((city, index) => (
                <WeatherCard key={index} city={city} onDelete={() => handleCityDeleteButtonClick(index)} />
            ))}
            <Box height='16px' />
        </Box>
    );
};

const root = document.createElement("div");
document.body.appendChild(root);
render(<App />, root);
