import { z } from 'zod';

export const TileSchema = z.object({
  x: z.number(),
  y: z.number(),
  url: z.string().url(),
});

export const LevelSchema = z.object({
  name: z.string(),
  width: z.number(),
  height: z.number(),
  tiles: z.array(TileSchema),
});

export const CollectionImageSchema = z.object({
  levels: z.array(LevelSchema),
});
