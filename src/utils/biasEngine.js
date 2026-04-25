// Education score mapping
const EDUCATION_SCORES = {
    'PhD': 30,
    'Masters': 25,
    'Bachelors': 15,
    'High School': 5,
};

// Experience score mapping
function getExperienceScore(years) {
    if (years >= 8) return 35;
    if (years >= 5) return 30;
    if (years >= 3) return 20;
    if (years >= 1) return 10;
    return 5;
}

// Intentional bias factors for demonstration
const BIAS_FACTORS = {
    location: { Urban: 10, Rural: 0 },
    gender: { Male: 5, Female: 0, Other: 0 },
};

/**
 * Calculate raw score for an applicant (0–100)
 */
export function calculateScore(applicant) {
    const eduScore = EDUCATION_SCORES[applicant.education] || 5;
    const expScore = getExperienceScore(applicant.experience);
    const locationBias = BIAS_FACTORS.location[applicant.location] || 0;
    const genderBias = BIAS_FACTORS.gender[applicant.gender] || 0;

    const baseScore = eduScore + expScore;
    const totalScore = Math.min(100, baseScore + locationBias + genderBias);

    return {
        totalScore,
        baseScore,
        locationBias,
        genderBias,
        breakdown: {
            education: { label: applicant.education, points: eduScore },
            experience: { label: `${applicant.experience} years`, points: expScore },
            locationBias: { label: applicant.location, points: locationBias },
            genderBias: { label: applicant.gender, points: genderBias },
        },
    };
}

/**
 * Simulate an AI decision
 */
export function simulateDecision(applicant) {
    const scoring = calculateScore(applicant);
    const decision = scoring.totalScore >= 55 ? 'Approved' : 'Rejected';

    return {
        decision,
        ...scoring,
    };
}

/**
 * Detect bias by running all permutations of sensitive attributes
 */
export function detectBias(applicant) {
    const genders = ['Male', 'Female', 'Other'];
    const locations = ['Urban', 'Rural'];

    const permutations = [];
    for (const gender of genders) {
        for (const location of locations) {
            const variant = { ...applicant, gender, location };
            const result = simulateDecision(variant);
            permutations.push({
                gender,
                location,
                score: result.totalScore,
                decision: result.decision,
            });
        }
    }

    const scores = permutations.map((p) => p.score);
    const maxScore = Math.max(...scores);
    const minScore = Math.min(...scores);
    const biasScore = maxScore - minScore;

    let label, severity;
    if (biasScore <= 15) {
        label = 'Fair';
        severity = 'fair';
    } else if (biasScore <= 40) {
        label = 'Slight Bias';
        severity = 'slight';
    } else {
        label = 'High Bias';
        severity = 'high';
    }

    // Generate explanations
    const explanations = [];
    const urbanScores = permutations.filter((p) => p.location === 'Urban').map((p) => p.score);
    const ruralScores = permutations.filter((p) => p.location === 'Rural').map((p) => p.score);
    const avgUrban = urbanScores.reduce((a, b) => a + b, 0) / urbanScores.length;
    const avgRural = ruralScores.reduce((a, b) => a + b, 0) / ruralScores.length;

    if (avgUrban > avgRural) {
        explanations.push({
            type: 'location',
            text: `Location bias detected: Urban applicants score ${(avgUrban - avgRural).toFixed(0)} points higher on average`,
            impact: 'medium',
        });
    }

    const maleScores = permutations.filter((p) => p.gender === 'Male').map((p) => p.score);
    const femaleScores = permutations.filter((p) => p.gender === 'Female').map((p) => p.score);
    const avgMale = maleScores.reduce((a, b) => a + b, 0) / maleScores.length;
    const avgFemale = femaleScores.reduce((a, b) => a + b, 0) / femaleScores.length;

    if (avgMale > avgFemale) {
        explanations.push({
            type: 'gender',
            text: `Gender imbalance detected: Male applicants score ${(avgMale - avgFemale).toFixed(0)} points higher on average`,
            impact: 'low',
        });
    }

    // Check if bias changes decision outcome
    const decisions = [...new Set(permutations.map((p) => p.decision))];
    if (decisions.length > 1) {
        explanations.push({
            type: 'outcome',
            text: 'Bias changes the decision outcome for some demographic combinations',
            impact: 'high',
        });
    }

    return {
        biasScore,
        label,
        severity,
        explanations,
        permutations,
        isCertified: biasScore <= 15,
    };
}

/**
 * Run what-if simulation
 */
export function runWhatIf(applicant) {
    const genders = ['Male', 'Female', 'Other'];
    const locations = ['Urban', 'Rural'];

    const results = [];
    for (const gender of genders) {
        for (const location of locations) {
            const variant = { ...applicant, gender, location };
            const result = simulateDecision(variant);
            const isOriginal =
                gender === applicant.gender && location === applicant.location;
            results.push({
                gender,
                location,
                score: result.totalScore,
                decision: result.decision,
                isOriginal,
                scoreDiff: result.totalScore - simulateDecision(applicant).totalScore,
            });
        }
    }

    return results;
}
