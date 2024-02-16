import { z } from "zod";

import imagery_raw from "./static/imagery.json" assert { type: "json" };

const attribution = z.object({
  required: z.boolean().optional(),
  text: z.string(),
  url: z.string().optional(),
});

const tuple = z.tuple([z.number(), z.number()]);
const coordinates = z.union([tuple, z.array(tuple)]);

const extent = z.object({
  max_zoom: z.number().int().optional(),
  min_zoom: z.number().int().optional(),
  polygon: z.array(coordinates).optional(),
});

const date = z.string().regex(/^\d{4}(-\d{2}(-\d{2})?)?$/);

const image = z.object({
  default: z.boolean().optional(),
  attribution: attribution.optional(),
  country_code: z
    .string()
    .regex(/^[A-Z]{2}$/)
    .optional(),
  description: z.string().optional(),
  end_date: date.optional(),
  extent: extent,
  icon: z.string().url().optional(),
  id: z.string(),
  license_url: z.string().url().optional(),
  name: z.string(),
  privacy_policy_url: z.union([z.string().url().optional(), z.literal(false)]),
  start_date: date.optional(),
  type: z.literal("tms"),
  url: z.string(),
});

// todo: migrate this filter to the update script using jq
const filtered = imagery_raw.filter((i) => i.type === "tms");

const imagery = z.array(image).parse(filtered);

export default imagery;
