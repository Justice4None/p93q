var db = require("../models");

module.exports = function (app) {
  // auth test 
  app.get('/api/users/me',
    passport.authenticate('basic', { session: false }),
    function (req, res) {
      res.json({ id: req.user.id, username: req.user.username });
    });
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Platform.findAll({}).then(function (dbPlatform) {
      res.json(dbPlatform);
    });
  });

  // Create a new example
  app.post("/api/platform", function (req, res) {
    db.Platform.create(req.body).then(function (dbPlatform) {
      res.json(dbPlatform);
    });
  });

  // Delete an example by id
  app.delete("/api/platform/:id", function (req, res) {
    db.Platform.destroy({ where: { id: req.params.id } }).then(function (dbPlatform) {
      res.json(dbPlatform);
    });
  });
};
