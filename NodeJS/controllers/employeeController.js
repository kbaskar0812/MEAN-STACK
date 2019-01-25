const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Employee } = require('../models/employee');

// => localhost:3000/employees/
router.get('/',(req,res) => {
    Employee.find((err,docs) =>{
        if(!err) {res.send(docs);}
        else { console.log('error in retrive data: ' + JSON.stringify(err,undefined, 2));}

    });
});
// => localhost:3000/employees/id
router.get('/:id',(req,res) => {
   if(!ObjectId.isValid(req.params.id))
   return res.status(400).send('no record with given id : ${req.params.id}');
   Employee.findById(req.params.id,(err,docs) =>{
    if(!err) {res.send(docs);}
    else { console.log('error in retrive data: ' + JSON.stringify(err,undefined, 2));}
   });
});

router.post('/',(req,res) => {
    var emp = new Employee({
        name: req.body.name,
        position:  req.body.position,
        office:  req.body.office,
        salary:  req.body.salary,
    });
    emp.save((err,docs) =>{
        if(!err) {res.send(docs);}
        else { console.log('error in save: ' + JSON.stringify(err,undefined, 2));}
    });
});

router.put('/:id',(req,res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('no record with given id : ${req.params.id}');

    var emp = {
        name: req.body.name,
        position:  req.body.position,
        office:  req.body.office,
        salary:  req.body.salary,
    };
    Employee.findByIdAndUpdate(req.params.id,{$set :emp},{new : true},(err,docs) =>{
        if(!err) {res.send(docs);}
        else { console.log('error in save: ' + JSON.stringify(err,undefined, 2));}
    });
 });

 
router.delete('/:id',(req,res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('no record with given id : ${req.params.id}');

    var emp = {
        name: req.body.name,
        position:  req.body.position,
        office:  req.body.office,
        salary:  req.body.salary,
    };
    Employee.findByIdAndRemove(req.params.id,(err,docs) =>{
        if(!err) {res.send(docs);}
        else { console.log('error in save: ' + JSON.stringify(err,undefined, 2));}
    });
 });
module.exports = router;

