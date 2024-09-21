output "acm_certificate_arn_us_east_1" {
  value = aws_acm_certificate.this_us_east_1.arn
}

output "acm_certificate_arn_eu_west_3" {
  value = aws_acm_certificate.this_eu_west_3.arn
}
