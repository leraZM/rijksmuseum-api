import { z } from 'zod';

const ImageSchema = z.object({
  guid: z.string().nullable(),
  width: z.number().nullable(),
  height: z.number().nullable(),
  url: z.string().url().nullable(),
});

export const ArtObjectSchema = z.object({
  links: z.object({
    self: z.string().url(),
    web: z.string().url(),
  }),
  id: z.string(),
  objectNumber: z.string(),
  title: z.string(),
  hasImage: z.boolean(),
  principalOrFirstMaker: z.string(),
  longTitle: z.string(),
  showImage: z.boolean(),
  permitDownload: z.boolean(),
  webImage: ImageSchema.optional().nullable(),
  headerImage: z
    .object({
      guid: z.string(),
      width: z.number(),
      height: z.number(),
      url: z.string().url(),
    })
    .optional(),
  productionPlaces: z.array(z.string()),
});

export const CollectionResponseSchema = z
  .object({
    elapsedMilliseconds: z.number(),
    count: z.number(),
    artObjects: z.array(ArtObjectSchema),
  })
  .passthrough();
