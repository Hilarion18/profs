const User = require("../models/user")
const jwt = require("jsonwebtoken")

// function isLogin (req,res,next) {
//   let token = req.headers.token
//   console.log(`ini token `+token);
//   // console.log(`ini decoded `+decoded);
  
//   if(token) {
//     jwt.verify(
//       token, process.env.JWT_TOKEN, (err,decoded) => {
//        if(!err) {
//         console.log(`masuk is Token is token `+token);
//         console.log(`masuk decoded userId `+decoded.id);
//         User.findById(decoded.id)
        
//         .then((user) => {
//           console.log(`masuk then user isLogin `+user);
          
//           if(user) {
//             req.userId = decoded.id
//             next()
//           } else {
//             console.log(`masuk else denied 1`);
            
//             res.status(500).json({
//               message: `access denied 1`
//             })
//           }
//         }).catch((err) => {});
//        } else {
//         console.log(`masuk else denied 2`);
//         res.status(500).json({
//           // err,
//           message: `access denied 2`
//         })
//        }
//       })
//   } else {
//     console.log(`masuk else denied 3`);
//     res.status(500).json({
//       // err,
//       message: `access denied 3`
//     })
//   }

// }

function isLogin(req,res, next) {
    console.log('isLogin ===== ini req headers', req.headers);
    console.log('isLogin ===== ini req data', req.data);
    
  let decoded = jwt.verify(req.headers.token, process.env.JWT_TOKEN, (err, decoded) => {
    if ( err ) {
      console.log((err));
      res.status(401).json({
        message: `You're not a user`
      })
    }
    else {
      
      req.data = decoded
      console.log(`ini req data login `, req.data);
      console.log(req.data, `it's isLogin`);
      next()
    }
  })
}


module.exports = isLogin