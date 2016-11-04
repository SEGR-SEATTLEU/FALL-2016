module.exports = {
    configure: function (app) {
        app.get('/helloworld/', function (req, res) {
            res.send('Hello World!');
        });
    }
};