const trailsList = require('../Controllers/mockTrailController');

module.exports = function(app){
    app.route('/trails')
        .get(trailsList.getAll)
        .post(trailsList.createNew);    //create

    app.route("/trails/:id")
        .get(trailsList.getById)        //read
        .put(trailsList.editById)       //update
        .delete(trailsList.deleteById)  //delete
}