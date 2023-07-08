const db = require("../model/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function tokenGenerator({ user_id, role, username, email }) {
  const payload = { user_id, role, username, email };
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
  return accessToken;
}

const handleCreateNewUser = async (req, res) => {
  const { username, email, dateofbirth, password } = req.body;

  let sql = "SELECT * FROM public.users where email = $1";
  const oldUser = await db.query(sql, [email]);

  if (oldUser.rows.length != 0) {
    res.status(409).send("User Already Exist.");
  } else {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    db.query(
      "INSERT INTO public.users (username,email,dateofbirth,password,role) VALUES ($1,$2,$3,$4,'user') RETURNING *",
      [username, email, dateofbirth, hashedPassword],
      (error, results) => {
        if (error) {
          return res.status(400).json(error);
        }
        const { user_id, role, username, email } = results.rows[0];
        const token = tokenGenerator({
          user_id,
          role,
          name: username,
          email: email,
        });
        console.log("token:", token);
        res.status(201).json({ token });
      }
    );
  }
};

const handleGetAllUsers = (req, res) => {
  db.query(
    "SELECT * FROM public.users WHERE role = 'user' ORDER BY user_id ASC",
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows);
    }
  );
};

const checkUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const query =
      "SELECT * FROM public.users WHERE role = 'user' AND deleted = false  ORDER BY user_id ASC";
    const results = await db.query(query);

    for (const user of results.rows) {
      const match = await bcrypt.compare(password, user.password);
      if (user.email === email && match) {
        const token = tokenGenerator(user);
        console.log("User LoggedIn successFully");
        return res.status(200).json({ token });
      }
    }
    res.sendStatus(401);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const query =
      "SELECT * FROM public.users WHERE user_id = $1 AND role = 'user'";
    const results = await db.query(query, [id]);
    console.log("get user Is successed");
    if (results.rows.length === 0) {
      res.status(401).send("User not exist");
    } else {
      res.status(200).json(results.rows);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  db.query(
    "DELETE FROM public.users WHERE user_id = $1",
    [id],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).send(`User deleted with ID: ${id}`);
    }
  );
};

// const UpdateUser = async (req, res) => {
//   const id = parseInt(req.params.id);
//   try {
//     const query = "SELECT * FROM public.users WHERE user_id = $1";
//     const results = await db.query(query, [id]);
//     const username = results.rows[0].username;
//     const email = results.rows[0].email;
//     const profile_picture = results.rows[0].profile_picture;

//     const queryU =
//       "UPDATE public.users SET username =$1, email = $2, profile_picture =$4 WHERE user_id = $5";
//     const resultsU = await db.query(queryU, [
//       username,
//       email,
//       profile_picture,
//       id,
//     ]);
//     res
//       .status(200)
//       .send(
//         `Product info with ID: ${id} has been updated with existing values`
//       );
//   } catch (error) {
//     return res.status(400).json(error);
//   }
// };

module.exports = {
  handleCreateNewUser,
  handleGetAllUsers,
  checkUser,
  getUserById,
  deleteUser,
};
