const nodemailer = require("nodemailer");
require("dotenv").config();

const SendEmailService = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"devthuan " <devthuan24@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "OTP", // Subject line
    text: `Mã otp của bạn là:`, // plain text body
    html: `<td style="font-size:11px;font-family:LucidaGrande,tahoma,verdana,arial,sans-serif;padding:14px 32px 14px 32px;background-color:#f2f2f2;border-left:1px solid #ccc;border-right:1px solid #ccc;border-top:1px solid #ccc;border-bottom:1px solid #ccc;text-align:center;border-radius:7px;display:block;border:1px solid #1877f2;background:#e7f3ff"><span class="m_4537248143454422342mb_text" style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823"><span style="font-size:17px;font-family:Roboto;font-weight:700;margin-left:0px;margin-right:0px">
    ${otp}
    </span></span></td>`,
  });

  console.log("Message sent: %s", info.messageId);

  return info;
};

module.exports = {
  SendEmailService,
};
