import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
})
const User = mongoose.model("User", userSchema)


export {
    User
}