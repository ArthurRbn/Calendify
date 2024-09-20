variable "region" {
  description = "AWS region"
  type = string
  default = "eu-west-3"
}

variable "frontend_domain" {
  description = "Domain name for the frontend application"
  type        = string
  default = "www.calendify.arthurrobine.fr"
}

variable "s3_bucket_name" {
  description = "The name of the S3 bucket for the frontend"
  default     = "calendify-frontend-bucket"
}
