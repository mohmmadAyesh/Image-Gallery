## Challenges I faced
Setting up AWS Bucket Policy I spent some time searching for a suitable json format for AWS Bucket Policy and copying that template trouble me later
How to add the preview Image functionality so I display the image after being uploaded with a preview on it that will open up the light box that will go away once you click on it 
How to design the upload file input customize it's button and it's text so each one can have different styling in the same input
Setting Up Multer disk storage with it's middleware and figure out where it should store : I was confused because I was sending the request of content type json but that didn't work with multer and I spent quite time figuring out from seeing solutions that Multer deal with multipart form so I modify the JSX Code to include Multipart form and then the next challenge was figuring out that Multer middleware when it used for example `uploads.single('file')` this cannot be a dummy name it need to be related to what React send to us so it took me a while to figure that out lastly Figuring out that Multer need a disk storage and a file exists that specify in the code to store files on it before we upload to AWS Bucket
Figuring out how Frontend can see the images or display them. this took me a lot like 4 hours to figure it out it was hard when i search for it I saw solutions using S3Client to getObject or  executing command through it which would defeat the purpose of having our backend that we store a s3 urls inside it so I searched for how to get the url at first I was thinking about if we get the S3 Item location like we store in postgresql I thought this is the url that i can access it but it didn't benefit me so I was thinking how to make the frontend access the url of image inside the bucket and make it authorized so it won't get blocked I scratch my head and at first I saw aws/amplify package then I saw CloudFront distribution in AWS and finally I saw the presigned S3 Url so I ended up using this one since CloudFront wasn't mentioned and I only allowed to use the sdk So what i did was looping through images performing many requests to get presigned url using Promise.all and then return them to the frontend these urls signed with IAM User that i created before
Figuring out why my presigned URL is not working or getting blocked this one was strange because I already have IAM User having AMAZON S3 full access policy and i signed the url with this URL so why the heck it was still denied after debugging I asked chatgpt ai what was the mean of the message it appear when i access the image using the presigned URL,It tell me explicit meaning something not necessary denied by IAM user access but enforced by Bucket Policy I checked Bucket Policy and it turns out from the example I copied earlier I was specifying specific origin to access the bucket item in the condition so I removed them and it worked. 
What was hardest about AWS configuration ?
configure the presigned URL or how frontend can read the images back from the bucket
Code you didn't fully understand
`const fileStream = createReadStream(file.path);` I didn't understand whats the point from converting binary files to file stream before uploading
`const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, 'uploads');
},` didn't understand what this cb is I understand that uploads is the name where we upload to but what the purpose of cb and the first argument in it i didn't understand

What you learned
1- I learnt how to setup Multer to upload binary files to aws
2- how to upload to S3 and access the items inside the Bucket using Presigned URLS
3- undertand what getObject command does
4-  URL.createObjectURL(File) that can create a url out of File Object
5- understanding what unlinkAsync functionality do that it can delete files I used to clean up the Multer Storage folder after uploading to S3 Bucket
6- the promisfy functionality that convert callback functions to promise based functions 

