const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const shortid=require("shortid")

const app=express();
app.use(bodyParser.json())


mongoose.connect("mongodb+srv://my-cherry:test123@my-pro.htlqj.mongodb.net/my-pro?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
},
   (err)=>{
        if(err) throw err;
            console.log("Mongodb connected")
        }
    )


//creating modal for Products
const Product=mongoose.model( "shopping-products", new mongoose.Schema({
    _id:{
        type:String,
        default:shortid.generate,
    },
    title:String,
    image:String,
    description:String,
    price:Number,
    availableSizes:[String]
}))

app.get("/api/products", async(req,res)=>{
    const products= await Product.find({});
    res.send(products);
});

app.get("/api/products/:id", async(req,res)=>{
    const singleProduct= await Product.findById(req.params.id);
    res.send(singleProduct);
});

app.post("/api/products" , async(req,res)=>{
    const newProduct=new Product(req.body);
    const savedProduct=await newProduct.save();
    res.send(savedProduct)
});

app.delete("/api/products/:id", async(req,res)=>{
    const deletedProduct=await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct)
})

//model for Order
const Order=mongoose.model("informations", new mongoose.Schema({
    _id:{
        type:String,
        default:shortid.generate
    },
    email:String,
    name:String,
    phoneNumber:Number,
    address:String,
    total:Number,
    cartItems:[{
        _id:String,
        title:String,
        price:Number,
        count:Number
    }]
},{
    timestamps:true,
}
)
)


app.post("/api/orders", async(req,res)=>{
    if(
        !req.body.email ||
        !req.body.name  ||
        !req.body.phoneNumber ||
        !req.body.address ||
        !req.body.total ||
        !req.body.cartItems) {
            return res.send({message:"Enter all input Fields"})
        }

        const order=await Order(req.body).save();
        res.send(order)
    })

    app.get("/api/orders",async(req,res) => {
        const orders =await Order.find({});
        res.send(orders);
     })


app.delete("/api/orders/:id", async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.send(order);
    });

const port=process.env.PORT || 5000;
app.listen(port, ()=> console.log(`server running in port ${port}`))