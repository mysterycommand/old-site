import React, { Component } from 'react';
import { render } from 'react-dom';

class Icon extends Component {
    render() {
        const {
            radius,
            height,
            width,
        } = this.props;

        const PHI = (1 + Math.sqrt(5)) / 2;
        const G = (2 * Math.PI) / (PHI * PHI);

        const radiusSml = radius * (8 / 13);
        const radiusTmp = radius * (13 / 8);
        const radiusMed = radiusTmp * (13 / 8);
        const radiusLrg = radiusMed * (21 / 8);

        const diameterMed = radiusMed * 2;
        const diameterLrg = radiusLrg * 2;

        const halfWidth = width / 2;
        const halfHeight = height / 2;

        const areaMed = Math.PI * (radiusMed * radiusMed);
        const squareMed = Math.sqrt(areaMed);
        const halfSquareMed = squareMed / 2;

        const aSquared = radiusLrg * radiusLrg;
        const cSquared = diameterLrg * diameterLrg;
        const b = Math.sqrt(cSquared - aSquared);

        const squareMedLeft = halfWidth - halfSquareMed;
        const squareMedTop = halfHeight - halfSquareMed;
        const circleLrgRight = squareMedLeft + radiusLrg;
        const circleLrgCenterY = squareMedTop - b;

        const inc = Math.atan2(radiusLrg, b);

        const startX = squareMedLeft + Math.sin(inc - G) * radiusLrg;
        const startY = circleLrgCenterY + Math.cos(inc - G) * radiusLrg;
        const turnX = squareMedLeft + Math.sin(inc) * radiusLrg;
        const turnY = circleLrgCenterY + Math.cos(inc) * radiusLrg;

        const rectX = ~~(startX);
        const rectY = ~~(circleLrgCenterY - radiusLrg);
        const rectWidth = ~~((halfWidth + halfSquareMed + diameterMed) - startX);
        const rectHeight = ~~(radiusLrg + b + squareMed + diameterMed);

        const translateX = -rectX + (width - rectWidth) / 2;
        const translateY = -rectY + (height - rectHeight) / 2;

        return (
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                preserveAspectRatio="xMidYMid meet"
                viewBox={[0,0,width,height].join(' ')}
                width={width} height={height}>
                <rect x="0" y="0" width={width} height={height} fill="#e7e7e7"/>
                <g transform={`translate(${translateX - radius * 2.3}, ${translateY})`}>
                    {/*
                    <line x1={squareMedLeft} y1={squareMedTop} x2={circleLrgRight} y2={circleLrgCenterY} stroke="#f0f"/>
                    <line x1={startX} y1={startY} x2={turnX} y2={turnY} stroke="#f0f"/>
                    <rect x={rectX} y={rectY} width={rectWidth} height={rectHeight} fill="#0ff" fillOpacity="0.2"/>
                    */}
                    <path stroke="#444" strokeWidth={radius * 1.7} fill="none" d={[
                        'M', startX, startY,
                        'A', radiusLrg, radiusLrg, 0, 1, 1, turnX, turnY,
                        'A', radiusLrg, radiusLrg, 0, 0, 0, squareMedLeft, squareMedTop,
                        'L', squareMedLeft + squareMed + radiusMed, squareMedTop,
                        'A', radiusMed, radiusMed, 0, 1, 0, squareMedLeft + squareMed, squareMedTop - radiusMed,
                        'L', halfWidth + halfSquareMed, halfHeight + halfSquareMed + radiusMed,
                        'A', radiusMed, radiusMed, 0, 1, 0, halfWidth + halfSquareMed + radiusMed, halfHeight + halfSquareMed,
                        'L', halfWidth + halfSquareMed, halfHeight + halfSquareMed
                    ].join(' ')}/>
                    <path stroke="#444" strokeWidth={radius * 1.7} fill="none" d={[
                        'M', halfWidth - halfSquareMed + radiusSml, halfHeight + halfSquareMed - radiusSml,
                        'L', halfWidth - halfSquareMed, halfHeight + halfSquareMed - radiusSml,
                        'A', radiusSml, radiusSml, 0, 1, 0, halfWidth - halfSquareMed + radiusSml, halfHeight + halfSquareMed,
                        'Z'
                    ].join(' ')}/>
                </g>
                <g transform={`translate(${translateX - radius * 2.3}, ${translateY})`} fill="#ff0">
                    <circle cx={startX} cy={startY} r="3"/>
                    <circle cx={turnX} cy={turnY} r="3"/>
                    <circle cx={squareMedLeft} cy={squareMedTop} r="3"/>
                    <circle cx={squareMedLeft + squareMed} cy={squareMedTop} r="3"/>
                    <circle cx={squareMedLeft + squareMed + radiusMed} cy={squareMedTop} r="3"/>
                    <circle cx={squareMedLeft + squareMed} cy={squareMedTop - radiusMed} r="3"/>
                    <circle cx={halfWidth + halfSquareMed} cy={halfHeight + halfSquareMed + radiusMed} r="3"/>
                    <circle cx={halfWidth + halfSquareMed + radiusMed} cy={halfHeight + halfSquareMed} r="3"/>
                    <circle cx={halfWidth + halfSquareMed} cy={halfHeight + halfSquareMed} r="3"/>

                    <circle cx={halfWidth - halfSquareMed + radiusSml} cy={halfHeight + halfSquareMed - radiusSml} r="3"/>
                    <circle cx={halfWidth - halfSquareMed} cy={halfHeight + halfSquareMed - radiusSml} r="3"/>
                    <circle cx={halfWidth - halfSquareMed + radiusSml} cy={halfHeight + halfSquareMed} r="3"/>
                </g>
                <g transform={`translate(${translateX - radius * 2.3}, ${translateY})`} fill="#0ff">
                    <circle cx={squareMedLeft} cy={circleLrgCenterY} r="3"/>
                    <circle cx={squareMedLeft + squareMed + radiusMed} cy={squareMedTop - radiusMed} r="3"/>
                    <circle cx={halfWidth + halfSquareMed + radiusMed} cy={halfHeight + halfSquareMed + radiusMed} r="3"/>

                    <circle cx={halfWidth - halfSquareMed} cy={halfHeight + halfSquareMed} r="3"/>
                </g>
                <g transform={`translate(${translateX - radius * 2.3}, ${translateY})`}>
                    {/*
                    <line x1={squareMedLeft} y1={squareMedTop} x2={circleLrgRight} y2={circleLrgCenterY} stroke="#f0f"/>
                    <line x1={startX} y1={startY} x2={turnX} y2={turnY} stroke="#f0f"/>
                    <rect x={rectX} y={rectY} width={rectWidth} height={rectHeight} fill="#0ff" fillOpacity="0.2"/>
                    */}
                    <path stroke="#f0f" strokeWidth="1" fill="none" d={[
                        'M', startX, startY,
                        'A', radiusLrg, radiusLrg, 0, 1, 1, turnX, turnY,
                        'A', radiusLrg, radiusLrg, 0, 0, 0, squareMedLeft, squareMedTop,
                        'L', squareMedLeft + squareMed + radiusMed, squareMedTop,
                        'A', radiusMed, radiusMed, 0, 1, 0, squareMedLeft + squareMed, squareMedTop - radiusMed,
                        'L', halfWidth + halfSquareMed, halfHeight + halfSquareMed + radiusMed,
                        'A', radiusMed, radiusMed, 0, 1, 0, halfWidth + halfSquareMed + radiusMed, halfHeight + halfSquareMed,
                        'L', halfWidth + halfSquareMed, halfHeight + halfSquareMed
                    ].join(' ')}/>
                    <path stroke="#f0f" strokeWidth="1" fill="none" d={[
                        'M', halfWidth - halfSquareMed + radiusSml, halfHeight + halfSquareMed - radiusSml,
                        'L', halfWidth - halfSquareMed, halfHeight + halfSquareMed - radiusSml,
                        'A', radiusSml, radiusSml, 0, 1, 0, halfWidth - halfSquareMed + radiusSml, halfHeight + halfSquareMed,
                        'Z'
                    ].join(' ')}/>
                </g>
                {/*
                <line x1="0" y1="0" x2={width} y2={height} stroke="#f00"/>
                <line x1="0" y1={height} x2={width} y2="0" stroke="#f00"/>
                */}
            </svg>
        );
    }
}

const icons = document.getElementById('js-icons');
render(<Icon width="365" height="365" radius="10"/>, icons);
