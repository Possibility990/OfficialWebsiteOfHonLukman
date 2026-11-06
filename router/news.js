const express = require('express')
const router = express.Router()
const upLoadFields = require('../middleware/newsUploadFields')

const {
      getNews,
      getSingleNews,
      createNews,
      deleteNews,
      updatedNews
} = require('../controller/news')



router.route('/')
.get(getNews)
.post(upLoadFields, createNews)

router.route('/:id')
.get(getSingleNews)
.delete(deleteNews)
.put(updatedNews)

module.exports = router
