const puppeteer = require('puppeteer')
const login = require('./login')

const main = async (request, page, browser) => {
  await page.goto('http://localhost:3000/login')
  await login(request, page, browser)
}

module.exports = main
