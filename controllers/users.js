const User = require('../models/user')


module.exports.renderRegister = (req, res) => {
    res.render('users/register')
}

module.exports.register = async (req, res, next) => {
    try {
        //    do req.body vou querer os seguintes args email username e password
        const { email, username, password } = req.body
        const user = new User({ email, username })
        const registerUser = await User.register(user, password)
        req.login(registerUser, err => {
            if (err) return next(err)
            req.flash('success', 'Welcome to YelpCamp!')
            res.redirect('/campground')
        })

    } catch (e) {
        req.flash('error', e.message)
        res.redirect('register')
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

module.exports.Login = (req, res, next) => {
    req.flash('success', 'Welcome Back!')
    const redirectUrl = req.session.returnTo || '/campground'
    delete req.session.returnTo
    res.redirect(redirectUrl)
}

module.exports.Logout = (req, res) => {
    req.logout()
    req.flash('success', 'Goodbye! Hope to see you soon!')
    res.redirect('/campground')
}

