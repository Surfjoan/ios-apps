import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../constants/colors';
import AnalogClock from '../components/AnalogClock';
import { getSwedishClockText, getDigitalClockText, generateQuizTimes, getWrongAnswers } from '../utils/clockHelpers';

type QuizState = {
  phase: "setup" | "question" | "result";
  totalQuestions: number;
  currentIndex: number;
  correctCount: number;
  currentHours: number;
  currentMinutes: number;
  options: string[];
  answered: boolean;
  selectedAnswer: string | null;
  quizTimes: { hours: number; minutes: number }[];
};

export default function QuizScreen() {
  const [state, setState] = useState<QuizState>({
    phase: "setup",
    totalQuestions: 10,
    currentIndex: 0,
    correctCount: 0,
    currentHours: 0,
    currentMinutes: 0,
    options: [],
    answered: false,
    selectedAnswer: null,
    quizTimes: [],
  });

  const questionOptions = [5, 10, 15, 20, 30];

  const startQuiz = (questionCount: number) => {
    const times = generateQuizTimes(questionCount);
    const firstTime = times[0];
    const wrongAnswers = getWrongAnswers(firstTime.hours, firstTime.minutes, 4);
    const allOptions = [getSwedishClockText(firstTime.hours, firstTime.minutes), ...wrongAnswers];
    
    // Shuffle options
    allOptions.sort(() => Math.random() - 0.5);

    setState({
      phase: "question",
      totalQuestions: questionCount,
      currentIndex: 0,
      correctCount: 0,
      currentHours: firstTime.hours,
      currentMinutes: firstTime.minutes,
      options: allOptions,
      answered: false,
      selectedAnswer: null,
      quizTimes: times,
    });
  };

  const handleAnswer = (selectedOption: string) => {
    if (state.answered) return;

    const correctAnswer = getSwedishClockText(state.currentHours, state.currentMinutes);
    const isCorrect = selectedOption === correctAnswer;

    setState(prev => ({
      ...prev,
      answered: true,
      selectedAnswer: selectedOption,
    }));

    // Auto-advance after showing feedback
    setTimeout(() => {
      if (state.currentIndex < state.totalQuestions - 1) {
        // Move to next question
        const nextIndex = state.currentIndex + 1;
        const nextTime = state.quizTimes[nextIndex];
        const wrongAnswers = getWrongAnswers(nextTime.hours, nextTime.minutes, 4);
        const allOptions = [getSwedishClockText(nextTime.hours, nextTime.minutes), ...wrongAnswers];
        allOptions.sort(() => Math.random() - 0.5);

        setState(prev => ({
          ...prev,
          currentIndex: nextIndex,
          currentHours: nextTime.hours,
          currentMinutes: nextTime.minutes,
          options: allOptions,
          answered: false,
          selectedAnswer: null,
          correctCount: isCorrect ? prev.correctCount + 1 : prev.correctCount,
        }));
      } else {
        // Show results
        setState(prev => ({
          ...prev,
          phase: "result",
          correctCount: isCorrect ? prev.correctCount + 1 : prev.correctCount,
        }));
      }
    }, isCorrect ? 800 : 1200);
  };

  const retryQuiz = () => {
    startQuiz(state.totalQuestions);
  };

  const backToSetup = () => {
    setState({
      phase: "setup",
      totalQuestions: 10,
      currentIndex: 0,
      correctCount: 0,
      currentHours: 0,
      currentMinutes: 0,
      options: [],
      answered: false,
      selectedAnswer: null,
      quizTimes: [],
    });
  };

  const getScoreMessage = () => {
    const percentage = Math.round((state.correctCount / state.totalQuestions) * 100);
    if (percentage === 100) {
      return "Perfekt! Du kan klockan! ⭐⭐⭐";
    } else if (percentage >= 70) {
      return "Bra jobbat! Öva lite till! ⭐⭐";
    } else {
      return "Fortsätt öva, du klarar det! ⭐";
    }
  };

  const getScoreStars = () => {
    const percentage = Math.round((state.correctCount / state.totalQuestions) * 100);
    if (percentage === 100) return "⭐⭐⭐";
    if (percentage >= 70) return "⭐⭐";
    return "⭐";
  };

  // Setup Screen
  if (state.phase === "setup") {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Klockquiz 🕐</Text>
            <Text style={styles.subtitle}>Hur många frågor?</Text>
          </View>

          <View style={styles.optionsContainer}>
            {questionOptions.map((count) => (
              <TouchableOpacity
                key={count}
                style={[
                  styles.optionButton,
                  state.totalQuestions === count && styles.optionButtonSelected
                ]}
                onPress={() => setState(prev => ({ ...prev, totalQuestions: count }))}
              >
                <Text style={[
                  styles.optionButtonText,
                  state.totalQuestions === count && styles.optionButtonTextSelected
                ]}>
                  {count}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.startButton}
            onPress={() => startQuiz(state.totalQuestions)}
          >
            <Text style={styles.startButtonText}>Starta!</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Question Screen
  if (state.phase === "question") {
    const progress = ((state.currentIndex + 1) / state.totalQuestions) * 100;
    const correctAnswer = getSwedishClockText(state.currentHours, state.currentMinutes);

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Progress */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              Fråga {state.currentIndex + 1} av {state.totalQuestions}
            </Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
          </View>

          {/* Clock */}
          <View style={styles.clockContainer}>
            <AnalogClock
              hours={state.currentHours}
              minutes={state.currentMinutes}
              size={250}
            />
          </View>

          {/* Answer Options */}
          <View style={styles.answersContainer}>
            {state.options.map((option, index) => {
              const isCorrect = option === correctAnswer;
              const isSelected = option === state.selectedAnswer;
              
              let buttonStyle = styles.answerButton;
              let textStyle = styles.answerButtonText;

              if (state.answered) {
                if (isCorrect) {
                  buttonStyle = styles.answerButtonCorrect;
                  textStyle = styles.answerButtonTextCorrect;
                } else if (isSelected) {
                  buttonStyle = styles.answerButtonWrong;
                  textStyle = styles.answerButtonTextWrong;
                }
              }

              return (
                <TouchableOpacity
                  key={index}
                  style={buttonStyle}
                  onPress={() => handleAnswer(option)}
                  disabled={state.answered}
                >
                  <Text style={textStyle}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Result Screen
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Resultat 🎉</Text>
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.scoreText}>
            Du fick {state.correctCount} av {state.totalQuestions} rätt!
          </Text>
          
          <Text style={styles.starsText}>
            {getScoreStars()}
          </Text>

          <Text style={styles.messageText}>
            {getScoreMessage()}
          </Text>
        </View>

        <View style={styles.resultButtonsContainer}>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={retryQuiz}
          >
            <Text style={styles.buttonText}>Försök igen</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={backToSetup}
          >
            <Text style={styles.buttonText}>Tillbaka</Text>
          </TouchableOpacity>
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
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: colors.textPrimary,
    opacity: 0.8,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
    gap: 15,
  },
  optionButton: {
    backgroundColor: colors.clockFace,
    borderWidth: 2,
    borderColor: colors.clockBorder,
    borderRadius: 25,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionButtonSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  optionButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  optionButtonTextSelected: {
    color: '#FFFFFF',
  },
  startButton: {
    backgroundColor: colors.handColor,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.clockBorder,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
  },
  clockContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  answersContainer: {
    gap: 12,
  },
  answerButton: {
    backgroundColor: colors.clockFace,
    borderWidth: 2,
    borderColor: colors.clockBorder,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  answerButtonCorrect: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  answerButtonWrong: {
    backgroundColor: '#F44336',
    borderColor: '#F44336',
  },
  answerButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  answerButtonTextCorrect: {
    color: '#FFFFFF',
  },
  answerButtonTextWrong: {
    color: '#FFFFFF',
  },
  resultContainer: {
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: colors.clockFace,
    padding: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.clockBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 15,
  },
  starsText: {
    fontSize: 32,
    marginBottom: 15,
  },
  messageText: {
    fontSize: 18,
    color: colors.textPrimary,
    opacity: 0.8,
    textAlign: 'center',
  },
  resultButtonsContainer: {
    gap: 15,
    marginTop: 20,
  },
  retryButton: {
    backgroundColor: colors.handColor,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    backgroundColor: colors.clockBorder,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
