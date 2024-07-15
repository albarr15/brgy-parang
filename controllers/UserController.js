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

const viewAllAccounts = async (req, res) => {
    try {

        const accounts = await UserModel.find().lean();

        res.render('admin-accounts-db-view', {
            layout: 'layout',
            title: 'Admin: Accounts DB Viewing',
            cssFile1: null,
            cssFile2: null,
            javascriptFile1: null,
            javascriptFile2: null,
            accounts: accounts
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}

const viewAdminAcc = async (req, res) => {
    try {
        const caseId = req.params.id;
        const specificAcc = await UserModel.findOne({ _id : caseId }).lean();

        // console.log(caseId) 

        res.render('admin-view-acct-admin', {
            layout: 'layout',
            title: 'Admin: Admin Account View Page',
            cssFile1: null,
            cssFile2: null,
            javascriptFile1: null,
            javascriptFile2: null,
            accounts: specificAcc
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}

const editAdminAcc = async (req, res) => {
    try {
        const caseId = req.params.id;
        const specificAcc = await UserModel.findOne({ _id : caseId }).lean();

        // console.log(caseId) 

        res.render('admin-edit-acct-admin', {
            layout: 'layout',
            title: 'Admin: Admin Account Edit Page',
            cssFile1: null,
            cssFile2: null,
            javascriptFile1: null,
            javascriptFile2: null,
            accounts: specificAcc
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}

const submitEditAdminAcc = async (req, res) => {
    try {
        const {
            _id,
            email,
            password
        } = req.body;

        await UserModel.findOneAndUpdate(
            { _id: _id },
            {
                $set: {
                    email: email,
                    password: password
                }
            },
            { new: true }
        );

        res.redirect(`/admin-view-acct-admin/${_id}`);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    isUser,
    viewAllAccounts,
    viewAdminAcc,
    editAdminAcc,
    submitEditAdminAcc
}