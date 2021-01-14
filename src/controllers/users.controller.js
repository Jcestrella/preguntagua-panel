const usersCtrl = {};
const User = require('../models/User');
const passport = require('passport');

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.signup = async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if (password != confirm_password) {
        errors.push({ text: 'Las contraseñas no coinciden' });
    }
    if (password.length < 8) {
        errors.push({ text: 'La contraseñe debe tener al menos 8 caracteres' });
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email
        })
    } else {
        const emailUser = await User.findOne({ email });
        if (emailUser) {
            req.flash('error_msg', 'El correo ya ha sido utilizado');
            res.redirect('/users/signup');
        } else {
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Te has registrado satisfactoriamente');
            res.redirect('/users/signin');
        }
    }
    console.log(req.body);
    //res.send('received')
};

usersCtrl.renderSignInForm = (req, res) => {
    res.render('users/signin')
};

usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/preguntas',
    failureFlash: true
});

usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'Sesión Cerrada');
    res.redirect('/users/signin');
};
module.exports = usersCtrl;