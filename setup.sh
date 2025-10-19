#!/bin/bash

# Setup script for Deanthropomorphized Chatbot

echo "==================================="
echo "Deanthropomorphized Chatbot Setup"
echo "==================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed. Please install Python 3.7 or higher."
    exit 1
fi

echo "Python version:"
python3 --version
echo ""

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

if [ $? -ne 0 ]; then
    echo "Error: Failed to install dependencies."
    exit 1
fi

echo ""
echo "Dependencies installed successfully!"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo ""
    echo "⚠️  IMPORTANT: Please edit the .env file and add your OpenAI API key!"
    echo "   Run: nano .env (or use your preferred text editor)"
    echo ""
else
    echo ".env file already exists."
    echo ""
fi

echo "==================================="
echo "Setup complete!"
echo "==================================="
echo ""
echo "To run the application:"
echo "  python3 main.py"
echo ""
echo "Don't forget to set your OPENAI_API_KEY in the .env file!"
echo ""
