const nodemailer = require("nodemailer");

module.exports.sendMail = (email,subject,html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nguyenhuuhung2610db@gmail.com",
      pass: "ctfe swnd ffor xdwl",
    },
  });

  const mailOptions = {
    from: "nguyenhuuhung2610db@gmail.com",
    to: email,
    subject: subject,
    html:html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      // do something useful
    }
  });
};
