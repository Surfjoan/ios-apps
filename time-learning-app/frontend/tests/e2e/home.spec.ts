import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display the home page correctly', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Lär dig läsa klockan!' })).toBeVisible()
    
    await expect(page.getByRole('link', { name: 'Lär' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Öva' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Spela' })).toBeVisible()
  })

  test('should navigate to learn page when clicking Lär', async ({ page }) => {
    await page.getByRole('link', { name: 'Lär' }).click()
    
    await expect(page).toHaveURL('/learn')
    await expect(page.getByRole('heading', { name: 'Välj nivå' })).toBeVisible()
  })

  test('should navigate to practice page when clicking Öva', async ({ page }) => {
    await page.getByRole('link', { name: 'Öva' }).click()
    
    await expect(page).toHaveURL('/practice')
    await expect(page.getByRole('heading', { name: 'Övningar' })).toBeVisible()
  })

  test('should navigate to play page when clicking Spela', async ({ page }) => {
    await page.getByRole('link', { name: 'Spela' }).click()
    
    await expect(page).toHaveURL('/play')
    await expect(page.getByRole('heading', { name: 'Spel' })).toBeVisible()
  })

  test('should show progression card', async ({ page }) => {
    await expect(page.getByText('Din progression')).toBeVisible()
    await expect(page.getByText('Fortsätt öva för att låsa upp nya nivåer och samla stjärnor!')).toBeVisible()
  })

  test('should have working navigation menu', async ({ page }) => {
    // Test navigation menu
    await expect(page.getByRole('link', { name: 'Hem' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Lär' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Öva' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Spela' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Förälder' })).toBeVisible()
  })

  test('should navigate to home when clicking logo', async ({ page }) => {
    // Click on logo to go home
    await page.getByRole('link', { name: 'Klockan' }).click()
    
    await expect(page).toHaveURL('/')
    await expect(page.getByRole('heading', { name: 'Lär dig läsa klockan!' })).toBeVisible()
  })
})
