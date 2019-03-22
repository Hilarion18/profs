const bcrypt = require('bcryptjs')

function generatePassword (email, password) {
  return new Promise(function (resolve, reject) {
      const saltRound = 10
      const emailPassword = email + password
      bcrypt.genSalt(saltRound, function (err, salt) {
          bcrypt.hash(emailPassword, salt, function (err, hash) {
              if (!err) {
                  console.log(`ini emailPassword `+emailPassword);
                  
                  resolve(hash)
              } else {
                  console.log(`ini error generate password `+err);
                  
                  reject(err)
              }
          })
      })
  })
}

module.exports = generatePassword