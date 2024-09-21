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
  private_subnet_cidrs = ["10.0.3.0/24", "10.0.4.0/24"]
  availability_zones  = ["eu-west-3a", "eu-west-3b", "eu-west-3c"]
}

module "alb" {
  source                  = "./common/modules/alb"
  name                    = "calendify-backend-alb"
  vpc_id                  = module.vpc.vpc_id
  subnets                 = module.vpc.public_subnets
  target_group_port       = 4200
  health_check_path       = "/health"
  health_check_interval   = 30
  health_check_timeout    = 5
  healthy_threshold       = 2
  unhealthy_threshold     = 2
  listener_port           = 80
  acm_certificate_arn     = module.acm.acm_certificate_arn_eu_west_3
}

module "cloudfront" {
  source              = "./common/modules/cloudfront"
  s3_bucket_name      = var.s3_bucket_name
  frontend_domain     = var.frontend_domain
  acm_certificate_arn = module.acm.acm_certificate_arn_us_east_1
  region              = var.region
  frontend_alternative_domain = var.frontend_alternative_domain
  alb_dns_name = module.alb.alb_dns_name
}

module "security_group" {
  source = "./common/modules/security_group"
  name   = "calendify-security-groups"
  vpc_id = module.vpc.vpc_id
  alb_security_group_id = module.alb.alb_security_group_id
}

module "iam" {
  source = "./common/modules/iam"
  name   = "calendify-backend"
}

module "rds" {
  source               = "./common/modules/rds"
  name                 = "calendify-db"
  db_name              = var.db_name
  db_username          = var.db_username
  db_password          = var.db_password
  allocated_storage    = 20
  instance_class       = "db.t3.micro"
  engine_version       = "16.4"
  private_subnets      = module.vpc.private_subnets
  security_group_ids   = [module.security_group.rds_security_group_id]
}

module "ecs" {
  source                = "./common/modules/ecs"
  cluster_name          = "calendify-backend-cluster"
  service_name          = "calendify-backend-service"
  task_family           = "calendify-backend"
  container_image       = "my-backend-image:latest"
  container_port        = 4200
  db_host               = module.rds.rds_endpoint
  db_name               = var.db_name
  db_username           = var.db_username
  db_password           = var.db_password
  private_subnets       = module.vpc.private_subnets
  security_groups       = [module.security_group.ecs_security_group_id]
  target_group_arn      = module.alb.target_group_arn
  execution_role_arn    = module.iam.execution_role_arn
  task_role_arn         = module.iam.task_role_arn
}
