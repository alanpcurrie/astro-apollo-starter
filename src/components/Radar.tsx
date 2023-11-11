
import { Group } from '@visx/group';
import { Circle } from '@visx/shape';
import { Text } from '@visx/text';
import { Arc } from '@visx/shape';
import type { Blip } from '@stores/radarStore';
import React, { useMemo } from 'react';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import * as styles from "./Radar.css";

const Radar = ({ blips }: { blips: Array<Blip> }) => {
    const width = 800;
    const height = 800;
    const centerX = width / 2;
    const centerY = height / 2;
    const rings = ['Adopt', 'Trial', 'Assess', 'Hold'];
    const ringRadiusIncrement = Math.min(centerX, centerY) / (rings.length + 1);
    const radius = Math.min(centerX, centerY);
    const gutter = 0.00;
    const ringNames = ['Adopt', 'Trial', 'Assess', 'Hold'];
    const numberOfRings = ringNames.length + 1;
    const ringWidth = radius / numberOfRings + 10;
    const maxRadius = Math.min(centerX, centerY);

    const { containerRef, TooltipInPortal } = useTooltipInPortal();

    const {
        tooltipData,
        tooltipLeft,
        tooltipTop,
        tooltipOpen,
        showTooltip,
        hideTooltip,
    } = useTooltip<Blip>();

    const quadrants = {
        'Tools': 1,
        'Techniques': 2,
        'Platforms': 3,
        'languages-frameworks': 4
    } as const;

    const ringStatus = {
        'Adopt': 1,
        'Trial': 2,
        'Assess': 3,
        'Hold': 4
    } as const;

    const quadrantColors = {
        'Tools': 'red',
        'Techniques': 'green',
        'Platforms': 'blue',
        'languages-frameworks': 'orange'
    } as const;


    const quadrantAngles = [
        { startAngle: gutter, endAngle: Math.PI / 2 - gutter },
        { startAngle: Math.PI / 2 + gutter, endAngle: Math.PI - gutter },
        { startAngle: Math.PI + gutter, endAngle: 3 * Math.PI / 2 - gutter },
        { startAngle: 3 * Math.PI / 2 + gutter, endAngle: 2 * Math.PI - gutter },
    ] as const;

    const calculatePolarCoordinates = (blip: Blip, totalBlipsInRing: number, ringIndex: number) => {
        const quadrantBaseAngle = (quadrants[blip.quadrant] - 1) * (Math.PI / 2);
        const anglePerBlip = (Math.PI / 2) / totalBlipsInRing;
        const angle = quadrantBaseAngle + anglePerBlip * ringIndex;
        const innerRadius = (ringStatus[blip.ring] - 1) * (radius / Object.keys(ringStatus).length);
        const outerRadius = Math.min(ringStatus[blip.ring] * (radius / Object.keys(ringStatus).length), maxRadius);
        const ringRadius = (innerRadius + outerRadius);

        return { angle, radius: ringRadius };
    }

    const polarToCartesian = (centerX: number, centerY: number, angle: number, radius: number) => {
        return {
            x: centerX + radius * Math.cos(angle) - centerX,
            y: centerY + radius * Math.sin(angle) - centerY
        };
    };

    const memoizedBlipPositions = useMemo(() => {
        return blips.map((blip, index) => {
            const { angle, radius } = calculatePolarCoordinates(blip, blips.length, index);
            return { ...blip, position: polarToCartesian(centerX, centerY, angle, radius) };
        });
    }, [blips, centerX, centerY]);

    const handleMouseOver = (event: React.MouseEvent<SVGElement>, datum: Blip) => {
        const coordinates = localPoint(event.currentTarget, event);
        showTooltip({
            tooltipLeft: coordinates?.x,
            tooltipTop: coordinates?.y,
            tooltipData: datum
        });
    };

    const RadarChart = () => {
        return (
            <svg width={width} height={height} >
                <Group top={centerY} left={centerX}>
                    {quadrantAngles.map((quadrant, i) => (
                        <Arc
                            key={i}
                            innerRadius={0}
                            outerRadius={radius}
                            startAngle={quadrant.startAngle}
                            endAngle={quadrant.endAngle}
                            padAngle={gutter}
                            cornerRadius={0}
                            fill={`hsl(${i * 90}, 70%, 70%)`}
                        />
                    ))}
                </Group>
            </svg>
        );
    };

    const Labels = () => {
        return (
            <svg width={width} height={height}>
                <Group top={centerY} left={centerX}>
                    {ringNames.map((name, i) => {
                        const labelRadius = ringWidth * (i + 1);
                        return (
                            <>
                                <Text
                                    key={name}
                                    y={labelRadius}
                                    dy=".3rem"
                                    textAnchor="start"
                                    fill="black"
                                    fontSize={16}
                                    fontWeight={900}
                                >
                                    {name}
                                </Text>
                                <Text
                                    key={name}
                                    y={-labelRadius}
                                    dy=".3rem"
                                    textAnchor="end"
                                    fill="black"
                                    fontSize={16}
                                    fontWeight={900}
                                >
                                    {name}
                                </Text>
                                <Text
                                    key={name}
                                    x={labelRadius}
                                    dy=".3rem"
                                    textAnchor="start"
                                    fill="black"
                                    fontSize={16}
                                    fontWeight={900}
                                >
                                    {name}
                                </Text>
                                <Text
                                    key={name}
                                    x={-labelRadius}
                                    dy=".3rem"
                                    textAnchor="end"
                                    fill="black"
                                    fontSize={16}
                                    fontWeight={900}
                                >
                                    {name}
                                </Text>
                            </>
                        );
                    })}
                </Group>
            </svg>
        );
    };

    return (
        <>
            <svg width={width} height={height} ref={containerRef}>
                <RadarChart />
                <Labels />
                <Group top={centerY} left={centerX}>

                    // refactor to rings
                    {rings.map((ring, i) => (
                        <Circle
                            key={ring}
                            r={(i + 1) * ringRadiusIncrement}
                            fill="none"
                            stroke="white"
                        />
                    ))}
                    // refactor to rings blip layout
                    {memoizedBlipPositions.map((blip) => {
                        const { x, y } = blip.position;
                        const blipColor = quadrantColors[blip.quadrant];

                        return (
                            <React.Fragment key={blip.id}>
                                <a href={`/blip/${blip.id}`}>
                                    <Circle
                                        cx={x}
                                        cy={y}
                                        r={12}
                                        fill={blipColor}
                                        onMouseEnter={(event) => handleMouseOver(event, blip)}
                                        onMouseOut={hideTooltip}
                                    // onMouseMove={styles.hoverStyle}
                                    />

                                    <Text
                                        x={x}
                                        y={y}
                                        fontSize={10}
                                        textAnchor="middle"
                                        dy=".3em"
                                        fill="white"
                                    >
                                        {blip.id}
                                    </Text>
                                </a>
                                {/* <Text
                                    x={x}
                                    y={y - 10}
                                    fontSize={12}
                                    textAnchor="middle"
                                    fill="black"
                                >
                                    {blip.name}
                                </Text> */}
                            </React.Fragment>
                        );
                    })}
                </Group>
            </svg>
            {tooltipOpen && (
                <TooltipInPortal
                    key={Math.random()}
                    top={tooltipTop}
                    left={tooltipLeft}
                >
                    <div>
                        <strong>{tooltipData?.name}</strong>
                        <br />
                        Quadrant: {tooltipData?.quadrant}
                        <br />
                        Ring: {tooltipData?.ring}
                    </div>
                </TooltipInPortal>
            )
            }
        </>
    );
};

export default Radar;
