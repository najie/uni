/**
 * FriendController
 *
 * @description :: Server-side logic for managing friends
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createExtend: function (req, res) {
        var user = req.param('user'),
            friend = req.param('friend');

        Friend.create({user: user, friend: friend, owe: 0}).exec(function () {
            FriendRequest.update({from: friend, to: user}, {status: 'accepted'}).exec(function (error, fr) {
                console.log(error);
                Friend.create({user: friend, friend: user, owe: 0}).exec(function (error, friend) {
                    console.log(error);
                    res.ok();
                });
            });
        });
    }
};

