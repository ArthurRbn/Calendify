variable "s3_bucket_name" {
  description = "S3 bucket name"
  type        = string
}

variable "cloudfront_oia_arn" {
  description = "Cloudfront origin access identity arn"
  type        = string
}
