const express = require("express");
const app = express();
const mongoose = require("mongoose");
const notesRouter = require("./routes/notes.js");
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost/notes";
const db = mongoose.connection;

app.use(express.static("public"));

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
db.on("error", error => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(express.json());
app.use("/notes", notesRouter);
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));