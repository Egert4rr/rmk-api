const hikerList = require('../Controllers/mockHikerController');

module.exports = function(app){
    app.route('/hikers')
        .get(hikerList.getAll)
        .post(hikerList.createNew);    //create

    app.route("/hikers/:id")
        .get(hikerList.getById)        //read
        .put(hikerList.editById)       //update
        .delete(hikerList.deleteById)  //delete
}