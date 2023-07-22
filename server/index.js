const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

app.post("/gift", (req, res) => {
  // grabbing the parameters from the front-end
  const { name, root, proof } = req.body;
  const MERKLE_ROOT = root;

  // proving that a name is in the list
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
