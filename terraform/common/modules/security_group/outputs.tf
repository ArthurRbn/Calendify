output "ecs_security_group_id" {
  description = "ID of the security group"
  value       = aws_security_group.ecs.id
}

output "rds_security_group_id" {
  description = "ID of the security group"
  value       = aws_security_group.rds.id
}
