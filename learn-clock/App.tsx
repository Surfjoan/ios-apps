import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { colors } from './src/constants/colors';
import AnalogClock from './src/components/AnalogClock';
import { getSwedishClockText, getDigitalClockText } from './src/utils/clockHelpers';

interface TimeExample {
  hours: number;
  minutes: number;
  label: string;
}

const TIME_EXAMPLES: TimeExample[] = [
  { hours: 3, minutes: 0, label: '3:00 - Prick tre' },
  { hours: 3, minutes: 15, label: '3:15 - Kvart över tre' },
  { hours: 3, minutes: 30, label: '3:30 - Halv fyra' },
  { hours: 3, minutes: 45, label: '3:45 - Kvart i fyra' },
  { hours: 5, minutes: 25, label: '5:25 - Fem i halv sex' },
  { hours: 11, minutes: 55, label: '11:55 - Fem i tolv' },
  { hours: 12, minutes: 0, label: '12:00 - Prick tolv' },
];

export default function App() {
  const [currentTime, setCurrentTime] = useState({ hours: 10, minutes: 10 });
  const [showExamples, setShowExamples] = useState(false);
  const router = useRouter();

  const handleTimeChange = (newHours: number, newMinutes: number) => {
    setCurrentTime({ hours: newHours, minutes: newMinutes });
  };

  const setExampleTime = (hours: number, minutes: number) => {
    setCurrentTime({ hours, minutes });
  };

  const swedishText = getSwedishClockText(currentTime.hours, currentTime.minutes);
  const digitalText = getDigitalClockText(currentTime.hours, currentTime.minutes);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>LärDigKlockan 🕐</Text>
          <Text style={styles.subtitle}>Lär dig läsa analog klocka på svenska</Text>
        </View>

        {/* Quiz Button */}
        <TouchableOpacity
          style={styles.quizButton}
          onPress={() => router.push('/quiz')}
        >
          <Text style={styles.quizButtonText}>Starta Quiz 🎯</Text>
        </TouchableOpacity>

        {/* Current Time Display */}
        <View style={styles.timeDisplay}>
          <Text style={styles.swedishText}>{swedishText}</Text>
          <Text style={styles.digitalText}>{digitalText}</Text>
        </View>

        {/* Interactive Clock */}
        <View style={styles.clockSection}>
          <AnalogClock
            hours={currentTime.hours}
            minutes={currentTime.minutes}
            size={320}
          />

          <Text style={styles.instruction}>
            Klicka på exempel-knapparna nedan för att se olika tider!
          </Text>
        </View>

        {/* Examples Toggle */}
        <TouchableOpacity
          style={styles.examplesToggle}
          onPress={() => setShowExamples(!showExamples)}
        >
          <Text style={styles.examplesToggleText}>
            {showExamples ? '🔽 Dölj exempel' : '🔼 Visa exempel'}
          </Text>
        </TouchableOpacity>

        {/* Time Examples */}
        {showExamples && (
          <View style={styles.examplesSection}>
            <Text style={styles.examplesTitle}>Vanliga tider:</Text>
            {TIME_EXAMPLES.map((example, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.exampleButton,
                  currentTime.hours === example.hours &&
                  currentTime.minutes === example.minutes &&
                  styles.exampleButtonActive
                ]}
                onPress={() => setExampleTime(example.hours, example.minutes)}
              >
                <Text style={[
                  styles.exampleButtonText,
                  currentTime.hours === example.hours &&
                  currentTime.minutes === example.minutes &&
                  styles.exampleButtonTextActive
                ]}>
                  {example.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Instructions */}
        <View style={styles.instructionsSection}>
          <Text style={styles.instructionsTitle}>Hur fungerar det?</Text>
          <View style={styles.instructionList}>
            <Text style={styles.instructionItem}>• Den korta visaren visar timmar</Text>
            <Text style={styles.instructionItem}>• Den långa visaren visar minuter</Text>
            <Text style={styles.instructionItem}>• 12:00 är prick (exakt)</Text>
            <Text style={styles.instructionItem}>• 15 minuter förbi är kvart över</Text>
            <Text style={styles.instructionItem}>• 30 minuter förbi är halv</Text>
            <Text style={styles.instructionItem}>• 45 minuter förbi är kvart i</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Lycka till med klockläsningen! 📚⏰
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textPrimary,
    opacity: 0.8,
    textAlign: 'center',
  },
  timeDisplay: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: colors.clockFace,
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.clockBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  swedishText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  digitalText: {
    fontSize: 18,
    color: colors.textPrimary,
    opacity: 0.7,
    textAlign: 'center',
  },
  clockSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  instruction: {
    marginTop: 15,
    fontSize: 14,
    color: colors.textPrimary,
    opacity: 0.8,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  quizButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quizButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  examplesToggle: {
    backgroundColor: colors.handColor,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  examplesToggleText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  examplesSection: {
    marginBottom: 30,
  },
  examplesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 15,
    textAlign: 'center',
  },
  exampleButton: {
    backgroundColor: colors.clockFace,
    padding: 15,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: colors.clockBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  exampleButtonActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  exampleButtonText: {
    fontSize: 16,
    color: colors.textPrimary,
    textAlign: 'center',
    fontWeight: '500',
  },
  exampleButtonTextActive: {
    color: '#FFFFFF',
  },
  instructionsSection: {
    backgroundColor: colors.clockFace,
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.clockBorder,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 15,
    textAlign: 'center',
  },
  instructionList: {
    gap: 8,
  },
  instructionItem: {
    fontSize: 14,
    color: colors.textPrimary,
    opacity: 0.9,
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    fontSize: 16,
    color: colors.textPrimary,
    opacity: 0.7,
    fontStyle: 'italic',
  },
});
