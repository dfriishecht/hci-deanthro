import { useState, useEffect } from 'react';

import SettingsOne from './SettingsOne';
import SettingsTwo from './SettingsTwo';

import './styles/Main.css';

function MainSettings() {
  const [page, setPage] = useState("one");

  return (
    <div className="ext-content">
      <h2 className="ext-name">Deanthro.AI</h2>
      <div className="setting-content">
        {page === "one" && <SettingsOne goToPage={setPage} />}
        {page === "two" && <SettingsTwo goToPage={setPage} />}
      </div>
    </div>
  );
import './styles/Main.css';

function MainSettings() {

    return <>
        <div className="ext-content">
            <h2 className="ext-name">Deanthro.AI</h2>
            <div className="setting-content">
                <p>Item one</p>
                <p>Item two</p>
                <p>Item three</p>
            </div>
        </div>
    </>
}

export default MainSettings;
