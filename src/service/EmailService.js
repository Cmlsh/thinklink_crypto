var nodemailer = require('nodemailer'); 
const path = require('path')
const envData = require('dotenv');
envData.config({path: path.resolve(__dirname, '../env/.env')});

/**
 * Initialize email with SMTP details
 */
var transport = nodemailer.createTransport({
    
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  /**
   * Send Email
   * @param {*} subject 
   * @param {*} message 
   */
async function sendMail(subject, message) {

    console.log("Sending email");
    var mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: process.env.RECEIVER_EMAIL,
        subject: subject, //'Alert ! Crypto price updated',
        text: message
    };

    transport.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    }); 
}

/**
 * Notofy user about prices fluctuation
 * @param {*} price 
 */
async function notify(price) {

    if(price > process.env.MAX_PRICE) {
        sendMail("Alert! Crypto price increased", `Current Price ${price}. Max Price ${process.env.MAX_PRICE}`);
    } else if(price < process.env.MAX_PRICE) {
        sendMail("Alert! Crypto price dropped", `Current Price ${price}. Min Price ${process.env.MIN_PRICE}`);
    }
}   

module.exports = {notify};

