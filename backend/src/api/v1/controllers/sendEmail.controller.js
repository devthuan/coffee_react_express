const { SendEmailService } = require("../services/sendEmail.server");
const { setDataIntoRedis } = require("../services/redis.services");
const { hashPassword } = require("../services/auth.service");

const SendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        error: "Thiếu giá trị!",
      });
    }

    const num = Math.floor(Math.random() * (999999 - 100000) + 100000);
    const otp = num.toString();

    const hashOTP = await hashPassword(otp);

    setDataIntoRedis(`otp:${email}`, hashOTP, 60);

    const response = await SendEmailService(email, otp);

    if (res && res.status) {
      return res.status(200).json({
        response,
      });
    } else {
      throw new Error("Đối tượng res không được định nghĩa đúng cách.");
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  SendEmail,
};
