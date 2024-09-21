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