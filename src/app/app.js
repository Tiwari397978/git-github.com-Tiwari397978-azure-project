'use strict'

const express = require('express')
const path = require('path')
const socket = require('socket.io')
const http = require('http')
const app = express()
const server = http.createServer(app)
const io = socket(server)
const cors = require('./cors')
const session = require('./session').session
const AppSockets = require('../server/services/app-sockets')

// session management
app.use(session)
app.use(cors)

app.use('/cdn', express.static(path.join(__dirname, '../', 'client')))

// tell Express to use bodyParser for JSON and URL encoded form bodies
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// loading routers
const userRoutes = require('../server/routes/userRoutes.js').router
const activityRoutes = require('../server/routes/activityRoutes.js')
const authRouter = require('../server/routes/authRoutes.js')
const viewRoutes = require('../server/routes/viewGroupRoutes')
const groupRouter = require('../server/routes/groupRoutes.js').router
const messageRouter = require('../server/routes/message-route')
const invitationRouter = require('../server/routes/invitationRoutes.js').router
const myGroupsRoutes = require('../server/routes/myGroupsRoutes.js')
const covidRouter = require('../server/routes/covidQuestionsRoutes.js')
const applicationRouter = require('../server/routes/applicationRoutes.js')
const loggingRouter = require('../server/routes/loggingRoute')

// mounting routers
app.use('/group', groupRouter)
app.use('/view', viewRoutes)
app.use('/', authRouter)
app.use('/user', userRoutes)
app.use('/activities', activityRoutes)
app.use('/messages', messageRouter)
app.use('/invitations', invitationRouter)
app.use('/myGroups', myGroupsRoutes)
app.use('/covid-questions', covidRouter)
app.use('/group', applicationRouter)
app.use('/logs', loggingRouter)
io.on('connection', AppSockets.connection)
io.on('error', console.error)

module.exports = { app }
