terraform {
  backend "s3" {
    bucket         = "terraform-state-calendify"
    key            = "state/terraform.tfstate"
    dynamodb_table = "terraform-locks-calendify"
  }
}
