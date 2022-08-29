import React, {useEffect, useState } from 'react';
import  {fetchOpenWeatherData } from '../../utils/api';
import {Card, CardContent, Typography} from '@mui/material'
const WeatherCard: React.FC<{city: string}> = ({city}) => {

    const [weatherData, setWeatherData] = useState(null)
    useEffect(() => {
        fetchOpenWeatherData(city)
        .then((data) => {
            console.log(data)

        }).catch((err) => {
            console.log(err)
        })
    }, [city]);

    if(!weatherData) {
        return <div>loading..</div>
    }

    return <Card>
        <CardContent>
            <Typography>
                {city}
            </Typography>
        </CardContent>
    </Card>
}

export default WeatherCard;