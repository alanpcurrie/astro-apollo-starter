// src/components/ObservablePlot.js
import React, { useEffect, useRef } from 'react';
import * as Plot from '@observablehq/plot';

const ObservablePlot = ({ data }) => {
    const plotRef = useRef(null);

    useEffect(() => {
        const plot = Plot.plot({
            x: {
                grid: true,
                label: "Tech Debt Categories"
            },
            y: {
                grid: true,
                label: "Amount"
            },
            color: {
                type: "categorical"
            },
            marks: [
                Plot.barY(data, { x: 'category', y: 'amount', fill: 'category' }),
                Plot.ruleY([0])
            ],
            width: 600
        });

        plotRef.current.appendChild(plot);
        return () => plotRef.current.removeChild(plot.firstChild);
    }, [data]);

    return <div ref={plotRef}></div>;
};

export default ObservablePlot;
