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
        const curUser = await UserModel.findOne({email: email}); //finds if there is a match in users
        var errorMsg = "";

        if (!email || !password) {
            errorMsg = "Email and Password fields cannot be empty."
        }
        else if (!email.includes("@")) {
            errorMsg = "Invalid email.";
        }
        else if (!curUser) {
            errorMsg = "User Not Found."
        }
        else if (curUser.password != password) {
            errorMsg = "Incorrect password."
        }
        else if (curUser.role != "admin") {
            errorMsg = "Unathorized Access."
        }
        else {
            console.log("here no error")
            // Respond with success
            return res.redirect('/admin-homepage?log_in=successful');
    
        }
        console.log("here")
        res.render('admin-login-page',{
            layout: 'layout',
            title: 'Barangay Parang - Admin Login Page',
            cssFile1: 'index',
            cssFile2: 'login-page',
            javascriptFile1: 'login',
            javascriptFile2: null,
            error: errorMsg
        });
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

//ADMIN ------------------------------------------------
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

//EMPLOYEE ----------------------------------------------
const viewEmployeeAcc = async (req, res) => {
    try {
        const caseId = req.params.id;
        const specificAcc = await UserModel.findOne({ _id : caseId }).lean();

        // console.log(caseId) 

        res.render('admin-view-acct-employee', {
            layout: 'layout',
            title: 'Admin: Employee Account View Page',
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

const editEmployeeAcc = async (req, res) => {
    try {
        const caseId = req.params.id;
        const specificAcc = await UserModel.findOne({ _id : caseId }).lean();

        // console.log(caseId) 

        res.render('admin-edit-acct-employee', {
            layout: 'layout',
            title: 'Admin: Employee Account Edit Page',
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

const submitEditEmployeeAcc = async (req, res) => {
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

        res.redirect(`/admin-view-acct-employee/${_id}`);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}


//LUPON -------------------------------------------------
const viewLuponAcc = async (req, res) => {
    try {
        const caseId = req.params.id;
        const specificAcc = await UserModel.findOne({ _id : caseId }).lean();

        // console.log(caseId) 

        res.render('admin-view-acct-lupon', {
            layout: 'layout',
            title: 'Admin: Lupon Account View Page',
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

const editLuponAcc = async (req, res) => {
    try {
        const caseId = req.params.id;
        const specificAcc = await UserModel.findOne({ _id : caseId }).lean();

        // console.log(caseId) 

        res.render('admin-edit-acct-lupon', {
            layout: 'layout',
            title: 'Admin: Lupon Account Edit Page',
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

const submitEditLuponAcc = async (req, res) => {
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

        res.redirect(`/admin-view-acct-lupon/${_id}`);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}

//TANOD -------------------------------------------------
const viewTanodAcc = async (req, res) => {
    try {
        const caseId = req.params.id;
        const specificAcc = await UserModel.findOne({ _id : caseId }).lean();

        // console.log(caseId) 

        res.render('admin-view-acct-tanod', {
            layout: 'layout',
            title: 'Admin: Tanod Account View Page',
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

const editTanodAcc = async (req, res) => {
    try {
        const caseId = req.params.id;
        const specificAcc = await UserModel.findOne({ _id : caseId }).lean();

        // console.log(caseId) 

        res.render('admin-edit-acct-tanod', {
            layout: 'layout',
            title: 'Admin: Tanod Account Edit Page',
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

const submitEditTanodAcc = async (req, res) => {
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

        res.redirect(`/admin-view-acct-tanod/${_id}`);
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
    submitEditAdminAcc,

    editEmployeeAcc,
    viewEmployeeAcc,
    submitEditEmployeeAcc,

    viewLuponAcc,
    editLuponAcc,
    submitEditLuponAcc,

    viewTanodAcc,
    editTanodAcc,
    submitEditTanodAcc
}