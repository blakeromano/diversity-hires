import mongoose from 'mongoose'

export {
  Profile
}

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  profeciency: {
    type: String,
    required: true,
    enum: [">1 year", "1-5 years", "5-10 years", "10+ years"],
  },
})

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  hiringStatus: {
    type: String,
    enum: ["Hiring", "Not Hiring", "Actively Job Seeking", "Not Actively Job Seeking", ""],
  },
  company: String,
  location: String,
  industry: String,
  phoneNumber: Number,
  relocation: {
    type: String,
    enum: ["Yes", "No", ""],
  },
  additionalInfo: String,
  website: String,
  skills: [skillSchema],
  jobsPosted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job"
  }],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)