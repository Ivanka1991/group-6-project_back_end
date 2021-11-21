const { NotFound } = require('http-errors')
const { User } = require('../../models')
const { FRONTEND_URL } = process.env

const verify = async (req, res) => {
  const { verifyToken } = req.params
  const user = await User.findOne({ verifyToken })
  if (!user) {
    throw new NotFound('Verify error')
  }

  await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true })

  res.redirect(`${FRONTEND_URL}`)
}

module.exports = verify
