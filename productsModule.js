require("dotenv").config()
const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true,
        unique: true
    },
    done: {
        type: Boolean,
    }
})

const Products = mongoose.connection.model("products", productSchema)


async function SaveProduct(bodyInput) {
        const Item = new Products({
        item: bodyInput,
        done: false
    })
    Item.save()
    .then(() => console.log(Item + " added"))
    .catch((e) => console.log(e.message))
}

async function DeleteProduct(paramsId) {
    await Products.findOneAndRemove({id: paramsId})
    .then(()=> console.log(this.item + "was deleted"))
    .catch((e) => console.log(e.message))
}


async function MarkDone(paramsId) {
    await Products.findOneAndUpdate({_id: paramsId}, {done: true}, {new: true} )
    .then(() => console.log(" is done"))
    .catch((e) => console.log(e.message))
}
// async function PrintAll(req,res){
//     await  Products.find({})
//     .then((data)=> res.json(data))
//     .catch((e) => console.log(e.message))

// }
function PrintAll(){
    return Products.find({})
    .then((data)=> data)
    .catch((e) => console.log(e.message))
    
}

module.exports = {
    SaveProduct,
    DeleteProduct,
    MarkDone,
    PrintAll
}