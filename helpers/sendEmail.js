const nodemailer = require('nodemailer');

module.exports = async (email, subject, text) => {
try {
    const transporter = nodemailer.createTransport({
        host: process.env.HOTS,
        service: process.env.SERVICE,
        port: 587,
        secure: true,
        auth:{
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASS
        }
    })

    await transporter.sendMail({
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: subject,
        text: text
    })

    console.log('email send successfully')
} catch (error) {
    console.log(error, 'email not sent')
}
}