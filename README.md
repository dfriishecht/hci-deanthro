# Deanthropomorphized Chatbot

A Python application that explores deanthropomorphization in AI chatbot conversations. This project features a TKinter GUI with an interactive slider that controls the level of anthropomorphization in chatbot responses using the OpenAI ChatGPT API.

## Features

- **Interactive GUI**: Clean TKinter interface for chatting with the AI
- **Anthropomorphization Control**: Slider with 6 levels (0-5) to adjust chatbot personality
- **Real-time Adjustment**: Change the anthropomorphization level at any time during conversations
- **ChatGPT Integration**: Leverages OpenAI's ChatGPT API for intelligent responses
- **Conversation Management**: Clear chat history and track conversations

## Anthropomorphization Levels

- **Level 0 - Purely Functional**: Factual, direct answers without any conversational elements
- **Level 1 - Minimal Social**: Clear, direct answers with minimal conversational elements
- **Level 2 - Professional**: Neutral, professional tone with basic courtesy
- **Level 3 - Friendly**: Warm, approachable tone while maintaining professionalism
- **Level 4 - Conversational**: Friendly and personable with natural engagement
- **Level 5 - Highly Personable**: Engaging personality with empathy and emotional expression

## Requirements

- Python 3.7+
- OpenAI API key
- TKinter (usually included with Python)

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd hci-deanthro
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up your OpenAI API key**:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and add your OpenAI API key:
     ```
     OPENAI_API_KEY=your_actual_api_key_here
     ```

## Usage

Run the application:
```bash
python main.py
```

### Using the Application

1. **Adjust the Slider**: Use the slider to select your desired anthropomorphization level (0-5)
2. **Type Your Message**: Enter your message in the text field at the bottom
3. **Send**: Press Enter or click the "Send" button
4. **View Response**: The chatbot will respond according to the selected anthropomorphization level
5. **Clear Chat**: Click "Clear Chat" to reset the conversation

### Tips

- Changing the anthropomorphization level will clear the conversation history to ensure consistent behavior
- Each level uses a different system prompt that guides the AI's response style
- Experiment with different levels to observe how the chatbot's personality changes

## Project Structure

```
hci-deanthro/
├── main.py              # Main application with TKinter GUI
├── config.py            # Configuration and system prompts
├── requirements.txt     # Python dependencies
├── .env.example        # Example environment file
├── .env                # Your API key (not tracked in git)
├── .gitignore          # Git ignore file
├── LICENSE             # License file
└── README.md           # This file
```

## Configuration

You can customize the chatbot behavior by editing `config.py`:

- **SYSTEM_PROMPTS**: Modify the system prompts for each anthropomorphization level
- **SLIDER_LABELS**: Change the labels displayed for each level
- **MODEL**: Change the OpenAI model (default: gpt-3.5-turbo)
- **MAX_TOKENS**: Adjust maximum response length
- **TEMPERATURE**: Modify response creativity (0-1)

## License

See LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
