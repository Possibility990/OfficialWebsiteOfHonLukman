const express = require('express');
const router = express.Router();

const uploadFields = require('../middleware/achievementsUploadFields')

const {
  getSingleAchievement,
  getAllAchievements,
  deleteAchievement,
  createAchievement,
  updateAchievement

   
} = require('../controller/achievement')

router.route('/')
.post(uploadFields, createAchievement)

router.route('/')
.get(getSingleAchievement)
.get(getAllAchievements)

router.route('/:id')
.delete(deleteAchievement)
.put(uploadFields, updateAchievement)


module.exports = router