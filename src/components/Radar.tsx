
import { Group } from '@visx/group';
import { Circle } from '@visx/shape';
import { Text } from '@visx/text';
import { Arc } from '@visx/shape';
import { Zoom } from '@visx/zoom';
import type { Blip } from '@stores/radarStore';
import React, { useMemo, useState } from 'react';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { RectClipPath } from '@visx/clip-path';
// import { scaleLinear } from '@visx/scale';
// import { interpolateRainbow } from 'd3-scale-chromatic';
import * as styles from "./Radar.css";

const bg = '#0a0a0a';

const Radar = ({ blips }: { blips: Array<Blip> }) => {
    const width = 600;
    const height = 600;
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
    const [showMiniMap, setShowMiniMap] = useState<boolean>(true);

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
        const innerRadius = (ringStatus[blip.ring] - 1) * (radius / Object.keys(ringStatus).length - 110);
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

    const initialTransform = {
        scaleX: 1.27,
        scaleY: 1.27,
        translateX: -211.62,
        translateY: 162.59,
        skewX: 0,
        skewY: 0,
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
                            key={`quadrant,-${quadrant}=${i}`}
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
            <svg width={width} height={height} >
                <Group top={centerY} left={centerX}>
                    {ringNames.map((name, i) => {
                        const labelRadius = ringWidth * (i + 1);
                        return (
                            <>
                                <Text
                                    key={`ring-${name}=${Math.random()}-1`}
                                    y={labelRadius}
                                    dy=".3"
                                    textAnchor="start"
                                    fill="black"
                                    fontSize={16}
                                    fontWeight={900}
                                >
                                    {name}
                                </Text>
                                <Text
                                    key={`ring-${name}=${Math.random()}-2`}
                                    y={-labelRadius}
                                    dy=".3"
                                    textAnchor="end"
                                    fill="black"
                                    fontSize={16}
                                    fontWeight={900}
                                >
                                    {name}
                                </Text>
                                <Text
                                    key={`ring-${name}=${Math.random()}-3`}
                                    x={labelRadius}
                                    dy=".3"
                                    textAnchor="start"
                                    fill="black"
                                    fontSize={16}
                                    fontWeight={900}
                                >
                                    {name}
                                </Text>
                                <Text
                                    key={`ring-${name}=${Math.random()}-4`}
                                    x={-labelRadius}
                                    dy=".3"
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
            <Zoom<SVGSVGElement>
                width={width}
                height={height}
                scaleXMin={1 / 2}
                scaleXMax={4}
                scaleYMin={1 / 2}
                scaleYMax={4}
                initialTransformMatrix={initialTransform}
            >
                {(zoom) => (
                    <div className={styles.relative}>
                        <svg
                            width={width}
                            height={height}
                            style={{ cursor: zoom.isDragging ? 'grabbing' : 'grab', touchAction: 'none' }}
                            ref={zoom.containerRef}
                        >
                            <RectClipPath id="zoom-clip" width={width} height={height} />
                            <rect width={width} height={height} rx={14} fill={bg} />
                            <g ref={containerRef} transform={zoom.toString()}>

                                <RadarChart />
                                <Labels />
                                <Group top={centerY} left={centerX}>

                                    {rings.map((ring, i) => (
                                        <Circle
                                            key={`ring-${ring}=${i}`}
                                            r={(i + 1) * ringRadiusIncrement}
                                            fill="none"
                                            stroke="#0E1218"
                                        />
                                    ))}

                                    <rect
                                        width={width}
                                        height={height}
                                        rx={14}
                                        fill="transparent"
                                        onTouchStart={zoom.dragStart}
                                        onTouchMove={zoom.dragMove}
                                        onTouchEnd={zoom.dragEnd}
                                        onMouseDown={zoom.dragStart}
                                        onMouseMove={zoom.dragMove}
                                        onMouseUp={zoom.dragEnd}
                                        onMouseLeave={() => {
                                            if (zoom.isDragging) zoom.dragEnd();
                                        }}
                                        onDoubleClick={(event) => {
                                            const point = localPoint(event) || { x: 0, y: 0 };
                                            zoom.scale({ scaleX: 1.1, scaleY: 1.1, point });
                                        }}
                                    />


                                    {memoizedBlipPositions.map((blip, i) => {
                                        const { x, y } = blip.position;
                                        const blipColor = quadrantColors[blip.quadrant];

                                        return (
                                            <React.Fragment key={`blip-${blip}=${i}`}>
                                                <a className={styles.z} href={`/blip/${blip.id}`}>
                                                    <Circle
                                                        cx={x}
                                                        cy={y}
                                                        r={12}
                                                        fill={blipColor}
                                                        onMouseEnter={(event) => handleMouseOver(event, blip)}
                                                        onMouseOut={hideTooltip}
                                                        href={`/blip/${blip.id}`}


                                                    />

                                                    <Text
                                                        x={x}
                                                        y={y}
                                                        fontSize={10}
                                                        textAnchor="middle"
                                                        dy=".3em"
                                                        fill="#EEF5FC"
                                                    >
                                                        {blip.id}
                                                    </Text>
                                                </a>
                                            </React.Fragment>
                                        );
                                    })}
                                </Group>

                            </g>
                            {showMiniMap && (
                                <g
                                    clipPath="url(#zoom-clip)"
                                    transform={`scale(0.25)
                                     translate(${width * 4 - width - 60},
                                        ${height * 4 - height - 60
                                        })
                  `}
                                >
                                    <rect width={width} height={height} fill="#1a1a1a" />
                                    <RadarChart />
                                    <Labels />
                                    <Group top={centerY} left={centerX}>
                                        {rings.map((ring, i) => (
                                            <Circle
                                                key={`ring-${ring}=${i}`}
                                                r={(i + 1) * ringRadiusIncrement}
                                                fill="none"
                                                stroke="#0E1218"
                                            />
                                        ))}

                                        {memoizedBlipPositions.map((blip, i) => {
                                            const { x, y } = blip.position;
                                            const blipColor = quadrantColors[blip.quadrant];

                                            return (
                                                <React.Fragment key={`blip-${blip}=${i}`}>
                                                    <a className={styles.z} href={`/blip/${blip.id}`}>
                                                        <Circle
                                                            cx={x}
                                                            cy={y}
                                                            r={12}

                                                            fill={blipColor}
                                                            onMouseEnter={(event) => handleMouseOver(event, blip)}
                                                            onMouseOut={hideTooltip}
                                                            href={`/blip/${blip.id}`}

                                                        />

                                                        <Text
                                                            x={x}
                                                            y={y}
                                                            fontSize={10}
                                                            textAnchor="middle"
                                                            dy=".3em"
                                                            fill="#EEF5FC"
                                                        >
                                                            {blip.id}
                                                        </Text>
                                                    </a>
                                                </React.Fragment>
                                            );
                                        })}
                                    </Group>
                                    <rect
                                        width={width}
                                        height={height}
                                        fill="white"
                                        fillOpacity={0.2}
                                        stroke="white"
                                        strokeWidth={4}
                                        transform={zoom.toStringInvert()}
                                    />
                                </g>
                            )}
                        </svg>


                        {tooltipOpen && (
                            <TooltipInPortal
                                key={`tooltip-${Math.random()}`}
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
                        <div className={styles.controls}>
                            <button
                                type="button"
                                className={`${styles.btn} ${styles.btnZoom}`}
                                onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}
                            >
                                +
                            </button>
                            <button
                                type="button"
                                className={`${styles.btn} ${styles.btnZoom} ${styles.btnBottom}`}
                                onClick={() => zoom.scale({ scaleX: 0.8, scaleY: 0.8 })}
                            >
                                -
                            </button>
                            <button type="button" className={`${styles.btn} ${styles.btnLg}`} onClick={zoom.center}>
                                Center
                            </button>
                            <button type="button" className={`${styles.btn} ${styles.btnLg}`} onClick={zoom.reset}>
                                Reset
                            </button>
                            <button type="button" className={`${styles.btn} ${styles.btnLg}`} onClick={zoom.clear}>
                                Clear
                            </button>
                        </div>
                        <div className={styles.miniMap}>
                            <button
                                type="button"
                                className={`${styles.btn} ${styles.btnLg}`}
                                onClick={() => setShowMiniMap(!showMiniMap)}
                            >
                                {showMiniMap ? 'Hide' : 'Show'} Mini Map
                            </button>
                        </div>

                    </div>
                )}
            </Zoom>
        </>
    );
};

export default Radar;
