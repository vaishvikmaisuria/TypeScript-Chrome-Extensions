import React from 'react'
import { render } from 'react-dom';
import './popup.css'
import WeatherCard  from '../components/WeatherCard';


const App: React.FC<{}> = () => {
    return (
        <div>
            <WeatherCard city="Toronto" />
        </div>
    )
}

const root = document.createElement('div');
document.body.appendChild(root)
render(<App />, root)