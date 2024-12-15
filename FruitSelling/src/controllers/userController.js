import userService from '../services/userService.js';

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

        // Check the result from the user servicFe
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


export default {
    handleLoging: handleLoging,
}