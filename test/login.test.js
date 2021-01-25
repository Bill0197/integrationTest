const assert = require('assert')
const puppeteer = require('puppeteer')

jest.setTimeout(100000)

let browser, page

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 55,
    defaultViewport: null,
    ignoreHTTPSErrors: true,
    stealth: true,
    ignoreDefaultArgs: ['--enable-automation'],
    args: [
      '--window-size=1440,810',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--no-sandbox',
      '--disable-infobars',
      '--window-position=0,0',
      '--ignore-certifcate-errors',
      '--ignore-certifcate-errors-spki-list',
      '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36',
    ],
  })
  page = await browser.newPage()
  page.viewport({
    width: 1024 + Math.floor(Math.random() * 100),
    height: 768 + Math.floor(Math.random() * 100),
  })
  await page.goto('http://localhost:3000/login')
})

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

  await page.waitForTimeout(2000)

  assert(url !== 'http://localhost:3000/')
})

// test creating new search
test('test create new search', async () => {
  await page.waitForSelector('[href="#/newsearch"] button', { timeout: 4000 })
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
