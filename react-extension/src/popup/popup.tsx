// const test: string = "hello"

import * as React from 'react'
import { render } from 'react-dom';
// import { createRoot } from 'react-dom/client';
import 'popup.css'

// const test2 = <p> Hello World! </p>
// const test = <img src="icon.png" />
// const root = document.createElement('div')
// document.body.appendChild(root)

const App: React.FC<{}> = () => {
    return (
        <div>
            <img src="icon.png" />
        </div>
    )
}
const root = document.createElement('div');
document.body.appendChild(root)

render(<App />, root)

// @ts-ignore
// ReactDOM.createRoot(test, root)

// chrome.runtime.onInstalled.addListener