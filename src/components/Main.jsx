import { useState, useEffect } from 'react';

import SettingsOne from './SettingsOne';

import './styles/Main.css';

function MainSettings() {

    return <>
        <div className="ext-content">
            <h2 className="ext-name">Deanthro.AI</h2>
            <div className="setting-content">
                <SettingsOne />
            </div>
        </div>
    </>
}

export default MainSettings;
