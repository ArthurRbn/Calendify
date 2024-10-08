variable "frontend_domain" {
  description = "Domain name for the frontend application"
  type        = string
}

variable "frontend_alternative_domain" {
  description = "Alternative name for the frontend"
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

variable "alb_dns_name" {
  description = "The DNS name of the ALB"
  type        = string
}
