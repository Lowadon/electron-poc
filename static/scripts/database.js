const sqlite3 = require('sqlite3').verbose();
const dburl = './database/auftraege.db'
var db = new sqlite3.Database(dburl);

function testDbInitialisation() { 
    db.serialize( () => {
        db.run("CREATE TABLE if not exists carmanufacturer (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)");
        db.run("INSERT INTO carmanufacturer (name) VALUES ('mercedes')");
        db.run("INSERT INTO carmanufacturer (name) VALUES ('audi')");

        db.run("CREATE TABLE if not exists carmodel (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, power INTEGER, manufacturer_id INTEGER, FOREIGN KEY (manufacturer_id) REFERENCES carmanufacturer(id))")
        db.run("INSERT INTO carmodel (name, power, manufacturer_id) VALUES('a3', 180, (SELECT id FROM carmanufacturer WHERE name='audi'))");
        db.run("INSERT INTO carmodel (name, power, manufacturer_id) VALUES('amg', 250, (SELECT id FROM carmanufacturer WHERE name='mercedes'))");

        db.each("Select * FROM carmodel", function(err, row) {
            console.log(row.id + ": " + row.name + ", " + row.power + ", " + row.manufacturer_id);
        });
    });
};

async function queryCarmodel()
{
    return new Promise ((resolve, reject) => {
        db.serialize( () => {
            db.all("Select * FROM carmodel", [], (err, res) => {
                if(err){
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    })
};

module.exports = {queryCarmodel, testDbInitialisation};