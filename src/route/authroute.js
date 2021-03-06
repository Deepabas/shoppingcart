const router = require('express').Router();
const {userRegister,userLogin,userAuth,serializerUser,checkRole,verifyUser } = require('../controller/authcontroller')


//users registration route
router.post('/reg-user',async(req,res)=>{
    console.log(req.body)
await userRegister(req.body,"user",res)
})
//admin registration route
router.post('/reg-admin',async(req,res)=>{
    await userRegister(req.body, "admin",res)
})
//superadmin registration route
router.post('/reg-superadmin',async(req,res)=>{
    await userRegister(req.body, "superadmin",res)
})
//users login route
router.post('/login-user',async(req,res)=>{
    await userLogin(req.body,"user",res)
})
//admin login route
router.post('/login-admin',async(req,res)=>{
    await userLogin(req.body,"admin",res)
})
//superadmin login route
router.post('/login-superadmin',async(req,res)=>{
    await userLogin(req.body,"superadmin",res)
})
//all users get  profile route
router.get('/profile',userAuth,async(req,res)=>{
 return res.json(await serializerUser(req.user))
})
//users protected route
router.get('/user-protected',userAuth,checkRole(['user']),async(req,res)=>{
    return res.json(await serializerUser(req.user))
})
//admin protected route
router.get('/admin-protected',userAuth,checkRole(['admin',"user"]),async(req,res)=>{
    return res.json(await serializerUser(req.user))
})
//superadmin protected route
router.get('/superadmin-protected',userAuth,checkRole(['superadmin',"admin"]),async(req,res)=>{
    return res.json(await serializerUser(req.user))
})

//mail inside route
router.get('/users/:id',async (req,  res) => {
    await verifyUser(req,res)
  })



module.exports = router;