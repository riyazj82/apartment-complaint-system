const bcrypt = require("bcrypt");

const generateHash = async () => {
  const password = "admin123";
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed password:", hashedPassword);
};

generateHash();