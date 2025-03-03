const loggerMiddleware = (req, res) => {
  console.log(`${req.method} ${req.url}`);
};

module.exports = { loggerMiddleware };
