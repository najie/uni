/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        pseudo: {
            unique: true,
            type: 'string'
        },
        firstname: 'string',
        lastname: 'string',
        password: 'string'
    },
    beforeCreate: function (attrs, next) {
        var bcrypt = require('bcrypt');

        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err);

            bcrypt.hash(attrs.password, salt, function(err, hash) {
                if (err) return next(err);

                attrs.password = hash;
                next();
            });
        });
    },
    beforeUpdate: function (attrs, next) {
        var bcrypt = require('bcrypt');

        if(attrs.password) {
            bcrypt.genSalt(10, function(err, salt) {
                if (err) return next(err);

                bcrypt.hash(attrs.password, salt, function(err, hash) {
                    if (err) return next(err);

                    attrs.password = hash;
                    next();
                });
            });
        }
        else {
            next();
        }
    }
};

