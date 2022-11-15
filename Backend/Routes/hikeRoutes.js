const hikeList = require('../Controllers/hikeController');

module.exports = function(app){
    app.route('/hikes')
        .get(hikeList.getAll)
        .post(hikeList.createNew);    //create

    app.route("/hikes/:id")
        .get(hikeList.getById)        //read
        .put(hikeList.editById)       //update
        .delete(hikeList.deleteById)  //delet


        app.route("/searchHike")
        .post(hikeList.getByRegion)
}