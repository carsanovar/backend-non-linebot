const express = require("express");
const router = express.Router();
const models = require("../models/lineApi");

router.get("/autoMessage", (req, res, next) => {
    
  models.autoMessage(req).then((rs)=>{
    res.status(200);
    res.json(rs);
  }).catch((err)=>{ 
    res.status(500);
    res.end(err); 
  });

});

router.get("/calulateDateFormStart/:date", (req, res, next) => {
    
  models.calulateDateFormStart(req).then((rs)=>{
    res.status(200);
    res.json(rs);
  }).catch((err)=>{ 
    res.status(500);
    res.end(err); 
  });

});

module.exports = router;