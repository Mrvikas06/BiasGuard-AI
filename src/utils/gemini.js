import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

/**
 * Analyze bias audit results using Gemini AI
 */
export async function analyzeWithGemini(applicant, result, biasData) {
    if (!API_KEY || API_KEY.trim() === '' || API_KEY === 'your_api_key_here') {
        return {
            success: false,
            text: '⚠️ **Gemini API Key Required**\n\nTo generate live AI fairness reports and mitigation recommendations:\n1. Obtain an API key from [Google AI Studio](https://aistudio.google.com/apikey)\n2. Set `VITE_GEMINI_API_KEY=your_key` in your `.env` file\n3. Restart the dev server (`npm run dev`)',
        };
    }

    const prompt = `You are BiasGuard AI, an expert AI fairness auditor. Analyze this bias audit result and provide actionable insights.

## Applicant Profile
- Name: ${applicant.name}
- Gender: ${applicant.gender}
- Location: ${applicant.location}
- Education: ${applicant.education}
- Experience: ${applicant.experience} years

## Audit Result
- Decision: ${result.decision}
- Total Score: ${result.totalScore}/100 (threshold: 55)
- Base Score: ${result.baseScore}
- Location Bias: +${result.locationBias} points
- Gender Bias: +${result.genderBias} points

## Bias Analysis
- Bias Score: ${biasData.biasScore}/100
- Severity: ${biasData.severity} (${biasData.label})
- Certified Fair: ${biasData.isCertified ? 'Yes' : 'No'}
- Issues Found: ${biasData.explanations.length}
${biasData.explanations.map(e => `  - [${e.impact.toUpperCase()}] ${e.text}`).join('\n')}

## Permutation Results
${biasData.permutations.map(p => `- ${p.gender}/${p.location}: Score ${p.score} → ${p.decision}`).join('\n')}

Provide your analysis in this exact format (use markdown):

### 🔍 Key Findings
Brief summary of what the bias audit revealed (2-3 bullet points).

### ⚠️ Risk Assessment  
Rate the overall risk and explain why (1-2 sentences).

### 💡 Recommendations
3 specific, actionable steps to reduce bias in this model.

### 📊 Fairness Score
Give a letter grade (A-F) with a one-line justification.

Keep it concise and professional. No more than 200 words total.`;

    try {
        const genResult = await model.generateContent(prompt);
        const response = await genResult.response;
        return { success: true, text: response.text() };
    } catch (error) {
        console.error('Gemini API error:', error);
        const message = error?.message || '';
        const shortMsg = message.includes('quota')
            ? 'API quota exceeded. Please try again in a few moments.'
            : message.includes('API_KEY') || message.includes('key')
                ? 'Invalid Gemini API key. Please check your VITE_GEMINI_API_KEY in .env.'
                : `AI analysis connection error: ${message.slice(0, 80) || 'Unable to connect'}.`;
        return { success: false, text: shortMsg };
    }
}
