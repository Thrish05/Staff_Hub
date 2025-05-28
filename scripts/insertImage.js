const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'faculty',
  password: 'root',
  port: 5432,
});

const imagePath = path.join(__dirname, '../public/images/Ramesh-A-Principal.jpg');
const imageBuffer = fs.readFileSync(imagePath);

const insertImage = async () => {
  await pool.query(
    'UPDATE faculty set photo = $1 where faculty_id = $2',
    [imageBuffer, 4]
  );
  console.log('Image inserted!');
  await pool.end();
};

insertImage();
