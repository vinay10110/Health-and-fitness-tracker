const router = require('express').Router();
const db = require('../controllers/index');
const { verifyToken } = require('../config/Authenticate'); 

router.post('/newUser', async (req, res) => {
    const token = req.headers.authorization;

    try {
        await verifyToken(token); 
        db.User.createUser(req, res); 
    } catch (err) {
        return res.status(err.status).json({ success: false, message: err.message });
    }
});

router.post('/newDay', async (req, res) => {
    const token = req.headers.authorization;

    try {
        await verifyToken(token);
        await db.Day.createDay(req, res); 
    } catch (err) {
        return res.status(err.status || 500).json({ success: false, message: err.message });
    }
});

router.post('/newExercise', async (req, res) => {
    const token = req.headers.authorization;

    try {
        await verifyToken(token);
        db.Exercise.addExercise(req, res);
    } catch (err) {
        return res.status(err.status).json({ success: false, message: err.message });
    }
});

router.get('/user/:id', async (req, res) => {
    const token = req.headers.authorization;

    try {
        await verifyToken(token);
        const userModel= await db.User.findUserById(req, res);
        return res.json(userModel)
    } catch (err) {
        return res.status(err.status).json({ success: false, message: err.message });
    }
});

router.get('/day/:id', async (req, res) => {
    const token = req.headers.authorization;

    try {
        await verifyToken(token);
        db.Day.addWater(req, res);
    } catch (err) {
        return res.status(err.status).json({ success: false, message: err.message });
    }
});

router.post('/newWater', async (req, res) => {
    const token = req.headers.authorization;

    try {
        await verifyToken(token);
        db.Day.addWater(req, res);
    } catch (err) {
        return res.status(err.status).json({ success: false, message: err.message });
    }
});

router.post('/updateNutrition', async (req, res) => {
    const token = req.headers.authorization;

    try {
        await verifyToken(token);
        await db.Day.updateNutrition(req, res);
    } catch (err) {
        return res.status(err.status).json({ success: false, message: err.message });
    }
});

router.post('/updateWeight', async (req, res) => {
    const token = req.headers.authorization;

    try {
        await verifyToken(token);
        const weightDoc=await db.Day.updateWeight(req, res);
    } catch (err) {
        return res.status(err.status).json({ success: false, message: err.message });
    }
});

router.get('/getDays/:userId', async (req, res) => {
    const token = req.headers.authorization;

    try {
        await verifyToken(token);
        db.Day.findDayByuserId(req, res);
    } catch (err) {
        return res.status(err.status).json({ success: false, message: err.message });
    }
});

router.get('/getDaysWeight/:userId', async (req, res) => {
    const token = req.headers.authorization;

    try {
        await verifyToken(token);
        db.Day.findDayWeightByuserId(req, res);
    } catch (err) {
        return res.status(err.status).json({ success: false, message: err.message });
    }
});

module.exports = router;
