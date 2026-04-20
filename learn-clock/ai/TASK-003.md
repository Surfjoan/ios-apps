## Task 1.3 — Swedish Clock Text Helper

Create a pure utility function that converts hours and minutes to Swedish clock speech.

File: src/utils/clockHelpers.ts

Export a function: getSwedishClockText(hours: number, minutes: number): string

Rules (minutes always snap to nearest 5):
- :00 → "Prick [hour]"          e.g. "Prick tre"
- :05 → "Fem över [hour]"
- :10 → "Tio över [hour]"
- :15 → "Kvart över [hour]"
- :20 → "Tjugo över [hour]"
- :25 → "Fem i halv [hour+1]"
- :30 → "Halv [hour+1]"
- :35 → "Fem över halv [hour+1]"
- :40 → "Tjugo i [hour+1]"
- :45 → "Kvart i [hour+1]"
- :50 → "Tio i [hour+1]"
- :55 → "Fem i [hour+1]"

Hour names in Swedish (1–12):
ett, två, tre, fyra, fem, sex, sju, åtta, nio, tio, elva, tolv

Also export: getDigitalClockText(hours: number, minutes: number): string
Returns format "03:30"

Write a simple test file src/utils/clockHelpers.test.ts that verifies at least:
- (3, 0)  → "Prick tre"
- (3, 30) → "Halv fyra"
- (3, 45) → "Kvart i fyra"
- (5, 25) → "Fem i halv sex"
- (11, 55) → "Fem i tolv"

Done when: all tests pass with `npx jest`.