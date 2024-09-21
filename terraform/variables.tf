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

/*variable "vpc_id" {
  description = "VPC ID where the ALB should be deployed"
  type        = string
}*/

/*variable "public_subnets" {
  description = "List of public subnets for the ALB"
  type        = list(string)
}

variable "security_groups" {
  description = "List of security groups to associate with the ALB"
  type        = list(string)
}*/
