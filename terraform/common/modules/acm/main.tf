resource "aws_acm_certificate" "this_us_east_1" {
  provider          = aws.us_east_1
  domain_name       = var.frontend_domain
  validation_method = "DNS"

  subject_alternative_names = [
    var.frontend_alternative_domain
  ]

  tags = {
    Name = "SSL certificate for CloudFront - ${var.frontend_domain}"
  }
}

resource "aws_acm_certificate" "this_eu_west_3" {
  provider          = aws.eu_west_3
  domain_name       = var.frontend_domain
  validation_method = "DNS"

  subject_alternative_names = [
    var.frontend_alternative_domain
  ]

  tags = {
    Name = "SSL certificate for ALB - ${var.frontend_domain}"
  }
}
