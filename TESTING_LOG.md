# Testing Log

## Edge Case: Upload the same filename twice

**Test:** I test uploading to S3 Bucket with the file with the same name twice

**Before:** it overwite the image with the same name inside the bucket also the s3 location that I stored it point to the overrided image now it create multiple images normally

**Problem:** Files with identical names map to the same S3 key, causing overwrites.

**Fix:** I just changed how I name the item inside the bucket to be on this format timestamp - name this ensure that files are unique cause It only be duplicate if we have 2 users upload an image with same name in the same second which is so rare to happen

**After:** Now it only each image have its unique name meaning no image will affect the other when deleted or uploaded with the same name

---

## Edge Case: Upload a file that's exactly 5MB

**Test:** I uploaded a file that's exactly 5MB or basically I adjust the limit to match exactly the size of the file and have another copy of the file with that is larger by 10k bytes

**Before:** the file boundary suceeded in the frontend but didn't succeed in backend when the file size exactly the same as limit it will reject it as it exceed the limit

**Problem:** Multer's built-in size enforcement uses strict greater-than, rejecting files exactly at the limit.

**Fix:** Instead of having multer handle this file size enforcement I implemented a middleware that take the size of the file and do the check that would be precise that we only check for `req.body.file` the size of actual file

**After:** Now it precise the file that i prepared to match the limit it got accepted on backend but the file that is higher in size by 10k bytes it rejected as it exceeds the limit

---

## Edge Case: Rename a .txt file to .jpg and upload it

**Test:** creating samer.txt file in vscode write some content then change its name to samer.jpg then try to upload it to the website

**Before:** the file got accepted on frontend and on backend normally untill it reach the bucket which not supposed to happen cause its corrupted

**Problem:** Validation was based on file extension only, not the actual file content.

**Fix:** basically I changed the logic to read. the header of the file or the signature (the first bytes in the binary file that specify the type of this file)
first on frontend using the File Reader I read the file I looped through the full file then each byte i added to the header before i added i convert it to string of hex value then after looping i take only the first 8 bytes out of header and do my check against it using switch statement I check the type and in case if non of matching header met i set it to known and in case of unknown later i wont store the uploded image in state and toast an error forcing user to insert a valid media image next I handled in backend which require me so much time to figure it out the solution was to read the file in sync so we validate before we send it to aws then we read its content conver it into hex and get only the first 8 bytes then we validate it using the same logic we get it from frontend here the code

```js
const header = require("fs").readFileSync(req.file.path, "hex").slice(0, 8);
// here we specified we want encoding as hex because we want to read the bytes within
// the buffer in hex format to determine the file type by looking into the first byte that represent the header
let type = "unknown";
switch (header) {
  case "89504e47":
    type = "image/png";
    break;
  case "47494638":
    type = "image/gif";
    break;
  case "ffd8ffe0":
  case "ffd8ffe1":
  case "ffd8ffe2":
    type = "image/jpeg";
    break;
  default:
    throw new CustomError("INVALID_MIME_TYPE", 400);
}
```

**After:** now each the file validated both on frontend and backend even if it surpass frontend validation we get validation from backend too

---

## Edge Case: Upload while internet is slow or disconnected

**Test:** I uploaded a relatively big image like 3MB and using dev tools set the Network to slow 4G and also using the same image I test with setting the Network to Offline

**Before:** basically the website response with message "unable to reach the server. Please check your connection and try again" when Network set to offline when network set to slow 4G the button state goes to saving with spinner then request is cancelled after 30 seconds and website response with message "The request timeout Please try again later or check your network connection"

**Problem:** No fix needed — the app already handled this gracefully.

**Fix:** nothing same as previous one it didn't lead to weird behavior

**After:** same as before

---

## Edge Case: Delete images from S3 console then refresh gallery

**Test:** I bulk delete many files from the console directly then refresh the gallary page

**Before:** the app didn't crash but just display img tags with alt text in place of the ones deleted

**Problem:** No crash occurred — broken image tags showed alt text instead.

**Fix:** basically the image tag still displayed with only image alt so it didn't crash nothing to change

**After:** same as before

---

## Edge Case: Send upload request with no file attached

**Test:** I send a post request to upload API using postman with nothing specified in the body

**Before:** The server crash and return with 500 internal server error

**Problem:** No guard for a missing file before passing to the upload logic.

**Fix:** Just in the middleware that check for the file I check if there is a file represent in request if not i through custom error with proper message like this

```js
if (!req.file) {
  throw new CustomError("FILE_NOT_PROVIDED", 400);
}
```

**After:** Now when i test on postman it through 400 error with a message No file provided please provide a file to upload

---

## Edge Case: Delete request with a non-existent image

**Test:** I try to delete image with its name in bucket not exists

**Before:** it execute the delete and return 204 status code

**Problem:** The delete controller did not check whether the image actually existed in the bucket before attempting deletion.

**Fix:** I implemented new function to look through this object or this image item and used in delete controller here

```js
const ItExist = await findIFImageExistsInBucket({
  key: file_name,
});
if (!ItExist) {
  throw new CustomError("IMAGE_NOT_FOUND_IN_BUCKET", 404);
}
```

and here the implemented of new function

```js
const findIFImageExistsInBucket = async ({ key }) => {
  console.log("executing find image function for key", key);
  if (!key) {
    console.error("Key is required to find an image");
    return null;
  }
  const s3 = new S3Client({
    bucketEndpoint: process.env.S3_BUCKET_NAME,
    region: process.env.AWS_REGION,
    credentials: {
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    },
  });
  const command = new GetObjectCommand({
    Bucket: `http://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`,
    Key: key,
  });
  try {
    const response = await s3.send(command);
    console.log("response from s3 when finding image is  ", response);
    return true;
  } catch (error) {
    if (error.name === "NoSuchKey") {
      console.log("Image not found in S3 bucket");
      return false;
    }
  }
};
```

**After:** Now when i try to delete non-existent image it returns 404 with proper error message
