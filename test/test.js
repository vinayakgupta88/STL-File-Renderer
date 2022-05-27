const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

const mongoConnect = require("../util/database").mongoConnect;
const getDb = require("../util/database").getDb;
const app = require("../app");
const fileUploadData = require("./testData").fileUploadData;

chai.use(chaiHttp);

const requester = chai.request.agent(app);

describe("App Testing", () => {
  it("should not access database", () => {
    expect(getDb.bind()).to.throw("No database found!");
  });
  it("should connect MongoDB", (done) => {
    mongoConnect(() => {
      expect(getDb()).not.to.equal("");
      done();
    });
  });
  it("should load the upload page", (done) => {
    requester.get("/").end(function (err, res) {
      expect(res.text).to.contain(
        "Please provide the path from where STL File to be uploaded!"
      );
      done();
    });
  });
  it("should delete all the records from the database", (done) => {
    requester.get("/delete_complete_db").end(function (err, res) {
      expect(res.text).to.equal("Complete Database Deleted!");
      done();
    });
  });
  it("should upload the file to database", (done) => {
    requester
      .post("/")
      .send({ STLFile: fileUploadData })
      .end(function (err, res) {
        expect(res.text).to.contain("File has been successfully Uploaded!");
        done();
      });
  });
  it("should give file exists error", (done) => {
    requester
      .post("/")
      .send({ STLFile: fileUploadData })
      .end(function (err, res) {
        expect(res.text).to.equal("File already present in the database!");
        done();
      });
  });
});
