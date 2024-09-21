terraform {
  backend "s3" {
    bucket         = "terraform-state-calendify"
    key            = "state/terraform.tfstate"
    region         = "eu-west-3"
    dynamodb_table = "terraform-locks-calendify"
  }
}
