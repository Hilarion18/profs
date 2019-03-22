const bcryptjs = require('bcryptjs')

function checkPassword (salt, password, email) {
  return new Promise((resolve, reject) => {
      const emailPassword = email + password
      bcryptjs.compare(emailPassword, salt, function (err, data) {
          if (data) {
              console.log(`masuk akses password bener `+data);
              
              resolve(data)
          } else {
              console.log(`masuk gagal akses user `+err);
              
              reject(err)
          }
      });
  })
}

module.exports = checkPassword