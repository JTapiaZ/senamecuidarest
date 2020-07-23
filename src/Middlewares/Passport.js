require('../Configs/config')
const Administrador = require('../Models/tbl_administrador')
const passportJWT = require('passport-jwt')


let jwtOptions = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
}

module.exports = new passportJWT.Strategy(jwtOptions, async (jwtPayload, done) => {
  await Administrador.findById(jwtPayload.user_id)
    .then(user => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch(err => {
      return done(null, false);
    });
})
