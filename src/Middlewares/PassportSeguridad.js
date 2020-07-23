require('../Configs/config')
const Seguridad = require('../Models/tbl_seguridad')
const passportJWT = require('passport-jwt')


let jwtOptions = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
}

module.exports = new passportJWT.Strategy(jwtOptions, async (jwtPayload, done) => {
  await Seguridad.findById(jwtPayload.user_id)
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
