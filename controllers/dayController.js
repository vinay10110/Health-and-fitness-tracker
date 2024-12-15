const Day=require('../models/Day');
const User=require('../models/User');
module.exports = {

  
    createDay: function(req, res) {
        Day.findOne({date: req.body.date, userId: req.body.userId, weight: req.body.weight})
        .then(dbDay => {
            if (dbDay) {
                return res.json(dbDay)
            } else {
                Day.create(req.body)
                .then(newDbDay => {
                    User.findById({_id: req.body.userId})
                    .then(dbUser => {
                        dbUser.days.push(newDbDay._id)
                        dbUser.save()
                    })
                    return res.json(newDbDay)
                })
            }
        })
    },

    updateWeight: function(req, res) {
        Day
        .findOne({_id: req.body.id})
        .then(dbDay => {
            dbDay.weight = req.body.weight
            dbDay.save()
            return res.json(db.Day)
        })
        .catch(err => res.status(422).json(err))
    },


    addWater: function(req, res) {
        Day
        .findOne({ _id: req.body.id })
        .then(dbModel => {
            dbModel.water = req.body.water
            dbModel.save()
            return res.json(dbModel)
        })
        .catch(err => res.status(422).json(err));
    },

  
    updateNutrition: function(req,res) {
        Day
        .findOne({_id: req.body.id})
        .then(dbDay => {
            dbDay.nutrition = req.body.nutrition
            dbDay.save()
            return res.json(db.Day)
        })
        .catch(err => res.status(422).json(err));
    },

    findDayByuserId: function(req, res) {
        Day
        .find({userId: req.params.userId}, null, {sort: {date: -1}, limit: 7} )
        .populate("exercises")
        .then(dbDays => {
            return res.json(dbDays)
        })
        .catch(err => res.status(422).json(err));
    },

    findDayWeightByuserId: function(req, res) {
        Day
        .find({userId: req.params.userId}, null, {sort: {date: -1}, limit: 30} ) 
        .then(dbDays => {
            return res.json(dbDays)
        })
        .catch(err => res.status(422).json(err));
    }


}

