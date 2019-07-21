(
    function() {
        "use strict";
        const express = require('express')
        const cors = require('cors')
        const bodyParser = require('body-parser')
        const app = express()
        const sqlite3 = require('sqlite3').verbose();
        let port = 4000;
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}))
        const db = new sqlite3.Database('database.db');
        db.run("CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(40) not null)");
        db.close();
        app.get('/user/', function(req, res) {
            const db = new sqlite3.Database('database.db');
            db.all('SELECT * FROM users;', [], (err, rows) => {
                if (err) {
                    throw err;
                }else{
                    res.status(200).json(rows)
                }
            });
            db.close();
        });
        app.post('/user/add', function(req, res) {
            const { user_name } = req.body
            const db = new sqlite3.Database('database.db');
            db.run('INSERT INTO users (user_name) VALUES (?)', [user_name], (err) => {
                if (err) {
                    throw err;
                }else{
                    res.status(200).json({'user': 'user in added successfully'});
                }
            });
            db.close();
        });
        app.get('/user/edit/:id', function(req, res) {
            let id = parseInt(req.params.id);
            const db = new sqlite3.Database('database.db');
            db.all('SELECT * FROM users WHERE user_id=?', [id], (err, rows) => {
                if (err) {
                    throw err;
                }else{
                    res.status(200).json(rows)
                }
            });
            db.close();
        });
        app.put('/user/update/:id', function(req, res) {
            const id = parseInt(req.params.id)
  	        const { user_name } = req.body
            const db = new sqlite3.Database('database.db');
            db.run('UPDATE users SET user_name=? WHERE user_id=?', [user_name, id], (err) => {
                if (err) {
                    throw err;
                }else{
                    res.status(200).json({'user': 'user updated successfully'});
                }
            });
            db.close();
        });
        app.delete('/user/delete/:id', function(req, res) {
            const id = parseInt(req.params.id)
            const db = new sqlite3.Database('database.db');
            db.run('DELETE FROM users WHERE user_id=?', [id], (err) => {
                if (err) {
                    throw err;
                }else{
                    res.status(200).json('User deleted')
                }
            });
            db.close();
        });
        let server = app.listen(port, function () {
            console.log('Express server listening on port ' + server.address().port);
        });
        module.exports = app;
    }()
);