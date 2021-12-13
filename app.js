const express = require("express");
const path = require("path");
const app = express();

const helmet = require('helmet')

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "build")));

app.use(
  // [
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", 'https://checkout.stripe.com'],
      frameSrc: ["'self'", 'https://checkout.stripe.com'],
      childSrc: ["'self'", 'https://checkout.stripe.com'],
      scriptSrc: ["'self'", 'https://checkout.stripe.com'],
      styleSrc: [
        "'self'",
        'https://fonts.googleapis.com',
        'https://checkout.stripe.com',
      ],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'https://*.stripe.com', 'https://res.cloudinary.com'],
      baseUri: ["'self'"],
    },
  })
  // ]
)

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
});

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
