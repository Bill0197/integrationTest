const newSearch = async (req, page, browser) => {
  console.log('Creating a new search...')
  await page.waitForSelector('[href="#/newsearch"] button', { timeout: 3000 })
  await page.click('[href="#/newsearch"] button')

  await page.waitForTimeout(1500)

  await page.click('input[placeholder="origin"]')
  await page.type('input[placeholder="origin"]', req.body.origin)

  if (req.body.originDeadhead) {
    const pDeadhead = await page.$('select[name="pickUpDeadhead"]')
    await pDeadhead.select(req.body.originDeadhead)
  }

  if (req.body.destination) {
    await page.click('input[placeholder="destination"]')
    await page.type('input[placeholder="destination"]', req.body.destination)
  }

  await page.waitForTimeout(1500)
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')

  if (req.body.destinationDeadhead) {
    const dDeadhead = await page.$('select[name="destinationDeadHead"]')
    await dDeadhead.select(req.body.destinationDeadhead)
  }

  console.log('Selecting...')

  await page.waitForTimeout(2000)

  await page.waitForSelector('select[name="equipment"]')

  await page.click('select[name="equipment"]')

  const equip = await page.$('select[name="equipment"]')

  await equip.select(req.body.equipment.toUpperCase())

  await page.click('#search_input')

  await page.waitForTimeout(1000)

  await page.keyboard.press('Enter')

  await page.click('#newSearchContainer button')
}

const otherFuncs = async (req, page, browser) => {
  await page.waitForTimeout(2000)
  await page.click('#mySidebar a:nth-child(2)')
  let searchesExist = true
  try {
    await page.waitForSelector('[href="#/newsearch"]', {
      timeout: 3000,
    })

    console.log('No searches...')
    searchesExist = false
    await page.waitForTimeout(2000)
  } catch (error) {
    console.log('There are searches...')
    searchesExist = true
  }
  !searchesExist && (await newSearch(req, page, browser))
}

module.exports = otherFuncs
