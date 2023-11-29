import { style } from "@vanilla-extract/css";
type ScaleRatio = (typeof ScaleRatios)[keyof typeof ScaleRatios];
type SpacingFunction = (ratio: ScaleRatio) => (level: number) => string;

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

const createSpacing: SpacingFunction = (ratio: ScaleRatio) => {
  return (level: number) => {
    const spacingRem = (0.5 * Math.pow(ratio, level)).toFixed(2);
    return style({
      margin: `${spacingRem}rem`,
      padding: `${spacingRem}rem`,
    });
  };
};

// const goldenRatioSpacing = createSpacing(ScaleRatios.GoldenRatio);
const majorThirdSpacing = createSpacing(ScaleRatios.MajorThird);

export const spacingLevel1 = majorThirdSpacing(5);
export const spacingLevel2 = majorThirdSpacing(4);
export const spacingLevel3 = majorThirdSpacing(3);
export const spacingLevel4 = majorThirdSpacing(2);
export const spacingLevel5 = majorThirdSpacing(1);
