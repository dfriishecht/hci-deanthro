"""
Main application for deanthropomorphizing chatbot conversations.
Provides a TKinter GUI with a slider to control the level of anthropomorphization
in chatbot responses using the OpenAI ChatGPT API.
"""

import tkinter as tk
from tkinter import ttk, scrolledtext, messagebox
import os
from dotenv import load_dotenv
from openai import OpenAI
import config

# Load environment variables
load_dotenv()

class ChatbotGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Deanthropomorphized Chatbot")
        self.root.geometry("800x700")
        self.root.resizable(True, True)
        
        # Initialize OpenAI client
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            messagebox.showerror("Error", "OPENAI_API_KEY not found in environment variables.\n"
                                         "Please create a .env file with your API key.")
            self.client = None
        else:
            self.client = OpenAI(api_key=api_key)
        
        # Current anthropomorphization level
        self.current_level = 2  # Start at professional level
        
        # Conversation history
        self.conversation_history = []
        
        # Setup GUI
        self.setup_gui()
        
    def setup_gui(self):
        """Setup the GUI elements"""
        # Main container
        main_frame = ttk.Frame(self.root, padding="10")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # Configure grid weights
        self.root.columnconfigure(0, weight=1)
        self.root.rowconfigure(0, weight=1)
        main_frame.columnconfigure(0, weight=1)
        main_frame.rowconfigure(2, weight=1)
        
        # Title
        title_label = ttk.Label(main_frame, text="Deanthropomorphized Chatbot", 
                                font=("Arial", 16, "bold"))
        title_label.grid(row=0, column=0, pady=(0, 10))
        
        # Slider section
        slider_frame = ttk.LabelFrame(main_frame, text="Anthropomorphization Level", 
                                      padding="10")
        slider_frame.grid(row=1, column=0, sticky=(tk.W, tk.E), pady=(0, 10))
        slider_frame.columnconfigure(0, weight=1)
        
        # Slider
        self.slider = tk.Scale(slider_frame, from_=0, to=5, orient=tk.HORIZONTAL,
                              command=self.on_slider_change, length=400,
                              tickinterval=1, resolution=1)
        self.slider.set(self.current_level)
        self.slider.grid(row=0, column=0, sticky=(tk.W, tk.E), padx=5)
        
        # Slider label
        self.slider_label = ttk.Label(slider_frame, 
                                      text=f"Current Level: {config.SLIDER_LABELS[self.current_level]}",
                                      font=("Arial", 10, "italic"))
        self.slider_label.grid(row=1, column=0, pady=(5, 0))
        
        # Chat display
        chat_frame = ttk.LabelFrame(main_frame, text="Conversation", padding="10")
        chat_frame.grid(row=2, column=0, sticky=(tk.W, tk.E, tk.N, tk.S), pady=(0, 10))
        chat_frame.columnconfigure(0, weight=1)
        chat_frame.rowconfigure(0, weight=1)
        
        # Chat text area
        self.chat_display = scrolledtext.ScrolledText(chat_frame, wrap=tk.WORD,
                                                       width=70, height=20,
                                                       font=("Arial", 10))
        self.chat_display.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        self.chat_display.config(state=tk.DISABLED)
        
        # Configure tags for styling
        self.chat_display.tag_config("user", foreground="#0066cc", font=("Arial", 10, "bold"))
        self.chat_display.tag_config("bot", foreground="#009900", font=("Arial", 10, "bold"))
        self.chat_display.tag_config("system", foreground="#666666", font=("Arial", 9, "italic"))
        
        # Input section
        input_frame = ttk.Frame(main_frame)
        input_frame.grid(row=3, column=0, sticky=(tk.W, tk.E))
        input_frame.columnconfigure(0, weight=1)
        
        # User input
        self.user_input = ttk.Entry(input_frame, font=("Arial", 10))
        self.user_input.grid(row=0, column=0, sticky=(tk.W, tk.E), padx=(0, 5))
        self.user_input.bind("<Return>", lambda e: self.send_message())
        
        # Send button
        self.send_button = ttk.Button(input_frame, text="Send", command=self.send_message)
        self.send_button.grid(row=0, column=1)
        
        # Clear button
        self.clear_button = ttk.Button(input_frame, text="Clear Chat", 
                                       command=self.clear_chat)
        self.clear_button.grid(row=0, column=2, padx=(5, 0))
        
        # Focus on input
        self.user_input.focus()
        
        # Display initial message
        self.display_system_message(f"Chatbot initialized at level {self.current_level}: "
                                   f"{config.SLIDER_LABELS[self.current_level]}")
    
    def on_slider_change(self, value):
        """Handle slider value change"""
        new_level = int(value)
        if new_level != self.current_level:
            self.current_level = new_level
            self.slider_label.config(text=f"Current Level: {config.SLIDER_LABELS[self.current_level]}")
            
            # Reset conversation history when level changes
            self.conversation_history = []
            self.display_system_message(f"Anthropomorphization level changed to {self.current_level}: "
                                       f"{config.SLIDER_LABELS[self.current_level]}")
            self.display_system_message("Conversation history cleared.")
    
    def display_message(self, message, sender="user"):
        """Display a message in the chat window"""
        self.chat_display.config(state=tk.NORMAL)
        
        if sender == "user":
            self.chat_display.insert(tk.END, "You: ", "user")
            self.chat_display.insert(tk.END, f"{message}\n\n")
        elif sender == "bot":
            self.chat_display.insert(tk.END, "Assistant: ", "bot")
            self.chat_display.insert(tk.END, f"{message}\n\n")
        
        self.chat_display.see(tk.END)
        self.chat_display.config(state=tk.DISABLED)
    
    def display_system_message(self, message):
        """Display a system message in the chat window"""
        self.chat_display.config(state=tk.NORMAL)
        self.chat_display.insert(tk.END, f"[System: {message}]\n\n", "system")
        self.chat_display.see(tk.END)
        self.chat_display.config(state=tk.DISABLED)
    
    def send_message(self):
        """Send user message and get chatbot response"""
        if not self.client:
            messagebox.showerror("Error", "OpenAI client not initialized. Please check your API key.")
            return
        
        user_message = self.user_input.get().strip()
        if not user_message:
            return
        
        # Display user message
        self.display_message(user_message, "user")
        self.user_input.delete(0, tk.END)
        
        # Disable send button while processing
        self.send_button.config(state=tk.DISABLED)
        self.root.update()
        
        try:
            # Add user message to conversation history
            self.conversation_history.append({
                "role": "user",
                "content": user_message
            })
            
            # Prepare messages for API call
            messages = [
                {"role": "system", "content": config.SYSTEM_PROMPTS[self.current_level]}
            ] + self.conversation_history
            
            # Call OpenAI API
            response = self.client.chat.completions.create(
                model=config.MODEL,
                messages=messages,
                max_tokens=config.MAX_TOKENS,
                temperature=config.TEMPERATURE
            )
            
            # Get assistant response
            assistant_message = response.choices[0].message.content
            
            # Add assistant message to conversation history
            self.conversation_history.append({
                "role": "assistant",
                "content": assistant_message
            })
            
            # Display assistant response
            self.display_message(assistant_message, "bot")
            
        except Exception as e:
            messagebox.showerror("Error", f"An error occurred: {str(e)}")
            # Remove the last user message from history if request failed
            if self.conversation_history and self.conversation_history[-1]["role"] == "user":
                self.conversation_history.pop()
        
        finally:
            # Re-enable send button
            self.send_button.config(state=tk.NORMAL)
            self.user_input.focus()
    
    def clear_chat(self):
        """Clear the chat display and conversation history"""
        self.conversation_history = []
        self.chat_display.config(state=tk.NORMAL)
        self.chat_display.delete(1.0, tk.END)
        self.chat_display.config(state=tk.DISABLED)
        self.display_system_message(f"Chat cleared. Current level: {self.current_level} - "
                                   f"{config.SLIDER_LABELS[self.current_level]}")


def main():
    """Main function to run the application"""
    root = tk.Tk()
    app = ChatbotGUI(root)
    root.mainloop()


if __name__ == "__main__":
    main()
