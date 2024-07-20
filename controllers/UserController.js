const UserModel     = require("../models/database/mongoose").UserModel;
const SecurityModel = require("../models/database/mongoose").SecurityQuestionModel;

//SECURITY ---------------------------------------------
const getLogin = async (req, res) => {
    try {
        const question = await SecurityModel.findOne({ _id : 1 }).lean();

        res.render('admin-login-page',{
            layout: 'layout',
            title: 'Barangay Parang - Admin Login Page',
            cssFile1: 'index',
            cssFile2: 'login-page',
            javascriptFile1: 'login',
            javascriptFile2: 'security',
            error: null,
            securityQues : question.Question
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}

const checkAnswer = async (req, res) => {
    try {
        const { answer } = req.body;
        const question = await SecurityModel.findOne({ _id : 1 }).lean();
    
        const correctAnswer = question.Answer; // Fetch this from your database
        if (answer === correctAnswer) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}

const changeSecurityQuestion = async (req, res) => {
    try {
        const { Question, Answer } = req.body;
        console.log(Question)
        console.log(Answer)
        
        await SecurityModel.findOneAndUpdate(
            { _id: 1 },
            {
                $set: {
                    Question: Question,
                    Answer: Answer
                }
            },
            { new: true }
        );
        
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}

//

const isUser = async (req, res) => {
    const { email, password } = req.body;
    const question = await SecurityModel.findOne({ _id : 1 }).lean();

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
            javascriptFile2: 'security',
            error: errorMsg,
            securityQues : question.Question
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}

const viewAllAccounts = async (req, res) => {
    try {

        const accounts = await UserModel.find().lean();
        const question = await SecurityModel.findOne({ _id : 1 }).lean();

        res.render('admin-accounts-db-view', {
            layout: 'layout',
            title: 'Admin: Accounts DB Viewing',
            cssFile1: null,
            cssFile2: null,
            javascriptFile1: null,
            javascriptFile2: null,
            accounts: accounts,
            securityQues : question.Question
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
    getLogin,
    checkAnswer,
    changeSecurityQuestion,
    
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