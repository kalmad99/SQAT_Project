const express = require('express')
const app = express();
const cors = require('cors')

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }))

const authRouter = require('./controllers/authController');
const ideaRouter = require('./controllers/ideaController');
const voterRouter = require('./controllers/voterController');
const voteRouter = require('./controllers/voteController');
const candidateRouter = require('./controllers/candidateController');
const electionRouter = require('./controllers/electionController');
const resultRouter = require('./controllers/resultController')

// app.use('/auth', authRouter)
app.use('/login', authRouter)
app.use('/ideas', ideaRouter)
app.use('/voters', voterRouter)
app.use('/candidates', candidateRouter)
app.use('/elections', electionRouter)
app.use('/results', resultRouter)
app.use('/vote', voteRouter)

module.exports = app;