var models = require('../models');

exports.projectInfo = function(req, res) {
  var projectID = req.params.id;

  // query for the specific project and
  models.Project
  .find({"_id": projectID})
  .sort('-date')
  .exec(afterQuery);

  // call the following callback
  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  // make a new Project and save it to the DB
  var newPost = new models.Project(form_data);
  newPost.save(afterSaving);

  // YOU MUST send an OK response w/ res.send();
  function afterSaving(err){
    if(err){console.log(err);
      res.send("OK");}
      res.redirect('/');
  }

}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  // find the project and remove it
  models.Project
  .find({"_id": projectID})
  .remove()
  .exec(afterRemove);

  // YOU MUST send an OK response w/ res.send();
  function afterRemove(err, projects){
    if(err) console.log(err);
    res.send("OK");
  }
}