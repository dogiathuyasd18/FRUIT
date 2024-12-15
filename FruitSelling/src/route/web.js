import express from "express";
import homeController from '../controllers/homeController.js';
import userController from '../controllers/userController.js';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);

    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);

    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.get('/sign-in',homeController.signIn);
    router.get('/sign-up',homeController.signUp);
    router.post('/shipping',homeController.shipping);
    router.get('/profile',homeController.profile);

    router.get('/product-detail',homeController.productDetail);

    router.post('/payment',homeController.getpayment);
    router.get('/favourite',homeController.favourite);
    router.post('/checkout',homeController.getcheckout);
    router.get('/edit-personal-info',homeController.getEdit);
    router.get('/add-new-card',homeController.addCard);
    router.get('/add-to-cart',homeController.addtoCart)
    router.get('/cart',homeController.getCart);

    router.post('/login', userController.handleLoging);
    


    return app.use("/", router);
}

export default initWebRoutes;