### Flow

1. SETUP SCREEN (QuizSetup)
   - Title: "Hur många frågor?"
   - A row of selectable buttons: 5 / 10 / 15 / 20 / 30
   - Only one can be selected at a time, selected state clearly highlighted
   - A "Starta!" button that begins the quiz with the chosen number of questions
   - Default selection: 10

2. QUESTION SCREEN (QuizQuestion)
   - Shows current question number and total: "Fråga 3 av 10"
   - A progress bar at the top showing how far through the quiz the user is
   - Renders <AnalogClock> in display mode with a randomly generated time
   - The random time must always snap to a 5-minute interval (e.g. 03:25, not 03:27)
   - Below the clock: 5 answer buttons in a vertical list
   - One button shows the correct Swedish time text (from getSwedishClockText)
   - Four buttons show plausible wrong answers — other Swedish time strings that are
     not the correct answer, chosen so they are meaningfully different from each other
   - The 5 options must be shuffled randomly before display
   - When user taps an answer:
     - Correct: button turns green, show a small checkmark, short pause (800ms), then next question
     - Wrong: tapped button turns red, correct button turns green, short pause (1200ms), then next question
   - No way to go back to a previous question

3. RESULT SCREEN (QuizResult)
   - Shows score: "Du fick 8 av 10 rätt!"
   - A simple visual indicator of the score (e.g. filled stars out of 5, 
     or a colored circle with the percentage)
   - A message based on score:
     - 100%       → "Perfekt! Du kan klockan! ⭐⭐⭐"
     - 70–99%     → "Bra jobbat! Öva lite till! ⭐⭐"
     - below 70%  → "Fortsätt öva, du klarar det! ⭐"
   - Two buttons: "Försök igen" (same question count, new quiz) and "Tillbaka" (back to home)

---

### Wrong answer generation

Add a function to src/utils/clockHelpers.ts:
getWrongAnswers(correctHours: number, correctMinutes: number, count: number): string[]

Rules:
- Generate candidate times by stepping through all 5-minute intervals on the clock
- Exclude the correct time
- Pick `count` answers that are spread out (not all clustered near the correct time)
- Return Swedish text strings using getSwedishClockText()

---

### State management

Manage quiz state locally in src/app/quiz.tsx using useState:

type QuizState = {
  phase: "setup" | "question" | "result"
  totalQuestions: number
  currentIndex: number
  correctCount: number
  currentHours: number
  currentMinutes: number
  options: string[]          // 5 shuffled answer strings
  answered: boolean
}

Generate all random times upfront when quiz starts (array of {hours, minutes} objects)
so the user cannot get the same time twice in one quiz session.

---

### Utility additions in src/utils/clockHelpers.ts

Add:
- getRandomClockTime(): { hours: number, minutes: number }
  Returns a random time snapped to a 5-minute interval, hours 1–12

- generateQuizTimes(count: number): { hours: number, minutes: number }[]
  Returns `count` unique times with no repeats within the same array

---

### Done when:
- User can pick a question count and start the quiz
- Each question shows a random clock with 5 answer options
- Correct/wrong feedback is visible before moving on
- Final result screen shows score and correct message
- "Försök igen" starts a fresh quiz with the same count
- No TypeScript errors