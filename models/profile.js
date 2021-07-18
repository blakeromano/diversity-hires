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

const educationSchema = new mongoose.Schema({
  school: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
  },
  fieldOfStudy: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  description: String,
})
const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
  },
  description: String,
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
  phoneNumber: String,
  relocation: {
    type: String,
    enum: ["Yes", "No", ""],
  },
  additionalInfo: String,
  website: String,
  skills: [skillSchema],
  education: [educationSchema],
  experiences: [experienceSchema],
  jobsPosted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job"
  }],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)