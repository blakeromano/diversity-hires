import passport from "passport"
import GoogleOAuth from "passport-google-oauth20"
import dotenv from "dotenv"
import * as User from "./models/user.js"
const dotenvConfig = dotenv.config()
const GoogleStrategy = GoogleOAuth.Strategy

const googleStrat = passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
))
const serialize = passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
const deserialize = passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

export {
    googleStrat,
    serialize,
    deserialize,
}