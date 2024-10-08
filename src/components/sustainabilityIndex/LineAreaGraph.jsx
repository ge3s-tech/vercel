import React from "react";
import {
  XYChart,
  AnimatedAreaSeries,
  AnimatedLineSeries,
  AnimatedGlyphSeries,
  Tooltip,
} from "@visx/xychart";
import { LinearGradient } from "@visx/gradient";
import { curveLinear } from "@visx/curve";
import { Axis } from "@visx/xychart";

// Function to generate a unique ID
const generateUniqueId = () =>
  `gradient-${Math.random().toString(36).substr(2, 9)}`;

export default function LineAreaGraph({
  width,
  height,
  lineColor,
  gradientFrom = "#8debff", // Default Gradient start color
  gradientTo = "#ffffff", // Default Gradient end color
  data,
}) {
  // Generate a unique gradient ID for this instance
  const gradientId = React.useMemo(() => generateUniqueId(), []);

  // Updated data
  const newData = data || [
    { quarter: "Q1 2023", value: 0.1 },
    { quarter: "Q2 2023", value: 0.25 },
    { quarter: "Q3 2023", value: 0.4 },
    { quarter: "Q4 2023", value: 0.5 },
    { quarter: "Q1 2024", value: 0.6 },
    { quarter: "Q2 2024", value: 0.8 },
  ];

  return (
    <XYChart
      xScale={{ type: "band", padding: 0.1 }} // Reduced padding for better fit
      yScale={{ type: "linear" }}
      height={height}
      width={width}
      margin={{ top: 40, right: 0, bottom: 30, left: 30 }} // Reduced left margin
    >
      {/* Define the gradient using a unique ID */}
      <LinearGradient
        id={gradientId} // Use the unique gradient ID
        from={gradientFrom} // Use the gradientFrom prop
        to={gradientTo} // Use the gradientTo prop
      />

      {/* AnimatedAreaSeries for the filled area */}
      <AnimatedAreaSeries
        dataKey="Area"
        data={newData}
        xAccessor={(d) => d.quarter}
        yAccessor={(d) => d.value}
        fillOpacity={0.4} // Controls the opacity of the area below the line
        fill={`url(#${gradientId})`} // Apply the gradient using the unique ID
        curve={curveLinear} // Apply the natural curve
      />

      {/* AnimatedLineSeries for the line with animation */}
      <AnimatedLineSeries
        dataKey="Line"
        data={newData}
        xAccessor={(d) => d.quarter}
        yAccessor={(d) => d.value}
        stroke={lineColor} // Updated line color
        strokeWidth={1} // Line thickness
        curve={curveLinear} // Apply the natural curve
        strokeOpacity={1} // Ensure full opacity
      />

      {/* AnimatedGlyphSeries for the data points */}
      <AnimatedGlyphSeries
        dataKey="Points"
        data={newData}
        xAccessor={(d) => d.quarter}
        yAccessor={(d) => d.value}
        size={75} // Size of the glyph (adjust as needed)
        renderGlyph={(glyphProps) => {
          const { x, y } = glyphProps;
          return (
            <circle
              cx={x}
              cy={y}
              r={4} // Radius of the dot
              fill={lineColor} // Dot color matching the line
            />
          );
        }}
      />

      <Axis
        orientation="bottom"
        hideAxisLine
        hideTicks
        tickLabelProps={{
          fontSize: 9,
        }}
      />
      <Axis
        orientation="left"
        hideAxisLine
        hideTicks
        numTicks={4} // Reduce the number of labels on the left axis
      />
      <Tooltip
        offsetLeft={-120}
        offsetTop={0}
        renderTooltip={({ tooltipData }) => (
          <div
            style={{
              padding: "8px",
              fontWeight: 400,
              fontSize: 11,
              display: "flex",
              gap: 8,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: lineColor,
                height: 12,
                width: 12,
              }}
            ></div>
            <div>SI Score {tooltipData?.nearestDatum?.datum.value}</div>
          </div>
        )}
      />
    </XYChart>
  );
}
