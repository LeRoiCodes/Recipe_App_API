const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const crypto = require('crypto');
const { sendEmail } = require('../utils/sendMail');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

/**
 * @desc Register  a user
 * @route POST
 * @route /api/v1/user/register
 * @access Public
 */
exports.register = asyncHandler(async (req, res) => {
	try {
		const { fullname, username, email, password, confirmationCode } = req.body;

		const verifyToken = uuidv4();

		const userExist = await User.findOne({ email });

		if (userExist) {
			res.status(400);
			throw new Error('User already Exists');
		}

		const user = await User.create({
			fullname,
			username,
			email,
			password,
			confirmationCode: verifyToken,
		});

		if (user) {
			const text = `<h1>Email Confirmation</h1>
        <h2>Hello ${username}</h2>
        <p>Verify your email address to complete the signup and login to your account to Kitchen Diary</p>
        <a href='https://kitchendiary.hng.tech/confirm/${user.confirmationCode}'> Click here</a>

        </div>`;

			await sendEmail({
				email: user.email,
				subject: 'Email Verification',
				message: text,
			});

			res.status(201).json({
				msg: 'Account Created Successfully! Please check your mail',
			});
		}
	} catch (error) {
		res.status(404);
		throw new Error(error);
	}
});
/**
 * @desc Verify User Email
 * @route GET
 * @route /api/v1/user/register
 * @access Public
 */
exports.verifyAccount = asyncHandler(async (req, res) => {
	try {
		const { confirmationCode } = req.params;
		// compare the confimation code

		const confirmUser = await User.findOne({ confirmationCode });

		if (!confirmUser) {
			res.status(404);
			throw new Error('User not found');
		} else {
			confirmUser.status = true;
			await confirmUser.save();

			res.status(200).json({
				msg: 'Verification Successful. You can login now',
				status: confirmUser.status,
			});
		}
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

/**
 * @desc Login a user
 * @route POST
 * @route /api/v1/user/login
 * @access Public
 */
exports.login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// Validate email and password
	if (!email || !password) {
		res.status(404);
		throw new Error('Please provide an email and password');
	}

	// Check for user
	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		res.status(401);
		throw new Error('Invalid Credentials');
	}

	// check if password matches
	const isMatch = await user.matchPassword(password);

	if (!isMatch) {
		res.status(401);
		throw new Error('Invalid Credentials');
	}

	if (user.status === false) {
		res.status(401);
		throw new Error(
			'Your Account is not Verified. Please Verifiy Your Account'
		);
	}
	res.status(200).json({
		success: true,
		message: 'Logged in successfully',
		access_token: genToken(user._id),
	});
});

/**
 * @desc Get user profile
 * @route POST
 * @route /api/v1/user/me
 * @access Private/User
 */
exports.getMe = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);

	if (user) {
		return res.status(200).json({
			success: true,
			user,
		});
	}
});

/**
 * @desc Update a user
 * @route POST
 * @route /api/v1/user/login
 * @access Public
 */
exports.updateProfile = asyncHandler(async (req, res) => {
	const { fullname, username } = req.body;

	try {
		const user = await User.findById(req.user._id);

		if (user) {
			user.fullname = fullname || user.fullname;
			user.username = username || user.username;
		}

		const updatedUser = await user.save();

		return res.json({
			success: true,
			_id: updatedUser._id,
			fullname: updatedUser.fullname,
			username: updatedUser.username,
		});
	} catch (error) {
		res.status(404);
		throw new Error('User not found');
	}
});

/**
 * @desc Forgot Password
 * @route POST
 * @route /api/user/forgotpassword
 * @access Public
 */
exports.forgotPassword = asyncHandler(async (req, res) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		res.status(404);
		throw new Error('There is no user with that email');
	}

	// Get reset token
	const resetToken = user.getResetPasswordToken();

	await user.save({ validateBeforeSave: false });

	// create message to pass
	const text = `<h1>Password Reset Link</h1>
        <h2>Hello ${user.username}</h2>
        <p>You are receiving this email because you (or someone else) has
         requested the reset of a password</p>
           <a href='kitchendiary.hng.tech/resetpassword/${resetToken}'> Click here to reset your password</a>

        </div>`;

	// console.log(message)
	try {
		await sendEmail({
			email: user.email,
			subject: 'Password reset token',
			message: text,
		});

		res.status(200).json({
			success: true,
			data: 'Email sent',
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });

		res.status(500);
		throw new Error('Email could not be sent');
	}
});

/**
 * @desc Reset User password
 * @route PUT
 * @route /api/user/resetpassword/:resettoken
 * @access Public
 */
exports.resetPassword = asyncHandler(async (req, res) => {
	//  Get hased token
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.params.resettoken)
		.digest('hex');

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		res.status(400);
		throw new Error('Invalid token');
	}

	// ?set new password
	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	return res.status(200).json({
		msg: 'Password Reset Successfully. Please Login with your new password',
	});
});

/**
 * @desc Update a user
 * @route POST
 * @route /api/v1/user/login
 * @access Public
 */
 exports.updateProfilePhoto = asyncHandler(async (req, res) => {
	const { fullname } = req.body;
  
	try {
	  const user = await User.findById(req.user.id);
	  // if user exist
	  if (user && !req.file) {
		user.fullname = fullname;
  
		// save updated user
		const updatedUser = await user.save();
  
		res.status(200).json({
		  success: true,
		  message: "Profile Updated Successfully",
		  user: updatedUser,
		});
	  }
	  // if user exist and image is uploaded
	  else if (user && user.profilePhoto) {
		const fileName = req.file.filename;
		const basePath = `${req.protocol}://${req.get("host")}/uploads/images/`;
		user.fullname = fullname;
		user.profilePhoto = `${basePath}${fileName}`;
  
		// save updated user
		const updatedUser = await user.save();
  
		res.status(200).json({
		  success: true,
		  message: "Profile Updated Successfully",
		  user: updatedUser,
		});
	  } else {
		res.status(404);
		throw new Error("User not found");
	  }
	} catch (error) {
	  res.status(400);
	  throw new Error(error.message);
	}
  });



// Generate jwt token
const genToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};
