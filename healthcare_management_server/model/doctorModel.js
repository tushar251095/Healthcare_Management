const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const doctorSchema = new Schema({
    doctorId: {type: String, required: [true, 'doctorId required']},
    firstName: {type: String, required: [true, 'first name is required']},
    lastName: {type: String, required: [true, 'last name is required']},
    email: { type: String, required: [true, 'email address is required'], unique: [true, 'this email address has been used'] },
    contact: { type: String, required: [true, 'contact is required'] },
    specialization: { type: String, required: [true, 'specialization is required'] },
    role: { type: String, default:"doctor" }
},
{
  timestamps:true
}
);


//collection name is stories in the database
module.exports = mongoose.model('Doctor', doctorSchema);