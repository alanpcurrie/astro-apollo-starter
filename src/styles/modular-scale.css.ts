import { style } from "@vanilla-extract/css";
type ScaleRatio = (typeof ScaleRatios)[keyof typeof ScaleRatios];
type ScaleFunction = (ratio: ScaleRatio) => (level: number) => string;

const ScaleRatios = {
  GoldenRatio: 1.618,
  MajorSecond: 1.125,
  MinorThird: 1.2,
  MajorThird: 1.25,
  PerfectFourth: 1.333,
  PerfectFifth: 1.5,
  MinorSixth: 1.6,
  MajorSixth: 1.6667,
  MinorSeventh: 1.778,
  MajorSeventh: 1.875,
  Octave: 2,
} as const;

const createScale: ScaleFunction = (ratio: ScaleRatio) => {
  return (level: number) => {
    const fontSizeRem = +(1 * Math.pow(ratio, level)).toFixed(2);
    return style({
      fontSize: `${fontSizeRem}rem`,
      lineHeight: `${((fontSizeRem * ratio) as number).toFixed(2)}rem`,
    });
  };
};

// const goldenRatioTypography = createScale(ScaleRatios.GoldenRatio);
const majorThirdTypography = createScale(ScaleRatios.GoldenRatio);

export const typographyLevel1 = majorThirdTypography(5);
export const typographyLevel2 = majorThirdTypography(4);
export const typographyLevel3 = majorThirdTypography(3);
export const typographyLevel4 = majorThirdTypography(2);
export const typographyLevel5 = majorThirdTypography(1);
