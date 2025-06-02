const dotenv = require('dotenv');
dotenv.config();
const express = require('express');


const app = express();

require('./routes/authRoutes')(app);
require('./routes/postRoutes')(app);
require('./routes/likeRoutes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
