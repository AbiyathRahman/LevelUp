require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
import app from './src/app';
import connectDB from './src/config/db';

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Failed to connect to the database', err);
    process.exit(1);
});
