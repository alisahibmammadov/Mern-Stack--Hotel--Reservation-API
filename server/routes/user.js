const {
    allUser,
    detailUser,
    deleteUser,
    updateUser
} =  require("../controllers/user.js")
const express = require("express")
const { verifyAdmin,verifyUser } = require("../middleware/verify.js");
const router = express.Router()

router.get("/allUser",verifyAdmin,allUser)
router.get("/detailUser/:id",verifyUser,detailUser)
router.delete("/deleteUser/:id",verifyUser,deleteUser)
router.put("/updateUser/:id",verifyUser,updateUser)


module.exports = router