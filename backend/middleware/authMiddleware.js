const jwt = require("jsonwebtoken");
const supabase = require("../config/supabase");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      const { data: user, error } = await supabase
        .from('users')
        .select('id, username, email')
        .eq('id', decoded.id)
        .single();

      if (error || !user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }
      
      req.user = user;

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
