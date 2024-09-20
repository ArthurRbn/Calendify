resource "aws_acm_certificate" "frontend_certificate" {
  provider          = aws.us_east_1
  domain_name       = var.frontend_domain
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "SSL certificate for www.calendify.arthurrobine.fr"
  }
}

output "acm_certificate_arn" {
  value = aws_acm_certificate.frontend_certificate.arn
}
