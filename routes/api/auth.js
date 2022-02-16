const express = require('express');

const router = express.Router();

const User = require('../../models/User');

const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');

const config = require('config');

const bcrypt = require('bcryptjs');

const {check, validationResult} = require('express-validator');
const res = require('express/lib/response');
//@route GET api/auth
//@desc Test routes
//@access public
router.get('/', auth, async  (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route Post api/auth
//@desc Authentication user & get token
//@access public
router.post('/', [
    check('email', 'Valid Email is Required').isEmail(),
    check('password', 'Password is Required'
    ).exists()
],async(req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, password} =  req.body;

    try{
        let user = await User.findOne({ email});
        if(!user){
           return res.status(400).json({ errors: [ {msg: 'Invalid Credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
           return res.status(400).json({ errors: [ {msg: 'Invalid Credentials' }] });
        }



        const payLoad = {
            user:{
                id: user.id
            }
        }

        jwt.sign(payLoad, config.get('jwtSecret'),
        {expiresIn: 360000},
        (err, token) => {
            if(err) throw err;
            res.json({ token });

        });

        //res.send('User registered');

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }

});


module.exports = router;