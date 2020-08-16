const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// JobSchema

const TagSchema = new Schema({ tag: String });
const BidderSchema = new Schema({
  freelancer: String,
  intern: String,
});

const JobSchema = new Schema({
  creator_username: String,
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  pay: {
    type: Number,
    required: true,
  },
  maxduration: {
    type: Number,
    required: true,
  },
  units: {
    type: String,
    required: true,
  },
  tags: [TagSchema],
  status: String,
  job_location: String,
  bidders: [BidderSchema],
  assigned: BidderSchema,
});

const Job = (module.exports = mongoose.model("job", JobSchema));

module.exports.addJob = function (newJob, callback) {
  newJob.save(callback);
};
module.exports.updatejob = function (job, id) {
  Job.findOneAndUpdate({ _id: id }, job, callback);
};
module.exports.Alljobs=function(callback){
  Job.find({},callback);
}