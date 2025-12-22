import express from 'express';
import { createUser, forgetPassword, loginUser } from '../controllers/user.controller.js';
import { auth, roleBasedAccess } from '../middlewares/auth.middleware.js';

const router = express.Router({ mergeParams: true });

router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/status', auth, (req, res) => {
    console.log(req.user);

    res.json(req.user)
})
router.get('/admin', auth, roleBasedAccess, (req, res) => {
    console.log(req.user);

    res.json({...req.user, admin:true})
})

router.post("/test",(req, res)=>{
    console.log(req.file?.path);
    
    res.send("successfully file uploaded ")
})

router.post('/forget',auth,forgetPassword)
export default router;