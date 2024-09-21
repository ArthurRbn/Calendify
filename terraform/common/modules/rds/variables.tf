variable "name" {
  description = "The name of the RDS instance"
  type        = string
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

variable "allocated_storage" {
  description = "The allocated storage in GBs"
  type        = number
}

variable "instance_class" {
  description = "The instance class for the database"
  type        = string
  default     = "db.t3.micro"
}

variable "engine_version" {
  description = "The version of the database engine"
  type        = string
  default     = "13.4"
}

variable "parameter_group_name" {
  description = "The name of the parameter group for the database"
  type        = string
  default     = "default.postgres13"
}

variable "private_subnets" {
  description = "List of private subnets for RDS"
  type        = list(string)
}

variable "security_group_ids" {
  description = "List of security group IDs for RDS"
  type        = list(string)
}
