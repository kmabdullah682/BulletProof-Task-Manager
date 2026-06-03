import jwt from "jsonwebtoken";

const isUserRegistered = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized , please sign up or login first",
      });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.id = user.id;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized , please sign up or login first",
    });
  }
};

export { isUserRegistered };
