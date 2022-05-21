// const express = require('express')
// const router = express.Router()
// const Vote = require('../models/vote')


// //cast vote
// router.post('/', async function(req, res, next){
//     const voter = new Voter({
//         name: req.body.name,
//         fname: req.body.fname,
//         gname: req.body.gname,
//         email: req.body.email,
//         id: req.body.id,
//         dept: req.body.dept,
//         sect: req.body.section,
//         year: req.body.year,
//         wallet: req.body.wallet
//     })
//     try{
//         const newVoter = await voter.save()
//         res.json({
//             status: 'success',
//             code: 201,
//             message: "Voter Added",
//             data: newIdea
//         })
//     } catch(err){
//         res.status(400).json({message: err.message});
//     }
// });
// module.exports = router