import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

interface AnalogClockProps {
  hours: number;
  minutes: number;
  size?: number;
  interactive?: boolean;
  onTimeChange?: (hours: number, minutes: number) => void;
}

export default function AnalogClock({
  hours,
  minutes,
  size = 300,
  interactive = false,
  onTimeChange
}: AnalogClockProps) {
  const radius = size / 2;
  const center = radius;

  // Calculate angles (0 = 12 o'clock position, clockwise positive)
  // React Native transform: 0° = 3 o'clock, 90° = 6 o'clock, 180° = 9 o'clock, 270° = 12 o'clock
  // So we need to subtract 90° to make 12 o'clock the starting point
  const hourAngleDeg = (hours % 12 + minutes / 60) * 30 - 90;
  const minuteAngleDeg = minutes * 6 - 90;

  // Convert to radians for positioning calculations
  const hourAngleRad = (hourAngleDeg * Math.PI) / 180;
  const minuteAngleRad = (minuteAngleDeg * Math.PI) / 180;

  // Hand dimensions
  const hourHandLength = radius * 0.5;
  const minuteHandLength = radius * 0.7;
  const hourHandWidth = 8;
  const minuteHandWidth = 4;

  // Generate clock numbers (1-12, with 12 at top)
  const clockNumbers = Array.from({ length: 12 }, (_, i) => {
    const num = i === 0 ? 12 : i;
    // Each hour mark is 30 degrees apart, starting from 12 o'clock (top)
    // Subtract 90° to make 12 appear at top instead of right
    const angleDeg = i * 30 - 90;
    const angleRad = (angleDeg * Math.PI) / 180;
    const numRadius = radius * 0.85;
    const x = center + numRadius * Math.cos(angleRad);
    const y = center + numRadius * Math.sin(angleRad) + 8;
    return { num, x, y };
  });

  // Generate tick marks (60 marks, larger every 5 minutes)
  const tickMarks = Array.from({ length: 60 }, (_, i) => {
    // Each tick mark is 6 degrees apart, starting from 12 o'clock (top)
    // Subtract 90° to make ticks align with clock numbers
    const angleDeg = i * 6 - 90;
    const angleRad = (angleDeg * Math.PI) / 180;
    const isHour = i % 5 === 0;
    const innerRadius = radius * (isHour ? 0.9 : 0.95);
    const outerRadius = radius * 0.98;
    const x1 = center + innerRadius * Math.cos(angleRad);
    const y1 = center + innerRadius * Math.sin(angleRad);
    const x2 = center + outerRadius * Math.cos(angleRad);
    const y2 = center + outerRadius * Math.sin(angleRad);
    return { x1, y1, x2, y2, isHour };
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.clockFace, { width: size, height: size, borderRadius: radius }]}>
        {/* Tick marks */}
        {tickMarks.map((tick, i) => (
          <View
            key={i}
            style={[
              styles.tick,
              {
                left: tick.x1,
                top: tick.y1,
                width: tick.x2 - tick.x1,
                height: tick.y2 - tick.y1,
                backgroundColor: colors.clockBorder,
                opacity: tick.isHour ? 1 : 0.3,
              },
            ]}
          />
        ))}
        
        {/* Clock numbers */}
        {clockNumbers.map((num) => (
          <Text
            key={num.num}
            style={[
              styles.number,
              {
                left: num.x - 12,
                top: num.y - 12,
                color: colors.textPrimary,
              },
            ]}
          >
            {num.num}
          </Text>
        ))}
        
        {/* Hour hand */}
        <View
          style={[
            styles.hand,
            {
              left: center - hourHandWidth / 2,
              top: center - hourHandWidth / 2,
              width: hourHandLength,
              height: hourHandWidth,
              backgroundColor: colors.handColor,
              transform: [
                { rotate: `${hourAngleDeg}deg` },
              ],
              transformOrigin: 'left center',
            },
          ]}
        />
        
        {/* Minute hand */}
        <View
          style={[
            styles.hand,
            {
              left: center - minuteHandWidth / 2,
              top: center - minuteHandWidth / 2,
              width: minuteHandLength,
              height: minuteHandWidth,
              backgroundColor: colors.handColor,
              transform: [
                { rotate: `${minuteAngleDeg}deg` },
              ],
              transformOrigin: 'left center',
            },
          ]}
        />
        
        {/* Center dot */}
        <View
          style={[
            styles.centerDot,
            {
              left: center - 6,
              top: center - 6,
              backgroundColor: colors.accent,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockFace: {
    backgroundColor: colors.clockFace,
    borderWidth: 3,
    borderColor: colors.clockBorder,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tick: {
    position: 'absolute',
    backgroundColor: colors.clockBorder,
  },
  number: {
    position: 'absolute',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 24,
    height: 24,
  },
  hand: {
    position: 'absolute',
    borderRadius: 10,
  },
  centerDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
