const {uploadImageToS3,createPresignedUrlWithClient}  = require('../services/aws_functions');
const uploadImage = async (req, res) => {
    try {
        console.log("hey you i am right here ");
        const file = req.file;
        const image_s3_url = await uploadImageToS3(file, file.filename);
        console.log("image s3 url", image_s3_url);
        const date = new Date();
        const upload_date = date.toISOString();
        const query = 'INSERT INTO images (file_name,upload_date,image_s3_url) VALUES ($1, $2, $3) RETURNING *';
        const values = [file.filename, upload_date, image_s3_url];      
        const result = await req.pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
}
const getAllImages = async (req,res) => {
    try{
        const query = 'SELECT file_name FROM images ORDER BY upload_date DESC';
        const result = await req.pool.query(query);
        const imagesWithPresignedUrls = await Promise.all(result.rows.map(async (row) => {
            const presignedUrl = await createPresignedUrlWithClient({key: row.file_name});
            console.log("presigned url for", row.file_name, "is", presignedUrl);
            return {
                file_name: row.file_name,
                presigned_url: presignedUrl
            }
        }));
        res.status(200).json(imagesWithPresignedUrls);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'Failed to fetch images' });
    }
}
module.exports = {uploadImage, getAllImages};