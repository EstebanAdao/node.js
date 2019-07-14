var db = require('./db');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy((username, password, done) => {
  console.log('1')
  db("users")
    .where("username", username)
    .first()
    .then((user) => {
      console.log(user)
      console.log(username, password)
      if (!user || user.password !== password) {
        return done(null, false);
      }
      done(null, user)
    }, done);
}));

passport.serializeUser((user, done) => {
  console.log('2')
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('3')
  db("users")
    .where("id", id)
    .first()
    .then((user) => {
      done(null, user)
    }, done);
})
