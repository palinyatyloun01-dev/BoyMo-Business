'use server';

/**
 * @fileOverview A profile image generation AI agent.
 *
 * - generateProfileImage - A function that handles the profile image generation process.
 * - GenerateProfileImageInput - The input type for the generateProfileImage function.
 * - GenerateProfileImageOutput - The return type for the generateProfileImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProfileImageInputSchema = z.object({
  description: z
    .string()
    .describe(
      'A detailed description of the desired profile image, including appearance, style, and any specific elements to include.'
    ),
});
export type GenerateProfileImageInput = z.infer<typeof GenerateProfileImageInputSchema>;

const GenerateProfileImageOutputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      'The generated profile image as a data URI that includes a MIME type and uses Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // keep this on one line
    ),
});
export type GenerateProfileImageOutput = z.infer<typeof GenerateProfileImageOutputSchema>;

export async function generateProfileImage(input: GenerateProfileImageInput): Promise<GenerateProfileImageOutput> {
  return generateProfileImageFlow(input);
}

const generateProfileImageFlow = ai.defineFlow(
  {
    name: 'generateProfileImageFlow',
    inputSchema: GenerateProfileImageInputSchema,
    outputSchema: GenerateProfileImageOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      // IMPORTANT: ONLY the googleai/gemini-2.0-flash-preview-image-generation model is able to generate images.
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `A profile picture for a business application for a Pizza restaurant. The user described the image as: "${input.description}". Generate a suitable, professional-looking image.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE, IMAGE only won't work
      },
    });

    if (!media?.url) {
        throw new Error("Image generation failed to return a media object.");
    }

    return {imageDataUri: media.url};
  }
);
