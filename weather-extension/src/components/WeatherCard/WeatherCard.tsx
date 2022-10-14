import React, { useEffect, useState } from "react";
import { fetchOpenWeatherData, OpenWeatherTempScale, getWeatherIconSrc, OpenWeatherData } from "../../utils/api";
import { Box, Card, CardContent, CardActions, Typography, Grid } from "@mui/material";
import WeatherCardContainer from "../WeatherCardContainer/WeatherCardContainer";
import { WeatherCardState } from "../../constants/WeatherCardState";

const WeatherCard: React.FC<{ city: string, tempScale: OpenWeatherTempScale , onDelete?: () => void }> = ({ city, tempScale, onDelete }) => {
    const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
    const [cardState, setCardState] = useState<WeatherCardState>("loading");

    useEffect(() => {
        fetchOpenWeatherData(city, tempScale)
            .then((data) => {
                console.log(data)
                setWeatherData(data);
                setCardState("ready");
            })
            .catch((err) => {
                console.log(err);
                setCardState("error");
            });
    }, [city, tempScale]);

    if (cardState == "error" || cardState == "loading" || !weatherData) {
        return (
            <WeatherCardContainer onDelete={onDelete}>
                <Typography className="weatherCard-title">{city}</Typography>
                <Typography variant="body1" className='weatherCard-body'>
                    {cardState == "loading"
                        ? "Loading..."
                        : "Error: could not retrieve weather data for this city."}
                </Typography>
            </WeatherCardContainer>
        );
    }

    return (
        <WeatherCardContainer  onDelete={onDelete}>
            <Grid container>
                <Grid item>
                    <Typography className="weatherCard-title">{weatherData.name}</Typography>
                    <Typography className="weatherCard-temp">
                        {Math.round(weatherData.main.temp)}
                    </Typography>
                    <Typography className="weatherCard-body">
                         Feels like:
                         {Math.round(weatherData.main.feels_like)}
                    </Typography>
                </Grid>
                <Grid item>
                    {weatherData.weather.length > 0 && (
                        <>
                        <img src={getWeatherIconSrc(weatherData.weather[0].icon)} />
                        <Typography className="weatherCard-body">
                            {weatherData.weather[0].main}
                        </Typography>
                        </>
                    )}
                </Grid>
            </Grid>
        </WeatherCardContainer>
    );
};

export default WeatherCard;
