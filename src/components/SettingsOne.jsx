import { useState, useEffect } from 'react';

import './styles/Main.css';

import Slider from '@rc-component/slider';
import '@rc-component/slider/assets/index.css';

import { PROMPTS, FORMAT_PROMPTS } from '../utils/prompts';

import TooltipIcon from './TooltipIcon';


function SettingsOne({ goToPage }) {
    const [status, setStatus] = useState("saved");

    const [enabled, setEnabled] = useState(true);
    const [sentimentValue, setSentimentValue] = useState(0); // Maps to anthropomorphize
    const [formatValue, setFormatValue] = useState(null);

    // fetch Chrome user data and populate settings
    useEffect(() => {
        chrome.storage.sync.get(
            ["enabled", "anthropomorphize", "formatValue"],
            (result) => {
                if (result.enabled !== undefined) setEnabled(result.enabled);
                if (result.anthropomorphize !== undefined) setSentimentValue(result.anthropomorphize);
                if (result.formatValue !== undefined) setFormatValue(result.formatValue);
            }
        );
    }, []);

    const handleEnabled = (e) => {
        const value = e.target.checked;
        setEnabled(value);
        setStatus("saving");
        chrome.storage.sync.set({ enabled: value }, () => {
            setTimeout(() => setStatus("saved"), 300);
        });

        // Notify content script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]?.id) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'toggleExtension',
                    enabled: value
                });
            }
        });
    };

    const handleSentiment = (value) => {
        setStatus("saving");
        const newValue = value;

        setSentimentValue(newValue);
        // Map sentimentValue to anthropomorphize setting AND update systemPrompt
        let newPrompt = PROMPTS[newValue] || PROMPTS[2]; // Default to level 2 if out of bounds

        // Append format prompt if one is selected
        if (formatValue && FORMAT_PROMPTS[formatValue]) {
            newPrompt += `\n\n${FORMAT_PROMPTS[formatValue]}`;
        }

        chrome.storage.sync.set({
            anthropomorphize: newValue,
            systemPrompt: newPrompt
        }, () => {
            setTimeout(() => setStatus("saved"), 300);
        });
    };

    const handleFormat = (value) => {
        setStatus("saving");
        // Radio behavior: if clicking the same value, deselect it (null). Otherwise select the new value.
        const newValue = (formatValue === value ? null : value);

        setFormatValue(newValue);

        // Construct new system prompt with updated format
        let newPrompt = PROMPTS[sentimentValue] || PROMPTS[2];
        if (newValue && FORMAT_PROMPTS[newValue]) {
            newPrompt += `\n\n${FORMAT_PROMPTS[newValue]}`;
        }

        chrome.storage.sync.set({
            formatValue: newValue,
            systemPrompt: newPrompt
        }, () => {
            setTimeout(() => setStatus("saved"), 300);
        });
    };

    return <>
        {/* Enabled Toggle Section */}
        <div className='toggle-container'>
            <div className='feature-head'>
                <h3>Enable Extension:</h3>
            </div>
            <label className="toggle-switch">
                <input
                    type="checkbox"
                    checked={enabled}
                    onChange={handleEnabled}
                />
                <span className="slider-toggle"></span>
            </label>
        </div>

        <div className='sentiment-level-container'>
            <div className='feature-head'>
                <h3>Sentiment Level:</h3>
                <TooltipIcon text="Reduce the amount of sentiment from generated responses." />
            </div>
            <div className='sentiment-slider'>
                <Slider
                    min={0}
                    max={4}
                    dots={true}
                    handleStyle={{ borderColor: "#FF9553" }}
                    handleActiveStyle={{
                        borderColor: "#FF9553",
                        backgroundColor: "#FF9553",
                        boxShadow: "0 0 0 8px #FF9553"
                    }}
                    trackStyle={{ backgroundColor: "#FF9553" }}
                    dotStyle={{ borderColor: "#FF9553" }}
                    activeDotStyle={{ borderColor: "#FF9553" }}
                    value={sentimentValue}
                    onChange={handleSentiment}
                />
            </div>
            <div className='sentiment-labels'>
                <p>None</p>
                <p>Standard</p>
            </div>
        </div>

        <div className='output-format-container'>
            <div className='feature-head'>
                <h3>Output Format:</h3>
                <TooltipIcon text="Alter response format to match selected option." />
            </div>
            <div className='output-format-item'>
                <input
                    type="checkbox"
                    id="bullet-list"
                    checked={formatValue === "bullet"}
                    onChange={() => handleFormat("bullet")}
                />
                <label htmlFor='bullet-list'>Bullet Point List</label>
            </div>
            <div className='output-format-item'>
                <input
                    type="checkbox"
                    id="wiki"
                    checked={formatValue === "wiki"}
                    onChange={() => handleFormat("wiki")}
                />
                <label htmlFor='wiki'>Dictionary</label>
            </div>
            <div className='output-format-item'>
                <input
                    type='checkbox'
                    id='technical'
                    checked={formatValue === "technical"}
                    onChange={() => handleFormat("technical")}
                />
                <label htmlFor='technical'>Technical/professional</label>
            </div>
        </div>

        <div className='footer'>
            <button className='grey-btn' onClick={() => goToPage("two")}>Extra Settings</button>
            <div className='saved-status'>
                <p>{status === "saving" ? "Saving..." : "Saved"}</p>
            </div>
        </div>
    </>
}

export default SettingsOne;