import { useState, useEffect } from 'react';

import './styles/Main.css';

function SettingsTwo ({ goToPage }) {

    return <>
        <button className='grey-btn' onClick={() => goToPage("one")}>Main Settings</button>
        <div className='emotive-response-container'>
            <h3>Emotive Response Limit:</h3>
            <div className='set-emotive-response'>
                <p>888</p>
                <button className='emotive-count-inc'>inc</button>
                <button className='emotive-count-dec'>dec</button>
            </div>
        </div>

    </>
};

export default SettingsTwo;