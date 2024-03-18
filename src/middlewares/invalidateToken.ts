const jwt = require("jsonwebtoken");

const invalidateToken = (req: any, res: any, next: any): void => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Authorization header is missing" });
    }

    const token = authHeader.split(" ")[0]; // Extract the token from the authorization header

    // Decode the token to get its payload
    const decodedToken = jwt.decode(token);

    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Set the token's expiry time to the current time, effectively invalidating it
    decodedToken.exp = Math.floor(Date.now() / 1000); // Set expiry time to current time in seconds

    // Sign the token to generate a new token with the updated expiry time
    const newToken = jwt.sign(decodedToken, process.env.secret || "");

    // Attach the new token to the request object for further processing
    req.token = newToken;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default invalidateToken;
