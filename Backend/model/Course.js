const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    inMyCourse: {
        type: Boolean,
        required: true
    }
});

const Course = mongoose.model("Course", courseSchema, "courses");

// Use aggregation to identify and remove duplicates
Course.aggregate([
    {
        $group: {
            _id: { name: "$name", userID: "$userID", inMyCourse: "$inMyCourse" },
            duplicates: { $addToSet: "$_id" },
            count: { $sum: 1 }
        }
    },
    {
        $match: {
            count: { $gt: 1 }
        }
    }
]).exec()
    .then((result) => {
        result.forEach(async (doc) => {
            // Keep one copy and remove duplicates
            const [keepDoc, ...duplicates] = doc.duplicates;
            await Course.deleteMany({ _id: { $in: duplicates } });
        });
    })
    .catch((err) => {
        console.error(err);
    });

// Create compound index
courseSchema.index({ name: 1, userID: 1, inMyCourse: 1 }, { unique: true });

module.exports = mongoose.model("Course", courseSchema, "courses");
