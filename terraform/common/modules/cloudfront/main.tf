locals {
  s3_origin_id   = "${var.s3_bucket_name}-origin"
  s3_domain_name = "${var.s3_bucket_name}.s3-website-${var.region}.amazonaws.com"
}

data "aws_cloudfront_cache_policy" "caching_disabled" {
  name = "CachingDisabled"
}

data "aws_cloudfront_origin_request_policy" "all_viewer" {
  name = "AllViewer"
}

resource "aws_cloudfront_origin_access_identity" "oai" {
  comment = "OAI for S3"
}

resource "aws_cloudfront_distribution" "frontend_distribution" {
  origin {
    domain_name = "${var.s3_bucket_name}.s3.amazonaws.com"
    origin_id   = local.s3_origin_id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
    }
  }

  origin {
    domain_name = var.alb_dns_name
    origin_id   = "ALB-origin"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  enabled = true
  default_root_object = "index.html"

  aliases = [var.frontend_domain, var.frontend_alternative_domain]

  default_cache_behavior {
    target_origin_id = local.s3_origin_id
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]

    forwarded_values {
      query_string = true

      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 3600
    max_ttl     = 86400
  }

  ordered_cache_behavior {
    path_pattern             = "/api/*"
    target_origin_id         = "ALB-origin"
    viewer_protocol_policy   = "redirect-to-https"
    allowed_methods          = ["HEAD", "GET", "OPTIONS", "POST", "PUT", "DELETE", "PATCH"]
    cached_methods           = ["GET", "HEAD"]
    cache_policy_id          = data.aws_cloudfront_cache_policy.caching_disabled.id
    origin_request_policy_id = data.aws_cloudfront_origin_request_policy.all_viewer.id

    forwarded_values {
      query_string = true

      cookies {
        forward = "all"
      }

      headers = ["Authorization", "Content-Type"]
    }

    min_ttl     = 0
    default_ttl = 0
    max_ttl     = 0
  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }

  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
  }

  viewer_certificate {
    acm_certificate_arn      = var.acm_certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  price_class = "PriceClass_200"
}

