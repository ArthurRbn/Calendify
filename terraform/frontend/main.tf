module "frontend_s3" {
  source = "../common/s3.tf"
}

module "frontend_cloudfront" {
  source           = "../common/cloudfront.fr"
  s3_bucket_name   = module.frontend_s3.s3_bucket_name
  s3_bucket_website_url = module.frontend_s3.s3_bucket_website_url
  frontend_domain  = var.frontend_domain
  acm_certificate_arn = var.acm_certificate_arn
}
