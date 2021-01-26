const assert = require('assert')
const puppeteer = require('puppeteer')

jest.setTimeout(100000)

let browser, page

// before all runs
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 15,
    defaultViewport: null,
    ignoreDefaultArgs: ['--enable-automation'],
    args: ['--window-size=1440,810'],
  })
  page = await browser.newPage()

  await page.goto('http://localhost:3000/login')
})

// after all runs
afterAll(async () => {
  browser.close()
  console.log('Closed browser')
})

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
  await page.waitForTimeout(5000)
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

  const text = await page.evaluate(() => document.body.textContent)

  expect(text).not.toContain(
    '1 active search only! Delete or stop a search in Searches'
  )

  assert(url !== 'http://localhost:3000/#/searches')
})

// delete the search
it('should delete search', async () => {
  await page.waitForTimeout(2000)

  await page.click('[href="#/searches"]')

  await page.waitForSelector(
    '#SearchCardWrapper > div > div.sc-crrsfI.DjvNf > button:nth-child(3)',
    { timeout: 10000 }
  )

  await page.click(
    '#SearchCardWrapper > div > div.sc-crrsfI.DjvNf > button:nth-child(3)'
  )

  await page.waitForTimeout(1500)

  await page.waitForSelector('button.sc-dlfnbm.gNCVe')

  await page.click('button.sc-dlfnbm.gNCVe')

  await page.waitForTimeout(3500)

  const text = await page.evaluate(() => document.body.textContent)

  expect(text).toContain('No active searches found. Start a New Search')
})

// add loadboard
it('should add loadboard', async () => {
  await page.waitForTimeout(2000)

  await page.click('[href="#/settings"]')

  await page.waitForSelector('button.gdtwpF')

  await page.click('button.gdtwpF')

  await page.waitForSelector('[name="loadboard"]')

  await page.click('[name="loadboard"]')

  await page.keyboard.press('ArrowDown')

  await page.keyboard.press('Enter')

  await page.type('input[name="email"]', 'khabibullosaydullaev@gmail.com')

  await page.type('input[name="password"]', '111111')

  await page.click('button.hsXACn')

  await page.waitForTimeout(2000)

  const text = await page.evaluate(() => document.body.textContent)

  expect(text).not.toContain('No Loadboards Yet')
})

// delete loadboard
it('should delete loadboard', async () => {
  await page.waitForTimeout(2000)

  await page.waitForSelector('#buttonsWrapper > button.sc-dlfnbm.gNCVe')

  await page.click('#buttonsWrapper > button.sc-dlfnbm.gNCVe')

  await page.waitForTimeout(1000)

  await page.waitForSelector(
    '#DeleteModalContent > div:nth-child(2) > button.sc-dlfnbm.gNCVe'
  )

  await page.click(
    '#DeleteModalContent > div:nth-child(2) > button.sc-dlfnbm.gNCVe'
  )

  await page.waitForTimeout(2000)

  const text = await page.evaluate(() => document.body.textContent)

  expect(text).toContain('No Loadboards Yet')
})
