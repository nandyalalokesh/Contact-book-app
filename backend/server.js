const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());


let contacts = [];
let nextId = 1;


app.get('/contacts', (req, res) => {
  res.json(contacts);
});


app.post('/contacts', (req, res) => {
  const { name, email, phone } = req.body;

  
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newContact = { id: nextId++, name, email, phone };
  contacts.push(newContact);
  res.status(201).json(newContact);
});


app.delete('/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id, 10); 
  const index = contacts.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Contact not found' });
  }

  const removed = contacts.splice(index, 1);
  res.json(removed[0]);
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
