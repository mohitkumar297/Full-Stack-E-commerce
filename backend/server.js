const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path')
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose');

const app = express()
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'Backend Project',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
var productsInCart = []


mongoose.connect('mongodb://localhost:27017/ecommerceDB', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useCreateIndex', true);
app.use(bodyParser.json());




const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
}).single('myImage')


const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model('User', userSchema)

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const productsSchema = {
    name: String,
    price: Number,
    type: String,
    img: { data: Buffer, contentType: String },
    quantity: { type: Number, default: 0 }
}
const cartSchema = {
    product: productsSchema,
    quantity: Number
}
const categorySchema = {
    name: String
}

const orderSchema = new mongoose.Schema({
    user: String,
    products: [productsSchema],
    price: Number,
    order: String
})

const Product = mongoose.model("Product", productsSchema)
const Category = mongoose.model("Category", productsSchema)
const Cart = mongoose.model('Cart', cartSchema)
const Order = mongoose.model('Order', orderSchema)

app.get('/', function (req, res) {
    res.send("Hello Worldssss")
    console.log(req.user);
})

app.get('/api/products', cors(), (req, res) => {
    console.log(req.user);
    Product.find({}, function (err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
            // console.log(products);    
        }
    })
});

app.get('/api/productsMen', cors(), (req, res) => {
    Product.find({ type: { $regex: "^" + 'M' } }, function (err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
            // console.log(products);    
        }
    })
});

app.get('/api/productsWomen', cors(), (req, res) => {
    Product.find({ type: { $regex: "^" + 'W' } }, function (err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
            // console.log(products);    
        }
    })
});

app.post('/api/product', cors(), (req, res) => {
    console.log(req.body._id);
    Product.findOne({ _id: mongoose.Types.ObjectId(req.body._id) }, function (err, matchedProduct) {
        if (err) {

            console.log(err);
        } else {
            res.json([matchedProduct])

        }

    });

})

app.post('/api/getSortedProduct', cors(), (req, res) => {
    if (req.body.sort) {
        Product.find({ type: { $regex: "^" + req.body.type } }).sort({ price: req.body.sort === 'Price: Low to High' ? 'asc' : 'desc' }).exec(function (err, docs) {
            if (err) {
                console.log(err);
            } else {

                res.json(docs)
            }
        });
    }
    else {
        Product.find({
            type: req.body.type
        }, function (err, docs) {
            if (err) {
                console.log(err);
            } else {

                res.json(docs)
            }
        });
    }
})

function saveNewProduct(product) {
    const newProduct = new Product({
        name: product.body.name,
        price: product.body.price,
        type: product.body.type,
        img: { data: fs.readFileSync(req.files.userPhoto.path), contentType: 'image/png' }
    }
    )
    newProduct.save()
}

app.post('/api/addnewproduct', cors(), (req, res) => {
    // console.log(req.body);
    upload(req, res, (err) => {
        if (err) {
            console.log("the error is" + err);
        } else {

            const newProduct = new Product({
                name: req.body.name,
                price: req.body.price,
                type: req.body.type,
                img: {
                    data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                    contentType: 'image/png'
                }
            }
            )
            newProduct.save()
            console.log("saved");

            res.redirect('/addnewproduct')
        }
    })
})

app.get('/api/getCategories', cors(), (req, res) => {
    Category.find(function (err, categories) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(categories)
        }
    })
})

app.get('/api/getCategoriesMen', cors(), (req, res) => {
    Category.find({ name: { $regex: "^" + 'M' } }, function (err, categories) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(categories)
        }
    })
})

app.get('/api/getCategoriesWomen', cors(), (req, res) => {
    Category.find({ name: { $regex: "^" + 'W' } }, function (err, categories) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(categories)
        }
    })
})

app.post('/api/deleteCategories', cors(), (req, res) => {
    Category.deleteOne({ name: req.body.name }, function (err, docs) {
        if (err) return handleError(err);
        res.json(docs)
    });
})

app.post('/api/addNewCategory', cors(), (req, res) => {

    const newCategory = new Category({
        name: req.body.newCategory
    })

    const addCategories = [newCategory]
    Category.insertMany(addCategories, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully saved");
        }
    })
    res.redirect('/allcategories')

})

app.post('/api/deleteProduct', cors(), (req, res) => {
    Product.deleteOne({ _id: req.body.name }, function (err, docs) {
        if (err) return handleError(err);
        res.json(docs)
        console.log("deleted");
    });
})


//User Authentication
app.post('/api/login', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })


    req.login(user, function (err) {
        if (err) {
            res.redirect('/login')
            console.log(err);
        } else {
            passport.authenticate('local')(req, res, function () {
                res.redirect('/cart')
            })
        }
    })
})


app.post('/api/signup', cors(), (req, res) => {
    User.register({ username: req.body.username }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect('/signup')
        } else {
            passport.authenticate('local')(req, res, function () {
                console.log('authenticated');
                res.redirect('/cart')
            })
        }
    })
})

app.get('/api/getAllUsers', cors(), (req, res) => {
    User.find(function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            res.json(docs)
        }
    })
})

app.post('/api/deleteUsers', cors(), (req, res) => {

    User.deleteOne({ username: req.body.name }, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            res.json(docs)
        }
    });
})

//Orders
app.post('/api/addToCart', cors(), (req, res) => {
    // console.log(req.body);
    if (req.user) {
        productsInCart.push(req.body)
        res.redirect('back')
    } else {
        res.redirect('/login')
    }
})

app.get('/api/showProductsInCart', cors(), (req, res) => {
    let products = productsInCart.map(ele => new mongoose.Types.ObjectId(ele.id));
    // console.log(productsInCart);
    Product.find({ _id: products }, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            docs.map((doc, index) => {

                doc.quantity = productsInCart[index].quantity

            })
            res.json(docs)
        }
    })
})

app.post('/api/buy', cors(), (req, res) => {
    console.log(req.body.products);
    if (req.user) {
        const newOrder = new Order({
            user: req.user.username,
            products: req.body.products,
            price: req.body.price,
            order: 'Pending'
        })
        const orderToAdd = [newOrder]
        Order.insertMany(orderToAdd, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Order Saved');
                productsInCart = []
                res.redirect('/')
            }
        })
    }

    
})

app.get('/api/getAllOrders', cors(), (req, res) => {
    Order.find(function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            // console.log(docs);
            res.json(docs)
        }
    })
})

app.post('/api/getOrder', cors(), (req,res)=>{
    
    Order.findOne({_id:req.body._id}, function(err, foundOrder){
        if(err){
            console.log(err);
        }else{
            console.log(foundOrder);
            let products = foundOrder.products.map(ele => new mongoose.Types.ObjectId(ele));
            console.log(products);
            Product.find({_id:products}, function(err, docs){
                if(err){
                    console.log(err);
                }else{
                    console.log(docs);
                    res.json(docs)
                }
            })
        }
    })
})
// var search = ''
app.post('/api/search', cors(), (req, res)=>{
    console.log(req.body);
    search = req.body.searchText
    res.redirect('/search')
})

app.get('/api/getSearchedProducts' , (req, res) =>{
    console.log(search);
    Product.find({name:{ "$regex": search, "$options": "i" }}, function(err, docs) {
        if (err){
            console.log(err);
        }else{
            console.log(docs);
            res.json(docs)
        }
    })
})

app.post('/api/changeStatusInDatabase', (req, res)=>{
    const orderToUpdate = JSON.parse(req.body.status);
    Order.findOneAndUpdate({_id: new mongoose.Types.ObjectId(orderToUpdate.id)},{order:orderToUpdate.status}, function(err, foundOrder){
        if(err){
            console.log(err);
        }else{
            
            console.log(foundOrder);
        }
    })
    res.redirect('/orders')
})

app.get('/api/getProfileOrder', (req, res)=>{
    // console.log(req.user.username);
    if(req.user){
        Order.find({user: req.user.username}, function(err, foundDocs) {
            if(err){
                console.log(err);
            }else{
                res.json(foundDocs);
            }
        })
    }else{
        // res.redirect('/login')
    }
})



app.listen(5000, () => {
    console.log("Server started on 5000");
});


// const product1 = new Product({
//     name: "Green Shirt",
//     price: 30.99
// });

// const product2 = new Product({
//     name: "Blue Shirt",
//     price: 40.99
// });
// const product3 = new Product({
//     name: "Black Shirt",
//     price: 10.99
// });

// const category1 = new Category({
//     name: 'Men Shirts'
// })
// const category2 = new Category({
//     name: 'Men Tshirts'
// })
// const category3 = new Category({
//     name: 'Men Jackets'
// })
// const category4 = new Category({
//     name: 'Men Jeans'
// })
// const category5 = new Category({
//     name: 'Men Accessories'
// })
// const category6 = new Category({
//     name: 'Men Shoes'
// })

// const category7 = new Category({
//     name: 'Women Shirts'
// })
// const category8 = new Category({
//     name: 'Women Tshirts'
// })
// const category9 = new Category({
//     name: 'Women Jackets'
// })
// const category10 = new Category({
//     name: 'Women Jeans'
// })
// const category11 = new Category({
//     name: 'Women Accessories'
// })
// const category12 = new Category({
//     name: 'Women Shoes'
// })
// const defaultCategories = [category1, category2, category3, category4,category5, category6, category7, category8, category9, category10, category11, category12]

// Category.insertMany(defaultCategories, function(err){
//     if (err){
//         console.log(err);
//     }else{
//         console.log("Successfully saved");
//     }
// })
