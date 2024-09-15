import User from '../Schemas/User';
import bcrypt from 'bcrypt';

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

const generateUsername = async (email)=> {
    let username = email.split("@")[0];

    let isUsernameNotunique = await User.exists({ "personal_info.username": username }).catch((result) => result)

    isUsernameNotunique ? username +=  nanoid().substring(0,5) : "";
    return username

}

export const signin = async (req, res) => {
    let { fullname, email, password } = req.body;

    if(fullname.length < 3) {
        return res.status(403).json({ "error": "Fullname must be at least 3 letters long" })
    }
    if(!email.length) {
        return res.status(403).json({ "error": "Enter email" })
    }
    if(!emailRegex.test(email)) {
        return res.status(403).json({ "error" : "Email is invalid" })
    }
    if(!passwordRegex.test(password)) {
        return res.status(403).json({ "error": "Password should be 6 to 20 characters long with a numeric, 1 uppercase & 1 lowercase " })
    }
    //( string, 10(salting), function if any error occurs )
    // 10 means how much complex i want the hashedpassword to be
    bcrypt.hash(password, 10, async (err, hashed_password ) => {
        let username = await generateUsername
    })
    
}