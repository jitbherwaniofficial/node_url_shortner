const jwt = require('jsonwebtoken');

function setUser(user){
    return jwt.sign({
        _id : user._id,
        email: user.email,
        role:user.role
    }, "JitBherwani")
}

function getUser(token){
    if(!token) return null;
    jwt.verify(token, "JitBherwani");
}

module.exports = {
    setUser,
    getUser
}