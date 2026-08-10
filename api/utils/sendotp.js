import nodemailer from 'nodemailer';

const sendOTP = async (email, otp) => {
   // transporter code
   const name="nandanmali5624@gmail.com", password ='ujidvhmgkrzfvbhs';
   const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: name,
    pass: password
  }
});

await transporter.sendMail({
  from: name,
  to: email,
  subject: "Email Verification OTP",
  html: `
    <h2>Verify Your Account</h2>
    <p>Your OTP is:</p>
    <h1>${otp}</h1>
    <p>Valid for 10 minutes.</p>
  `
});
};

export default sendOTP;