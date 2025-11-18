import { useState } from 'react';
import MainSettings from '../components/Main'
import './styles/html_injection.css'

export const HtmlInjection = () => {
    console.log("HTML PLZ");

    const [extension_state, setState] = useState("Off");

    function handleClick() {
        if (extension_state == "Off"){
            setState("On");
        }
        else{
            setState("Off");
        }
    }

    return (
        <>
        <button onClick={handleClick} type="button" id="popup" aria-label='Extension Button'> </button>
        
        {extension_state == "On" && <MainSettings />}
        </>
    )
}

export default HtmlInjection
