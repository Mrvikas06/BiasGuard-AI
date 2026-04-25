import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyDfa6uO6wVaupelQxfur0a3S4cYMxJsyyc';
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

/**
 * Analyze bias audit results using Gemini AI
 */
export async function analyzeWithGemini(applicant, result, biasData) {
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
        const shortMsg = error.message?.includes('quota')
            ? 'API quota exceeded. Try again in a minute.'
            : error.message?.includes('API_KEY')
                ? 'Invalid API key. Check your Gemini API key.'
                : `Connection error: ${error.message?.slice(0, 80) || 'Unknown'}`;
        return { success: false, text: shortMsg };
    }
}
