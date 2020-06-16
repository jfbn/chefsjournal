const Cook = require('../models/model_cook');

class CookService {
    static create(cook){
        const newCook = new Cook(cook);
        return newCook.save();
    }
    static async delete(id){
        return await Cook.deleteOne( {"_id": id});
    }
    static async update(obj){
        return await Cook.updateOne({_id: obj._id}, obj);
        
    }
}

module.exports = CookService;