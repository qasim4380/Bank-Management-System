const express = require('express');
const { createEmployee, getEmployeeByID, getEmployeesByBranchID, updateEmployee, deleteEmployee, getAllEmployees } = require('../controllers/employeesController');

//router object
const router = express.Router();


//get by employeeID
// router.get('/getbyeid/:EmployeeID',getEmployeeByID);
router.get('/getbyeid/:EmployeeID',getEmployeeByID);
router.get('/getbybid/:BranchID',getEmployeesByBranchID);
router.get('/getall',getAllEmployees);
router.post('/create',createEmployee);
router.put('/update/:EmployeeID',updateEmployee);
router.delete('/delete/:EmployeeID',deleteEmployee);

module.exports=router;