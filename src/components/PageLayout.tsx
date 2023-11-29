import React, { useEffect, useState } from 'react';
import * as rhythmStyles from '@styles/vertical-rhythm.css';
import * as typographyStyles from '@styles/modular-scale.css';
import { createColorVariants } from '@styles/colors';
import { applyTheme } from '@styles/apply-theme';
import { createBox } from '@dessert-box/react';
import { sprinkles } from "@styles/sprinkles.css";
import chroma from 'chroma-js';
import { sunStyle, moonStyle } from '@styles/theme.css';
import { match } from 'ts-pattern';

type ThemeOptions = 'light' | 'dark'
type SpacingLevel = `spacingLevel${number}`;
type TypographyLevel = `typographyLevel${number}`;
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type DynamicHeadingProps = {
    level: HeadingLevel;
    className: string;
    children: React.ReactNode;
};

const RhythmStyles: Record<SpacingLevel, string> = rhythmStyles;
const TypographyStyles: Record<TypographyLevel, string> = typographyStyles;

function getSpacingClassName(level: number): SpacingLevel {
    return `spacingLevel${level}` as SpacingLevel;
}

function getTypographyClassName(level: number): TypographyLevel {
    return `typographyLevel${level}` as TypographyLevel;
}

const DynamicHeading= ({ level, className, children }: DynamicHeadingProps) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    return <Tag className={className}>{children}</Tag>;
};

export const Box = createBox({ atoms: sprinkles });

const createSwatches = (baseColor: string) => {
    const colorVariants = createColorVariants(baseColor);
    if (!chroma.valid(baseColor)) {
        throw new Error("Invalid base color provided.");
    }
    return () => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {Object.entries(colorVariants).map(([key, color]) => (
                <div
                    key={key}
                    style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: color,
                        border: '2px solid white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px'
                    }}
                >
                    {key}
                </div>
            ))}
        </div>
    );
};

const BlueSwatches = createSwatches('#00f');
const RedSwatches = createSwatches('#f00');
const GreenSwatches = createSwatches('#0f0');

const PageLayout = () => {
    const [theme, setTheme] = useState<ThemeOptions>('light');
    const themeClass = applyTheme(theme);

    const toggleTheme = () => {
        const newTheme = match(theme)
            .with('light', () => 'dark')
            .with('dark', () => 'light')
            .exhaustive() as ThemeOptions;

        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.body.classList.toggle('dark', newTheme === 'dark');
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

        const newTheme = match(storedTheme)
            .with('light', () => 'light')
            .with('dark', () => 'dark')
            .otherwise(() => preferredTheme) as ThemeOptions;
        setTheme(newTheme);
        document.body.classList.toggle('dark', newTheme === 'dark');
    }, []);

    return (
        <div className={themeClass}>
          <Box onClick={toggleTheme} as="button">
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
            <svg width="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path className={sunStyle} fillRule="evenodd" d={theme === 'light' ? "M12 17.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 1.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm12-7a.8.8 0 0 1-.8.8h-2.4a.8.8 0 0 1 0-1.6h2.4a.8.8 0 0 1 .8.8zM4 12a.8.8 0 0 1-.8.8H.8a.8.8 0 0 1 0-1.6h2.5a.8.8 0 0 1 .8.8zm16.5-8.5a.8.8 0 0 1 0 1l-1.8 1.8a.8.8 0 0 1-1-1l1.7-1.8a.8.8 0 0 1 1 0zM6.3 17.7a.8.8 0 0 1 0 1l-1.7 1.8a.8.8 0 1 1-1-1l1.7-1.8a.8.8 0 0 1 1 0zM12 0a.8.8 0 0 1 .8.8v2.5a.8.8 0 0 1-1.6 0V.8A.8.8 0 0 1 12 0zm0 20a.8.8 0 0 1 .8.8v2.4a.8.8 0 0 1-1.6 0v-2.4a.8.8 0 0 1 .8-.8zM3.5 3.5a.8.8 0 0 1 1 0l1.8 1.8a.8.8 0 1 1-1 1L3.5 4.6a.8.8 0 0 1 0-1zm14.2 14.2a.8.8 0 0 1 1 0l1.8 1.7a.8.8 0 0 1-1 1l-1.8-1.7a.8.8 0 0 1 0-1z" : ""}/>
                <path className={moonStyle} fillRule="evenodd" d={theme === 'dark' ? "M16.5 6A10.5 10.5 0 0 1 4.7 16.4 8.5 8.5 0 1 0 16.4 4.7l.1 1.3zm-1.7-2a9 9 0 0 1 .2 2 9 9 0 0 1-11 8.8 9.4 9.4 0 0 1-.8-.3c-.4 0-.8.3-.7.7a10 10 0 0 0 .3.8 10 10 0 0 0 9.2 6 10 10 0 0 0 4-19.2 9.7 9.7 0 0 0-.9-.3c-.3-.1-.7.3-.6.7a9 9 0 0 1 .3.8z" : ""}/>
            </svg>
        </Box>
        <div>
            <h1>Tech radar Design System</h1>
        </div>
        <div>
            <h2>Blue Swatches</h2>
            <BlueSwatches />
            <h2>Red Swatches</h2>
            <RedSwatches />
            <h2>Green Swatches</h2>
            <GreenSwatches />
        </div>
        <div>
        {
    [1, 2, 3, 4, 5, 6].map(level => {
        const spacingClass = RhythmStyles[getSpacingClassName(level)];
        const typographyClass = TypographyStyles[getTypographyClassName(level)];
        return (
            <section key={level} className={spacingClass}>
            <DynamicHeading level={level as HeadingLevel} className={typographyClass}>
                Heading {level}
            </DynamicHeading>
        </section>
        );
    })
}

          </div>
        </div>
    );
};

export default PageLayout;
