const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-errors')
const { User } = require('../models')

const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    throw new Unauthorized('Not authorized')
  }
  const [bearer, token] = authorization.split(' ')
  if (bearer !== 'Bearer') {
    throw new Unauthorized('Not authorized')
  }
  try {
    const { email } = jwt.verify(token, SECRET_KEY)
    const user = await User.findOne({ email })
    if (!user.token) {
      throw new Unauthorized('Not authorized')
    }
    req.user = user
    console.log('req.user', req.user)
    next()
  } catch (error) {
    res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Unauthorized',
    })
  }
}

module.exports = authenticate
