import passport from "passport"
import GoogleOAuth from "passport-google-oauth20"
import dotenv from "dotenv"
const dotenvConfig = dotenv.config()
const GoogleStrategy = GoogleOAuth.Strategy


passport.use(new GoogleStrategy({
    consumerKey: process.env.GOOGLE_CLIENT_ID,
    consumerSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
  },
  function(token, tokenSecret, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
  }
));
