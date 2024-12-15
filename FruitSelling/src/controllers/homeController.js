import db from '../models/index.js';
import CRUDService from '../services/CRUDService.js';
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }



}

let getAboutPage = (req, res) => {
    return res.render('about.ejs');

}

let signUp = (req,res) => {
    return res.render('sign-up.ejs');
}

let signIn =async (req,res) => {
    const name = await req.body.email
    console.log(name)
    return res.render('sign-in.ejs')
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.render('sign-in.ejs');

}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log('-------------------------------------');
    console.log(data);
    console.log('-------------------------------------');

    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        // check user data not found

        return res.render('editCRUD.ejs', {
            user: userData
        })

    } else {

        return res.send('User not found')
    }

}



let profile = (req,res) => {
    return res.render('profile.ejs')
}

let productDetail = (req,res) => {
    return res.render('product-detail.ejs')
}

let getpayment = (req,res) => {
    const name = req.body.customerName
    const address= req.body.customerAddress
    const phone= req.body.customerPhone
    const total = req.body.total
    const shipping = 10
    const subtotal = req.body.subtotal
    console.log(name)
    return res.render('payment.ejs',{total: total, shipping : shipping, subtotal : subtotal, name : name, address: address, phone: phone})
}

let favourite = (req,res) => {
    return res.render('favourite.ejs')
}

let checkout = (req, res) => {
    const total = 9999; // Calculate the total based on your cart logic
    // Render the 'checkout' view and pass the 'total' value to the EJS template
    res.render('checkout', { total: total });
};


let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);

    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('delete user succeed')
    }
    else {
        return res.send('user not found')
    }
}

let getLogined = (req,res) => {
    return res.render('index-logined.ejs')
}

let handleLoging = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    try {
        // Attempt to login the user by calling the user service
        let userData = await userService.handleUserLogin(email, password);

        // Check the result from the user service
        if (userData.errCode === 0) {
            // Successful login, redirect to index-logined.ejs and pass user data
            return res.render('index-logined', { user: userData.user });
        } else {
            // Login failed, send back the error message as JSON
            return res.status(400).json({
                errCode: userData.errCode,
                message: userData.errMessage
            });
        }
    } catch (error) {
        // Catch and log any errors
        console.error(error);
        return res.status(500).json({
            errCode: 500,
            message: 'Internal Server Error'
        });
    }
}

let getEdit = (req,res) => {
    return res.render('edit-personal-info.ejs');
}

let addCard = (req,res) => {
    return res.render('add-new-card.ejs');
}

let addtoCart = (req,res) => {
    return res.render('add-to-cart.ejs')
}

let getCart = (req,res) => {
    const total = 999
    return res.render('cart.ejs')
}
let getcheckout = async (req, res) => {
    // Get values from the request body
    const total = req.body.total;
    const shipping = req.body.shipping;
    const subtotal = req.body.subtotal;

    // Parse cartItem (which is a JSON string)
    const cartItems = JSON.parse(req.body.cartItem);

    console.log("Cart Items:", cartItems);
    console.log("Total:", total);
    console.log("Shipping:", shipping);
    console.log("Subtotal:", subtotal);

    // Render the checkout page with the data
    return res.render('checkout.ejs', { total, shipping, subtotal, cartItems });
};


let shipping = (req,res) => {
    const total = req.body.total
    const shipping = 10
    const subtotal = req.body.subtotal
    return res.render('shipping.ejs',{total: total, shipping: shipping, subtotal : subtotal})
}



export default {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
    signIn: signIn,
    signUp: signUp,
    shipping: shipping,
    profile: profile,
    productDetail : productDetail,
    getpayment : getpayment,
    favourite : favourite,
    checkout : checkout,
    getLogined: getLogined,
    handleLoging : handleLoging,
    getEdit : getEdit,
    addCard : addCard,
    addtoCart : addtoCart,
    getCart: getCart,
    getcheckout : getcheckout,
}