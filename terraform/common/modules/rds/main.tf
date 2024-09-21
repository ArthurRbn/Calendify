resource "aws_db_instance" "this" {
  allocated_storage    = var.allocated_storage
  engine               = "postgres"
  engine_version       = var.engine_version
  instance_class       = var.instance_class
  db_name              = var.db_name
  username             = var.db_username
  password             = var.db_password
  parameter_group_name = var.parameter_group_name
  publicly_accessible  = false
  skip_final_snapshot  = true
  vpc_security_group_ids = var.security_group_ids
  db_subnet_group_name = aws_db_subnet_group.this.name

  tags = {
    Name = var.name
  }
}

resource "aws_db_subnet_group" "this" {
  name       = "${var.name}-subnet-group"
  subnet_ids = var.private_subnets

  tags = {
    Name = "${var.name}-subnet-group"
  }
}
