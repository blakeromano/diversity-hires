import mongoose from 'mongoose'

export {
  Profile
}

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  hiringStatus: {
    type: String,
    enum: ["Hiring", "Not Hiring", "Actively Job Seeking", "Not Actively Job Seeking"],
  },
  location: String,
  industry: String,
  phoneNumber: Number,
  relocation: {
    type: String,
    enum: ["Yes", "No"],
  },
  additionalInfo: String,
  website: String,
  jobsPosted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job"
  }],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)