import React from 'react'
import ReactDOM from 'react-dom'
import './globalstyle.scss'
import Router from './router'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<Router />, document.getElementById('clowd-desktop'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
