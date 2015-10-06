/**
 * FriendController
 *
 * @description :: Server-side logic for managing friends
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    find: function(req, res) {
        var userId = req.param('userId');

        if(userId) {
            Friend.find({or: [{user1: userId}, {user2: userId}]}).exec(function(err, friends) {
                if(err) {
                    res.badRequest()
                }
                else {
                    friends.forEach(function(friend) {
                        //TODO replace userId by user object
                        // User.findOne(friend.)
                    });
                    res.json(friends);
                }

            });
        }
        else {
            res.json("userId missing").code(500);
        }
    },
    borrow: function(req, res) {
        var userId = req.param('userId'),
            friendId = req.param('friendId'),
            borrowVal = req.param('borrow')+'';

        if(borrowVal.search(',') !== -1)
            borrowVal = parseFloat(borrowVal.replace(',','.'));
        else
            borrowVal = parseInt(borrowVal);

        console.log(userId, friendId, borrowVal);

        Friend.findOne({user: userId, friend: friendId}).exec(function(err, myFriend) {
            console.log(err, myFriend);
            if(myFriend) {
                var myDebt = myFriend.owe - borrowVal;
                Friend.update(myFriend.id, {owe:myDebt}).exec(function(){
                    Friend.findOne({friend: userId, user: friendId}).exec(function(err, hisFriend) {
                        console.log(err, hisFriend);
                        if(hisFriend) {
                            var hisDebt = hisFriend.owe + borrowVal;
                            Friend.update(hisFriend.id, {owe:hisDebt}).exec(function() {
                                res.json({status: 'success', owe: myDebt });
                            });
                        }
                    });
                });
            }
            else {
                res.json({status: 'not found'});
            }
        });
    }
};

