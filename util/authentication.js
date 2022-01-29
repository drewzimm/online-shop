function createUserSession(req, user, action) {
  req.session.uid = user._id.toString();
  req.session.save(action); // will execute action after save to session is done
}

function destroyUserAuthSession(req) {
  req.session.uid = null;
}

module.exports = {
  createUserSession: createUserSession,
  destroyUserAuthSession: destroyUserAuthSession,
};
