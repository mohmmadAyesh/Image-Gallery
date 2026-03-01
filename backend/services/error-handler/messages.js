const errors = {
  FILE_IS_LARGE: "File exceeds the size limit",
  FILE_TYPE_NOT_ALLOWED:
    "File type not allowed consider uploading only png, jpg,jpeg gif only",
  INVALID_MIME_TYPE: "Invalid file type",
  FILE_NOT_PROVIDED: "No file provided please provide a file to upload",
  IMAGE_NOT_FOUND_IN_BUCKET: "Image not found in S3 bucket",
};
module.exports = errors;
