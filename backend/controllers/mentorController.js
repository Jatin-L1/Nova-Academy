const Class = require('../models/classSchema.js');
const Course = require('../models/coursesSchema.js');
const Student = require('../models/studentSchema.js');


exports.createClass = async (req, res) => {
    try {
        const { branch, year, group } = req.body;
        const mentorId = req.user.userId; // Extract mentorId from token

        if (!mentorId) {
            return res.status(401).json({ message: "Unauthorized: Mentor ID missing" });
        }

        // Check if class already exists for this mentor
        const existingClass = await Class.findOne({ branch, year, group, mentorId });
        if (existingClass) {
            return res.status(400).json({ message: "Class already exists for this mentor." });
        }

        // Create new class
        const newClass = await Class.create({ branch, year, group, mentorId });

        res.status(201).json({
            success: true,
            message: "Class created successfully",
            class: newClass
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating class",
            error: error.message
        });
    }
};


exports.addCourse = async (req, res) => {
    try {
        const { class: classId, name, teacher, totalClasses, attendedClasses, dutyLeave, medicalLeave, attendance } = req.body;
        const mentorId = req.user.userId; // Extract mentorId from token

        const newCourse = await Course.create({
            class: classId,
            mentorId,
            name,
            teacher,
            totalClasses,
            attendedClasses,
            dutyLeave,
            medicalLeave,
            attendance,
        });

        res.status(201).json({ success: true, course: newCourse });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: "Course already exists for this class and mentor" });
        }
        res.status(500).json({ success: false, message: "Error adding course", error: error.message });
    }
};


exports.updateAttendance = async (req, res) => {
    try {
        const { courseId, studentAttendance } = req.body;
        // studentAttendance should be an array of objects with student ID and attendance status

        for (let record of studentAttendance) {
            const course = await Course.findById(courseId);
            if (!course) {
                continue;
            }

            // Update based on attendance type
            if (record.type === 'present') {
                course.attendedClasses += 1;
            } else if (record.type === 'dutyLeave') {
                course.dutyLeave += 1;
            } else if (record.type === 'medicalLeave') {
                course.MedicalLeave += 1;
            }

            // Calculate new attendance percentage
            const totalAttendance = course.attendedClasses + course.dutyLeave + course.MedicalLeave;
            course.attendence = (totalAttendance / course.totalClasses) * 100;

            await course.save();
        }

        res.json({ message: "Attendance updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating attendance", error: error.message });
    }
};

exports.getMentorDashboard = async (req, res) => {
    try {
        const mentorId = req.user.userId;
        const mentor = await Mentor.findOne({ user: mentorId })
            .populate('user');

        const classes = await Class.find({ group: mentor.group });
        const courses = await Course.find({ 
            class: { $in: classes.map(c => c._id) }
        });
        const students = await Student.find({ 
            group: mentor.group,
            mentor: mentor._id 
        });

        res.json({
            mentor,
            classes,
            courses,
            students
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching dashboard", error: error.message });
    }
};