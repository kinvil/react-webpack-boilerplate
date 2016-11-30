import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'

import App from './components/App'

import '../styles/main.sass'

render(
    <App />,
    document.getElementById('root')
)
