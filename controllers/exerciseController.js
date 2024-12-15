const Exercise=require('../models/Exercise');
const Day=require('../models/Day');
module.exports = {
    addExercise: function(req, res) {
        Exercise.create({ exercise: req.body.exercise, duration: req.body.duration })
            .then(exerciseModel => {
                Day.findById({ _id: req.body.currentDayId })
                    .then(dayModel => {
                        dayModel.exercises.push(exerciseModel._id);
                        dayModel.totalActivity = req.body.totalActivity;
                        dayModel.save()
                            .then(() => {
                                return res.json({ message: "Exercise Added", exercise: exerciseModel });
                            })
                            .catch(err => res.status(422).json(err));
                    })
                    .catch(err => res.status(422).json(err));
            })
            .catch(err => res.status(422).json(err));
    }

}