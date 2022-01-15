const { promisify } = require("util");
const jwt = require("jsonwebtoken");

export const signToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export async function verifyToken(token) {
  try {
    return await promisify(jwt.verify)(
      token,
      process.env.NEXT_PUBLIC_JWT_SECRET
    );
  } catch (error) {
    console.log({ error });
    return false;
  }
}
