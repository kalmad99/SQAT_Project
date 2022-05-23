const { Router } = require('express')
const router = Router();
const User = require('../models/user')
// const verifyToken = require('./verifyToken')
const jwt = require('jsonwebtoken')
const config = require('../config')
const bcrypt = require('bcryptjs')
var cors = require('cors')


// Login router
router.post('/', cors(), async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).send("Email/Password is Incorrect");
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).send("Email/Password is Incorrect")
        } else {
            const token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: '24h'
            });
            res.status(200).json({ auth: true, token });

        }
    } catch (e) {
        console.log(e)
        res.status(500).send('Plese try again , "Can not Login"');
    }

});

// Logout router

router.get('/logout', function (req, res) {
    res.status(200).send({ auth: false, token: null });

});



module.exports = router;