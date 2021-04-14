const config = require('../config/routes.js');
const router = config.express.Router();
const collection = require('./model.js');
const functions = require('./functions.js');
const bcrypt = require("bcrypt");

// @route GET api/v1/employee
// @desc get employees list with pagination
// @access Public
router.get('/', function (req, res) {

  // Create Options
  let options = { sort: '-createdAt' };
  options.page = (req.query.page)? Number(req.query.page): 1;
  options.limit = (req.query.limit)? Number(req.query.limit): 20;

  // Create query params
  let query = {};
  if(req.query.search) {
    query["$or"] = [
      {"fullName": { $regex: `${req.query.search}.*`, $options: "i" }},
      {"empId": { $regex: `${req.query.search}.*`, $options: "i" }},
      {"email": { $regex: `${req.query.search}.*`, $options: "i" }},
      {"contactNumber": { $regex: `${req.query.search}.*`, $options: "i" }}
    ]
  }
  collection.paginate(query, options, function(err, result) {
    if (err) return res.status(500).send("Something went wrong, please try after sometime");
    res.status(200).send(result);
  });
});

// @route CREATE api/v1/employee/create
// @desc create employee
// @access Public
router.post('/create', function(req, res) {

  const { errors, isValid } = config.validators.AddEmployeeValidator(req.body);
  console.log("success2")
  console.log(req.body)

  // Checking Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }


  let {fullName, password, empId, portfolioWebsite, contactNumber, address, gender, designation, email} = req.body;

  let empData = {
      fullName,
      password: bcrypt.hashSync(password, 10),
      empId,
      email,
      portfolioWebsite,
      address,
      contactNumber,
      gender,
      designation
    };

  collection.create(empData, function (err, user) {

    if (!err) {
      return res.status(200).json({error: false, data: user, message: 'success'})
    } else {
      if (err.code ===  11000) { // this error gets thrown only if similar userId already exist.
        return res.status(409).send({error: true, message: 'User already exist!'})
      } else {
        return res.status(500).send({error: true, message: 'Error creating employee'})
      }
    }
  });
});



module.exports = router
