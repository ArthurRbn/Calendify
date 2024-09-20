terraform {
  backend "s3" {
    bucket         = "terraform-state-calendify"
    key            = "calendify/terraform.tfstate"
    dynamodb_table = "terraform-locks-calendify"
  }
}
