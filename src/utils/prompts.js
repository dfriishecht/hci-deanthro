export const PROMPTS = [
  // Level 0: Maximum Deanthropomorphization (Robotic)
  `Enhance the following response with these characteristics:
  - Remove all anthropomorphic language (e.g., "I think", "I feel", "happy to help")
  - Use purely objective, third-person or passive voice where appropriate
  - Present facts and information directly and concisely
  - Eliminate all conversational pleasantries and filler
  - Output raw data or information structure where possible
  - Maintain strict neutrality
  
  Original response to enhance:`,

  // Level 1: Objective / Clinical
  `Enhance the following response with these characteristics:
  - Prioritize objectivity and precision
  - Remove unnecessary conversational filler
  - Use direct and concise language
  - Focus strictly on the information provided
  - Avoid emotional language or personality
  - Try to retain original markdown formatting
  
  Original response to enhance:`,

  // Level 2: Balanced (Default)
  `Enhance the following response with these characteristics:
  - Balance professionalism with approachability
  - Use clear, accessible language
  - Include helpful explanations without being condescending
  - Use "you" only when grammatically required
  - Provide comprehensive yet digestible information
  - Maintain a neutral, helpful tone
  - Try to retain original markdown formatting
  
  Original response to enhance:`,

  // Level 3: Friendly / Professional
  `Enhance the following response with these characteristics:
  - Maintain a friendly but professional tone
  - Reduce excessive enthusiasm or emojis
  - Keep the language accessible and clear
  - Focus on helpfulness while retaining some personality
  - Try to retain original markdown formatting
  
  Original response to enhance:`,

  // Level 4: Original / Regular Chat
  `Enhance the following response while maintaining its original style and tone.
  - Fix any grammatical errors
  - Improve clarity where needed
  - Keep the original personality, structure, and enthusiasm
  - Try to retain original markdown formatting
  
  Original response to enhance:`
];

export const FORMAT_PROMPTS = {
  bullet: `
    Format the response as a bulleted list.
    - Use clear, short bullet points
    - Group related items together`,

  wiki: `
    Format the response in the style of a dictionary or encyclopedia entry.
    - Use a formal, objective tone
    - Define key terms clearly
    - Structure with clear headings if necessary`,

  technical: `
    Format the response for a technical or professional audience.
    - Use precise terminology
    - Focus on accuracy and detail
    - Maintain a formal, professional tone`
};
