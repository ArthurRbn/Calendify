variable "region" {
  description = "AWS region"
  type = string
  default = "eu-west-3"
}

variable "s3_name" {
  type = string
}

variable "frontend_domain" {
  description = "Domain name for the frontend application"
  type        = string
  default = "www.calendify.arthurrobine.fr"
}

variable "acm_certificate_arn" {
  description = "ACM certificate ARN for CloudFront"
  type        = string
}

variable "s3_bucket_name" {
  description = "The name of the S3 bucket for the frontend"
  default     = "calendify-frontend-bucket"
}
