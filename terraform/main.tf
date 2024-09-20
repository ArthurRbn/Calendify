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
  acm_certificate_arn = module.common.acm_certificate_arn
  region = var.region
}

module "frontend" {
  source = "./frontend"
  frontend_domain      = var.frontend_domain
}

