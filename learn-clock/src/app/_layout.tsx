import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'LärDigKlockan' }} />
      <Stack.Screen name="quiz" options={{ title: 'Klockquiz' }} />
    </Stack>
  );
}
