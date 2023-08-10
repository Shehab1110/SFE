const sgMail = require('@sendgrid/mail');

const emailSender = function (user, subject, text, html) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: `${user.email}`, // Change to your recipient
    from: 'sfe.shopify@gmail.com', // Change to your verified sender
    subject,
    text,
    html,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
};

exports.sendSignupEmail = async function (newUser) {
  await emailSender(
    newUser,
    'Welcome to Beautify!',
    `Dear ${newUser.name}},
    Thank you for signing up for Beautify! We are excited to have you on board.
    To get started, please log in to your account using the credentials you provided during the sign-up process. 
    If you have any questions or concerns, please don't hesitate to reach out to our support team at sfe.shopify@gmail.com.
    We hope you enjoy using Beautify and look forward to helping you achieve your goals.
    Best regards,
    Shehab Ashraf
    Beautify Team`,
    `<p>Dear ${newUser.name},</p>
    <p>Thank you for signing up for Beautify! We are excited to have you on board.</p>
    <p>To get started, please log in to your account using the credentials you provided during the sign-up process.</p>
    <p>If you have any questions or concerns, please don't hesitate to reach out to our support team at sfe.shopify@gmail.com
    We hope you enjoy using Beautify and look forward to helping you achieve your goals.</p>
    <p>Best regards,</p>
    <p>Shehab Ashraf</p>
    <p>Beautify Team</p>
    `
  );
};

exports.sendForgotPasswordEmail = async function (user, resetURL) {
  const message = `Forgot your password? Submit a patch request with your new password and password confirm to: ${resetURL}. \nIf you didn't forget your password, please ignore this email.`;

  await emailSender(
    user,
    'Your password reset token (Valid for 10 min)',
    message,
    message
  );
};
