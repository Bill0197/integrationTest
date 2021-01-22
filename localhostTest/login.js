const login = async (request, page, browser) => {
  console.log('logging in...')
  await page.waitForSelector('input[name="email"]')
  await page.type('input[name="email"]', request.body.username)

  await page.waitForSelector('input[name="password"]')
  await page.type('input[name="password"]', request.body.password)

  await page.click('div form button')

  await page.waitForTimeout(3000)

  if ((await page.url()) !== 'http://localhost:3000/#/') {
    return console.log('login failed!')
  } else {
    return console.log('logged in')
  }
}

module.exports = login
