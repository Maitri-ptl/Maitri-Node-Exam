import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        const Bearer = req.headers.authorization;

        if (!Bearer || !Bearer.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Unauthorized!!" })
        }

        console.log(Bearer);
        console.log(Bearer.split(' '));

        const token = Bearer.split(' ')[1];

        try {
            if (!token) {
                return res.status(401).json({ message: "Token is not provided!!" })
            }

            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            return next();

        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ message: "Unauthorized!!" });
        }


    } catch (error) {
        if (error.name == 'TokenExpiredError') {
            return res.status(400).json({ message: "Please Login Again!!" });
        }
        
        return res.status(500).json({message: error.message});
    }
}

export const verifyUser = (req,res,next)=>{
    try {
        const {id} = req.params;

        if(req.user.id != id) return res.status(401).json({message : "unathorized"})
        return next();

    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}

export const facultyAuth = (req,res,next)=>{
    try {

        const role = (req.user.role || '').toString().toLowerCase();
        if(role !== 'faculty') return res.status(401).json({message : "unathorized"})
        return next();
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}