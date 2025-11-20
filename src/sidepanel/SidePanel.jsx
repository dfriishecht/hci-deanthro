import { useState, useEffect } from 'react'

import './SidePanel.css'

export const SidePanel = () => {
  const [chatGPTResponse, setChatGPTResponse] = useState('')
  const [timestamp, setTimestamp] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load initial response from storage
    chrome.storage.local.get(['lastChatGPTResponse', 'lastResponseTimestamp'], (result) => {
      if (result.lastChatGPTResponse) {
        setChatGPTResponse(result.lastChatGPTResponse)
        setTimestamp(result.lastResponseTimestamp)
      }
      setIsLoading(false)
    })

    // Listen for storage changes (when content script updates)
    const handleStorageChange = (changes, areaName) => {
      if (areaName === 'local' && changes.lastChatGPTResponse) {
        setChatGPTResponse(changes.lastChatGPTResponse.newValue)
        if (changes.lastResponseTimestamp) {
          setTimestamp(changes.lastResponseTimestamp.newValue)
        }
      }
    }
    chrome.storage.onChanged.addListener(handleStorageChange)

    // Listen for messages from content script
    const messageListener = (request) => {
      if (request.type === 'CHATGPT_RESPONSE') {
        setChatGPTResponse(request.text)
        setTimestamp(request.timestamp)
      }
    }
    chrome.runtime.onMessage.addListener(messageListener)

    // Cleanup
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange)
      chrome.runtime.onMessage.removeListener(messageListener)
    }
  }, [])

  const formatTimestamp = (ts) => {
    if (!ts) return ''
    const date = new Date(ts)
    return date.toLocaleTimeString()
  }

  return (
    <main className="sidepanel-container">
      <h3>ChatGPT Response Monitor</h3>
      
      {isLoading ? (
        <p>Loading...</p>
      ) : chatGPTResponse ? (
        <div className="response-container">
          {timestamp && (
            <div className="timestamp">
              Last updated: {formatTimestamp(timestamp)}
            </div>
          )}
          <div className="response-text">
            {chatGPTResponse}
          </div>
        </div>
      ) : (
        <div className="no-response">
          <p>No ChatGPT response detected yet.</p>
          <p className="hint">
            Open ChatGPT and start a conversation. The most recent response will appear here.
          </p>
        </div>
      )}
    </main>
  )
}

export default SidePanel
