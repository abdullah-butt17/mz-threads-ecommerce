require("dotenv").config();
const mongoose = require("mongoose");
const env = require("../config/env");
const Category = require("../models/Category");

const categories = [
  {
    mainCategory: "Clothing",
    subCategory: "Lawn",
  },
  {
    mainCategory: "Clothing",
    subCategory: "Cotton",
  },
  {
    mainCategory: "Clothing",
    subCategory: "Khaddar",
  },
  {
    mainCategory: "Clothing",
    subCategory: "Jacquard",
  },
  {
    mainCategory: "Clothing",
    subCategory: "Linen",
  },
  {
    mainCategory: "Clothing",
    subCategory: "Chiffon",
  },
  {
    mainCategory: "Clothing",
    subCategory: "Silk",
  },
  {
    mainCategory: "Clothing",
    subCategory: "Organza",
  },
  {
    mainCategory: "Clothing",
    subCategory: "Velvet",
  },
  {
    mainCategory: "Clothing",
    subCategory: "Casual",
  },
  {
    mainCategory: "Clothing",
    subCategory: "Formal",
  },
  {
    mainCategory: "Clothing",
    subCategory: "Party Wear",
  },
  {
    mainCategory: "Clothing",
    subCategory: "Bridal",
  },
  {
    mainCategory: "Clothing",
    subCategory: "Festive",
  },
  {
    mainCategory: "Clothing",
    subCategory: "Cultural",
  },

  {
    mainCategory: "Bed Sheets",
    subCategory: "Cotton Bed Sheets",
  },
  {
    mainCategory: "Bed Sheets",
    subCategory: "Handmade Bed Sheets",
  },
  {
    mainCategory: "Bed Sheets",
    subCategory: "Embroidered Bed Sheets",
  },
  {
    mainCategory: "Bed Sheets",
    subCategory: "Printed Bed Sheets",
  },
  {
    mainCategory: "Bed Sheets",
    subCategory: "Luxury Bed Sheets",
  },
  {
    mainCategory: "Bed Sheets",
    subCategory: "Bridal Bed Sheets",
  },
  {
    mainCategory: "Bed Sheets",
    subCategory: "Kids Bed Sheets",
  },
  {
    mainCategory: "Bed Sheets",
    subCategory: "Premium Collection",
  },
];


async function seed() {
  await mongoose.connect(env.MONGO_URI);

  await Category.deleteMany();

  await Category.insertMany(categories);

  console.log("Categories seeded successfully");

  await mongoose.disconnect();
}

seed().catch(console.error);