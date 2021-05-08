const app = require('./app')
const PORT = process.env.PORT

const start = async () => {
  try {
    await app.listen(PORT, '0.0.0.0')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
