const { Upload } = require('@aws-sdk/lib-storage');
const { S3,S3Client,GetObjectCommand } = require('@aws-sdk/client-s3');
const {
  getSignedUrl,
} = require("@aws-sdk/s3-request-presigner");
const createReadStream = require('fs').createReadStream;
const UploadImageToS3 = async (file) => {
    try{
        console.log("Access Key ID:", process.env.AWS_ACCESS_KEY_ID);
        console.log("Secret Access Key:", process.env.AWS_SECRET_ACCESS_KEY);
        console.log("AWS Region:", process.env.AWS_REGION);
        console.log("S3 Bucket Name:", process.env.S3_BUCKET_NAME);
const s3 = new S3({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },

    region: process.env.AWS_REGION,
});
console.log("s3 client created");

// createRead Steam from binary file
const fileStream = createReadStream(file.path);
console.log(fileStream, "file stream created");
console.log("aws bucket", process.env.S3_BUCKET_NAME);
const uploadedImage = await new Upload({
    client: s3,

    params: {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: file.filename,
        Body: fileStream,
    },
}).done();
console.log("////////////////////////////////// image uploaded to s3 successfully //////////////////////////////////");
console.log(uploadedImage);
return uploadedImage.Location;
}
catch(error){
    console.error('Error uploading image to S3:', error);
    throw error;
}
}
const createPresignedUrlWithClient = async ({key}) => {
    console.log("key for presigned url", key);
    if(!key){
        console.error('Key is required to create a presigned URL');
        return null;
    }
     const s3 = new S3Client({
    bucketEndpoint: process.env.S3_BUCKET_NAME,
    region: process.env.AWS_REGION,
    credentials: {
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID
    }
  })
    const command = new GetObjectCommand({Bucket: `http://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`, Key: key});
    return getSignedUrl(s3, command);
}
module.exports = {UploadImageToS3, createPresignedUrlWithClient};