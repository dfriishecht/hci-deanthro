import { useState, useEffect } from 'react';

import './styles/Main.css';

import Slider from '@rc-component/slider';
import '@rc-component/slider/assets/index.css';

// const marks = {
//     0: 'None',
//     4: "Standard"
// };


function SettingsOne() {

    const [emotiveValue, setEmotiveValue] = useState(5)

    return <>
        <div className='sentiment-level-container'>
            <p>Sentiment Level:</p>
            <Slider
            min={0}
            max={4}
            // marks={marks}
            dots={true}
            trackStyle={{ backgroundColor: "#FF9553" }}
            dotStyle={{ borderColor: "#FF9553" }}
            activeDotStyle={{ borderColor: "#FF9553", backgroundColor: "FF9553" }}
            />
            <div className='sentiment-labels'>
                <p>None</p>
                <p>Standard</p>
            </div>
        </div>
        <div className='emotive-count-container'>
            <p>Emotive Responses Remaining:</p>
            <p className='emotive-value'>{`${emotiveValue}`}</p>
        </div>
        <div className='output-format-container'>
            <p>Output Format:</p>
            <div className='output-format-item'>
                <input type='checkbox' id='bullet-list'></input>
                <label for='bullet-list'>Bullet Point List</label>
            </div>
            <div className='output-format-item'>
                <input type='checkbox' id='wiki'></input>
                <label for='wiki'>Wikipedia-esque</label>
            </div>
        </div>
    </>
}

export default SettingsOne;