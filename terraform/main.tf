provider "aws" {
  region = var.region
}

terraform {
  backend "s3" {
    bucket         = "terraform-state-calendify"
    key            = "calendify/terraform.tfstate"
    region         = "eu-west-3"
    dynamodb_table = "terraform-locks-calendify"
  }
}

module "common" {
  source = "./common"
  region = var.region
}

# Frontend (S3 + CloudFront setup)
module "frontend" {
  source = "./frontend"
  s3_bucket_name       = module.common.s3_bucket_name
  frontend_domain      = var.frontend_domain
  acm_certificate_arn  = module.common.acm_certificate_arn
  s3_bucket_website_url = module.common.s3_bucket_website_url
}

