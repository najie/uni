/**
 * FriendController
 *
 * @description :: Server-side logic for managing friends
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    find: function (req, res) {
        var userId = req.param('userId');

        if (userId) {
            Friend.find({or: [{user1: userId}, {user2: userId}]}).exec(function (err, friends) {
                if (err) {
                    res.badRequest()
                }
                else {
                    var formatedFriends = [],
                        i = 0;
                    friends.forEach(function (friend) {
                        var friendId = null;
                        if (friend.user1 == userId) {
                            friendId = friend.user2;
                        }
                        else {
                            friendId = friend.user1;
                        }
                        User.findOne(friendId).exec(function (err, userFriend) {
                            i++;
                            formatedFriends.push({
                                friend: userFriend,
                                owe: friend.owe,
                                status: friend.status,
                                id: friend.id,
                                fromId: friend.user1
                            });
                            if (i == friends.length) {
                                res.json(formatedFriends);
                            }
                        });
                    });
                }
            });
        }
        else {
            res.json("userId missing").code(500);
        }
    },
    updateDebt: function (req, res) {
        var userId = req.param('userId'),
            friendId = req.param('friendId'),
            val = req.param('val') + '';

        if (val.search(',') !== -1)
            val = parseFloat(val.replace(',', '.'));
        else
            val = parseFloat(val);

        console.log(userId, friendId, val);

        Friend.findOne(
            {
                or: [
                    {user1: userId, user2: friendId},
                    {user1: friendId, user2: userId}
                ]
            }).exec(function (err, friend) {
                console.log(err, friend);
                if (friend) {
                    var myDebt = friend.owe + (val);
                    Friend.update(friend.id, {owe: myDebt}).exec(function () {
                        res.json({owe: myDebt});
                    });
                }
                else {
                    res.notFound();
                }
            });
    }
};

