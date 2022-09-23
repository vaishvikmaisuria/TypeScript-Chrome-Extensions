import React, { useEffect, useState } from "react";
import { fetchOpenWeatherData } from "../../utils/api";
import { Box, Card, CardContent, CardActions, Typography } from "@mui/material";
import WeatherCardContainer from "../WeatherCardContainer/WeatherCardContainer";
import { WeatherCardState } from "../../constants/WeatherCardState";

const WeatherCard: React.FC<{ city: string, onDelete?: () => void }> = ({ city, onDelete }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [cardState, setCardState] = useState<WeatherCardState>("loading");

    useEffect(() => {
        fetchOpenWeatherData(city)
            .then((data) => {
                console.log(data)
                setWeatherData(data);
                setCardState("ready");
            })
            .catch((err) => {
                console.log(err);
                setCardState("error");
            });
    }, [city]);

    if (cardState == "error" || cardState == "loading" || !weatherData) {
        return (
            <WeatherCardContainer onDelete={onDelete}>
                <Typography variant="body1">
                    {cardState == "loading"
                        ? "Loading..."
                        : "Error: could not retrieve weather data for this city."}
                </Typography>
            </WeatherCardContainer>
        );
    }

    return (
        <WeatherCardContainer  onDelete={onDelete}>
            <Typography variant="h5">{weatherData.name}</Typography>
            <Typography variant="body1">
                {Math.round(weatherData.main.temp)}
            </Typography>
            <Typography variant="body1">
                Feels like:
                {Math.round(weatherData.main.feels_like)}
            </Typography>
        </WeatherCardContainer>
    );
};

export default WeatherCard;
