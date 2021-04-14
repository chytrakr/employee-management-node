const config = require('../config/models.js');
config.increment.initialize(config.db);

const schema = new config.mongoose.Schema({
  fullName: { 
    type: String, 
    required: true 
  },
  empId: { 
    type: String,
    unique: true,
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true
  },
  address: { 
    type: String, 
    required: true 
  },
  designation: { 
    type: String, 
    required: false 
  },
  gender: { 
    type: String, 
    required: true
  },
  portfolioWebsite: { 
    type: String, 
    required: false 
  },
  contactNumber: { 
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Boolean,
    default: true
  }
}, {
  strict: true
});

schema.pre('save', function (next) {
  this.email = this.email.toLowerCase(); // ensure email are in lowercase
  next();
})

schema.plugin(config.paginate);
var User = config.mongoose.model('employees', schema);
module.exports = User;