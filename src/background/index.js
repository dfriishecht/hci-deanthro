console.log('background is running')

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'COUNT') {
    console.log('background has received a message from popup, and count is ', request?.count)
  }
  
  if (request.type === 'CHATGPT_RESPONSE') {
    console.log('background received ChatGPT response:', request.text?.substring(0, 100) + '...')
    
    // Store in chrome.storage for persistence
    chrome.storage.local.set({
      lastChatGPTResponse: request.text,
      lastResponseTimestamp: request.timestamp
    })
    
    // The side panel will listen for storage changes and messages
    sendResponse({ success: true })
  }
  
  return true // Keep message channel open for async response
})
