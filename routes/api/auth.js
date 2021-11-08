const express = require('express')
const { joiUserSchema } = require('../../models/user')
const { controllerWrapper, validation, authenticate } = require('../../middlewares')
const authController = require('../../controllers/auth')

const router = express.Router()

router.post('/signup', validation(joiUserSchema), controllerWrapper(authController.signup))

router.get('/verify/:verifyToken', controllerWrapper(authController.verify))

router.post('/verify', controllerWrapper(authController.repeatEmailVerification))

router.post('/login', validation(joiUserSchema), controllerWrapper(authController.login))

router.post('/logout', authenticate, controllerWrapper(authController.logout))

router.get('/current', authenticate, controllerWrapper(authController.current))

router.get('/google', controllerWrapper(authController.googleAuth))

router.get('/google-redirect', controllerWrapper(authController.googleRedirect))

// router.patch('updateBalance', authenticate, controllerWrapper(authController.updateBalance))

module.exports = router
