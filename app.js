const express = require("express");
const app = express();
const { exec } = require("child_process");

app.use(express.json());

/**
 * ❌ Vulnerability 1: Command Injection
 * User input directly passed to shell command
 */
app.post("/ping", (req, res) => {
  const host = req.body.host;
  exec(`ping -c 1 ${host}`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(stderr);
    }
    res.send(stdout);
  });
});

/**
 * ❌ Vulnerability 2: SQL Injection
 * User input concatenated directly into SQL query
 */
app.get("/user", (req, res) => {
  const userId = req.query.id;
  const query = "SELECT * FROM users WHERE id = " + userId;
  console.log("Executing query:", query);
  res.send("Query executed");
});

/**
 * ❌ Vulnerability 3: Hardcoded secret
 */


/**
 * ❌ Vulnerability 4: Insecure deserialization / eval
 */
app.post("/calculate", (req, res) => {
  const formula = req.body.formula;
  const result = eval(formula); // Dangerous!
  res.send({ result });
});

/**
 * ❌ Vulnerability 5: XSS (Cross-Site Scripting)
 */
app.get("/greet", (req, res) => {
  const name = req.query.name;
  res.send(`<h1>Hello ${name}</h1>`);
});

/**
 * ❌ Vulnerability 6: Missing authentication / authorization
 */
app.delete("/admin/delete-all", (req, res) => {
  res.send("All data deleted!");
});

app.listen(3000, () => {
  console.log("Vulnerable app running on port 3000");
});
