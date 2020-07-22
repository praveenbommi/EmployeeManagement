const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema
mongoose.set("useCreateIndex", true)
mongoose.set('useUnifiedTopology', true)

const schema = {
    "username": {
        type: String,
        required:true ,
        unique:true
    },
    "password": {
        type: String,
        required: true,
        unique: true
    },
    "employee_no": {
        type: String,
        required:true ,
        unique:true
    },
    "gender":{
        type: String,
        required:true 
    } ,
    "location": {
        type: String,
        required:true 
    } ,
    "department":{
        type: String,
        required:true 
    },
    "designation":{
        type: String,
        required:true
    }
}

let testSchema = new Schema(schema, { collection: "tests", timestamps: true })

let connection = {}

connection.getCollection = () => {
    return mongoose.connect("mongodb://localhost:27017/TestDb", { useNewUrlParser: true }).then((db) => {
        return db.model("test", testSchema)
    }).catch((err) => {
        console.log(err.message);

        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })
}

module.exports = connection

