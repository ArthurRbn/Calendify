module "acm" {
  source         = "./common/modules/acm"
  frontend_domain = var.frontend_domain
}

module "s3" {
  source        = "./common/modules/s3"
  s3_bucket_name = var.s3_bucket_name
  cloudfront_oia_arn = module.cloudfront.cloudfront_oia_arn
}

module "cloudfront" {
  source              = "./common/modules/cloudfront"
  s3_bucket_name      = var.s3_bucket_name
  frontend_domain     = var.frontend_domain
  acm_certificate_arn = module.acm.acm_certificate_arn
}
