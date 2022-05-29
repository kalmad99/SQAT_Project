const { Router } = require('express')
const router = Router();
const Admin = require('../models/admin')
const User = require('../models/user')
// const verifyToken = require('./verifyToken')
const jwt = require('jsonwebtoken')
const config = require('../config')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid');
const { send_magic_link } = require('./emailController')
var cors = require('cors')


// Login router
router.post('/:email/:link', cors(), async (req, res) => {
    const { email, magicLink } = req.params;
    console.log(email)
    if (!email)
        return res.json({ ok: false, message: "Email field is required" });
    try {
        const user = await User.findOne({ email: email });
        console.log(user)
        if (!magicLink) {
            console.log("No magic")
            try {
                const user = await User.findOneAndUpdate(
                    { email: email },
                    { magicLink: uuidv4(), magicLinkExpired: false },
                    { returnDocument: 'after' }
                );
                // send email with magic link
                console.log(user)
                await send_magic_link(email, user.magicLink)
                res.send({ ok: true, message: 'Hit the link in email to sign in' })
            } catch {
                res.status(500).send('Plese try again , "Can not Login"');
            }
        } else if (user.magicLink == magicLink && !user.magicLinkExpired) {
            const token = jwt.sign(user.toJSON(), config.secret, { expiresIn: "1h" }); //{expiresIn:'365d'}
            await User.findOneAndUpdate(
                { email: email },
                { magicLinkExpired: true }
            )
            res.json({ ok: true, message: "Welcome back", token, email });
        } else {
            return res.json({ ok: false, message: "Magic link expired or incorrect" });
        }
    } catch (error) {
        res.json({ ok: false, error });
    };
});

router.post('/admin-login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("email--", email, password)
        console.log("password--", password)
        console.log("req.body--", req.body)
        const admin = await Admin.findOne({ email: email })
        console.log("Admin--", admin)
        if (!admin) {
            return res.status(404).send("Email/Password is Incorrect");
        }
        const validPassword = await bcrypt.compare(req.body.password, admin.password);
        if (!validPassword) {
            return res.status(404).send("Email/Password is Incorrect")
        } else {
            const token = jwt.sign({ id: admin._id }, config.secret, {
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

router.post('/logout', function (req, res) {
    res.status(200).send({ auth: false, token: null });

});

const verify_token = (req, res) => {
	console.log(req.headers.authorization);
	const token = req.headers.authorization;
	jwt.verify(token, config.secret, (err, succ) => {
		err
		? res.json({ ok: false, message: "something went wrong" })
		: res.json({ ok: true, succ });
	});
};

module.exports = router;