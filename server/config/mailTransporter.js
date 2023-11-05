const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
    service: 'qq',
    secure: false, 
    port: 465,
    auth: {
        user: '2504065542@qq.com',
        pass: 'ulpytboaykorecib'
    }
});

let mailDetails = {
    from: '2504065542@qq.com',
    to: 'penghailing012@gmail.com',
    subject: '',
    html: ''
};

const snedMail=async(subject,html,toEmail)=>{
    mailDetails.subject=subject;
    mailDetails.html=html;
    mailDetails.to=toEmail;
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error Occurs');
            console.log(err);
        } else {
            console.log('Email sent successfully');
        }
    });
}

module.exports={
    snedMail
}