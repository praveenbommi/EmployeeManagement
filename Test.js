const initialData = require("./data.json")
const collection = require("../utilities/connection")

let model = {}

model.insertScript = () => {
    return collection.getCollection().then((collection) => {
        return collection.deleteMany().then((data) => {
            return collection.insertMany(initialData).then((response) => {
                if (response && response.length > 0) {
                    return response.length
                } else {
                    let err = new Error("Script insertion failed")
                    err.status = 500
                    throw new Error
                }
            })
        })
    })
}

model.getAll=()=>{
    return collection.getCollection().then((collection)=>{
        return collection.find({},{_id:0}).then((data)=>{
           console.log(data)
            
            return data;
        })
    })
   }

   model.getUser = (username) => {
    return collection.getCollection().then((collection) => {
        return collection.findOne({ username: username }, { _id: 0, username: 1, password: 1 })
            .then((data) => {
                return data
            })
    })
}

model.getAllData = (userobj) => {
    return collection.getCollection().then((collection) => {
        return collection.find(userobj).then((data) => {
                if(data){
                return data
            }
                else{
                    let err = new Error("user does not exists")
                    err.status = 401
                    throw err;  
                }
            })
    })
}


model.createAccount = (userData) => {
    return model.getUser(userData.username).then((data) => {
        if (data) {
            let err = new Error("user already exists")
            err.status = 406
            throw err
        }
        else{
    return collection.getCollection().then((collection) => {
        return collection.create(userData).then((data) => {
            if (data) {
                return data
            } else {
                let err = new Error("Account not created")
                err.status = 500
                throw err;
            }
        })
    })
}
})
}

// model.LoginAccount = (userData) =>{
//     return collection.getCollection().then((collection) => {
//     return collection.findOne({ username : userData.username} ,(err,user) => {
//         if(err){
//             let err = new Error("Invalid username/password")
//              err.status = 401
//              throw err;
//         }
//         else{
//             if(!user){
//             let err = new Error("Invalid email")
//              err.status = 401
//              throw err;
//             } else if (user.password !== userData.password){
//                 let err = new Error("Invalid password")
//                 err.status = 401
//                 throw err;
//             } else{
//                 return user
//             }
//             } 
//     })
// })
// }

model.LoginAccount = (userData) =>{
    return collection.getCollection().then((collection)=>{
      return collection.findOne({username: userData.username}).then((data)=>{
              if(data.username !== userData.username){
                        let err = new Error("Invalid email")
                         err.status = 401
                         throw err;
                        }
              if(data.password !== userData.password){
                         let err = new Error("Invalid password")
                         err.status = 401
                        throw err;
              }
              if(!data){
                let err = new Error("Invalid cerendentials")
                err.status = 401
               throw err;
     }
     else{
         console.log(data)
         return data
     }
      })
    })
}

model.deleteUser = (username)=>{
    let g = username
    return collection.getCollection().then((collection)=>{
          return collection.deleteOne({ username:username }).then((data)=>{
             if(data.deletedCount>0){
                // return data
                return g
             }
             else{
                let err = new Error("user does not exists")
                err.status = 401
                throw err;
             }
            })
    })
}

model.updateUser = (username,userData)=>{
    // let g = userData.username
    return collection.getCollection().then((collection)=>{
          return collection.findOneAndUpdate({username:username},userData, {new: true}).then((data)=>{
             if(data){
                return data
                // return g
             }
             else{
                let err = new Error("user does not exists")
                err.status = 401
                throw err;
             }
            })
    })
}

module.exports = model