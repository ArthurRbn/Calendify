provider "aws" {
  region = var.region
}

provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

terraform {
  backend "s3" {
    bucket         = "terraform-state-calendify"
    key            = "calendify/terraform.tfstate"
    region         = var.region
    dynamodb_table = "terraform-locks-calendify"
  }
}
