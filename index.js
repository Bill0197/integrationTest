const express = require('express')
const tester = require('./app')
const app = express()

const App = async () => {
  await tester()
}
App()

app.listen(4000, () =>
  console.log('Integration Test is running on port 4000...')
)
