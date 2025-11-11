import { useState, useEffect } from 'react';
import './Popup.css';

export const Popup = () => {
  const [apiKey, setApiKey] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    chrome.storage.local.get(['user_api_key'], (res) => {
      if (res.user_api_key) setApiKey(res.user_api_key);
    });
  }, []);

  const handleSave = () => {
    chrome.storage.local.set({ user_api_key: apiKey }, () => {
      setStatus('Saved');
      setTimeout(() => setStatus(''), 1500);
    });
  };

  return (
    <main style={{ width: 250, padding: 12 }}>
      <h3>Settings</h3>
      <label htmlFor="apikey">API Key:</label>
      <input
        id="apikey"
        type="text"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        style={{ width: '100%', marginTop: 6 }}
      />
      <button onClick={handleSave} style={{ marginTop: 10 }}>
        Save
      </button>
      <p style={{ color: 'green', fontSize: 12 }}>{status}</p>
    </main>
  );
};

export default Popup;
