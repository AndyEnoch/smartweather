import React, { useMemo } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, {
  Path,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  Line,
  Text as SvgText,
} from "react-native-svg";
import { Colors, Spacing } from "../../constants/theme";
import type { HourlyForecast, ForecastMetric } from "../../types/weather";
import { formatHour } from "../../utils/format";

interface ForecastChartProps {
  hours: HourlyForecast[];
  metric: ForecastMetric;
}

const CHART_HEIGHT = 180;
const CHART_PADDING_TOP = 30;
const CHART_PADDING_BOTTOM = 30;
const LABEL_HEIGHT = 20;

const METRIC_CONFIG: Record<
  ForecastMetric,
  { color: string; unit: string; suffix: string }
> = {
  temperature: { color: Colors.chartOrange, unit: "°C", suffix: "°C" },
  windSpeed: { color: Colors.chartBlue, unit: "km/h", suffix: "" },
  humidity: { color: Colors.chartGreen, unit: "%", suffix: "%" },
};

export function ForecastChart({ hours, metric }: ForecastChartProps) {
  const screenWidth = Dimensions.get("window").width;
  const chartWidth = screenWidth - Spacing.lg * 4;
  const next24 = hours.slice(0, 24);

  const config = METRIC_CONFIG[metric];

  const { linePath, areaPath, yLabels, xLabels } = useMemo(() => {
    const values = next24.map((h) => {
      if (metric === "temperature") return h.temperature;
      if (metric === "windSpeed") return h.windSpeed;
      return h.humidity;
    });

    const min = Math.floor(Math.min(...values));
    const max = Math.ceil(Math.max(...values));
    const range = max - min || 1;
    const drawHeight = CHART_HEIGHT - CHART_PADDING_TOP - CHART_PADDING_BOTTOM;

    const points = values.map((val, i) => {
      const x = (i / (values.length - 1)) * chartWidth;
      const y =
        CHART_PADDING_TOP + drawHeight - ((val - min) / range) * drawHeight;
      return { x, y };
    });

    // Build SVG path
    let line = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const cp1x = (points[i - 1].x + points[i].x) / 2;
      const cp1y = points[i - 1].y;
      const cp2x = cp1x;
      const cp2y = points[i].y;
      line += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${points[i].x} ${points[i].y}`;
    }

    const area = `${line} L ${points[points.length - 1].x} ${CHART_HEIGHT} L ${points[0].x} ${CHART_HEIGHT} Z`;

    // Y-axis labels (4 steps)
    const stepCount = 4;
    const step = range / stepCount;
    const yLbls = Array.from({ length: stepCount + 1 }, (_, i) => {
      const value = min + step * i;
      const y =
        CHART_PADDING_TOP + drawHeight - ((value - min) / range) * drawHeight;
      return { value: `${Math.round(value)}${config.suffix}`, y };
    });

    // X-axis labels (every 4 hours)
    const xLbls = next24
      .filter((_, i) => i % 4 === 0)
      .map((h, i) => ({
        label: formatHour(h.time),
        x: ((i * 4) / (values.length - 1)) * chartWidth,
      }));

    return { linePath: line, areaPath: area, yLabels: yLbls, xLabels: xLbls };
  }, [next24, metric, chartWidth, config.suffix]);

  // Find NOW marker
  const nowX = 0;
  const nowValues =
    next24.length > 0
      ? metric === "temperature"
        ? next24[0].temperature
        : metric === "windSpeed"
          ? next24[0].windSpeed
          : next24[0].humidity
      : 0;

  return (
    <View style={styles.container}>
      <Svg
        width={chartWidth}
        height={CHART_HEIGHT + LABEL_HEIGHT}
        style={styles.svg}
      >
        <Defs>
          <SvgLinearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={config.color} stopOpacity="0.3" />
            <Stop offset="1" stopColor={config.color} stopOpacity="0.02" />
          </SvgLinearGradient>
        </Defs>

        {/* Horizontal grid lines */}
        {yLabels.map((label, i) => (
          <Line
            key={i}
            x1={0}
            y1={label.y}
            x2={chartWidth}
            y2={label.y}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={1}
          />
        ))}

        {/* Area fill */}
        <Path d={areaPath} fill="url(#areaGradient)" />

        {/* Line */}
        <Path d={linePath} stroke={config.color} strokeWidth={2} fill="none" />

        {/* NOW label */}
        <SvgText
          x={nowX + 2}
          y={14}
          fill={Colors.foregroundMuted}
          fontSize={10}
          fontWeight="600"
        >
          NOW
        </SvgText>
        <Line
          x1={nowX}
          y1={18}
          x2={nowX}
          y2={CHART_HEIGHT}
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={1}
          strokeDasharray="4,4"
        />

        {/* Y-axis labels */}
        {yLabels.map((label, i) => (
          <SvgText
            key={i}
            x={0}
            y={label.y - 5}
            fill={Colors.foregroundMuted}
            fontSize={10}
          >
            {label.value}
          </SvgText>
        ))}

        {/* X-axis labels */}
        {xLabels.map((label, i) => (
          <SvgText
            key={i}
            x={label.x}
            y={CHART_HEIGHT + 15}
            fill={Colors.foregroundMuted}
            fontSize={10}
            textAnchor="middle"
          >
            {label.label}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.md,
    alignItems: "center",
  },
  svg: {
    overflow: "visible",
  },
});
