const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Stl {
  constructor(dataType, fileContent, hashData, encryptedData, id) {
    (this.dataType = dataType),
      (this.fileContent = fileContent),
      (this.hashData = hashData),
      (this.encryptedData = encryptedData),
      (this._id = new mongodb.ObjectId(id));
  }

  save() {
    const db = getDb();
    let dbOp;
    dbOp = db.collection("STL").insertOne(this);
    // console.log("Insert ", this.dataType);
    return dbOp
      .then((result) =>
        // console.log('result',result)
        console.log("Record Inserted")
      )
      .catch((err) => console.log(err));
  }

  // static fetchAll() {
  //   const db = getDb();
  //   return db
  //     .collection("STL")
  //     .find()
  //     .toArray()
  //     .then((result) => {
  //       // console.log(result);
  //       return result;
  //     })
  //     .catch((err) => console.log(err));
  // }

  static findByHash(hashData) {
    const db = getDb();
    return db
      .collection("STL")
      .find({ hashData: hashData })
      .next()
      .then((result) => {
        // console.log("findbyhash result", result);
        return result;
      })
      .catch((err) => console.log(err));
  }

  static findHashSalt() {
    const db = getDb();
    return db
      .collection("STL")
      .find({ dataType: "hashSalt" })
      .next()
      .then((result) => {
        // console.log("findhashsalt result", result);
        return result;
      })
      .catch((err) => console.log(err));
  }

  static deleteAll() {
    const db = getDb();
    return db
      .collection("STL")
      .deleteMany()
      .then((result) => {
        // console.log(result);
        return result;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Stl;
