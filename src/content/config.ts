import { z, defineCollection } from "astro:content";

const QuadrantEnum = z.enum([
  "Tools",
  "Techniques",
  "Platforms",
  "languages-frameworks",
]);
const RingEnum = z.enum(["Adopt", "Trial", "Assess", "Hold"]);
const TagsEnum = z.enum(["Frontend", "Backend"]);

const BlipSchema = z.object({
  id: z.string(),
  name: z.string(),
  quadrant: QuadrantEnum,
  ring: RingEnum,
  description: z.string(),
  hasAdr: z.boolean(),
  tags: z.array(TagsEnum),
});

const AdrSchema = z.object({
  id: reference("BlipSchema"),
  created: z.date(),
  status: z.string(),
  author: z.string(),
  reviewers: z.array(z.string()),
});

const combinedCollection = defineCollection({
  type: "content",
  schema: z.object({
    blips: z.array(BlipSchema),
    adrs: z.array(AdrSchema),
  }),
});

export const collections = {
  combined: combinedCollection,
};
