require("../Configs/config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authJWT = require('../Middlewares/PassportSeguridad')
const passport = require("passport");
passport.use(authJWT)
const User = require('../Models/tbl_seguridad');


// //.......Describe the user registration.......[ ADMIN ]....................................

// const userRegister = async (userDets, role, res) => {
//   try {
//     //Validate the username
//     let usernameNotTaken = await validateUsername(userDets.username);
//     if (!usernameNotTaken) {
//       return res.status(400).json({
//         message: `El nombre de usuario no esta disponible.`,
//         success: false
//       });
//     }

//     //Validate the email
//     let emailNotRegistered = await validateEmail(userDets.email);
//     if (!emailNotRegistered) {
//       return res.status(400).json({
//         message: `El email esta actualmente registrado.`,
//         success: false
//       });
//     }

//     //......Get the hashed password.......................................................................................
//     const password = await bcrypt.hash(userDets.password, 12);
//     //......Create a new user........................................................................................
//     const newUser = new User({
//       ...userDets,
//       password,
//       role
//     });
//     await newUser.save();
//     return res.status(201).json({
//       message: "Registrado con exito. Ahora inicia sesión",
//       success: true
//     });
//   } catch (err) {
//     // Implement logger function
//     return res.status(500).json({
//       message: "No es posible crear la cuenta ",
//       success: false
//     });
//   }
// };

//.......Describe to login user.......[ ADMIN ]....................................

const userLogin = async (userCreds, role, res) => {
  let { username, password } = userCreds;

  if (!username || !password ){
    return res.status(400).send("¡Por favor ingrese un usuario y una contraseña valida!");
}

  //First check if the username is in the database
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).send("¡Usuario no encontrado, credenciales invalidas para iniciar sesion!");
  }
  // We will check the role
  if (user.role != role) {
    return res.status(403).json({
      message: `No tienes permisos para ingresar`,
      success: false
    });
  }
  // That means user is existing and trying to signing from the right portal
  //Now check for the password
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    //Sign in the token and issue it to the user
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        username: user.username,
        email: user.email
      },
      process.env.SECRET,
      { expiresIn: "7 days" }
    );

    let result = {
      token: `${token}`,      
    };
    return res.status(200).json({
      ...result
    });
  } else {
    return res.status(403).json({
      message: "Contraseña incorrecta."
    });
  }
};

//........................................User validation...............................................
const validateUsername = async username => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

//.......Describe passport middleware....................................................................
const userAuth = passport.authenticate("jwt", { session: false });

//.......Check role middleware...............................................................................

const checkRole = roles => (req, res, next) => {
  if (roles.includes(req.user.role)) {
    next();
  }
  return res.status(401).json({
    message: "¡Acceso no autorizado!",
    success: false
  });
};

//....................................... Email validate.................................................
const validateEmail = async email => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

const serializerUser = user => {
  return {
    username: user.username,
    email: user.email,
    name: user.name,
    _id: user._id,
    updateAt: user.updateAt,
    createdAt: user.createdAt
  };
};



module.exports = {
  userAuth,
  userLogin,
  //userRegister,
  serializerUser,
  checkRole,
};
