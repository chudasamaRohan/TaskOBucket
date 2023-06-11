const nodemailer = require("nodemailer");

const mailSender = async (from, to, subject, text) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: 'bernie.flatley@ethereal.email',
            pass: 'BW7hqcZVTeBq4fT7Jj'
        },
    });
    let info = await transporter.sendMail({
        from: from, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
    });
    console.log("Message sent: %s", info.messageId);
}
// from: '"Fred Foo 👻" <foo@example.com>', 

module.exports = { mailSender }