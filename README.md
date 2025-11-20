# DeAnthro AI

## POV
Frequent college student chatbot users need clear boundaries and transparency in chatbot interactions so that they don’t assign human emotions or authority to AI systems.

## Mission Statement
We want to create both a way to highlight and visualize the anthropomorphic qualities about AI but also a way to remove it from everyday use.

### Use Cases
- **Professional Use**: Users who simply prefer more objective, technical responses without the anthropomorphic language
- **Personal Preference**: Users who find overly friendly AI responses distracting or prefer more neutral, information focused interactions
- **Academic Research**: Could be used in research related work to determine how anthropomorphic language in AI chatbots could affect human computer interaction

### Basic Usage

1. **Enable the Extension**
   - Click the DeAnthro AI icon in your Chrome toolbar
   - Toggle "Enable Extension" to ON

2. **Configure Sentiment Level (Medium task)**
   - Use the "Sentiment Level" slider to control how much anthropomorphic language is in chatgpt's response, where "Standard" is the normal chatgpt output and "None" being without any anthropomorphic language.

3. **Set Output Format (Medium Task)**
   - Choose from:
     - **Bullet Point List**: Formats responses as bullet points
     - **Dictionary**: Formats responses in dictionary style
     - **Technical/Professional**: Formats responses in a technical style

4. **Use ChatGPT (Simple Task)**
   - Navigate to https://chatgpt.com
   - Start a conversation with ChatGPT
   - The extension will automatically detect responses and format to the selected settings

### Settings Pages

- **Main Settings**: Enable/disable extension, adjust sentiment level, set output format
- **Extra Settings**: Configure Gemini API key, set emotive response limits


## Installation Requirements

### Prerequisites
- **Node.js**: Version 14.18.0 or higher
- **npm**: Comes with Node.js
- **Google Gemini API Key**: Required for the extension to function, your key can be found here: https://makersuite.google.com/app/apikey)

### Installation Steps

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/dfriishecht/hci-deanthro
   cd hci-deanthro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the extension**
   ```bash
   npm run build
   ```
   This creates a `build/` directory containing the extension files

4. **Load the extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" 
   - Click "Load unpacked"
   - Select the `build/` directory from this folder

5. **Configure the extension**
   - Click the DeAnthro AI icon in your Chrome toolbar
   - Navigate to "Extra Settings"
   - Enter your Google Gemini API key
   - Return to "Main Settings" and ensure the extension is enabled

## Limitations

1. **API Dependency**: The extension requires a valid Google Gemini API key and active internet connection.

2. **Only Works on ChatGPT**: The extension only functions on `chat.openai.com` and `chatgpt.com` domains.

3. **No History Modification**: The extension only modifies new responses. It does not modify existing conversation history.

4. **Browser Compatibility**: Currently only tested and designed for Google Chrome. May not work in other browsers without modifications.
