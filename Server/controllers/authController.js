var jwt = require('jsonwebtoken');

exports.createToken = async (req, res) => {
    const TOKEN = await jwt.sign({id: req.body._id, email: req.body.email, username: req.body.username},
        process.env.SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN});
        console.log(TOKEN)
        res.status(201).json({
        token: TOKEN
    })
}
exports.checkToken = async (req, res, next) => {
    try {
        const TOKEN = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(TOKEN, process.env.SECRET);

        res.status(200).json({
            decoded
        })
        next();
  } catch(err) {
        res.status(401).json({
            error: err
        })
        return;
  }
}

exports.verifyRequest = async (req, res, next) => {
    try {
        const TOKEN = req.headers.authorization.split(' ')[1]
        jwt.verify(TOKEN, process.env.SECRET);
        next();
  } catch(err) {
        res.status(401).json({
            error: err
        })
        return;
  }
}