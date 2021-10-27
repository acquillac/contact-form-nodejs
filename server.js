const express = require('express');
const app = express();

const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/contactform.html')
});

app.post('/', (req, res) => {
  console.log(req.body)

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'user@example.com',
      accessToken: 'ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x'
    }
  })

  const mailOptions = {
      from: req.body.email,
      to: 'user@example.com',
      subject: `Message From ${req.body.email}: ${req.body.subject}`,
      text: req.body.message
  }

  transporter.sendMail(mailOptions, (error, info) => {
      if(error){
        console.log(error);
        res.send('error');
      }else{
        console.log('Email Sent: ' + info.response);
        res.send('success');
      }
  })

})

app.listen(PORT, () =>{
  console.log(`Server running on Port: ${PORT}`)
});