const router = require('express').Router();
const db = require('../controllers/index');
const passport = require('passport');
require('../config/passport')(passport);


router.post('/newUser', passport.authenticate('jwt', { session: false }), (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      console.log('user is loggd in to the post route newUser');
      db.User.createUser(req, res);
    } else {
      return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
  }
);

router.post('/newDay', passport.authenticate('jwt', { session: false }), (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      console.log('user is loggd in to the post route for newDay');
      db.Day.createDay(req, res);
    } else {
      return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
  }
);


router.post('/newExercise', passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = getToken(req.headers);
  if (token) {
    console.log('user is loggd in to the post route for NewExercise');
    db.Exercise.addExercise(req, res);
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
 }
);


router.get('/user/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = getToken(req.headers);
  if (token) {
    console.log('user is loggd in to the get route user:id');
    db.User.findUserById(req, res);
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
 }
);


router.get('/day/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = getToken(req.headers);
  if (token) {
    console.log('user is loggd in to the get route for day:id');
    db.Day.addWater(req, res)
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
 }
);

  
router.get('/day/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = getToken(req.headers);
  if (token) {
    console.log('user is loggd in to the get route for day:id');
    db.Day.updateNutrition(req, res)
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
 }
);


router.post('/newWater', passport.authenticate('jwt', { session: false}), (req, res) => {
  const token = getToken(req.headers);
  if (token) {
    console.log('Water is being added');
    db.Day.addWater(req, res);
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
 }
)
;

router.post('/updateNutrition', passport.authenticate('jwt', { session: false}), (req, res) => {
  const token = getToken(req.headers);
  if (token) {
    console.log('Nutrition is being added');
    db.Day.updateNutrition(req, res);
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
 }
);


router.post('/updateWeight', passport.authenticate('jwt', { session: false}), (req, res) => {
  const token = getToken(req.headers);
  if (token) {
    console.log("Weight is being updated");
    db.Day.updateWeight(req, res)
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
 }
);



router.get('/getDays/:userId', passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = getToken(req.headers);
  if (token) {
    console.log('user is loggd in to the get route for day:id');
    db.Day.findDayByuserId(req,res)
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
 }
);


router.get('/getDaysWeight/:userId', passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = getToken(req.headers);
  if (token) {
    console.log('user is loggd in to the get route for day:id');
    db.Day.findDayWeightByuserId(req,res)
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
 }
);

getToken = function(headers) {	
  if (headers && headers.authorization) {	
    let parted = headers.authorization.split(' ');	
    if (parted.length === 2) {	
      return parted[1];	
    } else {	
      return null;	
    }	
  } else {
    return null;	   
  }	   
};
module.exports = router;
