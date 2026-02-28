const { Pool } = require('pg');
express.pool = new Pool({
    user: process.env.DBUSER || 'postgres',
    host: process.env.DBHOST || 'localhost',
    database: process.env.DBNAME || 'image_gallery',
    password: process.env.DBPASSWORD || '123',
    port: process.env.DBPORT || 5432,
})
exports.PostgresSQL = (req,res,next) => {
    req.pool = express.pool;
    next();
}