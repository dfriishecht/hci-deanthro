import { useState, useEffect } from 'react';

import './styles/Main.css';

import Slider from '@rc-component/slider';
import '@rc-component/slider/assets/index.css';

import TooltipIcon from './TooltipIcon';


function SettingsOne({ goToPage }) {

    const [sentimentValue, setSentimentValue] = useState(0)
    const [emotiveValue, setEmotiveValue] = useState("None")
    const [formatValue, setFormatValue] = useState(null);

    // fetch Chrome user data and populate settings
    useEffect(() => {
        chrome.storage.sync.get(
            ["sentimentValue", "formatValue"],
            (result) => {
            if (result.sentimentValue !== undefined) {
                setSentimentValue(result.sentimentValue);
            }

            if (result.formatValue !== undefined) {
                setFormatValue(result.formatValue);
            }
            }
        );
    }, []);

    const handleSentiment = (value) => {
        const newValue = value; // update React state

        setSentimentValue(newValue);
        chrome.storage.sync.set({ sentimentValue: newValue }); // update Chrome user data
    };

    const handleFormat = (value) => {
        const newValue = (formatValue === value ? null : value); // update React state

        setFormatValue(newValue);
        chrome.storage.sync.set({ formatValue: newValue }); // update Chrome user data
    };

    return <>
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
                    trackStyle={{ backgroundColor: "#FF9553" }}
                    dotStyle={{ borderColor: "#FF9553" }}
                    activeDotStyle={{ borderColor: "#FF9553", backgroundColor: "FF9553" }}
                    value={sentimentValue}
                    onChange={handleSentiment}
                />
            </div>
            <div className='sentiment-labels'>
                <p>None</p>
                <p>Standard</p>
            </div>
        </div>
        {/* <div className='emotive-count-container'>
            <div className='feature-head'>
                <h3>Emotive Responses Remaining:</h3>
                <TooltipIcon text="blah blah"/>
            </div>
            <p className='emotive-value'>{`${emotiveValue}`}</p>
        </div> */}
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
            <button className='grey-btn'>
                Save
            </button>
        </div>
    </>
}

export default SettingsOne;