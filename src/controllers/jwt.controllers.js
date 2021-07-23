require("dotenv").config();
const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET } = process.env;

const JWT_EXPIRY_SECONDS = 600;

function generateAccessToken(data) {
  return jwt.sign(data, ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: JWT_EXPIRY_SECONDS,
  });
}

const createToken = (req, res) => {
  console.log(req.admin);

  const admin = { ...req.admin, role: "admin" };
  const token = generateAccessToken({
    mail: admin.mail,
    role: admin.role,
  });
  res.cookie("token", token, {
    maxAge: JWT_EXPIRY_SECONDS * 1000,
    httpOnly: true,
  });
  res.json({ token, admin: { role: admin.role } });
};

const authTokenFromCookie = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.status(401).send("Cookie not set or expired");
  }
  try {
    jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).send("JWT is unauthorized");
    }
    return res.status(400).send("Bad request");
  }
  return next();
};

const refreshToken = (req, res) => {
  console.log("Cookies: ", Object.keys(req.cookies));
  let token = req.cookies.token;
  if (!token) {
    return res.status(401).send("Cookie not set or expired");
  }
  let payload;
  try {
    payload = jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (e) {
    console.log(e);
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).send("JWT is unauthorized");
    }
    return res.status(400).send("Bad request");
  }
  const nowUnixSeconds = Math.round(Number(new Date()) / 1000);
  console.log(`math exp : ${payload.exp - nowUnixSeconds}`);
  if (payload.exp - nowUnixSeconds > 120) {
    console.log(`payload : ${Object.keys(payload)}`);
    return res.json({ token, admin: { role: payload.role } });
  }
  const newToken = jwt.sign(
    { mail: payload.mail, role: payload.role },
    ACCESS_TOKEN_SECRET,
    {
      algorithm: "HS256",
      expiresIn: JWT_EXPIRY_SECONDS,
    }
  );
  res.cookie("token", newToken, { maxAge: JWT_EXPIRY_SECONDS * 1000 });
  return res.json({ token, admin: { role: payload.role } });
};

module.exports = {
  createToken,
  authTokenFromCookie,
  refreshToken,
};
