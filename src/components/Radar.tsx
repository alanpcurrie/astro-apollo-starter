import { Group } from "@visx/group";
import { Circle } from "@visx/shape";
import { Text } from "@visx/text";
import { Arc } from "@visx/shape";
import { Zoom } from "@visx/zoom";
import type { Blip } from "@stores/radarStore";
import React, { useMemo, useState } from "react";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { RectClipPath } from "@visx/clip-path";
import { scaleOrdinal } from "@visx/scale";
import { LegendOrdinal, LegendItem, LegendLabel } from "@visx/legend";
// import { withScreenSize, } from '@visx/responsive';
// import { ScaleSVG } from '@visx/responsive';
// import { scaleLinear } from '@visx/scale';
// import { interpolateRainbow } from 'd3-scale-chromatic';
import * as styles from "./Radar.css";

const Radar = ({ blips }: { blips: Array<Blip> }) => {
    const bg = "#0a0a0a";
    const width = 800;
    const height = 800;
    const centerX = width / 2;
    const centerY = height / 2;
    const rings = ["Adopt", "Trial", "Assess", "Hold"];
    const ringRadiusIncrement = Math.min(centerX, centerY) / (rings.length + 1);
    const radius = Math.min(centerX, centerY);
    const gutter = 0.002;
    const ringNames = ["Adopt", "Trial", "Assess", "Hold"];
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
        Tools: 1,
        Techniques: 2,
        Platforms: 3,
        "languages-frameworks": 4,
    } as const;

    const ringStatus = {
        Adopt: 1,
        Trial: 2,
        Assess: 3,
        Hold: 4,
    } as const;

    const quadrantColors = {
        Tools: 'rgba(0, 120, 212, 0.8)',
        Techniques: 'rgba(227, 0, 140, 0.8)',
        Platforms: 'rgba(0, 178, 148, 0.8)',
        "languages-frameworks": 'rgba(255, 185, 0, 0.8)'
    } as const;

    const quadrantTextColors = {
        Tools: 'rgba(175, 238, 238, 1)',
        Techniques: 'rgba(255, 182, 193, 1)',
        Platforms: 'rgba(175, 238, 238, 1)',
        "languages-frameworks": 'rgba(255, 182, 193, 1)',
    } as const;

    const quadrantAngles = [
        { startAngle: gutter, endAngle: Math.PI / 2 - gutter },
        { startAngle: Math.PI / 2 + gutter, endAngle: Math.PI - gutter },
        { startAngle: Math.PI + gutter, endAngle: (3 * Math.PI) / 2 - gutter },
        { startAngle: (3 * Math.PI) / 2 + gutter, endAngle: 2 * Math.PI - gutter },
    ] as const;

    const calculatePolarCoordinates = (
        blip: Blip,
        totalBlipsInRing: number,
        ringIndex: number,
    ) => {
        const quadrantBaseAngle = (quadrants[blip.quadrant] - 1) * (Math.PI / 2);
        const anglePerBlip = Math.PI / 2 / totalBlipsInRing;
        const angle = quadrantBaseAngle + anglePerBlip * ringIndex;
        const innerRadius =
            (ringStatus[blip.ring] - 1) *
            (radius / Object.keys(ringStatus).length - 110);
        const outerRadius = Math.min(
            ringStatus[blip.ring] * (radius / Object.keys(ringStatus).length),
            maxRadius,
        );
        const ringRadius = innerRadius + outerRadius;

        return { angle, radius: ringRadius };
    };

    const polarToCartesian = (
        centerX: number,
        centerY: number,
        angle: number,
        radius: number,
    ) => {
        return {
            x: centerX + radius * Math.cos(angle) - centerX,
            y: centerY + radius * Math.sin(angle) - centerY,
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

    const ordinalColorScale = scaleOrdinal({
        domain: ["hold", "Asses", "Trial", "Adopt"],
        range: ["#66d981", "#71f5ef", "#4899f1", "#7d81f6"],
    });

    const ordinalColor2Scale = scaleOrdinal({
        domain: ["Platforms", "Languages", "Tools", "Techniques"],
        range: ["#fae856", "#f29b38", "#e64357", "#8386f7"],
    });

    const radarColors = ['rgba(0, 120, 212, 0.2)', 'rgba(227, 0, 140, 0.2)', 'rgba(0, 178, 148, 0.2)', 'rgba(255, 185, 0, 0.2)'];
    const radarStrokeColors = ['rgba(0, 120, 212, 0.5)', 'rgba(227, 0, 140, 0.5)', 'rgba(0, 178, 148, 0.5)', 'rgba(255, 185, 0, 0.5)'];
    const legendGlyphSize = 16;
    const events = false;

    const clipPaths = [
        "clipTopRight",
        "clipTopLeft",
        "clipBottomLeft",
        "clipBottomRight",
    ];

    function LegendBase({
        title,
        children,
    }: {
        title: string;
        children: React.ReactNode;
    }) {
        return (
            <div className="legend">
                <div className="title">{title}</div>
                {children}
                <style>
                    {`
                    .legend {
                        line-height: 0.9em;
                        color: #efefef;
                        font-size: 10px;
                        font-family: Satoshi;
                        padding: 10px 10px;
                        float: left;
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        border-radius: 8px;
                        margin: 5px 5px;
                    }
                    .title {
                        font-size: 12px;
                        margin-bottom: 10px;
                        font-weight: 100;
                    }
                 `}
                </style>
            </div>
        );
    }

    const Legend = () => {
        return (
            <LegendBase title="Blips">
                <LegendOrdinal scale={ordinalColorScale}>
                    {(labels) =>
                        labels.map((label, i) => (
                            <LegendItem
                                key={`legend-${i}`}
                                onClick={() => {
                                    if (events) alert(`clicked: ${JSON.stringify(label)}`);
                                }}
                            >
                                <svg
                                    width={legendGlyphSize}
                                    height={legendGlyphSize}
                                    style={{ margin: "2px 0" }}
                                >
                                    <circle
                                        fill={label.value}
                                        r={legendGlyphSize / 2}
                                        cx={legendGlyphSize / 2}
                                        cy={legendGlyphSize / 2}
                                    />
                                </svg>
                                <LegendLabel align="left" margin="0 4px">
                                    {label.text}
                                </LegendLabel>
                            </LegendItem>
                        ))
                    }
                </LegendOrdinal>
            </LegendBase>
        );
    };

    const LegendTwo = () => {
        return (
            <LegendBase title="Quadrants">
                <LegendOrdinal scale={ordinalColor2Scale}>
                    {(labels) =>
                        labels.map((label, i) => (
                            <LegendItem
                                key={`legend-${i}`}
                                onClick={() => {
                                    if (events) alert(`clicked: ${JSON.stringify(label)}`);
                                }}
                            >
                                <svg
                                    width={legendGlyphSize}
                                    height={legendGlyphSize}
                                    style={{ margin: "2px 0" }}
                                >
                                    <defs>
                                        <clipPath id="clipTopRight">
                                            <path d="M 16,16 L 16,0 A 16,16 0 0 1 32,16 Z" />{" "}
                                        </clipPath>

                                        <clipPath id="clipTopLeft">
                                            <path d="M 16,16 L 0,16 A 16,16 0 0 1 16,0 Z" />
                                        </clipPath>

                                        <clipPath id="clipBottomLeft">
                                            <path d="M 16,16 L 16,32 A 16,16 0 0 1 0,16 Z" />
                                        </clipPath>

                                        <clipPath id="clipBottomRight">
                                            <path d="M 16,16 L 32,16 A 16,16 0 0 1 16,32 Z" />
                                        </clipPath>
                                    </defs>
                                    {clipPaths.map((clipPathId, index) => (
                                        <circle
                                            key={index}
                                            fill={label.value}
                                            r={legendGlyphSize}
                                            cx={legendGlyphSize / 2}
                                            cy={legendGlyphSize / 2}
                                            clipPath={`url(#${clipPathId})`}
                                        />
                                    ))}
                                </svg>
                                <LegendLabel align="left" margin="0 4px">
                                    {label.text}
                                </LegendLabel>
                            </LegendItem>
                        ))
                    }
                </LegendOrdinal>
            </LegendBase>
        );
    };

    const memoizedBlipPositions = useMemo(() => {
        return blips.map((blip, index) => {
            const { angle, radius } = calculatePolarCoordinates(
                blip,
                blips.length,
                index,
            );
            return {
                ...blip,
                position: polarToCartesian(centerX, centerY, angle, radius),
            };
        });
    }, [blips, centerX, centerY]);

    const handleMouseOver = (
        event: React.MouseEvent<SVGElement>,
        datum: Blip,
    ) => {
        const coordinates = localPoint(event.currentTarget, event);
        showTooltip({
            tooltipLeft: coordinates?.x,
            tooltipTop: coordinates?.y,
            tooltipData: datum,
        });
    };

    const RadarChart = () => {
        return (
            <svg width={width} height={height}>
                <Group top={centerY} left={centerX}>
                    {quadrantAngles.map((quadrant, i) => {
                        const fillColor = radarColors[i % radarColors.length];
                        const strokeColor = radarStrokeColors[i % radarStrokeColors.length];
                        return (
                            <Arc
                                key={`quadrant,-${quadrant}-${i}`}
                                innerRadius={0}
                                outerRadius={radius}
                                startAngle={quadrant.startAngle}
                                endAngle={quadrant.endAngle}
                                padAngle={gutter}
                                cornerRadius={0}
                                fill={fillColor}
                                stroke={strokeColor}
                                strokeWidth={2.5}
                                style={{
                                    filter: 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.2))', // Subtle shadow for depth
                                }}
                            />
                        );
                    })}
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
                                    key={`ring-${name}=${Math.random()}-1`}
                                    y={labelRadius}
                                    dy=".3"
                                    textAnchor="start"
                                    fill={quadrantTextColors.Tools}
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
                                    fill={quadrantTextColors.Platforms}
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
                                    fill={quadrantTextColors["languages-frameworks"]}
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
                                    fill={quadrantTextColors.Techniques}
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
                        {/* <ScaleSVG
                            width={width}
                            height={height}> */}
                        <svg
                            ref={zoom.containerRef}
                            width={width}
                            height={height}
                            style={{
                                cursor: zoom.isDragging ? "grabbing" : "grab",
                                touchAction: "none",
                            }}
                        >
                            <RectClipPath id="zoom-clip" width={width} height={height} />
                            <svg ref={containerRef} />
                            <rect width={width} height={height} rx={14} fill={bg} />
                            <g transform={zoom.toString()}>
                                <RadarChart />
                                <Labels />
                                <Group top={centerY} left={centerX}>

                                    {rings.map((ring, i) => (
                                        <Circle
                                            key={`ring-${ring}-${i}`}
                                            r={(i + 1) * ringRadiusIncrement}
                                            fill="none"
                                            stroke={radarStrokeColors[i % radarStrokeColors.length]} // Assign stroke color based on quadrant color
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
                                            <a key={`blip-${blip}=${i}`}
                                                aria-label={`Details about ${blip.id}`}
                                                className={styles.z}
                                                href={`/blip/${blip.id}`}>
                                                <Circle
                                                    cx={x}
                                                    cy={y}
                                                    r={12}
                                                    fill={blipColor}
                                                    onMouseEnter={(event) =>
                                                        handleMouseOver(event, blip)
                                                    }
                                                    onMouseOut={hideTooltip}
                                                    href={`/blip/${blip.id}`}
                                                />

                                                <Text
                                                    x={x}
                                                    y={y}
                                                    fontSize={12}
                                                    textAnchor="middle"
                                                    dy=".3em"
                                                    fill="rgb(34, 39, 46)"
                                                >
                                                    {blip.id}
                                                </Text>
                                            </a>

                                        );
                                    })}
                                </Group>
                            </g>
                            {showMiniMap && (
                                <g
                                    clipPath="url(#zoom-clip)"
                                    transform={`scale(0.25)
                                     translate(${width * 4 - width - 60},
                                        ${height * 4 - height - 60})
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
                                                <React.Fragment key={`mini-map-blip-${blip}=${i}`}>
                                                    <a className={styles.z}
                                                        aria-label={`Details about ${blip.id}`}
                                                        href={`/blip/${blip.id}`}>
                                                        <Circle
                                                            cx={x}
                                                            cy={y}
                                                            r={12}
                                                            fill={blipColor}
                                                            onMouseEnter={(event) =>
                                                                handleMouseOver(event, blip)
                                                            }
                                                            onMouseOut={hideTooltip}
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
                        {/* </ScaleSVG > */}

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
                        )}

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
                            <button
                                type="button"
                                className={`${styles.btn} ${styles.btnLg}`}
                                onClick={zoom.center}
                            >
                                Center
                            </button>
                            <button
                                type="button"
                                className={`${styles.btn} ${styles.btnLg}`}
                                onClick={zoom.reset}
                            >
                                Reset
                            </button>
                            <button
                                type="button"
                                className={`${styles.btn} ${styles.btnLg}`}
                                onClick={zoom.clear}
                            >
                                Clear
                            </button>
                        </div>
                        <div className={styles.miniMap}>
                            <button
                                type="button"
                                className={`${styles.btn} ${styles.btnLg}`}
                                onClick={() => setShowMiniMap(!showMiniMap)}
                            >
                                {showMiniMap ? "Hide" : "Show"} Mini Map
                            </button>
                        </div>
                        <Legend />
                        <LegendTwo />
                    </div>
                )}
            </Zoom>
        </>
    );
};

export default Radar;
