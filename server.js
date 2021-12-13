const app = require("express")();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
