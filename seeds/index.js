const mongoose = require("mongoose");
const log = require("./log");
const { topic, publication } = require("./seedHelpers");
const Book = require("../models/book");
const dbUrl = "mongodb://127.0.0.1:27017/library";

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Book.deleteMany({});
  for (let i = 0; i < 10; i++) {
    const random5 = Math.floor(Math.random() * 5);
    const bo = new Book({
      location: `${log[random5].title}, ${log[random5].author}`,
      title: `${sample(topic)} ${sample(publication)}`,
    });
    await bo.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
