const assert = require('assert')
const puppeteer = require('puppeteer')
const { BeforeAll, AfterAll, browser, page } = require('../app')
jest.setTimeout(100000)

BeforeAll()
AfterAll()

// testing login
test('test login', async () => {
  await page.waitForSelector('input[name="email"]')
  await page.type('input[name="email"]', 'khabibullosaydullaev@gmail.com')

  await page.waitForSelector('input[name="password"]')
  await page.type('input[name="password"]', '111111')

  await page.click('div form button')

  await page.waitForTimeout(5000)

  await page.waitForSelector('#sideBarWrapper')

  const url = await page.url()

  await page.waitForTimeout(4000)

  assert(url !== 'http://localhost:3000/')
})

it('should find text "Loadboard"', async () => {
  const text = await page.evaluate(() => document.body.textContent)
  expect(text).toContain('Loadboard')
})

// test creating new search
test('test create new search', async () => {
  await page.waitForSelector('[href="#/newsearch"] button', { timeout: 10000 })
  await page.click('[href="#/newsearch"] button')

  await page.waitForTimeout(1500)

  await page.waitForSelector('#search_input', { timeout: 4000 })

  await page.click('#search_input')

  await page.waitForTimeout(1000)

  await page.keyboard.press('Enter')

  await page.click('input[placeholder="origin"]')
  await page.type('input[placeholder="origin"]', 'Sacramento, CA')

  const pDeadhead = await page.$('select[name="pickUpDeadhead"]')
  await pDeadhead.select('300')

  await page.click('input[placeholder="destination"]')
  await page.type('input[placeholder="destination"]', 'Newark, NJ')

  await page.waitForTimeout(1500)
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')

  const dDeadhead = await page.$('select[name="destinationDeadHead"]')
  await dDeadhead.select('300')

  await page.waitForTimeout(2000)

  await page.waitForSelector('select[name="equipment"]')

  await page.click('select[name="equipment"]')

  await page.keyboard.press('ArrowDown')

  await page.keyboard.press('Enter')

  await page.waitForTimeout(2000)

  await page.click('#newSearchContainer button')

  const url = await page.url()

  await page.waitForTimeout(2000)

  assert(url !== 'http://localhost:3000/#/searches')
})

// delete the search
it('should delete search', async () => {
  await page.waitForSelector('[href="#/newsearch"] button', { timeout: 10000 })
  await page.click('[href="#/newsearch"] button')

  await page.waitForTimeout(1500)

  await page.click(
    '#SearchCardWrapper > div > div.sc-crrsfI.DjvNf > button:nth-child(3) > span:nth-child(2)'
  )

  await page.waitForSelector(
    '#DeleteModalContent > div:nth-child(2) > button.sc-dlfnbm.fLdiGP > span:nth-child(2)'
  )

  await page.waitForTimeout(1500)

  await page.click(
    '#DeleteModalContent > div:nth-child(2) > button.sc-dlfnbm.fLdiGP > span:nth-child(2)'
  )

  const text = await page.evaluate(() => document.body.textContent)
  expect(text).toContain('No active searches found.')
})
