import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Line, Path, Text as SvgText, G } from 'react-native-svg';
import Animated, { useAnimatedProps, useSharedValue, withSpring } from 'react-native-reanimated';
import { Colors, BorderRadius, FontSize, FontWeight, Spacing } from '../../constants/theme';
import { getWindDirectionLabel, getBeaufortLevel } from '../../utils/weather';

const AnimatedG = Animated.createAnimatedComponent(G);

interface WindCompassProps {
  direction: number;
  speed: number;
  gusts: number;
}

const SIZE = 220;
const CENTER = SIZE / 2;
const RADIUS = 85;

/**
 * Cardinal and intercardinal directions with their angles.
 * Each entry uses a unique key (the angle) to avoid React key collisions.
 */
const DIRECTIONS: { label: string; angle: number }[] = [
  { label: 'N', angle: 0 },
  { label: 'E', angle: 90 },
  { label: 'S', angle: 180 },
  { label: 'W', angle: 270 },
];

export function WindCompass({ direction, speed, gusts }: WindCompassProps) {
  const beaufort = getBeaufortLevel(speed);
  const rotation = useSharedValue(direction);

  React.useEffect(() => {
    rotation.value = withSpring(direction, { damping: 15, stiffness: 80 });
  }, [direction, rotation]);

  const animatedProps = useAnimatedProps(() => ({
    transform: [
      { translateX: CENTER },
      { translateY: CENTER },
      { rotate: `${rotation.value}deg` },
      { translateX: -CENTER },
      { translateY: -CENTER },
    ],
  }));

  const needleLength = RADIUS - 10;
  const needlePath = `M ${CENTER} ${CENTER - needleLength} L ${CENTER - 6} ${CENTER + 10} L ${CENTER} ${CENTER} L ${CENTER + 6} ${CENTER + 10} Z`;

  return (
    <View style={styles.container}>
      <View style={styles.compassWrapper}>
        <Svg width={SIZE} height={SIZE}>
          {/* Outer circle */}
          <Circle cx={CENTER} cy={CENTER} r={RADIUS} stroke="rgba(255,255,255,0.12)" strokeWidth={2} fill="none" />
          <Circle cx={CENTER} cy={CENTER} r={RADIUS - 20} stroke="rgba(255,255,255,0.05)" strokeWidth={1} fill="none" />

          {/* Speed arc (background) */}
          <Circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS + 8}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={4}
            fill="none"
          />

          {/* Speed arc (filled proportional to speed) */}
          <Circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS + 8}
            stroke={Colors.chartGreen}
            strokeWidth={4}
            fill="none"
            strokeDasharray={`${(Math.min(speed, 118) / 118) * 2 * Math.PI * (RADIUS + 8)} ${2 * Math.PI * (RADIUS + 8)}`}
            transform={`rotate(-90 ${CENTER} ${CENTER})`}
            strokeLinecap="round"
            opacity={0.6}
          />

          {/* Tick marks (every 10 degrees) */}
          {Array.from({ length: 36 }, (_, i) => {
            const angle = (i * 10 * Math.PI) / 180;
            const isMajor = i % 9 === 0;
            const innerR = isMajor ? RADIUS - 12 : RADIUS - 6;
            return (
              <Line
                key={`tick-${i}`}
                x1={CENTER + innerR * Math.sin(angle)}
                y1={CENTER - innerR * Math.cos(angle)}
                x2={CENTER + RADIUS * Math.sin(angle)}
                y2={CENTER - RADIUS * Math.cos(angle)}
                stroke={isMajor ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)'}
                strokeWidth={isMajor ? 2 : 1}
              />
            );
          })}

          {/* Cardinal direction labels: N, E, S, W */}
          {DIRECTIONS.map(({ label, angle }) => {
            const rad = (angle * Math.PI) / 180;
            const labelR = RADIUS + 22;
            const x = CENTER + labelR * Math.sin(rad);
            const y = CENTER - labelR * Math.cos(rad) + 4;
            return (
              <SvgText
                key={`dir-${angle}`}
                x={x}
                y={y}
                fill={label === 'N' ? Colors.chartGreen : Colors.foregroundMuted}
                fontSize={13}
                fontWeight="700"
                textAnchor="middle"
              >
                {label}
              </SvgText>
            );
          })}

          {/* Center dot */}
          <Circle cx={CENTER} cy={CENTER} r={4} fill={Colors.foregroundMuted} />

          {/* Animated needle */}
          <AnimatedG animatedProps={animatedProps}>
            <Path d={needlePath} fill={Colors.chartGreen} />
          </AnimatedG>
        </Svg>
      </View>

      {/* Info cards */}
      <View style={styles.infoRow}>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Direction</Text>
          <Text style={styles.infoValue}>{getWindDirectionLabel(direction)}</Text>
          <Text style={styles.infoSub}>{Math.round(direction)}°</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Speed</Text>
          <Text style={styles.infoValue}>{Math.round(speed * 10) / 10}</Text>
          <Text style={styles.infoSub}>km/h</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Gusts</Text>
          <Text style={styles.infoValue}>{Math.round(gusts * 10) / 10}</Text>
          <Text style={styles.infoSub}>km/h</Text>
        </View>
      </View>

      {/* Beaufort scale */}
      <View style={styles.beaufortRow}>
        <View style={styles.beaufortPill}>
          <Text style={styles.beaufortText}>
            Beaufort {beaufort.level} – {beaufort.label}
          </Text>
        </View>
        <View style={styles.beaufortBars}>
          {Array.from({ length: 6 }, (_, i) => (
            <View
              key={`bar-${i}`}
              style={[
                styles.beaufortBar,
                {
                  height: 8 + i * 3,
                  backgroundColor: i < Math.min(beaufort.level, 6)
                    ? Colors.chartGreen
                    : 'rgba(255,255,255,0.15)',
                },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  compassWrapper: {
    marginVertical: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    width: '100%',
    marginTop: Spacing.md,
  },
  infoCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  infoLabel: {
    fontSize: FontSize.xs,
    color: Colors.foregroundMuted,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.foreground,
  },
  infoSub: {
    fontSize: FontSize.xs,
    color: Colors.foregroundMuted,
    marginTop: 2,
  },
  beaufortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: Spacing.lg,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  beaufortPill: {
    flex: 1,
  },
  beaufortText: {
    fontSize: FontSize.sm,
    color: Colors.chartGreen,
    fontWeight: FontWeight.semibold,
  },
  beaufortBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
  },
  beaufortBar: {
    width: 5,
    borderRadius: 2,
  },
});
