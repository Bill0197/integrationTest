const assert = require('assert')
const puppeteer = require('puppeteer')

const login = async (request, page, browser) => {
  console.log('logging in...')
  await page.waitForSelector('input[name="email"]')
  await page.type('input[name="email"]', request.body.username)

  await page.waitForSelector('input[name="password"]')
  await page.type('input[name="password"]', request.body.password)

  await page.click('div form button')

  // await page.waitForTimeout(1500)
  it('should find an err msg', async () => {
    expect(await page.$('#modalForLoginError')).toBeTruthy()
    await page.waitForSelector('#modalForLoginError')
    const errMsg = await page.$eval(
      '#modalForLoginError',
      (err) => err.textConent
    )
    console.log(errMsg, 'errMsg')
  })

  if ((await page.url()) !== 'http://localhost:3000/#/') {
    return console.log('login failed!')
  } else {
    return console.log('logged in')
  }
}

module.exports = login
