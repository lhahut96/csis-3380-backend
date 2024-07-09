const bcrypt = require("bcryptjs");

const saltRounds = 10;

const generatedSalt = bcrypt.genSaltSync(saltRounds, (err, salt) => {
  if (err) {
    console.log(err);
  }
  return salt;
});

const hashPassword = (password) => {
  return bcrypt.hashSync(password, generatedSalt);
};

const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};
