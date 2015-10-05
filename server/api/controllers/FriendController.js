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
                                res.json({status: 'success', friend: myFriend });
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

