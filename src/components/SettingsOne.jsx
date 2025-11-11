import { useState, useEffect } from 'react';

import './styles/Main.css';

import Slider from '@rc-component/slider';
import '@rc-component/slider/assets/index.css';


function SettingsOne() {

    const [sentimentValue, setSentimentValue] = useState(0)
    const [emotiveValue, setEmotiveValue] = useState(5)

    useEffect(() => {
        chrome.storage.sync.get(["sentimentValue"], (result) => {
            if (result.sentimentValue !== undefined) {
                setSentimentValue(result.sentimentValue);
            }
        });
    }, []);

    const handleSentiment = (value) => {
        setSentimentValue(value); // update React state
    };

    const handleSave = () => {
        chrome.storage.sync.set({ sentimentValue });
    };

    return <>
        <div className='sentiment-level-container'>
            <h3>Sentiment Level:</h3>
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
        <div className='emotive-count-container'>
            <h3>Emotive Responses Remaining:</h3>
            <p className='emotive-value'>{`${emotiveValue}`}</p>
        </div>
        <div className='output-format-container'>
            <h3>Output Format:</h3>
            <div className='output-format-item'>
                <input type='checkbox' id='bullet-list'></input>
                <label for='bullet-list'>Bullet Point List</label>
            </div>
            <div className='output-format-item'>
                <input type='checkbox' id='wiki'></input>
                <label for='wiki'>Wikipedia-esque</label>
            </div>
            <div className='output-format-item'>
                <input type='checkbox' id='technical'></input>
                <label for='technical'>Technical/professional</label>
            </div>
        </div>
        <div className='footer'>
            <button className='grey-btn'>Extra Settings</button>
            <button className='grey-btn' onClick={handleSave}>
                Save
            </button>
        </div>
    </>
}

export default SettingsOne;