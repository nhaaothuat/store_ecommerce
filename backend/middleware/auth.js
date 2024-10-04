import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
     // Lấy token từ header "Authorization" với định dạng "Bearer <token>"
     const authHeader = req.headers.authorization;
   
     if (!authHeader || !authHeader.startsWith('Bearer ')) {
       return res.status(401).json({ success: false, message: "Token not found or invalid format" });
     }
   
     // Tách lấy token từ header
     const token = authHeader.split(' ')[1];
   
     try {
       // Giải mã token và thêm userId vào req.body
       const decoded = jwt.verify(token, process.env.JWT_KEY);
       req.body.userId = decoded.id;
       next();
     } catch (error) {
       console.error("Token verification error:", error.message);
       return res.status(401).json({ success: false, message: "Invalid token" });
     }
   };

export default authMiddleware;
