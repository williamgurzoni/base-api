const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Temp
  next();
  return;

  if (req.url === "/api/user/login") return next();

  let token = req.headers.authorization;

  if (!token) return res.status(401).send({ error: "Token not provided" });

  token = token.trim().split(" ");

  if (token.length !== 2)
    return res.status(401).send({ error: "Bad formated" });

  if (token[0] !== "Bearer")
    return res.status(401).send({ error: "Bad formated" });

  try {
    const data = jwt.verify(token[1], process.env.JWT_KEY);
    req.userId = data.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Invalid Token" });
  }
};
