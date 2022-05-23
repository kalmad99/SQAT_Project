const express = require('express');
const Election = require('../models/election');
const router = express.Router()
const Result = require('../models/result')
var cors = require('cors')


//get election result
router.get('/:id', cors(), async (req, res, next) => {
    try {
        const sort = { voteCount: 1, name: 1 };
        const election = await Election.findOne({_id: req.params.id}).sort(sort)
        var results = [];
        for (var i = 0; i < election.candidates.length; i++) {
            var result = {
                name: election.candidates[i].name,
                fname: election.candidates[i].fname,
                gname: election.candidates[i].gname,
                voteCount: election.candidates[i].voteCount
            };
            results.push(result);
        }
        res.json({
            status: 'success',
            code: 200,
            data: results
        })
    } catch (e) {
        res.json({
            status: 'err',
            code: 500,
            message: e,
        });
    }
});

module.exports = router