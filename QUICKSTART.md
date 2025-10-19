# Quick Start Guide

## Getting Started in 3 Steps

### 1. Install Dependencies
Run the setup script:
```bash
./setup.sh
```

Or install manually:
```bash
pip install -r requirements.txt
```

### 2. Configure API Key
1. Get your OpenAI API key from: https://platform.openai.com/api-keys
2. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
3. Edit `.env` and replace `your_api_key_here` with your actual API key:
   ```
   OPENAI_API_KEY=sk-proj-...
   ```

### 3. Run the Application
```bash
python3 main.py
```

## Testing Different Anthropomorphization Levels

Try asking the same question at different levels to see how the responses change:

### Example Question
"What is machine learning?"

### Expected Behavior

**Level 0 (Purely Functional):**
- No personal language
- Direct, factual answer
- No pleasantries

**Level 2 (Professional):**
- Polite but neutral
- Professional tone
- Brief acknowledgment

**Level 5 (Highly Personable):**
- Warm and engaging
- Uses conversational language
- Expresses enthusiasm

## Troubleshooting

### "OPENAI_API_KEY not found" error
- Make sure you created a `.env` file (copy from `.env.example`)
- Verify your API key is correctly set in the `.env` file
- Check that there are no extra spaces around the API key

### Import errors
- Run: `pip install -r requirements.txt`
- Make sure you're using Python 3.7 or higher

### TKinter not found
- On Ubuntu/Debian: `sudo apt-get install python3-tk`
- On Fedora: `sudo dnf install python3-tkinter`
- On macOS: Usually included with Python

### API Rate Limits
- If you hit rate limits, wait a moment before trying again
- Consider upgrading your OpenAI API plan for higher limits

## Tips for Best Results

1. **Clear Between Levels**: The app automatically clears conversation history when you change levels to ensure consistent behavior
2. **Observe Differences**: Try the same question at different levels to observe the deanthropomorphization effect
3. **Experiment**: Feel free to modify the system prompts in `config.py` to explore different styles

## Need Help?

- Check the main README.md for detailed documentation
- Review the code comments in `main.py` and `config.py`
- Visit OpenAI's documentation: https://platform.openai.com/docs
