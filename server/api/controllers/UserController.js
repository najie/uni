/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcrypt');

module.exports = {
	login: function(req, res) {
        var pseudo = req.param('pseudo'),
            password = req.param('password');
        if(pseudo && password) {
            User.findOneByPseudo(pseudo).exec(function (err, user) {
                if (err) res.json({json: { error: 'DB error' }, code: 500});
                else if (user) {
                    bcrypt.compare(password, user.password, function (err, match) {
                        if (err) res.status(25500).json({error: 'Bcrypt compare error'});

                        if (match) {
                            // password match
                            res.json(user);
                        } else {
                            // invalid password
                            res.status(500).json({error: 'Mauvais password'});
                        }
                    });
                } else {
                    res.status(500).json({ error: 'Mauvais pseudo' });
                }
            });
        }
        else {
            res.badRequest();
        }

    }
};

