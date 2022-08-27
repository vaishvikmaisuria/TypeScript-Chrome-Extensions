// const test: string = "hello"

import React, { useEffect } from 'react'
import { render } from 'react-dom';
// import ReactDOM from "react-dom/client";
// import { createRoot } from 'react-dom/client';
import './popup.css'
import { fetchOpenWeatherData } from '../utils/api';

// const test2 = <p> Hello World! </p>
// const test = <img src="icon.png" />
// const root = document.createElement('div')
// document.body.appendChild(root)

const App: React.FC<{}> = () => {

    useEffect(() => {
        fetchOpenWeatherData("Toronto")
        .then((data) => {
            console.log(data)
            console.log("Temperature is: ", data.main.temp)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <div>
            <img src="icon.png" />
        </div>
    )
}
const root = document.createElement('div');
document.body.appendChild(root)

render(<App />, root)

// createRoot(document.getElementById('root')).render(<App />)

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//     <App />
// );

// @ts-ignore
// ReactDOM.createRoot(test, root)

// chrome.runtime.onInstalled.addListener