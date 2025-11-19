import { useState, useEffect } from 'react'
import './Popup.css'

const personalityLevels = [
  {
    name: 'Technical Assistant',
    prompt: `Analyze the following response and rewrite it with these characteristics:
    - Use precise, technical language without colloquialisms
    - Present information in a structured, logical manner
    - Remove all personal pronouns (I, we, you) where possible
    - Focus on objective facts and data
    - Use passive voice for more formal tone
    - Eliminate emotional language and personal opinions
    - Structure responses with clear hierarchies and bullet points
    - Be concise and direct without unnecessary pleasantries
    Purely output the response, with no mention of what you are doing.
    Original response to rewrite:`
  },
  {
    name: 'Professional Assistant',
    prompt: `Improve the following response with these characteristics:
    - Use clear, professional language
    - Maintain a respectful but not overly formal tone
    - Present information in a well-organized manner
    - Use "you" sparingly and appropriately
    - Focus on being helpful and informative
    - Include relevant context where necessary
    - Be thorough but avoid redundancy
    - Maintain objectivity while being approachable
    Purely output the response, with no mention of what you are doing.
    Original response to improve:`
  },
  {
    name: 'Balanced Assistant',
    prompt: `Enhance the following response with these characteristics:
    - Balance professionalism with approachability
    - Use clear, accessible language
    - Include helpful explanations without being condescending
    - Use "you" naturally where it improves clarity
    - Provide comprehensive yet digestible information
    - Add relevant examples when helpful
    - Maintain a neutral, helpful tone
    - Be informative while remaining engaging
    Purely output the response, with no mention of what you are doing.
    Original response to enhance:`
  },
  {
    name: 'Friendly Guide',
    prompt: `Transform the following response with these characteristics:
    - Use warm, conversational language
    - Include personal pronouns naturally (I'd suggest, you might find)
    - Add encouraging phrases and positive reinforcement
    - Use relatable examples and analogies
    - Express understanding and empathy where appropriate
    - Include helpful tips with a friendly tone
    - Use casual but respectful language
    - Make the interaction feel more like a friendly conversation
    Purely output the response, with no mention of what you are doing.
    Original response to transform:`
  },
  {
    name: 'Personal Companion',
    prompt: `Modify the following response to remove all instances of self-referential language.
    Only output the modified version of the response.`
  }
]

export const Popup = () => {
  const [apiKey, setApiKey] = useState('')
  const [anthropomorphize, setAnthropomorphize] = useState(2)
  const [enabled, setEnabled] = useState(false)
  const [status, setStatus] = useState({ message: '', type: '' })

  useEffect(() => {
    chrome.storage.sync.get({
      apiKey: '',
      anthropomorphize: 2,
      enabled: false
    }, (settings) => {
      setApiKey(settings.apiKey)
      setAnthropomorphize(settings.anthropomorphize)
      setEnabled(settings.enabled)
    })
  }, [])

  const showStatus = (message, type) => {
    setStatus({ message, type })
    setTimeout(() => setStatus({ message: '', type: '' }), 3000)
  }

  const handleSave = async () => {
    if (!apiKey.trim()) {
      showStatus('Please enter your Gemini API key', 'error')
      return
    }

    try {
      const systemPrompt = personalityLevels[anthropomorphize].prompt

      await chrome.storage.sync.set({
        apiKey: apiKey.trim(),
        anthropomorphize,
        systemPrompt,
        enabled
      })

      if (enabled) {
        await chrome.runtime.sendMessage({ action: 'injectContentScript' })
      }

      // Notify content script
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      if (tab && (tab.url.includes('chatgpt.com') || tab.url.includes('chat.openai.com'))) {
        chrome.tabs.sendMessage(tab.id, { action: 'updateSettings' }).catch(() => { })
      }

      showStatus('Settings saved successfully!', 'success')
    } catch (error) {
      showStatus('Error saving settings: ' + error.message, 'error')
    }
  }

  const handleToggle = async (newEnabled) => {
    setEnabled(newEnabled)

    try {
      const systemPrompt = personalityLevels[anthropomorphize].prompt
      await chrome.storage.sync.set({ enabled: newEnabled, systemPrompt })

      if (newEnabled) {
        await chrome.runtime.sendMessage({ action: 'injectContentScript' })
      }

      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      if (tab && (tab.url.includes('chatgpt.com') || tab.url.includes('chat.openai.com'))) {
        chrome.tabs.sendMessage(tab.id, {
          action: 'toggleExtension',
          enabled: newEnabled
        }).catch(() => { })
      }

      // Notify other tabs
      const allTabs = await chrome.tabs.query({
        url: ['https://chatgpt.com/*', 'https://chat.openai.com/*']
      })

      for (const chatTab of allTabs) {
        if (chatTab.id !== tab?.id) {
          chrome.tabs.sendMessage(chatTab.id, {
            action: 'toggleExtension',
            enabled: newEnabled
          }).catch(() => { })
        }
      }
    } catch (error) {
      console.error('Error toggling:', error)
    }
  }

  return (
    <main>
      <h3>Gemini Modifier</h3>

      <div className="toggle-container">
        <label htmlFor="enabled" style={{ marginBottom: 0 }}>Enable Extension</label>
        <label className="toggle-switch">
          <input
            type="checkbox"
            id="enabled"
            checked={enabled}
            onChange={(e) => handleToggle(e.target.checked)}
          />
          <span className="slider"></span>
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="apiKey">Gemini API Key</label>
        <input
          type="password"
          id="apiKey"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your Gemini API key"
        />
        <div className="info">
          Get your API key from{' '}
          <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noreferrer">
            Google AI Studio
          </a>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="anthropomorphize">Response Style</label>
        <div className="slider-container">
          <input
            type="range"
            id="anthropomorphize"
            min="0"
            max="4"
            step="1"
            value={anthropomorphize}
            onChange={(e) => setAnthropomorphize(parseInt(e.target.value))}
          />
          <div className="slider-labels">
            <span>Technical</span>
            <span>Balanced</span>
            <span>Personable</span>
          </div>
        </div>
        <div className="info">
          Current: {personalityLevels[anthropomorphize].name}
        </div>
      </div>

      <button onClick={handleSave}>Save Settings</button>

      {status.message && (
        <div className={`status ${status.type}`}>
          {status.message}
        </div>
      )}
    </main>
  )
}

export default Popup
