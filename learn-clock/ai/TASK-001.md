## Task 1.1 — Project Setup

Initialize a new Expo project for an iPhone app called "LärDigKlockan".

Requirements:
- Use the Expo TypeScript template
- Install and configure expo-router for navigation
- Create the following empty folder structure:
  src/
    app/          (expo-router screens)
    components/
    constants/
    utils/

- Create src/constants/colors.ts with a basic color palette:
  - background: "#FFF9F0"  (warm white)
  - clockFace: "#FFFFFF"
  - clockBorder: "#2C3E50"
  - handColor: "#2C3E50"
  - accent: "#E74C3C"      (for center dot)
  - textPrimary: "#2C3E50"

- Create a minimal src/app/index.tsx that renders a centered text: "LärDigKlockan 🕐"

Done when: `npx expo start` runs without errors and the start screen shows on iPhone simulator.