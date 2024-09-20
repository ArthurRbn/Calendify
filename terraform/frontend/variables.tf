variable "frontend_domain" {
  description = "Domain name for the frontend"
  default     = "www.calendify.arthurrobine.fr"
}

variable "acm_certificate_arn" {
  description = "ACM certificate ARN for CloudFront"
  type        = string
}