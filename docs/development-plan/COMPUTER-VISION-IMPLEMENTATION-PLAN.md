# 🎥 Computer Vision Implementation Plan

> **Created:** February 8, 2026
> **Status:** Planned - Not Started
> **Priority:** High
> **Timeline:** Q3 2026 (July-September)
> **Estimated Time:** 3 hours implementation + 2 hours testing + 1 hour refinement

---

## 📋 Overview

This document outlines the complete implementation plan for integrating real Computer Vision APIs into ASCEND for automated workout form evaluation, pose estimation, and rep counting.

### Current State
- ✅ Mock CV implementation exists in `lib/ai/computer-vision.ts`
- ✅ CV integration point in `lib/ai/judge.ts` (Line 62-78)
- ✅ `cv_analysis` field in `JudgeVerdict` schema
- ✅ Mock traces being sent to Opik (`cv_photo_analysis`, `cv_video_analysis`)
- ❌ All CV calls return mock data (no real API integration)

### Target State
- ✅ Real CV API integration (Clarifai for photos, Replicate for videos)
- ✅ Photo analysis with exercise detection and form scoring
- ✅ Video analysis with pose estimation and rep counting
- ✅ Safety issue detection from media
- ✅ Comprehensive Opik tracing for all CV operations
- ✅ Fallback to mock on API failures
- ✅ Rate limiting and error handling

---

## 🎯 Implementation Phases

### Phase 1: Photo Analysis (45 min)

#### 1.1 Setup Clarifai Integration

**Prerequisites:**
- Get Clarifai API key from https://www.clarifai.com/
- Add to `.env.local`: `CLARIFAI_API_KEY=your_key_here`
- Install package: `npm install @clarifai/nodejs`

**Implementation Steps:**

1. **Create Real Photo Analysis Function**
   - File: `lib/ai/computer-vision-photo.ts` (NEW)
   - Use Clarifai's `general-v1.3` model for image classification
   - Extract exercise concepts from detected labels
   - Calculate form score based on concept confidence

2. **Implement Safety Detection**
   - Detect issues from concepts (injury, poor form, incorrect technique)
   - Return array of safety issue strings
   - Filter by confidence threshold (>0.6)

3. **Generate Contextual Feedback**
   - Form score ranges:
     - 0.85+: "Excellent form! Your technique looks solid."
     - 0.75+: "Great form! Good technique and controlled movements."
     - 0.65+: "Good form overall. Focus on maintaining consistency."
     - 0.55+: "Fair form. Some areas need improvement."
     - Below 0.55: "Form needs work. Consider using lower weights."

4. **Opik Tracing**
   - Trace name: `cv_photo_analysis_real`
   - Input: image URL, provider (clarifai), model name
   - Output: exercise type, form score, safety issues, confidence
   - Tags: `cv`, `photo_analysis`, `form_evaluation`, `clarifai`, `real_api`

#### 1.2 Error Handling

**Fallback Strategy:**
- Catch all API errors
- Log to Opik with error details
- Fallback to mock analysis: `analyzeWorkoutPhotoMock(imageUrl)`
- Continue execution (don't break judge flow)

**Error Types to Handle:**
- Invalid API key (401)
- Rate limit exceeded (429)
- Invalid URL format
- API timeout (>10s)
- Malformed response

#### 1.3 Code Example

```typescript
// lib/ai/computer-vision-photo.ts
import { Clarifai } from '@clarifai/nodejs';
import { sendTraceToOpik } from './opik-helper';

const clarifaiClient = new Clarifai({
  apiKey: process.env.CLARIFAI_API_KEY,
});

export interface FormAnalysis {
  exerciseType: string;
  formScore: number; // 0.0 - 1.0
  techniqueScore: number; // 0.0 - 1.0
  rangeOfMotion: number; // 0.0 - 1.0
  safetyIssues: string[];
  repCount: number | null;
  confidence: number; // 0.0 - 1.0
  feedback: string;
}

export async function analyzeWorkoutPhotoReal(imageUrl: string): Promise<FormAnalysis> {
  console.log('[CV Real] Analyzing workout photo:', imageUrl);

  try {
    // Validate input
    if (!imageUrl || !isValidUrl(imageUrl)) {
      throw new Error('Invalid image URL');
    }
    if (!process.env.CLARIFAI_API_KEY) {
      throw new Error('CLARIFAI_API_KEY not set');
    }

    // Call Clarifai API
    const response = await clarifaiClient.models.predict({
      model: 'general-v1.3',
      inputs: [{ data: { url: imageUrl } }],
    });

    console.log('[CV Real] Clarifai request successful');

    // Extract exercise concepts
    const concepts = response[0]?.data?.concepts || [];
    const exerciseConcepts = concepts.filter((c: any) =>
      ['pushup', 'squat', 'plank', 'deadlift', 'lunge', 'burpee', 'jumping jack'].some(e =>
        c.name.toLowerCase().includes(e)
      )
    );

    const exerciseType = exerciseConcepts[0]?.name || 'unknown';
    const confidence = exerciseConcepts[0]?.value || 0.5;

    console.log('[CV Real] Exercise detected:', exerciseType, 'Confidence:', confidence);

    // Calculate scores
    const formScore = Math.min(0.95, confidence + 0.2);
    const techniqueScore = Math.min(0.9, confidence + 0.3);
    const rangeOfMotion = Math.min(0.85, confidence + 0.25);

    // Detect safety issues
    const safetyIssues = detectSafetyIssuesFromConcepts(concepts);

    // Generate feedback
    const feedback = generatePhotoFeedback(formScore, techniqueScore, safetyIssues);

    const analysis: FormAnalysis = {
      exerciseType,
      formScore,
      techniqueScore,
      rangeOfMotion,
      safetyIssues,
      repCount: null,
      confidence,
      feedback,
    };

    console.log('[CV Real] Photo analysis complete:', analysis);

    // Send Opik trace
    await sendTraceToOpik('cv_photo_analysis_real', {
      startTime: Date.now() - 1000,
      input: {
        image_url: imageUrl,
        analysis_type: 'form_evaluation',
        cv_provider: 'clarifai',
        model: 'general-v1.3',
        confidence_threshold: 0.7,
        timestamp: new Date().toISOString(),
      },
      output: {
        exercise_type: exerciseType,
        form_score: formScore,
        technique_score: techniqueScore,
        range_of_motion: rangeOfMotion,
        safety_issues_count: safetyIssues.length,
        confidence: confidence,
        feedback_preview: feedback.substring(0, 100),
      },
      tags: ['cv', 'photo_analysis', 'form_evaluation', 'clarifai', 'real_api'],
    });

    return analysis;

  } catch (error: any) {
    console.error('[CV Real] Photo analysis failed:', error);

    // Log error to Opik
    await sendTraceToOpik('cv_photo_analysis_failed', {
      startTime: Date.now() - 1000,
      input: {
        image_url: imageUrl,
        provider: 'clarifai',
        error_message: error.message,
        error_code: error.code,
      },
      output: {
        status: 'failed',
        fallback_to_mock: true,
      },
      tags: ['cv', 'error', 'photo_analysis', 'clarifai'],
    });

    // Fallback to mock
    return analyzeWorkoutPhotoMock(imageUrl);
  }
}

function detectSafetyIssuesFromConcepts(concepts: any[]): string[] {
  const issues: string[] = [];

  concepts.forEach((concept: any) => {
    const name = concept.name.toLowerCase();
    const value = concept.value;

    if (name.includes('injury') && value > 0.5) {
      issues.push('Possible injury detected - seek medical advice');
    }
    if (name.includes('poor form') && value > 0.6) {
      issues.push('Poor form detected - review technique');
    }
    if (name.includes('incorrect') && value > 0.7) {
      issues.push('Incorrect technique - form needs improvement');
    }
    if (name.includes('danger') && value > 0.6) {
      issues.push('Dangerous position detected - stop exercise');
    }
  });

  return issues;
}

function generatePhotoFeedback(
  formScore: number,
  techniqueScore: number,
  safetyIssues: string[]
): string {
  if (safetyIssues.length > 0) {
    return `⚠️ ${safetyIssues.join('. ')} Please correct before continuing.`;
  }

  const avgScore = (formScore + techniqueScore) / 2;

  if (avgScore >= 0.85) {
    return "Excellent form! Your technique looks solid. Keep up the great work!";
  }
  if (avgScore >= 0.75) {
    return "Great form! Good technique and controlled movements.";
  }
  if (avgScore >= 0.65) {
    return "Good form overall. Focus on maintaining consistency.";
  }
  if (avgScore >= 0.55) {
    return "Fair form. Some areas need improvement - review technique.";
  }

  return "Form needs work. Consider using lower weights and focusing on proper technique.";
}

function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
```

---

### Phase 2: Video Analysis (60 min)

#### 2.1 Setup Replicate Integration

**Prerequisites:**
- Get Replicate API token from https://replicate.com/
- Add to `.env.local`: `REPLICATE_API_TOKEN=your_token_here`
- Install package: `npm install replicate`

**Implementation Steps:**

1. **Create Real Video Analysis Function**
   - File: `lib/ai/computer-vision-video.ts` (NEW)
   - Use Replicate's `microsoft/pose-detection` model
   - Extract pose keypoints from video frames
   - Count reps based on movement patterns

2. **Implement Rep Counting Algorithm**
   - Track vertical movement (nose for pushups, knees for squats)
   - Detect peaks and valleys in movement
   - Count complete cycles (down + up = 1 rep)
   - Threshold-based detection to avoid false positives

3. **Calculate Form from Poses**
   - Check body alignment (shoulders level, hips level)
   - Measure deviation from ideal posture
   - Calculate form score based on alignment quality
   - Track consistency across all reps

4. **Range of Motion Calculation**
   - Measure max and min positions
   - Calculate ROM = (max - min) / (ideal_max - ideal_min)
   - Normalize to 0.0-1.0 scale

5. **Consistency Score**
   - Compare form across all reps
   - Calculate variance in form scores
   - Higher variance = lower consistency

#### 2.2 Pose Analysis Algorithms

**Rep Counting:**
```typescript
function countReps(poses: any[]): number {
  let reps = 0;
  let inDownPhase = false;
  let previousHeight = 0;

  poses.forEach((pose: any, index: number) => {
    if (!pose.keypoints) return;

    // Get relevant keypoints
    const nose = pose.keypoints.find((k: any) => k.name === 'nose');
    const currentHeight = nose?.y || previousHeight;

    // Detect rep completion
    if (index > 0) {
      const heightDiff = Math.abs(currentHeight - previousHeight);
      const threshold = 0.1; // 10% movement threshold

      if (!inDownPhase && heightDiff > threshold) {
        // Moving down
        inDownPhase = true;
      } else if (inDownPhase && heightDiff < threshold) {
        // Moving up - complete rep
        reps++;
        inDownPhase = false;
      }
    }

    previousHeight = currentHeight;
  });

  return reps;
}
```

**Form Calculation:**
```typescript
function calculateFormFromPoses(poses: any[]): number {
  if (poses.length === 0) return 0.5;

  let alignmentDeviations = 0;

  poses.forEach((pose: any) => {
    if (!pose.keypoints) return;

    // Check shoulder alignment
    const leftShoulder = pose.keypoints.find((k: any) => k.name === 'left_shoulder');
    const rightShoulder = pose.keypoints.find((k: any) => k.name === 'right_shoulder');

    if (leftShoulder && rightShoulder) {
      const shoulderDifference = Math.abs(leftShoulder.y - rightShoulder.y);
      if (shoulderDifference > 0.1) {
        alignmentDeviations++;
      }
    }

    // Check hip alignment
    const leftHip = pose.keypoints.find((k: any) => k.name === 'left_hip');
    const rightHip = pose.keypoints.find((k: any) => k.name === 'right_hip');

    if (leftHip && rightHip) {
      const hipDifference = Math.abs(leftHip.y - rightHip.y);
      if (hipDifference > 0.1) {
        alignmentDeviations++;
      }
    }
  });

  // Calculate form score
  const deviationRate = alignmentDeviations / poses.length;
  return Math.max(0.5, 1.0 - (deviationRate * 2));
}
```

**Consistency Calculation:**
```typescript
function calculateConsistency(poses: any[]): number {
  if (poses.length < 2) return 0.5;

  const scores: number[] = [];

  for (let i = 1; i < poses.length; i++) {
    const currentForm = calculateFormFromPoses([poses[i]]);
    const prevForm = calculateFormFromPoses([poses[i - 1]]);

    // Calculate similarity
    scores.push(1 - Math.abs(currentForm - prevForm));
  }

  // Average consistency score
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}
```

#### 2.3 Code Example

```typescript
// lib/ai/computer-vision-video.ts
import Replicate from 'replicate';
import { sendTraceToOpik } from './opik-helper';

const replicateClient = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export interface VideoAnalysis {
  exerciseType: string;
  formScore: number;
  techniqueScore: number;
  rangeOfMotion: number;
  consistencyScore: number;
  repCount: number;
  confidence: number;
  feedback: string;
  timestamps: {
    start: number;
    end: number;
    keyFrames: number[];
  };
}

export async function analyzeWorkoutVideoReal(videoUrl: string): Promise<VideoAnalysis> {
  console.log('[CV Real] Analyzing workout video:', videoUrl);

  try {
    // Validate input
    if (!videoUrl || !isValidUrl(videoUrl)) {
      throw new Error('Invalid video URL');
    }
    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error('REPLICATE_API_TOKEN not set');
    }

    // Call Replicate API
    const output: any = await replicateClient.run(
      'microsoft/pose-detection',
      { input: { video: videoUrl } }
    );

    console.log('[CV Real] Pose detection complete');

    // Extract pose data
    const poses = output.poses || [];
    console.log('[CV Real] Poses extracted:', poses.length);

    // Analyze poses
    const repCount = countReps(poses);
    const formScore = calculateFormFromPoses(poses);
    const techniqueScore = Math.min(0.9, formScore + 0.1);
    const rangeOfMotion = calculateROMFromPoses(poses);
    const consistencyScore = calculateConsistency(poses);

    const exerciseType = detectExerciseFromPose(poses);

    console.log('[CV Real] Analysis complete:', {
      exerciseType,
      repCount,
      formScore,
      consistencyScore,
    });

    // Generate feedback
    const feedback = generateVideoFeedback(formScore, consistencyScore, repCount);

    const analysis: VideoAnalysis = {
      exerciseType,
      formScore,
      techniqueScore,
      rangeOfMotion,
      consistencyScore,
      repCount,
      confidence: 0.85, // Replicate is generally reliable
      feedback,
      timestamps: {
        start: Date.now(),
        end: Date.now() + (poses.length > 0 ? 30000 : 0),
        keyFrames: extractKeyFrames(poses),
      },
    };

    // Send Opik trace
    await sendTraceToOpik('cv_video_analysis_real', {
      startTime: Date.now() - 5000,
      input: {
        video_url: videoUrl,
        analysis_type: 'form_evaluation',
        cv_provider: 'replicate',
        model: 'microsoft/pose-detection',
        pose_detection: true,
        rep_counting: true,
        total_poses: poses.length,
        duration_estimate: analysis.timestamps.end - analysis.timestamps.start,
      },
      output: {
        exercise_type: exerciseType,
        form_score: formScore,
        technique_score: techniqueScore,
        consistency_score: consistencyScore,
        rep_count: repCount,
        confidence: 0.85,
        key_frames_count: analysis.timestamps.keyFrames.length,
        feedback_preview: feedback.substring(0, 100),
      },
      tags: ['cv', 'video_analysis', 'form_evaluation', 'pose_estimation', 'replicate', 'real_api'],
    });

    return analysis;

  } catch (error: any) {
    console.error('[CV Real] Video analysis failed:', error);

    // Log error to Opik
    await sendTraceToOpik('cv_video_analysis_failed', {
      startTime: Date.now() - 5000,
      input: {
        video_url: videoUrl,
        provider: 'replicate',
        error_message: error.message,
        error_code: error.code,
      },
      output: {
        status: 'failed',
        fallback_to_mock: true,
      },
      tags: ['cv', 'error', 'video_analysis', 'replicate'],
    });

    // Fallback to mock
    return analyzeWorkoutVideoMock(videoUrl);
  }
}

function detectExerciseFromPose(poses: any[]): string {
  // Analyze movement patterns to detect exercise type
  // This is a simplified version - real implementation would use ML

  const kneeMovement = analyzeKeypointMovement(poses, 'left_knee');
  const armMovement = analyzeKeypointMovement(poses, 'left_elbow');

  if (kneeMovement > 0.3 && armMovement < 0.1) {
    return 'squat';
  }
  if (armMovement > 0.3 && kneeMovement < 0.1) {
    return 'pushup';
  }

  return 'unknown';
}

function analyzeKeypointMovement(poses: any[], keypointName: string): number {
  const yPositions = poses
    .map(pose => pose.keypoints?.find((k: any) => k.name === keypointName)?.y)
    .filter(Boolean);

  if (yPositions.length < 2) return 0;

  const min = Math.min(...yPositions);
  const max = Math.max(...yPositions);

  return Math.abs(max - min);
}

function calculateROMFromPoses(poses: any[]): number {
  // Calculate range of motion from min/max positions
  // Simplified version - real implementation would be more sophisticated

  const nosePositions = poses
    .map(pose => pose.keypoints?.find((k: any) => k.name === 'nose')?.y)
    .filter(Boolean);

  if (nosePositions.length < 2) return 0.5;

  const min = Math.min(...nosePositions);
  const max = Math.max(...nosePositions);
  const range = Math.abs(max - min);

  // Normalize to 0.0-1.0 scale
  return Math.min(1.0, range / 0.5);
}

function extractKeyFrames(poses: any[]): number[] {
  // Extract key frame timestamps (simplified)
  const frameCount = Math.min(10, poses.length);
  const step = Math.floor(poses.length / frameCount);

  return Array.from({ length: frameCount }, (_, i) => i * step);
}

function generateVideoFeedback(formScore: number, consistencyScore: number, repCount: number): string {
  const avgScore = (formScore + consistencyScore) / 2;

  if (avgScore >= 0.85) {
    return `Excellent form! ${repCount} reps with perfect consistency. Keep up the great work!`;
  }
  if (avgScore >= 0.75) {
    return `Great form! ${repCount} reps with good technique and consistency.`;
  }
  if (avgScore >= 0.65) {
    return `Good form on ${repCount} reps. Focus on maintaining consistency across all reps.`;
  }
  if (avgScore >= 0.55) {
    return `Fair form on ${repCount} reps. Some reps show technique issues - review form.`;
  }

  return `Form needs work on ${repCount} reps. Consider using lower weights and focusing on technique.`;
}

function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
```

---

### Phase 3: Judge Integration (20 min)

#### 3.1 Update Judge to Use Real CV

**File:** `lib/ai/judge.ts`

**Changes Required:**

1. **Import Real CV Functions**
   ```typescript
   import {
     analyzeWorkoutPhotoReal,
     analyzeWorkoutVideoReal
   } from './computer-vision-photo';
   import {
     analyzeWorkoutVideoReal
   } from './computer-vision-video';
   ```

2. **Replace Mock Calls with Real CV**
   - Line 62-78: Update to use real functions
   - Add CV provider logging
   - Update Opik trace to include CV provider

**Updated Code:**
```typescript
// Perform CV analysis if proof media is provided
if (input.log.proof_media_url && input.log.proof_type) {
  console.log(`[Judge] Analyzing ${input.log.proof_type} proof:`, input.log.proof_media_url);

  try {
    // Use REAL CV functions instead of mock
    if (input.log.proof_type === 'video') {
      cvAnalysis = await analyzeWorkoutVideoReal(input.log.proof_media_url);
      console.log('[Judge] CV Provider: Replicate (Pose Detection)');
    } else {
      cvAnalysis = await analyzeWorkoutPhotoReal(input.log.proof_media_url);
      console.log('[Judge] CV Provider: Clarifai (Image Analysis)');
    }

    console.log('[Judge] CV analysis complete:', cvAnalysis);

    // Calculate form score from CV
    const formScore = calculateFormScoreFromCV(cvAnalysis);
    const safetyIssues = detectSafetyIssues(cvAnalysis);
    const confidenceMsg = getCVConfidenceMessage(cvAnalysis.confidence);

    console.log('[Judge] Form Score:', formScore, 'Safety Issues:', safetyIssues, 'Confidence:', confidenceMsg);
  } catch (cvError) {
    console.error('[Judge] CV analysis failed:', cvError);

    // Fallback to mock analysis
    cvAnalysis = await analyzeProof(input.log.proof_media_url, input.log.proof_type);
    console.log('[Judge] Using mock CV analysis as fallback');
  }
}
```

#### 3.2 Update Opik Tracing

**File:** `lib/ai/judge.ts`

**Updated Trace (around Line 133-158):**
```typescript
await sendTraceToOpik('judge_evaluation_success', {
  startTime: evaluationStartTime,
  input: {
    quest_id: input.quest.quest_name,
    user_class: input.user_class,
    user_rank: input.user_rank,
    has_proof: !!input.log.proof_media_url,
    proof_type: input.log.proof_type,
    has_cv_analysis: !!cvAnalysis,
    cv_provider: cvAnalysis?.confidence > 0.7 ? 'real_api' : 'mock',
    cv_analysis_type: input.log.proof_type,
    duration_actual: input.log.duration_actual,
    rpe_actual: input.log.rpe_actual,
  },
  output: {
    status: validated.status,
    integrity_score: validated.integrity_score,
    effort_score: validated.effort_score,
    safety_score: validated.safety_score,
    overall_score: (validated.integrity_score + validated.effort_score + validated.safety_score) / 3,
    xp_awarded: validated.final_xp,
    cv_enabled: !!cvAnalysis,
    cv_provider: cvAnalysis?.confidence > 0.7 ? 'real_api' : 'mock',
    cv_form_score: cvAnalysis?.formScore,
    cv_technique_score: cvAnalysis?.techniqueScore,
    cv_range_of_motion: cvAnalysis?.rangeOfMotion,
    cv_safety_issues: cvAnalysis ? detectSafetyIssues(cvAnalysis).length : 0,
    cv_confidence: cvAnalysis?.confidence,
    cv_rep_count: 'repCount' in cvAnalysis ? cvAnalysis.repCount : undefined,
    cv_consistency: 'consistencyScore' in cvAnalysis ? cvAnalysis.consistencyScore : undefined,
    cv_feedback_preview: cvAnalysis?.feedback.substring(0, 150),
    evaluation_time_ms: Date.now() - evaluationStartTime,
  },
  tags: [
    'success',
    'judge',
    validated.status,
    cvAnalysis ? 'cv_enabled' : 'no_cv',
    cvAnalysis?.confidence > 0.7 ? 'high_confidence' : 'moderate_confidence'
  ],
});
```

---

### Phase 4: Error Handling & Rate Limiting (30 min)

#### 4.1 Implement Rate Limiting

**File:** `lib/ai/cv-rate-limiter.ts` (NEW)

```typescript
import { RateLimiter } from 'limiter';

// Clarifai rate limit (100 tokens per minute)
export const clarifaiLimiter = new RateLimiter({
  tokensPerInterval: 100,
  interval: 'minute',
});

// Replicate rate limit (10 tokens per minute)
export const replicateLimiter = new RateLimiter({
  tokensPerInterval: 10,
  interval: 'minute',
});

export async function withRateLimit<T>(
  limiter: RateLimiter,
  operation: string,
  fn: () => Promise<T>
): Promise<T> {
  const allowed = await limiter.removeTokens(1);

  if (!allowed) {
    console.warn(`[CV Rate Limit] ${operation} limited, queuing...`);

    // Wait 1 second and retry
    await new Promise(resolve => setTimeout(resolve, 1000));
    return withRateLimit(limiter, operation, fn);
  }

  return fn();
}
```

**Usage:**
```typescript
export async function analyzeWorkoutPhotoReal(imageUrl: string): Promise<FormAnalysis> {
  return withRateLimit(clarifaiLimiter, 'photo_analysis', async () => {
    // API call here
  });
}
```

#### 4.2 Comprehensive Error Handling

**File:** `lib/ai/cv-errors.ts` (NEW)

```typescript
import { sendTraceToOpik } from './opik-helper';

export async function handleCVError<T>(
  operation: string,
  error: any,
  context: any,
  fallback: () => Promise<T>
): Promise<T> {
  // Detailed error logging
  console.error(`[CV Error] ${operation} failed:`, {
    message: error.message,
    code: error.code,
    status: error.status,
    context: context,
    timestamp: new Date().toISOString(),
  });

  // Send error trace to Opik
  await sendTraceToOpik(`cv_${operation}_failed`, {
    startTime: Date.now() - 1000,
    input: {
      operation,
      error_message: error.message,
      error_code: error.code,
      error_status: error.status,
      context: context,
    },
    output: {
      status: 'failed',
      fallback_to_mock: true,
    },
    tags: ['cv', 'error', operation],
  });

  // Check if we should fallback to mock
  if (error.code === 'invalid_api_key' || error.status === 401) {
    console.warn('[CV Fallback] Authentication failed, using mock');
  } else if (error.status === 429) {
    console.warn('[CV Fallback] Rate limit exceeded, using mock');
  } else if (error.code === 'invalid_url') {
    console.warn('[CV Fallback] Invalid URL, using mock');
  } else {
    console.warn('[CV Fallback] Unknown error, using mock');
  }

  // Fallback to mock
  return fallback();
}
```

---

### Phase 5: Testing & Validation (30 min)

#### 5.1 Unit Tests

**File:** `lib/ai/__tests__/computer-vision.test.ts` (NEW)

```typescript
import { describe, it, expect } from 'vitest';
import {
  detectSafetyIssuesFromConcepts,
  countReps,
  calculateFormFromPoses,
  calculateConsistency,
  generatePhotoFeedback,
} from '../computer-vision';

describe('CV Analysis Functions', () => {
  describe('Safety Issue Detection', () => {
    it('should detect injury concepts', () => {
      const concepts = [
        { name: 'injury', value: 0.8 },
        { name: 'poor form', value: 0.7 },
      ];
      const issues = detectSafetyIssuesFromConcepts(concepts);

      expect(issues).toContain('Possible injury detected - seek medical advice');
      expect(issues).toContain('Poor form detected - review technique');
    });

    it('should not detect low-confidence concepts', () => {
      const concepts = [
        { name: 'injury', value: 0.3 },
        { name: 'poor form', value: 0.4 },
      ];
      const issues = detectSafetyIssuesFromConcepts(concepts);

      expect(issues).toHaveLength(0);
    });
  });

  describe('Rep Counting', () => {
    it('should count reps from poses', () => {
      const poses = generateMockPoses(15);
      const reps = countReps(poses);

      expect(reps).toBeGreaterThan(0);
      expect(reps).toBeLessThan(poses.length);
    });
  });

  describe('Form Calculation', () => {
    it('should calculate form score from poses', () => {
      const poses = generateMockPoses(10);
      const formScore = calculateFormFromPoses(poses);

      expect(formScore).toBeGreaterThanOrEqual(0.5);
      expect(formScore).toBeLessThanOrEqual(1.0);
    });
  });

  describe('Consistency Calculation', () => {
    it('should calculate consistency score', () => {
      const poses = generateMockPoses(20);
      const consistency = calculateConsistency(poses);

      expect(consistency).toBeGreaterThanOrEqual(0.0);
      expect(consistency).toBeLessThanOrEqual(1.0);
    });
  });

  describe('Feedback Generation', () => {
    it('should generate excellent feedback', () => {
      const feedback = generatePhotoFeedback(0.9, 0.85, []);

      expect(feedback).toContain('Excellent');
    });

    it('should generate safety warning', () => {
      const feedback = generatePhotoFeedback(0.5, 0.5, ['Dangerous position']);

      expect(feedback).toContain('⚠️');
    });
  });
});
```

#### 5.2 Manual Testing Checklist

- [ ] Upload real push-up photo → analyze correctly
- [ ] Upload squat video → count reps correctly
- [ ] Upload plank photo → detect form issues
- [ ] Verify safety detection works
- [ ] Check form scores are reasonable
- [ ] Confirm Opik traces are sent with CV data
- [ ] Test error handling with invalid URLs
- [ ] Test fallback to mock when API fails
- [ ] Verify rate limiting works
- [ ] Check integration with AI Judge
- [ ] Test with various exercise types
- [ ] Verify consistency scoring
- [ ] Check ROM calculations

#### 5.3 Performance Benchmarks

**Target Response Times:**
- Photo analysis: <5 seconds (90th percentile)
- Video analysis: <10 seconds (90th percentile)
- Mock fallback: <1 second

**Target Success Metrics:**
- Photo accuracy: 70%+ (exercise detection)
- Video accuracy: 80%+ (rep counting)
- Safety precision: 85%+ (safety issues)
- Fallback rate: <5% (API failures)
- Opik trace success: 100%

---

## 📦 Dependencies to Add

```json
{
  "dependencies": {
    "@clarifai/nodejs": "^9.0.0",
    "replicate": "^0.29.0",
    "limiter": "^3.0.0"
  }
}
```

**Install command:**
```bash
npm install @clarifai/nodejs replicate limiter
```

---

## 🔐 Environment Variables

Add to `.env.local`:
```env
# Computer Vision API Keys
CLARIFAI_API_KEY=your_clarifai_key_here
REPLICATE_API_TOKEN=your_replicate_token_here
```

---

## 📊 Cost Estimates

### Clarifai
- **Free tier:** 5,000 calls/month
- **Paid:** $1.50 per 1,000 calls
- **Estimated usage:**
  - 100 active users × 5 photos/month = 500 calls
  - **Monthly cost:** $0 (within free tier)
  - **Break-even:** ~10,000 users

### Replicate
- **Pricing:** $0.0001 per second
- **Average video:** 30 seconds
- **Estimated usage:**
  - 100 active users × 5 videos/month × 30s = 150,000 seconds
  - **Monthly cost:** $15
  - **Break-even:** ~3,000 users

### Total Cost
- **1,000 users:** ~$150/month
- **10,000 users:** ~$1,500/month
- **100,000 users:** ~$15,000/month

---

## 🎯 Demo Script

### Demo 1: Photo Analysis (30 seconds)

1. Complete a quest with photo upload
2. Console shows:
   ```
   [Judge] Analyzing photo proof: https://...
   [Judge] CV Provider: Clarifai (Image Analysis)
   [CV Real] Analyzing workout photo: https://...
   [CV Real] Clarifai request successful
   [CV Real] Exercise detected: pushup Confidence: 0.89
   [CV Real] Photo analysis complete: {...}
   [CV Real] ✓ Successfully sent trace: cv_photo_analysis_real
   [Judge] CV analysis complete: {...}
   [Judge] Form Score: 0.85 Safety Issues: []
   ```
3. Judge verdict includes CV data:
   - form_score: 0.85
   - technique_score: 0.82
   - safety_issues: []
   - confidence: 0.87
   - feedback: "Excellent form! Your technique looks solid."
4. Opik dashboard shows trace with CV metrics

### Demo 2: Video Analysis (30 seconds)

1. Complete a quest with video upload
2. Console shows:
   ```
   [Judge] Analyzing video proof: https://...
   [Judge] CV Provider: Replicate (Pose Detection)
   [CV Real] Analyzing workout video: https://...
   [CV Real] Pose detection complete
   [CV Real] Poses extracted: 450
   [CV Real] Analysis complete: {
     exerciseType: 'squat',
     repCount: 12,
     formScore: 0.78,
     consistencyScore: 0.85
   }
   [CV Real] ✓ Successfully sent trace: cv_video_analysis_real
   [Judge] CV analysis complete: {...}
   [Judge] Form Score: 0.78 Safety Issues: []
   [Judge] Rep Count: 12
   ```
3. Judge verdict includes video-specific data:
   - rep_count: 12
   - form_score: 0.78
   - consistency_score: 0.85
   - confidence: 0.90
   - feedback: "Great form! 12 reps with good technique and consistency."
4. Opik dashboard shows trace with pose detection metrics

**Key Point:** "We're using real CV APIs (Clarifai for photos, Replicate for videos) with actual pose estimation, rep counting, and form analysis!"

---

## 🐛 Troubleshooting

### Issue: "CLARIFAI_API_KEY not set"
**Solution:** Add API key to `.env.local` file
**Command:** `echo "CLARIFAI_API_KEY=your_key_here" >> .env.local`

### Issue: "REPLICATE_API_TOKEN not set"
**Solution:** Add API token to `.env.local` file
**Command:** `echo "REPLICATE_API_TOKEN=your_token_here" >> .env.local`

### Issue: "Rate limit exceeded"
**Solution:** Rate limiter will queue requests automatically. Monitor usage in API dashboards.

### Issue: "Invalid URL format"
**Solution:** Ensure URLs are properly formatted with protocol (https://)

### Issue: "Fallback to mock triggered"
**Solution:** Check console for error details. Common causes:
- Invalid API keys
- Network issues
- API service downtime
- Malformed responses

---

## 📈 Success Metrics

After implementation, achieve:

| Metric | Target |
|---------|--------|
| Real CV API calls | 95%+ of analyses |
| Photo analysis accuracy | 70%+ |
| Video rep counting accuracy | 80%+ |
| Safety issue detection precision | 85%+ |
| Form score correlation with human | r > 0.7 |
| Opik traces with CV data | 100% |
| Fallback to mock rate | <5% |
| Photo response time | <5s (90th percentile) |
| Video response time | <10s (90th percentile) |
| Error handling coverage | 100% (all failure modes) |

---

## 🚀 Next Steps

1. ✅ Add CV integration to roadmap (`components/roadmap/roadmap-data.ts`)
2. ✅ Document CV features in FUTURE-ROADMAP.md
3. 🔄 Install dependencies and configure API keys
4. 🔄 Implement photo analysis (Phase 1)
5. 🔄 Implement video analysis (Phase 2)
6. 🔄 Update judge integration (Phase 3)
7. 🔄 Add error handling and rate limiting (Phase 4)
8. 🔄 Test all CV functions (Phase 5)
9. 🔄 Validate performance benchmarks
10. 🔄 Create demo video

**Total Estimated Time:** 6 hours (implementation + testing)

---

**Status:** Ready for implementation when time allows
**Priority:** High
**Impact:** Significant - Enables automated form verification and improves cheat detection
