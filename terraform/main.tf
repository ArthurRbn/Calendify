module "acm" {
  source          = "./common/modules/acm"
  frontend_domain = var.frontend_domain
  frontend_alternative_domain = var.frontend_alternative_domain
}

module "s3" {
  source             = "./common/modules/s3"
  s3_bucket_name     = var.s3_bucket_name
  cloudfront_oia_arn = module.cloudfront.cloudfront_oia_arn
}

module "vpc" {
  source = "./common/modules/vpc"
  name   = "calendify-vpc"
  vpc_cidr = "10.0.0.0/16"
  public_subnet_cidrs = ["10.0.1.0/24", "10.0.2.0/24"]
  availability_zones  = ["euw3-az1", "euw3-az2", "euw3-az3"]
}

module "security_group" {
  source = "./common/modules/security_group"
  name   = "calendify-sg"
  vpc_id = module.vpc.vpc_id
}

module "alb" {
  source                  = "./common/modules/alb"
  name                    = "calendify-backend-alb"
  vpc_id                  = module.vpc.vpc_id
  subnets                 = module.vpc.public_subnets
  security_groups         = [module.security_group.security_group_id]
  target_group_port       = 4200
  health_check_path       = "/health"
  health_check_interval   = 30
  health_check_timeout    = 5
  healthy_threshold       = 2
  unhealthy_threshold     = 2
  listener_port           = 80
  acm_certificate_arn     = module.acm.acm_certificate_arn
}

module "cloudfront" {
  source              = "./common/modules/cloudfront"
  s3_bucket_name      = var.s3_bucket_name
  frontend_domain     = var.frontend_domain
  acm_certificate_arn = module.acm.acm_certificate_arn
  region              = var.region
  frontend_alternative_domain = var.frontend_alternative_domain
  alb_dns_name = module.alb.alb_dns_name
}
