# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home Page >> should navigate to learn page when clicking Lär
- Location: tests/e2e/home.spec.ts:16:7

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('link', { name: 'Lär' }) resolved to 3 elements:
    1) <a href="/learn" class="flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900">…</a> aka getByRole('link', { name: 'Lär', exact: true })
    2) <a href="/learn" class="block card hover:shadow-2xl transition-all duration-300 group">…</a> aka getByRole('link', { name: 'Lär Lär dig känna igen' })
    3) <a href="/play" class="block card hover:shadow-2xl transition-all duration-300 group">…</a> aka getByRole('link', { name: 'Spela Lär dig med roliga spel' })

Call log:
  - waiting for getByRole('link', { name: 'Lär' })

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e4]:
    - generic [ref=e6]:
      - link "Klockan" [ref=e7] [cursor=pointer]:
        - /url: /
        - img [ref=e8]
        - text: Klockan
      - generic [ref=e11]:
        - link "Hem" [ref=e12] [cursor=pointer]:
          - /url: /
          - img [ref=e13]
          - text: Hem
        - link "Lär" [ref=e16] [cursor=pointer]:
          - /url: /learn
          - img [ref=e17]
          - text: Lär
        - link "Öva" [ref=e20] [cursor=pointer]:
          - /url: /practice
          - img [ref=e21]
          - text: Öva
        - link "Spela" [ref=e23] [cursor=pointer]:
          - /url: /play
          - img [ref=e24]
          - text: Spela
        - link "Förälder" [ref=e26] [cursor=pointer]:
          - /url: /parent
          - img [ref=e27]
          - text: Förälder
  - main [ref=e30]:
    - generic [ref=e31]:
      - generic [ref=e32]:
        - heading "Lär dig läsa klockan!" [level=1] [ref=e33]
        - paragraph [ref=e34]: En rolig och interaktiv app för att lära barn förstå tid. Välj ett läge och börja din resa!
      - generic [ref=e35]:
        - link "Lär Lär dig känna igen klockan och förstå tid Börja nu" [ref=e37] [cursor=pointer]:
          - /url: /learn
          - img [ref=e39]
          - heading "Lär" [level=2] [ref=e42]
          - paragraph [ref=e43]: Lär dig känna igen klockan och förstå tid
          - generic [ref=e44]:
            - text: Börja nu
            - img [ref=e45]
        - link "Öva Träna på olika tidsuppgifter Börja nu" [ref=e48] [cursor=pointer]:
          - /url: /practice
          - img [ref=e50]
          - heading "Öva" [level=2] [ref=e52]
          - paragraph [ref=e53]: Träna på olika tidsuppgifter
          - generic [ref=e54]:
            - text: Börja nu
            - img [ref=e55]
        - link "Spela Lär dig med roliga spel och utmaningar Börja nu" [ref=e58] [cursor=pointer]:
          - /url: /play
          - img [ref=e60]
          - heading "Spela" [level=2] [ref=e62]
          - paragraph [ref=e63]: Lär dig med roliga spel och utmaningar
          - generic [ref=e64]:
            - text: Börja nu
            - img [ref=e65]
      - generic [ref=e68]:
        - generic [ref=e69]: 🏆
        - generic [ref=e70]:
          - heading "Din progression" [level=3] [ref=e71]
          - paragraph [ref=e72]: Fortsätt öva för att låsa upp nya nivåer och samla stjärnor!
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('Home Page', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto('/')
  6  |   })
  7  | 
  8  |   test('should display the home page correctly', async ({ page }) => {
  9  |     await expect(page.getByRole('heading', { name: 'Lär dig läsa klockan!' })).toBeVisible()
  10 |     
  11 |     await expect(page.getByRole('link', { name: 'Lär' })).toBeVisible()
  12 |     await expect(page.getByRole('link', { name: 'Öva' })).toBeVisible()
  13 |     await expect(page.getByRole('link', { name: 'Spela' })).toBeVisible()
  14 |   })
  15 | 
  16 |   test('should navigate to learn page when clicking Lär', async ({ page }) => {
> 17 |     await page.getByRole('link', { name: 'Lär' }).click()
     |                                                   ^ Error: locator.click: Error: strict mode violation: getByRole('link', { name: 'Lär' }) resolved to 3 elements:
  18 |     
  19 |     await expect(page).toHaveURL('/learn')
  20 |     await expect(page.getByRole('heading', { name: 'Välj nivå' })).toBeVisible()
  21 |   })
  22 | 
  23 |   test('should navigate to practice page when clicking Öva', async ({ page }) => {
  24 |     await page.getByRole('link', { name: 'Öva' }).click()
  25 |     
  26 |     await expect(page).toHaveURL('/practice')
  27 |     await expect(page.getByRole('heading', { name: 'Övningar' })).toBeVisible()
  28 |   })
  29 | 
  30 |   test('should navigate to play page when clicking Spela', async ({ page }) => {
  31 |     await page.getByRole('link', { name: 'Spela' }).click()
  32 |     
  33 |     await expect(page).toHaveURL('/play')
  34 |     await expect(page.getByRole('heading', { name: 'Spel' })).toBeVisible()
  35 |   })
  36 | 
  37 |   test('should show progression card', async ({ page }) => {
  38 |     await expect(page.getByText('Din progression')).toBeVisible()
  39 |     await expect(page.getByText('Fortsätt öva för att låsa upp nya nivåer och samla stjärnor!')).toBeVisible()
  40 |   })
  41 | 
  42 |   test('should have working navigation menu', async ({ page }) => {
  43 |     // Test navigation menu
  44 |     await expect(page.getByRole('link', { name: 'Hem' })).toBeVisible()
  45 |     await expect(page.getByRole('link', { name: 'Lär' })).toBeVisible()
  46 |     await expect(page.getByRole('link', { name: 'Öva' })).toBeVisible()
  47 |     await expect(page.getByRole('link', { name: 'Spela' })).toBeVisible()
  48 |     await expect(page.getByRole('link', { name: 'Förälder' })).toBeVisible()
  49 |   })
  50 | 
  51 |   test('should navigate to home when clicking logo', async ({ page }) => {
  52 |     // Click on logo to go home
  53 |     await page.getByRole('link', { name: 'Klockan' }).click()
  54 |     
  55 |     await expect(page).toHaveURL('/')
  56 |     await expect(page.getByRole('heading', { name: 'Lär dig läsa klockan!' })).toBeVisible()
  57 |   })
  58 | })
  59 | 
```