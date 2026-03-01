## How to run the project

1. Clone the Repo
2. Run npm install inside each folder backend,client
3. Make sure that you created an AWS Bucket with its policy, its CORS and also create IAM User and grant it suitable permission to the Bucket
4. Set the environment variable that was set inside .env.example for both backend and client folder ensure the postgresql database already exists locally
5. to create the postgresql table you can run `CREATE TABLE images (file_name VARCHAR(255) NOT NULL,upload_date TIMESTAMP NOT NULL,image_s3_url TEXT NOT NULL);`
6. Run `npm run dev` inside client folder
7. Run `npm start` inside backend folder

## Screenshot of Working App

Image Gallary Page A Responsive Grid of Images with lightbox appear when click on one of them
![image](/Screenshots/Image%20Gallary.png)
Image Upload Page
![image](/Screenshots/Upload%20Page.png)
File Size Validation
![image](/Screenshots/FileSize%20Validation.png)
Lightbox Component
![image](/Screenshots/Lightbox%20component.png)
Success State when uploading the file to the bucket
![image](/Screenshots/Success%20State.png)

## Documenting the Delete Feature

Now we added the ability to delete images in the gallary by hovering over the image you will notice there is a small trash button in the image as noticed in the Image below
![image](/Screenshots/DeleteIconAppear.png)
When you click it a confirmation modal with cancel and delete button appear
![image](/Screenshots/DeleteIconModal.png)
When you click on Delete you will notice a loading state on the button deleting with spinner on it
![image](/Screenshots/DeleteButtonLoadingState.png)
Then you will see a success message appear as toast if everything goes fine
![image](/Screenshots/ToastSuccessDelete.png)
