import React from 'react'
import ReactDOM from 'react-dom/client'
import { HtmlInjection } from './html_injection'
import './styles/index.css'

// need to update content_scripts in manifest.js 
const appContainer = document.createElement("div");
appContainer.setAttribute("id", "app-wrapper"); // set ID
document.body.appendChild(appContainer); // add div to live webapage

ReactDOM.createRoot(appContainer).render(
    <React.StrictMode>
        <HtmlInjection/>
    </React.StrictMode>
)

