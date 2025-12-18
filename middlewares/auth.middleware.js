
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "No Bearer token provided"
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decoded);
        

        req.user = decoded;
        next();

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

export const roleBasedAccess = (req, res, next)=>{
    const role = req.user?.role;

    if(role === "admin") next();
    else{
        return res.status(401).json(
            {
                success:true,
                message: "Unauth access",
                data:null
            }
        )
    }
}