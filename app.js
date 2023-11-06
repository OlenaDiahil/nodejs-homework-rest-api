const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const authRouter = require('./routes/api/users')
const contactsRouter = require('./routes/api/contacts')
const path = require('path')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/public/avatars', express.static(path.join(__dirname, 'public/avatars')))
app.use('/api/contacts', contactsRouter)
app.use('/api/users', authRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  let { status = 500, message = "Server error" } = err;

  if (message.includes('ENOENT')) {
    message = "Server Error"
  }

  res.status(status).json({ message });
});

module.exports = app
