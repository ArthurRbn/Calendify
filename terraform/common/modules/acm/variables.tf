variable "frontend_domain" {
  description = "The domain name to create the SSL certificate for"
  type        = string
}

variable "frontend_alternative_domain" {
  description = "Alternative name for the frontend"
  type        = string
}