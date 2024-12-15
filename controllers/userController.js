const User=require('../models/User');


module.exports = {
   
    findUserById: async function(req, res) {
        try {
            const userModel = await User
                .findByIdAndUpdate({ _id: req.params.id })
                .select("-__v -password")
                .populate({
                    path: "days",
                    options: {
                        sort: { date: -1 }
                    },
                    select: "-__v",
                    populate: {
                        path: "exercises",
                        model: "Exercise",
                        select: "-__v"
                    }
                });
    
          
            return userModel;
        } catch (err) {
            
            throw { status: 422, message: err.message };
        }
    },

    createUser: function(req, res) {
        User
        .create(req.body)
        .then(userModel => res.json(userModel))
        .catch(err => res.status(422).json(err));
    },

    updateUser: function(req, res) {
        User
        .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    
    removeUser: function(req, res) {
          User
        .findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
}