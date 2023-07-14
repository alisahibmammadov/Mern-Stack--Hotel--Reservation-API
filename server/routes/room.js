const {
  getAllRoom,
  getDetailRoom,
  updateRoom,
  createRoom,
  deleteRoom,
} = require("../controllers/room.js");

const express = require("express");
const { verifyAdmin } = require("../middleware/verify.js");
const router = express.Router()

router.get("/getAllRoom",getAllRoom)
router.get("/getDetailRoom/:id",getDetailRoom)
router.put("/updateRoom/:id",verifyAdmin,updateRoom)
router.post("/createRoom/:id/:hotelId",verifyAdmin,createRoom)
router.delete("/deleteRoom/:id/:hotelId",verifyAdmin,deleteRoom)

module.exports = router

