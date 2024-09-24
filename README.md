# Calendify

**Calendify** is a modern calendar application designed to help appointment scheduling. This project was developed as part of a technical challenge to demonstrate capabilities in creating full-stack applications with an emphasis on clean, functional UI and efficient backend services.

## Demo

Check out the live demo here: [calendify.arthurrobine.fr](https://calendify.arthurrobine.fr)

## Features

- **View Appointments**: See all scheduled appointments in a weekly or monthly calendar view.
- **Manage Appointments**: Add, edit, and delete appointments easily.
- **Vendor Authentication**: Secure login and registration system for vendors to manage their schedules.
- **Responsive Design**: Accessible on both desktop and mobile devices.
- **Conflict Detection**: Ensures no overlapping appointments are scheduled.

## Technologies

- **Frontend**: React, React Query, react-big-calendar
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Authentication**: JWT for secure token-based authentication
- **Styling**: Tailwind CSS for a responsive and modern UI
- **Deployment**: Terraform + AWS

## Installation

1. **Clone the repository**:
   ```bash
   git clone git@github.com:ArthurRbn/Calendify.git
   cd Calendify
   ```
2. **Install dependencies**:
   ```bash
   cd calendify-backend && npm install
   cd calendify-frontend && npm install
   ```
3. **Set up environment variables**:
   Create a `.env` file in the `calendify-backend` directory and update it with your database and application settings:
   ```
   DB_NAME=calendb
   DB_USER=yourusername
   DB_PASSWORD=yourpassword
   DB_HOST=localhost
   DB_PORT=5432
   SERVER_PORT=4200
   SECRET_KEY=your_secret_key
   ```

4. Create a `.env` file in the `calendify-frontend` directory and update it with your database and application settings:
   ```
   REACT_APP_API_BASE_URL=http://localhost:4200/api
   ```
4. **Start your database**:
   Ensure your PostgreSQL service is running. If you don't have it installed, you can use Docker to run a containerized instance of the database with the following command:
   ```bash
   docker run --name calendify-db -e POSTGRES_PASSWORD=yourpassword -e POSTGRES_USER=yourusername -e POSTGRES_DB=calendb -p 5432:5432 -d postgres
   ```
5. **Start the application**:
   ```bash
   cd calendify-backend && npm run build && npm start
   # Alternatively, run the backend in development mode with npm run dev
   
   cd calendify-frontend && npm start
   ```
   This will run the backend server on [http://localhost:4200](http://localhost:4200) and the frontend server on [http://localhost:3000](http://localhost:3000).

6. **Access the application**:
   Open a web browser and navigate to [http://localhost:3000](http://localhost:3000) to start using Calendify.

## CI/CD Pipeline

The project is integrated with a CI/CD pipeline using GitLab CI to automate deployment:

- Continuous Deployment (CD): The project is deployed automatically to AWS using ECS for the backend and S3 + CloudFront for the frontend.

To configure this:
1. Define the CI pipeline in a `.gitlab-ci.yml` file. This will include stages for building Docker images and deploying them to AWS.
2. The frontend is deployed to an S3 bucket, and CloudFront is configured to serve the static assets.
3. The backend is containerized and deployed to an ECS cluster using Fargate.
4. PostgreSQL is hosted on AWS RDS, and the database credentials are securely stored in AWS Secrets Manager.

## Terraform Deployment

This project uses Terraform to manage the infrastructure:

### VPC and Networking:
- A VPC is created with public and private subnets, an internet gateway, and NAT gateway.
- Public subnets host the Application Load Balancer (ALB) for routing traffic to ECS.
- Private subnets are used for the ECS tasks and RDS PostgreSQL instance.

### ECS (Elastic Container Service):
- The backend is deployed to ECS with Fargate launch type.
- A load balancer is used to route traffic from CloudFront to the ECS tasks.

### S3 and CloudFront:
- The frontend is hosted in an S3 bucket, and CloudFront is used for global distribution.

### RDS (Relational Database Service):
- PostgreSQL is deployed in private subnets with security groups ensuring only the backend can access it.

### Terraform Commands:
```bash
terraform init
terraform plan
terraform apply
```

## License

Distributed under the GPL-3.0 License. See `LICENSE` for more information.

## Contact

Arthur ROBINE - arthur.robine@gmail.com

---