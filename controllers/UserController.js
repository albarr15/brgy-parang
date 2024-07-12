const UserModel = require("../models/database/mongoose").UserModel;

const isUser = async (req, res) => {
    const { email, password } = req.body;

    // DEBUGGING //
    /*  
        console.log(email);
        console.log(password);
    */
    try {
        // Find the user by email
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.redirect('/admin-login-page?log_in=User-Not-Found');
        }

        // Compare the provided password with the stored plaintext password
        if (password !== user.password) {
            return res.redirect('/admin-login-page?log_in=Incorrect-Password');
        }

        // Check if admin
        if ("admin" !== user.role) {
            return res.redirect('/admin-login-page?log_in=Unathorized_Access');
        }


        // Respond with success
        return res.redirect('/admin-homepage?log_in=successful');
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    isUser
}