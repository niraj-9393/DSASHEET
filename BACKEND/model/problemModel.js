import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    remark: {
        type: String,
    }
}, {
    timestamps: true,
});

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;