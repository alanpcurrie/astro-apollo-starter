import chroma from "chroma-js";
import { pipe } from "fp-ts/lib/function.js";

type ColorVariantLevel = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type ColorVariants = Record<ColorVariantLevel, string>;

export const createColorVariants = (baseColor: string): ColorVariants => {
  if (!chroma.valid(baseColor)) {
    throw new Error("Invalid base color provided.");
  }

  const lightest = chroma(baseColor).set("hsl.l", 0.9);
  const darkest = chroma(baseColor).set("hsl.l", 0.3);
  const scale = chroma
    .scale([lightest, baseColor, darkest])
    .mode("lch")
    .colors(9);

  return pipe(
    scale,
    (scaleColors) =>
      scaleColors.map((color, index) => [
        ((index + 1) * 100) as ColorVariantLevel,
        color,
      ]),
    Object.fromEntries,
  ) as ColorVariants;
};
