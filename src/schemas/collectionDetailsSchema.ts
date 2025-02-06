import { z } from 'zod';

export const CollectionDetailsSchema = z.object({
  elapsedMilliseconds: z.number(),
  artObject: z.object({
    links: z.object({
      search: z.string().url(),
    }),
    id: z.string(),
    objectNumber: z.string(),
    title: z.string(),
    principalOrFirstMaker: z.string(),
    webImage: z
      .object({
        url: z.string().url(),
      })
      .optional(),
    description: z.string().optional(),
    materials: z.array(z.string()).optional(),
    techniques: z.array(z.string()).optional(),
    productionPlaces: z.array(z.string()).optional(),
    dating: z.object({
      presentingDate: z.string(),
      sortingDate: z.number(),
      period: z.number(),
      yearEarly: z.number(),
      yearLate: z.number(),
    }),
    hasImage: z.boolean(),
    dimensions: z
      .array(
        z.object({
          unit: z.string(),
          type: z.string(),
          value: z.string(),
        })
      )
      .optional(),
  }),
});
