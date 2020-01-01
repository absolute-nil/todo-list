//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let items = ["make a list"];
let workItems = ["make a list"];
let outingItems = [];
let today = new Date();
let day = today.getDay();
let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let options = {
  weekday: "long",
  day: "numeric",
  month: "long"
};
let date = today.toLocaleDateString("en-US", options);
let message = "";
app.get("/", function(req, res) {
  if (today.getDay() === 6 || today.getDay() === 0) {
    message = "Yay! Its a weekend, you can do anything!";
  } else {
    message = "Boo! You gotta work.";
  }
  res.render("list", {
    listTitle: date,
    kindOfDay: week[day],
    message: message,
    newListItems: items
  });
});

app.post("/", function(req, res) {
  let item = req.body.newItem;
  if (req.body.list === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    kindOfDay: week[day],
    message: message,
    newListItems: workItems
  });
});

app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
