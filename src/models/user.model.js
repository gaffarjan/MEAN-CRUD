import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String,
    phone: String
});

export default mongoose.model('User', userSchema);