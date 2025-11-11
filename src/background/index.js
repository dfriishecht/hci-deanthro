console.log('background running');

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg?.type === 'REQUEST_API_KEY') {
    chrome.storage.local.get(['user_api_key'], (res) => {
      sendResponse({ apiKey: res?.user_api_key || null });
    });
    return true; // keep the message channel open for async sendResponse
  }

  if (msg?.type === 'SAVE_API_KEY') {
    chrome.storage.local.set({ user_api_key: msg.apiKey }, () => {
      sendResponse({ status: 'saved' });
    });
    return true;
  }

  if (msg?.type === 'INJECT_FEATURE') {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: ['src/contentScript/index.js'],
    });
  }
});
