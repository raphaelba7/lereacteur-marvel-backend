const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  try {
    // Si on reçoit bien un token
    if (req.headers.authorization) {
      // Enlever "Bearer " du token reçu
      const token = req.headers.authorization.replace("Bearer ", "");
      // Chercher dans la BDD un user
      const user = await User.findOne({ token: token });
      // Si on en trouve un
      if (user) {
        // On rajoute une clef user à req contenant le user trouvé
        req.user = user;
        // On passe à la suite
        next();
      } else {
        // Sinon on répond une erreur 401
        return res.status(401).json({
          message: "Unauthorized ici !!!!!!!",
        });
      }
    } else {
      // Sinon on répond une erreur 401
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = isAuthenticated;
