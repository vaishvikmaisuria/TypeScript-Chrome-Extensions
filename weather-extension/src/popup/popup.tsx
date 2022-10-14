import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { createRoot } from 'react-dom/client';
import "@fontsource/roboto";
import "./popup.css";
import WeatherCard from "../components/WeatherCard";
import { Box, Paper, InputBase, Grid, IconButton } from "@mui/material";
import { Add as AddIcon, PictureInPicture as PictureInPictureIcon } from "@mui/icons-material";
import {
    setStoredCities,
    getStoredCities,
    setStoredOptions,
    getStoredOptions,
    LocalStorageOptions,
} from "../utils/storage";
import { Messages } from '../utils/messages';

const App: React.FC<{}> = () => {
    const [cities, setCities] = useState<string[]>([]);
    const [cityInput, setCityInput] = useState<string>("");
    const [options, setOptions] = useState<LocalStorageOptions | null>(null);

    useEffect(() => {
        getStoredCities().then((cities) => {
            setCities(cities);
        });
        getStoredOptions().then((options) => {
            setOptions(options);
        });
    }, []);

    const handleCityButtonClick = () => {
        if (cityInput === "") {
            return;
        }
        const updatedCities = [...cities, cityInput];
        setStoredCities(updatedCities).then(() => {
            setCities(updatedCities);
            setCityInput("");
        });
    };

    const handleCityDeleteButtonClick = (index: number) => {
        cities.splice(index, 1);
        const updatedCities = [...cities];
        setStoredCities(updatedCities).then(() => {
            setCities(updatedCities);
            // setCityInput('')
        });
    };

    const handleTempScaleButtonClick = () => {
        const updateOptions: LocalStorageOptions = {
            ...options,
            tempScale: options.tempScale === 'metric' ? 'imperial' : 'metric',
        }
        setStoredOptions(updateOptions).then(() => {
            setOptions(updateOptions)
        })
    }
    const handleOverlayButtonClick = () => {
        chrome.tabs.query(
            {
                active: true,
                currentWindow: true,
            },
            (tabs) => {
                if (tabs.length > 0) {
                    chrome.tabs.sendMessage(tabs[0].id, Messages.TOGGLE_OVERLAY)
                }
            }
        )
    }

    if (!options) {
        return null;
    }

    return (
        <Box mx="8px" my="16px">
            <Grid container justifyContent={'space-evenly'}>
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
                            onChange={(event) =>
                                setCityInput(event.target.value)
                            }
                            // inputProps={{ "aria-label": "search google maps" }}
                        />
                        <IconButton
                            onClick={handleCityButtonClick}
                            type="button"
                            sx={{ p: "10px" }}
                            aria-label="search"
                        >
                            <AddIcon />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper>
                        <Box py={'4px'}>
                            <IconButton onClick={handleTempScaleButtonClick}>
                                {options.tempScale === "metric"
                                    ? "\u2103"
                                    : "\u2109"}
                            </IconButton>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper>
                        <Box py={'4px'}>
                            <IconButton onClick={handleOverlayButtonClick}>
                                <PictureInPictureIcon />
                            </IconButton>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            {
                options.homeCity != '' &&
                <WeatherCard city={options.homeCity} tempScale={options.tempScale} />
            }
            {cities.map((city, index) => (
                <WeatherCard
                    key={index}
                    tempScale={options.tempScale}
                    city={city}
                    onDelete={() => handleCityDeleteButtonClick(index)}
                />
            ))}
            <Box height="16px" />
        </Box>
    );
};


const root = document.createElement("div");
document.body.appendChild(root);
render(<App />, root);

