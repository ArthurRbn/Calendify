terraform {
  backend "s3" {
    bucket         = "terraform-state-calendify"
    key            = "calendify/terraform.tfstate"
    region         = var.region
    dynamodb_table = "terraform-locks-calendify"
  }
}
