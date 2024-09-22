variable "cluster_name" {
  description = "ECS Cluster name"
  type        = string
}

variable "service_name" {
  description = "ECS Service name"
  type        = string
}

variable "task_family" {
  description = "ECS Task Definition family"
  type        = string
}

variable "cpu" {
  description = "CPU units for the ECS task"
  type        = string
  default     = "256"
}

variable "memory" {
  description = "Memory for the ECS task"
  type        = string
  default     = "512"
}

variable "container_image" {
  description = "Docker image for the backend"
  type        = string
}

variable "container_port" {
  description = "Port on which the container listens"
  type        = number
}

variable "db_host" {
  description = "Database host"
  type        = string
}

variable "db_port" {
  description = "Database port"
  type        = string
  default     = "5432"
}

variable "db_name" {
  description = "Database name"
  type        = string
}

variable "db_username" {
  description = "Database username"
  type        = string
}

variable "db_password" {
  description = "Database password"
  type        = string
}

variable "server_port" {
  description = "Server port to listen on"
  type        = string
}


variable "secret_key" {
  description = "Secret key for the backend"
  type        = string
}


variable "security_groups" {
  description = "List of security groups"
  type        = list(string)
}

variable "private_subnets" {
  description = "Private subnets for ECS tasks"
  type        = list(string)
}

variable "execution_role_arn" {
  description = "Execution role ARN for the ECS task"
  type        = string
}

variable "task_role_arn" {
  description = "Task role ARN for the ECS task"
  type        = string
}

variable "target_group_arn" {
  description = "Target group ARN for the ALB"
  type        = string
}
