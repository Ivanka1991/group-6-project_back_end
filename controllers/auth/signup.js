const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')
const { sendSuccessResponse } = require('../../helpers')
const { User } = require('../../models')

const { sendEmail } = require('../../helpers')
const { BASE_URL } = process.env

const signup = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const verifyToken = nanoid()
  const newUser = new User({
    email,
    verifyToken
  })

  const avatar = gravatar.url(email, { s: '250', d: 'identicon' }, true)
  newUser.setPassword(password)
  newUser.setAvatar(avatar)

  const verifyEmail = {
    to: email,
    subject: 'Verify your email to finish registration',
    html: `<div>
         <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="600" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/cf7d7a368c581452/5d4d5c97-c615-4ae0-b7d1-06b1bc554179/1280x229.png">
         <div style="font-family: inherit; text-align: inherit">
         <div  style="font-family: inherit; text-align: center; background-color:#FFAC11"><span style="caret-color: rgb(0, 0, 0); color: #000000; font-family: &quot;lucida sans unicode&quot;, &quot;lucida grande&quot;, sans-serif; font-size: 12px; font-style: normal; font-variant-caps: normal; font-weight: bold; letter-spacing: normal; text-align: center; text-indent: 0px; text-transform: none; white-space: pre-wrap; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 172, 17); text-decoration: none; float: none; display: inline"></span>
         <span style="caret-color: rgb(0, 0, 0); color: #000000; font-family: &quot;lucida sans unicode&quot;, &quot;lucida grande&quot;, sans-serif; font-style: normal; font-variant-caps: normal; font-weight: bold; letter-spacing: normal; text-align: center; text-indent: 0px; text-transform: none; white-space: pre-wrap; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 172, 17); text-decoration: none; float: none; display: inline; font-size: 48px">KAPU$TA</span></div>
       </div>
         <div style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="600" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/cf7d7a368c581452/5d4d5c97-c615-4ae0-b7d1-06b1bc554179/1280x229.png">
        </div>
        <div align="center" bgcolor="#FFAC11" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
        <a style="background-color:#FFAC11; border:1px solid #FFAC11; border-color:#FFAC11; border-radius:30px; border-width:1px; color:#000000; display:inline-block; font-size:16px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:12px 40px 12px 40px; text-align:center; text-decoration:none; border-style:solid;
         font-family:lucida sans unicode,lucida grande,sans-serif;" href="${BASE_URL}/api/auth/verify/${verifyToken}" target="_blank">Confirm email</a></div>
        </div>`
  }

  await sendEmail(verifyEmail)
  const result = await newUser.save()
  sendSuccessResponse(res, { data: result }, 201)
}

module.exports = signup
