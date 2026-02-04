import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// load md/mdx files from the blog directory
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// frontmatter check
	schema: ({ image }) =>
		z.object({
			title: z.string().describe('The title of the blog post'),
			description: z.string().describe('The description of the blog post'),
			pubDate: z.coerce.date().describe('The publication date of the blog post, input format is "mmm dd yyyy", example: "Feb 04 2026"'), // string to date
			updatedDate: z.coerce.date().optional().describe('The updated date of the blog post, input format is "mmm dd yyyy", example: "Feb 04 2026"'), // string to date
			heroImage: image().optional().describe('The hero image of the blog post'),
		}),
});

export const collections = { blog };
