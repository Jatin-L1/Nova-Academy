const User = require('../models/userSchema');
const Student = require('../models/studentSchema');
const Mentor = require('../models/mentorSchema');
const Organizer = require('../models/organizerSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const {
      email,
      password,
      role,
      name,
      group,
      rollNo,
      year,
      mentorName,
      clubName,
      branch
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create base user
    const user = await User.create({
      email,
      password: hashedPassword,
      role,
      name
    });

    // Create role-specific profile
    let profile;
    switch (role) {
      case 'student':
        profile = await Student.create({
          user: user._id,
          name,
          rollNo,
          group,
          year,
          mentor: mentorName // You might want to store mentor reference instead of just name
        });
        break;

      case 'mentor':
        profile = await Mentor.create({
          user: user._id,
          name,
          group
        });
        break;

      case 'organizer':
        profile = await Organizer.create({
          user: user._id,
          name,
          clubName,
          branch
        });
        break;

      default:
        throw new Error('Invalid role specified');
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'idk',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
        profile
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      message: "Error during registration",
      error: error.message
    });
  }
};