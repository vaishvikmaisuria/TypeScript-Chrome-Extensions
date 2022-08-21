
import * as React from 'react'
import {render} from 'react-dom'
import './options.css'

// const test = <p> Hello World! </p>
// const root = document.createElement('div')
// document.body.appendChild(root)

// // @ts-ignore
// ReactDOM.createRoot(test, root)

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
