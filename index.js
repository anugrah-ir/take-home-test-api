require('dotenv').config();
const express = require('express');
const cors = require('cors');

const membershipRoutes = require('./src/api/membership/membership.routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use(membershipRoutes);

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Server is running.' });
});

app.listen(port, () => {
	console.log(`Server running and listening on port ${port}`);
});