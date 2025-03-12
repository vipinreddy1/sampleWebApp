import express from "express";
import DB from "./database.js";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import sampleData from "./sampleData.js";
import e from "express";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // all these are for CORS related issues that pop up when I access the backend from the local frontend.
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); //preflight request fails if we dont respond with 200, front end wont send a response
  }

  next();
});
const port = 10000;

app.get("/healthCheck", (req, res) => {
  res.send({ text: "Hello World!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const runQuery = (query) => {
  return new Promise((resolve, reject) => {
    DB.run(query, [], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
};

app.get("/createData", async (req, res) => {
  //adding sample data, call this endpoint to create sample data for the first time.
  try {
    let insertSampleUsernameQuery = `INSERT INTO users(username, password_hash) VALUES("mike", "longpassword")`;
    await runQuery(insertSampleUsernameQuery);
    console.log("inserted sample username");

    for (let a = 0; a < sampleData.length; a++) {
      let insertSampleProductsQuery = `INSERT INTO Products(product_id, product_name, price, record_count, category) VALUES(${sampleData[a].product_id}, '${sampleData[a].product_name}', ${sampleData[a].price}, ${sampleData[a].record_count}, '${sampleData[a].category}')`;
      await runQuery(insertSampleProductsQuery);
      console.log(`inserted sample product: ${sampleData[a].product_name}`);
    }

    res.status(200).send("Data created");
  } catch (err) {
    console.log(err);
    res.status(501).send(err);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("requesthit");
  if (!username || !password) {
    res.status(400).send("Username or password not provided");
  }
  const sql = `SELECT * FROM users WHERE username = ? AND password_hash = ?`; //I haven't added hashing yet, right now it's only being stored in plaintext which is obviously insecure
  DB.get(sql, [username, password], (err, row) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (row === undefined) {
      res.status(401).send("Invalid username or password");
      return;
    }
    res.status(200);
    const token = jwt.sign({ username: username }, "secretTokenString", {
      //secretTokenString is used for signing the token so that it can be verified later.
      expiresIn: "1h",
    });
    res.cookie("authToken", token, { httpOnly: true });
    res.json({ token: token });
  });
});

app.get("/products", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }

  jwt.verify(token, "secretTokenString", async (err, user) => {
    if (err) {
      res.status(403).send("Forbidden");
      return;
    }

    const searchQuery = req.query.searchQuery || "";
    DB.all(
      "SELECT * FROM Products WHERE product_name LIKE ?",
      [`${searchQuery}%`],
      (err, rows) => {
        if (err) {
          res.status(500).send(err.message);
          return;
        }

        const result = rows.map((row) => ({
          product_id: row.product_id,
          productName: row.product_name,
          price: row.price,
          category: row.category,
          record_count: row.record_count,
        }));

        res.status(200).json({
          message: `Products matching query '${searchQuery}'`,
          products: result,
        });
      }
    );
  });
});

app.get("/products/:id", (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }
  jwt.verify(token, "secretTokenString", async (err, user) => {
    if (err) {
      res.status(401).send("Forbidden");
      return;
    }
    let result = { data: [] };
    DB.get(
      "SELECT * FROM Products WHERE product_id = ?",
      [req.params.id],
      (err, row) => {
        if (err) {
          res.status(500).send(err);
        }
        result.data.push({
          product_id: row.product_id,
          productName: row.product_name,
          price: row.price,
          category: row.category,
          record_count: row.record_count,
        });
        res.status(200).json({
          message: `Here is the product with id ${req.params.id}`,
          product: result.data,
        });
      }
    );
  });
});
