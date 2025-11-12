import { useState } from 'react';
import { MockPopup } from './mock_popup';
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
        {/* <h1> Hi HI HI </h1> */}

        <button onClick={handleClick} type="button"> 
            Click Me! State: {extension_state}
        </button>

        {extension_state == "On" && <MockPopup />}      
        </>
    )
}

export default HtmlInjection
