const { register, login, setAvatar, getAllUsers } = require('../controllers/userControllers')
const cors = require('cors');
const router = require('express').Router()
// router.use(cors())
router.post('/register', register)
router.post('/login', login)
router.post('/setAvatar/:id', setAvatar)
router.get('/allUsers/:id', getAllUsers)

module.exports = router;