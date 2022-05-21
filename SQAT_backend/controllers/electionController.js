const express = require('express')
const router = express.Router()
const Election = require('../models/election')
const Voter = require('../models/voter')
const Candidate = require('../models/candidate')
const cors = require('cors')

//get all elections
router.get('/', cors(), async (req, res, next) => {
    try {
        var elections = await Election.find({});
        res.json({
            status: 'success',
            code: 200,
            data: elections
        })
    } catch (e) {
        res.json({
            status: 'failed',
            code: 400,
            message: e,
        });
    }
});

//add new election
router.post('/', cors(), async function(req, res, next){
    const voters = await Voter.find({dept: 1, year: req.body.batch, section: req.body.section})
    const candidates = await Candidate.find({dept: 1, year: req.body.batch, section: req.body.section})
    const election = new Election({
        name: "Software Department Year-" + req.body.batch + " Section-" + req.body.section + " election",
        type: req.body.type,
        department: 1,
        batch: req.body.batch,
        section: req.body.section,
        voters: voters,
        candidates: candidates,
    })
    try{
        const newElection = await election.save()
        res.json({
            status: 'success',
            code: 201,
            message: "Election Added",
            data: newElection
        })
    } catch(err){
        res.status(400).json({message: err.message});
    }
});
module.exports = router