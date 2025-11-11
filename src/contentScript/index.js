console.info("ChatGPT Content Script is running");

// Function to find ChatGPT assistant messages using data-turn="assistant" attribute
function findChatGPTMessages() {
  const assistantBlocks = document.querySelectorAll('[data-turn="assistant"]');
  
  const messages = Array.from(assistantBlocks).map((block, index) => {
    const text = block.innerText.trim();
    return {
      text: text,
      element: block,
      timestamp: Date.now(),
      index: index,
    };
  }).filter(msg => msg.text && msg.text.length > 10);

  return messages;
}

// Function to get the most recent ChatGPT assistant response
function getMostRecentResponse() {
  const messages = findChatGPTMessages();

  if (messages.length === 0) {
    return null;
  }

  const mostRecent = messages[messages.length - 1];
  return {
    text: mostRecent.text,
    timestamp: mostRecent.timestamp,
  };
}

// Function to send response to side panel
function sendResponseToSidePanel(response) {
  if (!response || !response.text) return;

  // Store in chrome.storage for persistence
  chrome.storage.local.set({
    lastChatGPTResponse: response.text,
    lastResponseTimestamp: response.timestamp,
  });

  // Send message to background script, which can forward to side panel
  chrome.runtime.sendMessage({
    type: "CHATGPT_RESPONSE",
    text: response.text,
    timestamp: response.timestamp,
  });

  console.log(
    "ChatGPT assistant response detected:",
    response.text.substring(0, 100) + "...",
  );
}

// Monitor for new ChatGPT responses using MutationObserver
let lastResponseText = "";
let observer = null;

function startMonitoring() {
  // Check if we're on ChatGPT
  if (
    !window.location.hostname.includes("chat.openai.com") &&
    !window.location.hostname.includes("chatgpt.com")
  ) {
    console.log("Not on ChatGPT website, monitoring disabled");
    return;
  }

  console.log("Starting to monitor ChatGPT assistant responses...");

  // Initial check
  const initialResponse = getMostRecentResponse();
  if (initialResponse) {
    lastResponseText = initialResponse.text;
    sendResponseToSidePanel(initialResponse);
  }

  // Set up MutationObserver to watch for DOM changes
  observer = new MutationObserver((mutations) => {
    // Debounce: only check every 500ms
    clearTimeout(window.chatgptCheckTimeout);
    window.chatgptCheckTimeout = setTimeout(() => {
      const response = getMostRecentResponse();
      if (
        response &&
        response.text !== lastResponseText &&
        response.text.length > 10
      ) {
        lastResponseText = response.text;
        sendResponseToSidePanel(response);
      }
    }, 500);
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  // Also check periodically in case MutationObserver misses something
  setInterval(() => {
    const response = getMostRecentResponse();
    if (
      response &&
      response.text !== lastResponseText &&
      response.text.length > 10
    ) {
      lastResponseText = response.text;
      sendResponseToSidePanel(response);
    }
  }, 2000);
}

// Start monitoring when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startMonitoring);
} else {
  startMonitoring();
}
