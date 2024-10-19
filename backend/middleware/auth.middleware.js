import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "User is not authenticated!",
      });
    }

    const secretKey = process.env.JWT_SECRET_KEY;

    const decode = await jwt.verify(token, secretKey);

    if (!decode) {
      return res.status(401).json({ message: "Invalid token!" });
    }

    req.id = decode.userId;

    next();
  } catch (error) {
    console.log("Error! Something went wrong at Authentication!");
    console.log(error);
  }
};
