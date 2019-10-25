import User from "../../models/User";
import jwt from "jsonwebtoken";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "PUT":
      await handlePutRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

const handlePutRequest = async (req, res) => {
  const { _id, role } = req.body;
  await User.findOneAndUpdate({ _id: _id }, { role: role });
  res.status(203).send("User updated.");
};

// check to see if an authorization header has been provided
const handleGetRequest = async (req, res) => {
  // if not, return from the function
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }

  // otherwise use jwt to verify the authorization value
  try {
    // returns an object with the property userId
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    // find that user based on the id got from the token
    const user = await User.findOne({
      _id: userId
    });

    // Check to see if user exists
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(403).send("Invalid token");
  }
};
