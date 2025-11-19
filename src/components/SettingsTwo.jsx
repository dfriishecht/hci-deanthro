import { useState, useEffect } from 'react';

import './styles/Main.css';

import TooltipIcon from './TooltipIcon';

function SettingsTwo({ goToPage }) {
    const [status, setStatus] = useState("saved");
    const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        chrome.storage.sync.get(["apiKey"], (result) => {
            if (result.apiKey) setApiKey(result.apiKey);
        });
    }, []);

    const handleApiKey = (e) => {
        const value = e.target.value;
        setApiKey(value);
        setStatus("saving");
        chrome.storage.sync.set({ apiKey: value }, () => {
            setTimeout(() => setStatus("saved"), 300);
        });
    };

    return <>
        <button className='grey-btn' onClick={() => goToPage("one")}>Main Settings</button>

        {/* API Key Section */}
        <div className='api-key-container' style={{ marginTop: '15px' }}>
            <div className='feature-head'>
                <h3>Gemini API Key:</h3>
                <TooltipIcon text="Enter your Google Gemini API Key." />
            </div>
            <input
                type="password"
                className="api-key-input"
                value={apiKey}
                onChange={handleApiKey}
                placeholder="Enter API Key"
            />
        </div>

        <div className='emotive-response-container'>
            <h3>Emotive Response Limit:</h3>
            <div className='set-emotive-response'>
                <p>888</p>
                <button className='emotive-count-inc'>inc</button>
                <button className='emotive-count-dec'>dec</button>
            </div>
        </div>

        <div className='footer'>
            <div className='saved-status'>
                <p>{status === "saving" ? "Saving..." : "Saved"}</p>
            </div>
        </div>
    </>
};

export default SettingsTwo;