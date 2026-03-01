const {
  uploadImageToS3,
  createPresignedUrlWithClient,
  deleteUploadedImage,
  findIFImageExistsInBucket,
} = require("../services/aws_functions");
const { promisify } = require("util");
const CustomError = require("../services/error-handler/CustomError");
const unlinkAsync = promisify(require("fs").unlink);
const uploadImage = async (req, res) => {
  try {
    console.log("hey you i am right here ");
    const file = req.file;
    const dateString = new Date(Date.now()).toISOString();
    const fileName = dateString + "-" + file.filename;
    const image_s3_url = await uploadImageToS3(file, fileName);
    console.log("image s3 url", image_s3_url);
    const upload_date = dateString;
    console.log("upload date", upload_date);
    const query =
      "INSERT INTO images(file_name,upload_date,image_s3_url) VALUES ($1, $2, $3) RETURNING *";
    const values = [fileName, upload_date, image_s3_url];
    const result = await req.pool.query(query, values);
    await unlinkAsync(req.file.path);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error uploading image:", error);
    deleteUploadedImage({ key: fileName }).catch((deleteError) => {
      console.error(
        "Error deleting image from S3 after upload failure:",
        deleteError,
      );
    });
    console.log("original error message", error.message);
    if (
      error.message ===
        "The AWS Access Key Id you provided does not exist in our records." ||
      error.message ===
        "The request signature we calculated does not match the signature you provided. Check your key and signing method."
    ) {
      error.message = "Invalid AWS credentials";
    } else if (error.message.includes("The specified bucket does not exist")) {
      error.message = "S3 bucket does not exist";
    } else if (error.message.includes("getaddrinfo ENOTFOUND")) {
      error.message = "Unable to connect to S3 endpoint";
    } else {
      error.message = "Failed to upload image";
    }
    console.log("error message", error.message);
    res.status(500).json({ error: error.message });
  }
};
const getAllImages = async (req, res) => {
  try {
    const query =
      "SELECT file_name,upload_date FROM images ORDER BY upload_date DESC";
    const result = await req.pool.query(query);
    const imagesWithPresignedUrls = await Promise.all(
      result.rows.map(async (row) => {
        console.log("fetching row what this row contains", row);
        const presignedUrl = await createPresignedUrlWithClient({
          key: row.file_name,
        });
        console.log("presigned url for", row.file_name, "is", presignedUrl);
        return {
          file_name: row.file_name,
          presigned_url: presignedUrl,
        };
      }),
    );
    res.status(200).json(imagesWithPresignedUrls);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
};
const deleteImage = async (req, res) => {
  try {
    console.log("request body is", req.body);
    const { file_name } = req.body;
    const ItExist = await findIFImageExistsInBucket({
      key: file_name,
    });
    if (!ItExist) {
      throw new CustomError("IMAGE_NOT_FOUND_IN_BUCKET", 404);
    }
    await deleteUploadedImage({ key: file_name });
    const query = "DELETE FROM images WHERE file_name = $1";
    await req.pool.query(query, [file_name]);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    if (error.message === "IMAGE_NOT_FOUND_IN_BUCKET") {
      throw new CustomError("IMAGE_NOT_FOUND_IN_BUCKET", 404);
    } else {
      throw new CustomError("Failed to delete image", 400);
    }
  }
};
module.exports = { uploadImage, getAllImages, deleteImage };
