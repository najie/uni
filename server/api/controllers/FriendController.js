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
                            if(friend.negativeFor == userId && friend.owe > 0) {
                                friend.owe *= -1;
                            }
                            else if(friend.negativeFor == friendId && friend.owe < 0)
                                friend.owe *= -1;

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

        Friend.findOne(
            {
                or: [
                    {user1: userId, user2: friendId},
                    {user1: friendId, user2: userId}
                ]
            }).exec(function (err, friend) {
                if (friend) {
                    var negativeFor = userId;

                    if(friend.owe >= 0 && friend.negativeFor == userId) {
                        friend.owe *= -1;
                    }
                    else if(friend.owe < 0 && friend.negativeFor == friendId) {
                        friend.owe *= -1;
                    }

                    var debt = friend.owe + (val);

                    if(debt > 0)
                        negativeFor = friendId;
                    else if(debt === 0)
                        negativeFor = null;

                    console.log("Dette:"+debt, " | Negative for:"+negativeFor, " | Current User:"+userId);

                    Friend.update(friend.id, {owe: debt, negativeFor:negativeFor}).exec(function () {
                        res.json({owe: debt, negativeFor:negativeFor});
                    });
                }
                else {
                    res.notFound();
                }
            });
    }
};

