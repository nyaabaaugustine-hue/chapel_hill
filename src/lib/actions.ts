'use server';

import {
  getAiJobRecommendations,
  AiJobRecommendationsInput,
  AiJobRecommendationsOutput,
} from '@/ai/flows/ai-job-recommendations';
import {
  moderateJobPost,
  ModerateJobPostInput,
  ModerateJobPostOutput,
} from '@/ai/flows/admin-job-moderation';

export const fetchAiJobRecommendations = async (input: AiJobRecommendationsInput): Promise<AiJobRecommendationsOutput> => {
  try {
    const recommendations = await getAiJobRecommendations(input);
    return recommendations;
  } catch (error) {
    console.error('Error fetching AI job recommendations:', error);
    throw new Error('Failed to fetch AI recommendations.');
  }
};

export const runJobModeration = async (input: ModerateJobPostInput): Promise<ModerateJobPostOutput> => {
  try {
    const moderationResult = await moderateJobPost(input);
    return moderationResult;
  } catch (error) {
    console.error('Error running job moderation:', error);
    return {
      isSpam: false,
      reason: 'AI moderation failed. Please review manually.',
    };
  }
};
