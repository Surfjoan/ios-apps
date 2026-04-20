## Task 1.2 — Static Analog Clock Component

Create a display-only analog clock component. No gestures, no logic — visuals only.

File: src/components/AnalogClock.tsx

Props:
- hours: number (0–12)
- minutes: number (0–59)
- size?: number (default 300)

Visual requirements:
- Circular white clock face with drop shadow
- Numbers 1–12 positioned correctly around the dial
- 60 tick marks, larger ones at each 5-minute position
- Hour hand: short, thick, rounded — use handColor from colors.ts
- Minute hand: long, thin, rounded — use handColor from colors.ts
- Small red center dot — use accent from colors.ts
- Hour hand angle formula: (hours % 12 + minutes / 60) * 30 degrees
- Minute hand angle formula: minutes * 6 degrees
- Angle 0 = pointing at 12, clockwise positive

Update src/app/index.tsx to render <AnalogClock hours={10} minutes={10} /> centered on screen.

Done when: clock renders correctly on iPhone simulator showing 10:10 with hands in the right position.