var express = require('express');
var router = express.Router();
var Redshift = require('node-redshift');
 
var redshiftClient;
var options;
var res;
 
var clientConfiguration = {
  user: "tsa_rs_1",
  database: "rs1",
  password: "dont1Wait",
  port: 5439,
  host: "csi-tsawait-redshift.cuuy8nbpuj8r.us-west-2.redshift.amazonaws.com",
};
 
//
// display query result in a table
//
function myCallBack (error, result) {
  console.log ("Callback called....")
  if(error) {
    var errMsg = "Error Code: " + error.code + " ; Error Severity: " + error.severity + "; Message: " + error.message;
    console.log (errMsg)
    res.send('responded with error: ' + errMsg);
  } else {
    res.send('Result' + result);
  }
}
 
// execution starts here when the /users url of the default 
// express app is fetched
router.get('/getBoardingInfo', function(req, resp, next) {
  res = resp;
  redshiftClient = new Redshift(clientConfiguration);
  var queryStr = "SELECT wttm_est_calc FROM public.fct_est_line_wttm WHERE arpt_line_uid = 1 AND wttm_rltv_dttm = '2017-07-13 15:53:00.0'"
  options = {raw: true}
 
  // execute query and invoke callback...
  redshiftClient.query(queryStr, options, myCallBack);
});
 
module.exports = router;