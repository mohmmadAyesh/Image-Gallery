const uploadImage = async (req, res) => {
    try {
        const { filename, upload_date } = req.body;
        const image_s3_url = req.file;
        const query = 'INSERT INTO images (filename,upload_date,image_s3_url) VALUES ($1, $2, $3) RETURNING *';
        const values = [filename, upload_date, image_s3_url];
        const result = await req.pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
}
const getAllImages = async (req,res) => {
    try{
        const query = 'SELECT * FROM images ORDER BY upload_date DESC';
        const result = await req.pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'Failed to fetch images' });
    }
}
module.exports = {uploadImage, getAllImages};