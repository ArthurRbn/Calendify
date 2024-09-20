variable "frontend_domain" {
  description = "Domain name for the frontend"
  default     = "www.calendify.arthurrobine.fr"
}

variable "region" {
  description = "AWS region"
  type        = string
  default     = "eu-west-3"
}
