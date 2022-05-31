const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const Election = require("../models/election");
const Voter = require("../models/voter");
const Candidate = require("../models/candidate");
var cors = require("cors");

const deptTypes = [
  "Software Engineering",
  "Biomedical Engineering",
  "Chemical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
];
//get all elections
router.get('/', async (req, res, next) => {
  try {
    let query = {}
    if (req.query.query) {
      query.$or = [
        { "name": { $regex: req.query.query, $options: 'i' } },
      ]
    }
    var elections = await Election.find(query);
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

// get election detail
router.get('/:id', async (req, res, next) => {
  try {
    var election = await Election.findById(req.params.id);
    res.json({
      status: 'success',
      code: 200,
      data: election
    })
  } catch (e) {
    res.json({
      status: "failed",
      code: 500,
      message: "Election doesn't exist!"
    })
  }
});

//add new election
router.post("/", async function (req, res, next) {
  const voters = await Voter.find({
    dept: req.body.dept-1,
    year: req.body.batch,
    section: req.body.section,
  });
  const candidates = await Candidate.find({
    dept: req.body.dept-1,
    year: req.body.batch,
    section: req.body.section,
  });

  const electionName =
    deptTypes[req.body.dept-1] +
    " Year-" +
    req.body.batch +
    " Section-" +
    req.body.section +
    " election";

    // await Election.remove();

  var check = await Election.findOne({ name: electionName });
  if (check) {
    return res.status(404).send("Election Already Exists!");
  }

  const election = new Election({
    name: electionName,
    type: req.body.type,
    department: req.body.dept-1,
    batch: req.body.batch,
    section: req.body.section,
    voters: voters,
    candidates: candidates,
  });
  try {
    const newElection = await election.save();
    res.json({
      status: "success",
      code: 201,
      message: "Election Added",
      data: newElection,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Vote
router.patch('/', async function (req, res, next) {
  const election = await Election.findOne({
      _id: req.body.electionId
  });

  if (!election) {
      return res.status(400).send("Election doesn't Exist!");
  } else {
      console.log(election)
      for (var i=0; i < election.candidates.length; i++){
          if (election.candidates[i]._id.equals(req.body.candidateId)){
              console.log("Here")
              election.candidates[i].voteCount += 1
              election.markModified('candidates');
          }
      }
      console.log("After", election)
  }
  try {
      const updatedElection = await election.save()
      res.json({
          status: 'success',
          code: 204,
          message: "Vote Successful",
          data: updatedElection
      })
  } catch (err) {
      res.status(400).json({ message: "Can't Vote" })
  }
})
module.exports = router;
