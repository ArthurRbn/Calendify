output "execution_role_arn" {
  description = "The ECS Task Execution Role ARN"
  value       = aws_iam_role.ecs_task_execution_role.arn
}

output "task_role_arn" {
  description = "The ECS Task Role ARN"
  value       = aws_iam_role.ecs_task_role.arn
}
