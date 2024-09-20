resource "aws_acm_certificate" "this" {
  provider          = aws.us_east_1
  domain_name       = var.frontend_domain
  validation_method = "DNS"

  tags = {
    Name = "SSL certificate for ${var.frontend_domain}"
  }
}
