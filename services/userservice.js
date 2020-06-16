const User = require('../models/model_user');

class UserService {
    static create(user){
        const newUser = new User(user);
        return newUser.save();
    }
    static async delete(id){
        return await User.deleteOne( {"_id": id});
    }
    static async update(obj){
        return await User.updateOne({_id: obj._id}, obj);
        
    }
}

module.exports = UserService;