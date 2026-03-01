## How to run the project
1. Clone the Repo
2. Run npm install inside each folder backend,client
3. Make sure that you created an AWS Bucket with its policy, its CORS and also create IAM User and grant it suitable permission to the Bucket
4. Set the environment variable that was set inside .env.example for both backend and client folder  ensure the postgresql database already exists locally
5. to create the postgresql table you can run `CREATE TABLE images (file_name VARCHAR(255) NOT NULL,upload_date TIMESTAMP NOT NULL,image_s3_url TEXT NOT NULL);`
6. Run `npm run dev` inside client folder
7. Run `npm start` inside backend folder
