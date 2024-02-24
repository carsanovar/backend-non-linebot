const express = require("express");
const router = express.Router();
const models = require("../models/test");

router.get("/test", (req, res, next) => {
    
  models.test(req).then((rs)=>{
    res.status(200);
    res.json(rs);
  }).catch((err)=>{ 
    res.status(500);
    res.end(err); 
  });

});

module.exports = router;