const Usuario = require('./../models/usersModel');
const Artist = require('./../models/sellerModel');

class ArtistsUsers {
    welcome(req, res) {
        const username = req.user.username;
        const userType = req.user.userType;
        res.send(`Bienvenido, ${username} (${userType})`);
    }
}

module.exports = new ArtistsUsers();