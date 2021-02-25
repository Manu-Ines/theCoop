
/* ----------------
   - Forgot password
   - 
--------------------- */

module.exports.forgotPassword = (req, res, next) => {
    User
        .findOneAndUpdate({ email: req.body.email }, { token: newToken, active: false }, { runValidators: true, useFindAndModify: false })
        .then((user) => {
                sendChangePassEmailSocial(req.currentUser.email, newToken)
                res.render('/login', { message: 'Se ha enviado un correo de verificación' })
        })
        .catch(e => {
            if (e instanceof mongoose.Error.ValidationError) {
                renderWithErrors(e.errors)
            } else {
                next(e)
            }
        }) 
}

