"use strict";

const custom_request = require( "./custom-require" );

const conn_details = require("./env_details.json");

// let options = {
//     method: "POST",
//     url: process.env.env_url,
//     json: true,
//     headers: {
//         "Authorization": "Basic " + Buffer.from(env.user + ":" + env.password).toString("base64"),
//         "Content-Type": "application/json"
//     },
//     body: requestData
// };
conn_details.forEach(conn_detail => {

//      if (conn_detail.method=="POST")
//  {
//     conn_detail.body = JSON.stringify(conn_detail.body);
//  }

    custom_request(conn_detail, (err,res,body) => {
        if (err){
            console.log("error");
        }else{
            console.log("success");
            // console.log(body);
            console.log(typeof(body));
        }

    });
});

