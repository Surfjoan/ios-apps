## Task 1.4 — Interactive Clock Hands

Add drag gesture support to the AnalogClock component so users can rotate the hands.

Requirements:
- Install react-native-gesture-handler if not already present
- Wrap the app root in GestureHandlerRootView
- Add a new prop to AnalogClock: mode: "display" | "interactive" (default "display")
- Add prop: onTimeChange?: (hours: number, minutes: number) => void

In interactive mode:
- User can drag the minute hand — snaps to nearest 5-minute interval
- User can drag the hour hand — snaps to nearest hour
- Dragging either hand calls onTimeChange with the updated time
- Both hands always reflect a consistent time state

Do not change the visual appearance from Task 1.2.

Done when: hands can be dragged on iPhone simulator and the clock updates correctly.