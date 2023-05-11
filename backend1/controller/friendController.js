const registerModel = require('../models/authModel');

module.exports.addFriend = async (req, res) => {
    try{
        const userId = req.body.userId;
        const friendId = req.body.friendId;
        console.log(req.body);
        const user = await registerModel.findById(userId);
        user.friends.push(friendId);
        await user.save();
        res.status(201).json({
            successMessage: 'Friend Add Successful',
            user
        })
    } catch(err) {      
        res.status(500).json({
             error: {
                  errorMessage: ['Internal Server Error']
             }
        })
   }
}
