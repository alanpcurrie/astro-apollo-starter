const baseColors = {
    blue: 'rgba(0, 120, 212, 0.8)',
    pink: 'rgba(227, 0, 140, 0.8)',
    teal: 'rgba(0, 178, 148, 0.8)',
    yellow: 'rgba(255, 185, 0, 0.8)',
    lightBlue: 'rgba(175, 238, 238, 1)',
    lightPink: 'rgba(255, 182, 193, 1)',
    darkBlue: 'rgba(0, 120, 212, 0.5)',
    darkPink: 'rgba(227, 0, 140, 0.5)',
    darkTeal: 'rgba(0, 178, 148, 0.5)',
    darkYellow: 'rgba(255, 185, 0, 0.5)',
    white: '#efefef',
    darkText: 'rgb(34, 39, 46)',
    lightText: '#EEF5FC',
    dropShadow: "rgba(0, 0, 0, 0.2))",
    bg: "#0a0a0a"
};
// work in progress
const ordinalColorScale = scaleOrdinal({
    domain: ["hold", "Asses", "Trial", "Adopt"],
    range: [baseColors.blue, baseColors.teal, baseColors.darkBlue, baseColors.pink],
});

const ordinalColor2Scale = scaleOrdinal({
    domain: ["Platforms", "Languages", "Tools", "Techniques"],
    range: [baseColors.yellow, baseColors.darkPink, baseColors.pink, baseColors.lightBlue],
});

const quadrantColors = {
    Tools: baseColors.blue,
    Techniques: baseColors.pink,
    Platforms: baseColors.teal,
    "languages-frameworks": baseColors.yellow
};

const quadrantTextColors = {
    Tools: baseColors.lightBlue,
    Techniques: baseColors.lightPink,
    Platforms: baseColors.lightBlue,
    "languages-frameworks": baseColors.lightPink
};

const radarColors = [baseColors.blue, baseColors.pink, baseColors.teal, baseColors.yellow].map(color => `${color.slice(0, -4)}0.2)`);
const radarStrokeColors = [baseColors.darkBlue, baseColors.darkPink, baseColors.darkTeal, baseColors.darkYellow];
