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
            <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                Don't have an API key? Get one from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style={{ color: '#FF9553' }}>Google AI Studio</a>.
                This key is required to power the AI features. We don't provide the API keys for you, but Google's free tier should be enough for most users.
            </p>
        </div>


        <div className='footer'>
            <div className='saved-status'>
                <p>{status === "saving" ? "Saving..." : "Saved"}</p>
            </div>
        </div>
    </>
};

export default SettingsTwo;