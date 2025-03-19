const Student = require('../models/studentSchema.js');
const Event = require('../models/eventSchema.js');
const Course = require('../models/courseSchema.js');
const EventRegistration = require('../models/eventRegistrationSchema.js'); 

exports.getStudentDashboard = async (req, res) => {
    try {
        const studentId = req.user.userId;
        const student = await Student.findOne({ user: studentId })
            .populate('mentor')
            .populate('user');

        const courses = await Course.find({
            class: { 
                $elemMatch: { 
                    year: student.year,
                    group: student.group
                }
            }
        });

        const events = await Event.find().populate('club');

        res.json({
            student,
            courses,
            events
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching dashboard", error: error.message });
    }
};

exports.registerForEvent = async (req, res) => {
    try {
        const { eventId } = req.body;
        const studentId = req.user.userId;

        // Check if already registered
        const existingRegistration = await EventRegistration.findOne({
            student: studentId,
            event: eventId
        });

        if (existingRegistration) {
            return res.status(400).json({ message: "Already registered for this event" });
        }

        const registration = await EventRegistration.create({
            student: studentId,
            event: eventId
        });

        res.status(201).json(registration);
    } catch (error) {
        res.status(500).json({ message: "Error registering for event", error: error.message });
    }
};