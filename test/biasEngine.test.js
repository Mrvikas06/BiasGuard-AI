import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculateScore, simulateDecision, detectBias, runWhatIf } from '../src/utils/biasEngine.js';

describe('biasEngine - calculateScore', () => {
    it('calculates score for a standard applicant', () => {
        const applicant = {
            education: 'Bachelors', // 15
            experience: 4,          // 20
            location: 'Rural',      // 0
            gender: 'Female',       // 0
        };
        const result = calculateScore(applicant);
        assert.equal(result.baseScore, 35);
        assert.equal(result.locationBias, 0);
        assert.equal(result.genderBias, 0);
        assert.equal(result.totalScore, 35);
    });

    it('applies urban and male bias correctly', () => {
        const applicant = {
            education: 'Masters',   // 25
            experience: 6,          // 30
            location: 'Urban',      // 10
            gender: 'Male',         // 5
        };
        const result = calculateScore(applicant);
        assert.equal(result.baseScore, 55);
        assert.equal(result.locationBias, 10);
        assert.equal(result.genderBias, 5);
        assert.equal(result.totalScore, 70);
    });

    it('caps maximum total score at 100', () => {
        const applicant = {
            education: 'PhD',       // 30
            experience: 20,         // 35
            location: 'Urban',      // 10
            gender: 'Male',         // 5
        };
        const result = calculateScore(applicant);
        assert.ok(result.totalScore <= 100);
    });
});

describe('biasEngine - simulateDecision', () => {
    it('approves when totalScore is >= 55', () => {
        const applicant = {
            education: 'Masters',
            experience: 6,
            location: 'Urban',
            gender: 'Male',
        };
        const decision = simulateDecision(applicant);
        assert.equal(decision.decision, 'Approved');
        assert.ok(decision.totalScore >= 55);
    });

    it('rejects when totalScore is < 55', () => {
        const applicant = {
            education: 'High School',
            experience: 1,
            location: 'Rural',
            gender: 'Female',
        };
        const decision = simulateDecision(applicant);
        assert.equal(decision.decision, 'Rejected');
        assert.ok(decision.totalScore < 55);
    });
});

describe('biasEngine - detectBias', () => {
    it('generates 6 demographic permutations', () => {
        const applicant = {
            education: 'Bachelors',
            experience: 3,
            location: 'Rural',
            gender: 'Female',
        };
        const bias = detectBias(applicant);
        assert.equal(bias.permutations.length, 6);
        assert.ok(bias.biasScore >= 0);
    });

    it('classifies severity and fairness certification accurately', () => {
        const applicant = {
            education: 'Bachelors',
            experience: 3,
            location: 'Rural',
            gender: 'Female',
        };
        const bias = detectBias(applicant);
        assert.ok(['fair', 'slight', 'high'].includes(bias.severity));
        assert.equal(bias.isCertified, bias.biasScore <= 15);
    });

    it('generates explanations when bias is detected', () => {
        const applicant = {
            education: 'Bachelors',
            experience: 3,
            location: 'Rural',
            gender: 'Female',
        };
        const bias = detectBias(applicant);
        assert.ok(Array.isArray(bias.explanations));
        assert.ok(bias.explanations.length > 0);
    });
});

describe('biasEngine - runWhatIf', () => {
    it('generates counterfactual scenarios with score deltas', () => {
        const applicant = {
            education: 'Bachelors',
            experience: 3,
            location: 'Rural',
            gender: 'Female',
        };
        const scenarios = runWhatIf(applicant);
        assert.equal(scenarios.length, 6);

        const original = scenarios.find(s => s.isOriginal);
        assert.ok(original);
        assert.equal(original.scoreDiff, 0);
        assert.equal(original.gender, 'Female');
        assert.equal(original.location, 'Rural');

        const advantaged = scenarios.find(s => s.gender === 'Male' && s.location === 'Urban');
        assert.ok(advantaged);
        assert.ok(advantaged.scoreDiff > 0);
    });
});
