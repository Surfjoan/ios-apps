## Task 1.5 — Wire Everything Together

Connect the clock component and the text helper on the home screen.

Update src/app/index.tsx:
- Render <AnalogClock> in interactive mode, centered on screen
- Below the clock, show the Swedish text from getSwedishClockText() in a large readable font
- Below that, show the digital time from getDigitalClockText() in a smaller secondary font
- Initial time: 12:00
- When user drags a hand, all text updates instantly

Styling notes:
- Use background color from colors.ts
- Swedish text font size: 28px, bold
- Digital text font size: 18px, use textPrimary color at 60% opacity

Done when: dragging the clock hands updates both text strings live on screen with no errors.