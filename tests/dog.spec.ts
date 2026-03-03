import { test, expect } from '@playwright/test'; 

// E2E test
test.describe('Successfully get a random dog image', () => {
    // Test 3
    test('POSITIVE: dog image is retrieved successfully, when page is loaded', async ({ page }) => {
        await page.goto('/')

        const responsePromise = page.waitForResponse('**/api/dogs/random')

        await responsePromise

        const dogImage = page.getByAltText('Random dog')
        await expect(dogImage).toHaveAttribute('src', /^https:\/\/.+/)
    })

    // Test 4
    test('POSITIVE: dog image is retrieved successfully, when button is clicked', async ({ page }) => {
        await page.goto('/')

        const responsePromise = page.waitForResponse('**/api/dogs/random')

        await page.getByRole('button', { name: 'Get Another Dog' }).click()

        await responsePromise

        const dogImage = page.getByAltText('Random dog')
        await expect(dogImage).toHaveAttribute('src', /^https:\/\/.+/)
    })
})

test.describe('Error handling when fetching dog image fails', () => {
    // Test 5
    test('NEGATIVE: verifies correct behaviour, when API call fails', async ({ page }) => {
        await page.route('**/api/dogs/random', route => route.abort());

        await page.goto('/')

        const errorElement = page.getByText(/\berror\b/i)
        await expect(errorElement).toBeVisible()
    })
})

