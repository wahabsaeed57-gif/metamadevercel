export const otpTemplate = (otp) => {
  return `
  <div style="font-family: Arial; padding:20px; background:#f4f4f4;">
    <div style="max-width:500px; margin:auto; background:#fff; padding:30px; border-radius:10px; text-align:center;">

      <h2>Password Reset OTP</h2>

      <p>Your OTP code is:</p>

      <div style="font-size:28px; font-weight:bold; color:#2d89ef; letter-spacing:5px;">
        ${otp}
      </div>

      <p>This code will expire in <b>5 minutes</b>.</p>

    </div>
  </div>
  `;
};
