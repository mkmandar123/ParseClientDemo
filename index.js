const express = require('express');
const Parse = require('parse/node');
const ParseDashboard = require('parse-dashboard');
const app = express();

Parse._initialize(process.env.app_id,process.env.js_key,process.env.master_key);
Parse.serverURL = process.env.server_url;

const dashboard = new ParseDashboard({
    "apps": [
        {
            "serverURL": process.env.server_url,
            "appId": process.env.app_id",
            "masterKey": process.env.master_key,
            "appName": "MyApp"
        }
    ]
});

app.use('/dashboard', dashboard);

app.get('/', (req,res) =>{
    res.status(200).json({success:true, message: 'successful setup'});
});

app.get('/test', (req, res) => {
   const Obj = Parse.Object.extend('testClass');
   const obj = new Obj();
   obj.set('name', 'Mandar');
   obj.set('testField2', 'Random_value2');
   obj.save().then(() => {
      res.json({success: true, message: 'Object created successfully'});
   });
});

app.get('/testCloudFn', async(req, res) => {
    const ratings = await Parse.Cloud.run("testFunction");
    res.json(ratings);
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port 3000');
});
