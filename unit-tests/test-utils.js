const db = require("../models/dbConnection");

const createTestUser = async () => {
  await db.auth.signUp
}