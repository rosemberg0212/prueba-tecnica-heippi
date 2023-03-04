const { Usuario, Token } = require('../models')
const crypto = require('crypto')
const { Router } = require('express');
const sendEmail = require('../helpers/sendEmail');
const bcryptjs = require('bcryptjs');

const router = Router();
router.post('/', async (req, res) => {
    try {
        const user = await Usuario.findOne({ correo: req.body.correo })
        if (!user) {
            return res.status(400).send('no existe un usuario con este correo')
        }

        let token = await Token.findOne({ userId: user._id })
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString('hex')
            }).save()
        }

        const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`
        await sendEmail(user.correo, 'password reset', link)

        res.send('enlace de restablecimiento de contraseña enviado a su cuenta de correo electrónico.')
    } catch (error) {
        res.send('un error ha ocurrido')
        console.log(error)
    }

})

router.post('/:userId/:token', async (req, res) => {
    try {
        const user = await Usuario.findById(req.params.userId)
        if(!user) return res.status(400).send('invalid link or expired')

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        })
        if(!token) return res.status(400).send('invalid link or expired')
        const {password} = req.body;
        // user.password = password
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
        await user.save();
        await token.delete()

        res.send('contraseña cambiada con exito.')
    } catch (error) {
        res.send('un error ha ocurrido')
        console.log(error)
    }
})

module.exports = router