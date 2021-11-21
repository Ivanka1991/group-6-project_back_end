const jwt = require('jsonwebtoken')
const { Unauthorized, BadRequest } = require('http-errors')
const { User } = require('../../models')
const { sendSuccessResponse } = require('../../helpers')

const { SECRET_KEY } = process.env

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized('Email or password is wrong')
  }
  if (!user.verify) {
    throw new BadRequest('Email not verify')
  }
  const payload = {
    email
  }
  const { avatarURL } = user
  const token = jwt.sign(payload, SECRET_KEY)
  await User.findOneAndUpdate({ email }, { token })
  sendSuccessResponse(res, { email, avatarURL, token }, 200)
}

module.exports = login
