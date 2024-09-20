output "cloudfront_url" {
  value = aws_cloudfront_distribution.frontend_distribution.domain_name
}

output "cloudfront_oia_arn" {
  value = aws_cloudfront_origin_access_identity.oai.iam_arn
}
