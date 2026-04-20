// Swedish hour names (1-12, where 1 = 13:00, 2 = 14:00, etc.)
const SWEDISH_HOURS = [
  'tolv', 'ett', 'två', 'tre', 'fyra', 'fem', 'sex',
  'sju', 'åtta', 'nio', 'tio', 'elva', 'tolv'
];

export function getSwedishClockText(hours: number, minutes: number): string {
  // Normalize hours to 0-23 range
  hours = hours % 24;

  // Convert to 12-hour format for display
  let displayHour = hours % 12;
  if (displayHour === 0) displayHour = 12;

  // Round minutes to nearest 5
  const roundedMinutes = Math.round(minutes / 5) * 5;

  // Handle different time expressions
  if (roundedMinutes === 0) {
    return `Prick ${SWEDISH_HOURS[displayHour]}`;
  }

  if (roundedMinutes === 5) {
    return `Fem över ${SWEDISH_HOURS[displayHour]}`;
  }

  if (roundedMinutes === 10) {
    return `Tio över ${SWEDISH_HOURS[displayHour]}`;
  }

  if (roundedMinutes === 15) {
    return `Kvart över ${SWEDISH_HOURS[displayHour]}`;
  }

  if (roundedMinutes === 20) {
    return `Tjugo över ${SWEDISH_HOURS[displayHour]}`;
  }

  if (roundedMinutes === 25) {
    const nextHour = (displayHour % 12) + 1;
    return `Fem i halv ${SWEDISH_HOURS[nextHour]}`;
  }

  if (roundedMinutes === 30) {
    const nextHour = (displayHour % 12) + 1;
    return `Halv ${SWEDISH_HOURS[nextHour]}`;
  }

  if (roundedMinutes === 35) {
    const nextHour = (displayHour % 12) + 1;
    return `Fem över halv ${SWEDISH_HOURS[nextHour]}`;
  }

  if (roundedMinutes === 40) {
    const nextHour = (displayHour % 12) + 1;
    return `Tjugo i ${SWEDISH_HOURS[nextHour]}`;
  }

  if (roundedMinutes === 45) {
    const nextHour = (displayHour % 12) + 1;
    return `Kvart i ${SWEDISH_HOURS[nextHour]}`;
  }

  if (roundedMinutes === 50) {
    const nextHour = (displayHour % 12) + 1;
    return `Tio i ${SWEDISH_HOURS[nextHour]}`;
  }

  if (roundedMinutes === 55) {
    const nextHour = (displayHour % 12) + 1;
    return `Fem i ${SWEDISH_HOURS[nextHour]}`;
  }

  // Fallback for edge cases
  return `${displayHour}:${minutes.toString().padStart(2, '0')}`;
}

export function getDigitalClockText(hours: number, minutes: number): string {
  const displayHour = hours % 24;
  const displayMinutes = minutes % 60;
  return `${displayHour.toString().padStart(2, '0')}:${displayMinutes.toString().padStart(2, '0')}`;
}

export function getRandomClockTime(): { hours: number; minutes: number } {
  // Generate random hours (1-12) and minutes (0-55, snapped to 5-minute intervals)
  const hours = Math.floor(Math.random() * 12) + 1;
  const minutes = Math.floor(Math.random() * 12) * 5; // 0, 5, 10, ..., 55
  return { hours, minutes };
}

export function generateQuizTimes(count: number): { hours: number; minutes: number }[] {
  const times: { hours: number; minutes: number }[] = [];
  const used = new Set<string>();

  while (times.length < count) {
    const time = getRandomClockTime();
    const key = `${time.hours}:${time.minutes}`;
    
    if (!used.has(key)) {
      used.add(key);
      times.push(time);
    }
  }

  return times;
}

export function getWrongAnswers(correctHours: number, correctMinutes: number, count: number): string[] {
  const wrongAnswers: string[] = [];
  const candidates: { hours: number; minutes: number }[] = [];

  // Generate all possible 5-minute interval times
  for (let h = 1; h <= 12; h++) {
    for (let m = 0; m < 60; m += 5) {
      if (h !== correctHours || m !== correctMinutes) {
        candidates.push({ hours: h, minutes: m });
      }
    }
  }

  // Shuffle candidates and pick spread out answers
  candidates.sort(() => Math.random() - 0.5);

  // Try to pick answers that are spread out from the correct time
  const correctTotal = correctHours * 60 + correctMinutes;
  const sorted = candidates.sort((a, b) => {
    const aDiff = Math.abs((a.hours * 60 + a.minutes) - correctTotal);
    const bDiff = Math.abs((b.hours * 60 + b.minutes) - correctTotal);
    return aDiff - bDiff;
  });

  // Pick some from different distance ranges
  const ranges = [
    sorted.slice(0, Math.min(10, sorted.length)),
    sorted.slice(Math.max(0, sorted.length - 10), sorted.length)
  ];

  const pool = [...ranges[0], ...ranges[1]];
  pool.sort(() => Math.random() - 0.5);

  for (let i = 0; i < Math.min(count, pool.length); i++) {
    wrongAnswers.push(getSwedishClockText(pool[i].hours, pool[i].minutes));
  }

  return wrongAnswers;
}
