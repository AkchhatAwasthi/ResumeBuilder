const GEMINI_API_KEY = 'AIzaSyDOdDds_7LpjvmtPGqcib5hyuoQn4GwH4w';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

export const getSkillsFromAI = async (jobRole: string): Promise<string[]> => {
  if (!jobRole.trim()) {
    throw new Error('Job role is required');
  }

  const prompt = `List the top 10 essential technical and soft skills for a ${jobRole} in 2025. Return only the skills separated by commas, no explanations or additional text.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    const skillsText = data.candidates[0]?.content?.parts[0]?.text || '';
    
    // Parse the skills from the response
    const skills = skillsText
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0)
      .slice(0, 10); // Ensure we don't get more than 10 skills

    return skills;
  } catch (error) {
    console.error('Error fetching skills from AI:', error);
    throw new Error('Failed to generate skills. Please try again.');
  }
};

export const generateSummaryFromAI = async (keyPoints: string): Promise<string> => {
  if (!keyPoints.trim()) {
    throw new Error('Key points are required');
  }

  const prompt = `Using the following key points, write a professional personal summary for a resume in 3-4 sentences. Make it compelling and highlight the person's strengths and achievements: ${keyPoints}`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    const summary = data.candidates[0]?.content?.parts[0]?.text || '';
    
    return summary.trim();
  } catch (error) {
    console.error('Error generating summary from AI:', error);
    throw new Error('Failed to generate summary. Please try again.');
  }
};