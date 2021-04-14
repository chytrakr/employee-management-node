const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function addEmployeeValidator(data) {

  let errors = {};

  data.fullName = !isEmpty(data.fullName) ? data.fullName : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.empId = !isEmpty(data.empId) ? data.empId : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.contactNumber = !isEmpty(data.contactNumber) ? data.contactNumber : '';
  data.address = !isEmpty(data.address) ? data.address : '';
  data.designation = !isEmpty(data.gender) ? data.gender : '';
  data.designation = !isEmpty(data.designation) ? data.designation : '';

  if(Validator.isEmpty(data.fullName)) {
    errors.message = "User full name is required";
  }

  if(Validator.isEmpty(data.password)) {
    errors.message = "Password is required";
  }

  if(Validator.isEmpty(data.empId)) {
    errors.message = "Employee ID is required";
  }

  if(Validator.isEmpty(data.empId)) {
    errors.message = "Email ID is required";
  }

  if(!Validator.isEmail(data.email)) {
    errors.message = "Invalid email ID";
  }

  if(typeof data.contactNumber !== 'number' && data.contactNumber.length !== 10) {
    errors.message = "Invalid contact number"
  }

  if(Validator.isEmpty(data.address)) {
    errors.message = "Address is required";
  }

  if(Validator.isEmpty(data.gender)) {
    errors.message = "Gender is required";
  }

  if(Validator.isEmpty(data.designation)) {
    errors.message = "Designation is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}