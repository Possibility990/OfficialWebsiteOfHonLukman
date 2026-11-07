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
.get(getAllAchievements)
.post(uploadFields, createAchievement)


router.route('/:id')
.get(getSingleAchievement)
.delete(deleteAchievement)
.put(uploadFields, updateAchievement)


module.exports = router