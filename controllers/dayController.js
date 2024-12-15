const Day=require('../models/Day');
const User=require('../models/User');
module.exports = {  
    createDay: async function(req, res) {
        try {
            
            const dbDay = await Day.findOne({ date: req.body.date, userId: req.body.userId, weight: req.body.weight });

            if (dbDay) {
              
                return res.json(dbDay);
            }

            
            const newDbDay = await Day.create(req.body);
             console.log(newDbDay);
            
            const dbUser = await User.findById(req.body.userId);

            if (dbUser) {
                dbUser.days.push(newDbDay._id);
                await dbUser.save();
            }

            
            return res.json(newDbDay);
        } catch (err) {
            
            return res.status(422).json({ success: false, message: err.message });
        }
    },

    updateWeight: function(req, res) {
        Day.findOne({ _id: req.body.id })
            .then(dbDay => {
                if (!dbDay) {
                    return res.status(404).json({ message: "Day not found" });
                }
                
                dbDay.weight = req.body.weight;  
                return dbDay.save();  
            })
            .then(updatedDay => {
                return res.json(updatedDay);  
            })
            .catch(err => res.status(422).json(err));  
    },

    addWater: function(req, res) {
        console.log(req.body)
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

