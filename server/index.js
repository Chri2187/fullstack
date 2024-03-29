require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./db/connect');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/auth', authRoutes);

//morgan
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

const start = async () => {
    await connectDB(
        process.env.MONGO_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        },
        console.log('DB Connected')
    );
    app.listen(port, () => console.log(`Server running on port: ${port}`));
};

start();
