function insert(item, user, request) {
    var uuid = require('node-uuid');
    item.uuid = uuid.v1();
    request.execute();
    console.log(item);

}