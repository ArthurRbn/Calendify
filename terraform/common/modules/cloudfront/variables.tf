variable "frontend_domain" {
  description = "Domain name for the frontend application"
  type        = string
}

variable "s3_bucket_name" {
  description = "S3 bucket name"
  type        = string
}

variable "acm_certificate_arn" {
  default = ""
}

variable "region" {
  default = ""
}