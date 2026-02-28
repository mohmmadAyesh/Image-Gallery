uploadImage = async (req, res) => {
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