const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const tokenExtractor = (req, res, next) => {
  console.log("the tokenExtractor rneterd");

  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  }
  next();
};

const userExtractor = (req, res, next) => {
  console.log("the userextrracrorte rneterd");
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    const decodedToken = jwt.verify(req.token, config.SECRET);
    console.log("the tokenExtractor in", decodedToken);
    if (!decodedToken.id) {
      res.status(401).json({ error: "token missing or invalid" });
    }
    req.user = decodedToken;
  }
  next();
};

module.exports = {
  tokenExtractor,
  userExtractor,
};
