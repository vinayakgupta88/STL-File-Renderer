const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const stljs = require("stljs");

const Stl = require("../models/STL");

const filePath = path.dirname(require.main.filename);

exports.getUploadFile = (req, res, next) => {
  console.log("Started!");
  // res.statusCode = 200;
  res.sendFile(path.join(filePath, "views", "upload.html"));

  // Stl.deleteAll()
  //   .then((res) => console.log("All Deleted"))
  //   .catch((err) => console.log(err));
  // console.log("check");
};

exports.postUploadFile = (req, res, next) => {
// console.log('testing', req.body.STLFile);
  let readFilePath = req.body.STLFile;
  let fileContent = "";

  stljs.readFile(readFilePath, (err, solid, name) => {
    fileContent = solid;

    // console.log("stlContent", fileContent);

    let hashSaltValue = "";
    Stl.findHashSalt()
      .then((result) => {
        if (!result) {
          const salt = bcrypt.genSaltSync(10);
          console.log("salt generated", salt);
          hashSaltValue = salt;
          const hashSalt = new Stl("hashSalt", null, salt, null, null);
          hashSalt
            .save()
            .then((result) => {
              // console.log(result);
              console.log("Salt generated and saved!");
            })
            .catch((err) => {
              return res.end("Something went wrong while generating salt!");
            });
        } else {
          hashSaltValue = result.hashData;
          console.log("salt from db", hashSaltValue);
        }
      })
      .then(() => {
        bcrypt
          .hash(fileContent.toString(), hashSaltValue)
          .then((hashData) => {
            console.log("hashData", hashData);

            Stl.findByHash(hashData).then((result) => {
              if (result) {
                const error = new Error('File already present in the database!');
error.statusCode = 401;
throw error;

                return res.end("File already present in the database!");
              } else {
                const algorithm = "aes-256-cbc";
                const initVector = crypto.randomBytes(16);
                const Securitykey = crypto.randomBytes(32);
                const cipher = crypto.createCipheriv(
                  algorithm,
                  Securitykey,
                  initVector
                );
                let encryptedData = cipher.update(
                  fileContent.toString(),
                  "utf-8",
                  "hex"
                );
                encryptedData += cipher.final("hex");
                // console.log("Encrypted message: " + encryptedData);

                const stl = new Stl(
                  "File",
                  fileContent,
                  hashData,
                  encryptedData,
                  null
                );
                stl
                  .save()
                  .then((result) => {
                    // console.log(result);
                    console.log("Uploaded!");
                    res.sendFile(
                      path.join(filePath, "views", "postUpload.html")
                    );
                  })
                  .catch((err) => {
                    return res.end("Something went wrong!");
                  });
              }
            });
          })
          .catch((err) => {
            return res.end("Something went wrong!");
          });
      })
      .catch((err) => {
        return res.end("Something went wrong!");
      });
  });
};
