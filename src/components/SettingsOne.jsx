import { useState, useEffect } from 'react';

import './styles/Main.css';

// import { FaCheck } from 'react-icons/fa';

import Slider from '@rc-component/slider';
import '@rc-component/slider/assets/index.css';

import TooltipIcon from './TooltipIcon';


function SettingsOne({ goToPage }) {
    const [status, setStatus] = useState("saved");

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
        setStatus("saving");
        const newValue = value; // update React state

        setSentimentValue(newValue);
        chrome.storage.sync.set({ sentimentValue: newValue }, () => {
            setTimeout(() => setStatus("saved"), 300); // 0.3s delay
        }); // update Chrome user data
    };

    const handleFormat = (value) => {
        setStatus("saving");
        const newValue = (formatValue === value ? null : value); // update React state

        setFormatValue(newValue);
        chrome.storage.sync.set({ formatValue: newValue }, () => {
            setTimeout(() => setStatus("saved"), 300); // 0.3s delay
        }); // update Chrome user data
    };

    return <>
        <div className='sentiment-level-container'>
            <div className='feature-head'>
                <h3>Sentiment Level:</h3>
                <TooltipIcon text="Sentiment is equal to anthropomorphic traits. Reduce sentiment from ChatGPT's standard response level sentiment." />
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
                        boxShadow: "0 0 0 8px #FF9553" // NOT WORKING
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
                    type="radio"
                    id="bullet-list"
                    checked={formatValue === "bullet"}
                    onChange={() => handleFormat("bullet")}
                />
                <label htmlFor='bullet-list'>Bullet Point List</label>
            </div>
            <div className='output-format-item'>
                <input
                    type="radio"
                    id="wiki"
                    checked={formatValue === "wiki"}
                    onChange={() => handleFormat("wiki")}
                />
                <label htmlFor='wiki'>Dictionary like definition</label>
            </div>
            <div className='output-format-item'>
                <input 
                    type='radio' 
                    id='technical'
                    checked={formatValue === "technical"}
                    onChange={() => handleFormat("technical")}
                />
                <label htmlFor='technical'>Technical report</label>
            </div>
            <div className='output-format-item'>
                <input 
                    type='radio' 
                    id='no'
                    checked={formatValue === "no"}
                    onChange={() => handleFormat("no")}
                />
                <label htmlFor='no'>None</label>
            </div>
        </div>
        <div className='footer'>
            <button className='grey-btn' onClick={() => goToPage("two")}>Extra Settings</button>
        </div>
        <div className='saved-status'>
            <p>{status === "saving" ? "Saving..." : "Saved"}</p>
        </div>
    </>
}

export default SettingsOne;