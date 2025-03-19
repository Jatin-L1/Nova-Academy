const User = require('../models/userSchema.js');
const Student = require('../models/studentSchema.js');
const Mentor = require('../models/mentorSchema.js');
const Club = require('../models/clubSchema.js');
const EventOrganiser = require('../models/eventOrganiser.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { email, password, role, name, rollNo, group, year, clubName, branch, mentorName } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await User.create({
            email,
            password: hashedPassword,
            role
        });

        let profile;

        // Based on role, create specific profile
        switch (role) {
            case "student":
                if (!rollNo || !name || !group || !year || !mentorName) {
                    return res.status(400).json({ message: "Missing required fields for student" });
                }

                // Find mentor
                const mentor = await Mentor.findOne({ name: mentorName });
                if (!mentor) {
                    return res.status(404).json({ message: "Mentor not found" });
                }

                profile = await Student.create({
                    user: user._id,
                    name,
                    rollNo,
                    group,
                    year,
                    mentor: mentor._id
                });
                break;

            case "mentor":
                if (!name || !group) {
                    return res.status(400).json({ message: "Missing required fields for mentor" });
                }

                profile = await Mentor.create({
                    user: user._id,
                    name,
                    group
                });
                break;

            case "organiser":
                if (!name || !clubName || !branch) {
                    return res.status(400).json({ message: "Missing required fields for organiser" });
                }

                // ✅ Create a club with the organiser's provided name
                const newClub = new Club({
                    name: clubName, // Use the provided club name
                    branch: branch, 
                    owner: user._id, // Link club to organiser
                });

                await newClub.save(); // ✅ Save club before using its _id

                // ✅ Create organiser and link the club
                profile = await EventOrganiser.create({
                    user: user._id,
                    name,
                    club: newClub._id,
                });

                // ✅ Update club to store organiser's ID
                newClub.owner = profile._id;
                await newClub.save();

                break;

            default:
                return res.status(400).json({ message: "Invalid role" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            "idk",
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: `${role.charAt(0).toUpperCase() + role.slice(1)} signed up successfully`,
            token,
            role: user.role,
            profile
        });

    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid email or password" 
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid email or password" 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Send response
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};
