variable "frontend_domain" {
  description = "Domain name for the frontend"
  default     = "www.calendify.arthurrobine.fr"
}

variable "frontend_alternative_domain" {
  description = "Alternative name for the frontend"
  default     = "calendify.arthurrobine.fr"
}

variable "region" {
  description = "AWS region"
  type        = string
  default     = "eu-west-3"
}

variable "s3_bucket_name" {
    description = "S3 bucket name"
    type        = string
    default     = "calendify-frontend-bucket"
}

variable "db_name" {
  description = "The name of the database"
  type        = string
}

variable "db_username" {
  description = "The database username"
  type        = string
}

variable "db_password" {
  description = "The database password"
  type        = string
  sensitive   = true
}

variable "ecr_url" {
  description = "URL to the ecr repository"
  type        = string
}