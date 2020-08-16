const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database");
const User = require("../models/users");
const Job = require("../models/Job");
const database = require("../config/database");

router.post("/addJob", (req, res) => {
  let newJob = new Job({
    creator_username: req.body.creator_username,
    description: req.body.description,
    location: req.body.location,
    pay: req.body.maxduration,
    tags: req.body.tags || "",
    status: req.body.status || "",
    job_location: req.body.job_location,
    bidders: req.body.bidders || "",
    assigned: req.body.assigned || "",
    unit: req.body.unit,
  });
  Job.addJob(newJob, (err, user) => {
    if (err) {
      let message = "";
      if (err.errors.creator_username)
        message = "add the username of the creator";
      if (err.errors.description)
        message += "Please add a description to this job";
      if (err.errors.location) message += "Please add a location to this job";
      if (err.errors.pay) message += "Please add a pay to this job";
      if (err.errors.maxduration)
        message += "Please add a maxduration to this job";
      if (err.errors.unit) message += "Please add a unit to this job";
      res.json({
        success: false,
        message,
      });
    } else {
      res.json({
        success: true,
        message: "Addition of new job is successful",
      });
    }
  });
});

router.post("/updatejob", (req, res) => {
  let job = {};
  if (req.body.description) {
    job.description = req.body.description;
  }
  if (req.body.location) {
    job.location = req.body.location;
  }
  if (req.body.pay) {
    job.pay = req.body.pay;
  }
  if (req.body.maxduration) {
    job.maxduration = req.body.maxduration;
  }
  if (req.body.tags) {
    job.tags = req.body.tags;
  }
  if (req.body.status) {
    job.status = req.body.status;
  }
  if (req.body.description) {
    job.description = req.body.description;
  }
  if (req.body.job_location) {
    job.job_location = req.body.job_location;
  }
  if (req.body.bidders) {
    job.bidders = req.body.bidders;
  }
  if (req.body.assigned) {
    job.assigned = req.body.assigned;
  }
  if (req.body.unit) {
    job.unit = req.body.unit;
  }
  Job.updatejob(req.body._id,job,(err,job)=>{
    if (err) {
      throw err;
    }else{
      res.json(job);
    }
  })
});

router.get("/alljobs",(req,res)=>{
  Job.Alljobs((err,jobs)=>{
    if (err) throw err;
    else{
      res.json(jobs);
    }
  })

})

module.exports=router;
