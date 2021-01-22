const puppeteer = require('puppeteer')
const main = require('./localhostTest/index')

const scraper = async (request) => {
  try {
    console.log('Executing the browser...')

    const browser = await puppeteer.launch({
      args: [
        '--window-size=1440,810',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-infobars',
        '--window-position=0,0',
        '--ignore-certifcate-errors',
        '--ignore-certifcate-errors-spki-list',
        '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36',
      ],
      headless: false,
      slowMo: 1,
      defaultViewport: null,
      ignoreHTTPSErrors: true,
      stealth: true,
      ignoreDefaultArgs: ['--enable-automation'],
    })
    const page = await browser.newPage()
    page.viewport({
      width: 1024 + Math.floor(Math.random() * 100),
      height: 768 + Math.floor(Math.random() * 100),
    })
    page.setDefaultNavigationTimeout(0)

    console.log(`Started ${await browser.version()}`)

    await main(request, page, browser)
  } catch (err) {
    console.error(err)
  }
}

module.exports = scraper
