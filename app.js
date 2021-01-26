// const puppeteer = require('puppeteer')
// const main = require('./localhostTest/index')
const assert = require('assert')
const puppeteer = require('puppeteer')

jest.setTimeout(100000)

let browser, page

const BeforeAll = () => {
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
}

const AfterAll = () => {
  afterAll(async () => {
    browser.close()
    console.log('Closed browser')
  })
}

module.exports = {
  preset: 'jest-puppeteer',
}
module.exports = {
  BeforeAll,
  AfterAll,
  page,
  browser,
}
