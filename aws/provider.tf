# provider.tf
terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# variables.tf
variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "us-east-1"
}

variable "instance_name" {
  description = "Tag name for EC2 instance"
  type        = string
  default     = "ubuntu-web"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "ssh_key_name" {
  description = "Existing AWS EC2 key pair name for SSH"
  type        = string
}

variable "allowed_ssh_cidr" {
  description = "CIDR block allowed to SSH in"
  type        = string
  default     = "0.0.0.0/0"
}

# ubuntu has frequent AMI updates; parameterize so you can override if needed
variable "ubuntu_ami" {
  description = "Ubuntu 22.04 LTS AMI ID in the selected region"
  type        = string
  default     = "ami-0fc5d935ebf8bc3bc" # us-east-1 Ubuntu 22.04 LTS (update if region changes)
}

# main.tf
resource "aws_security_group" "ssh_http" {
  name        = "${var.instance_name}-sg"
  description = "Allow SSH (22) and HTTP (80)"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.allowed_ssh_cidr]
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Backend API"
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "ubuntu" {
  ami                    = var.ubuntu_ami
  instance_type          = var.instance_type
  key_name               = var.ssh_key_name
  vpc_security_group_ids = [aws_security_group.ssh_http.id]

  tags = {
    Name = var.instance_name
  }

  # Install Docker and deploy Food Recipe App
  user_data = <<-EOF
              #!/bin/bash
              set -e
              
              # Update system
              apt-get update -y
              apt-get upgrade -y
              
              # Install Docker
              apt-get install -y apt-transport-https ca-certificates curl software-properties-common
              curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
              echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
              apt-get update -y
              apt-get install -y docker-ce docker-ce-cli containerd.io
              
              # Start Docker
              systemctl start docker
              systemctl enable docker
              
              # Add ubuntu user to docker group
              usermod -aG docker ubuntu
              
              # Pull and run containers
              docker network create food-recipe-network || true
              docker pull emashachathuni/island-table-backend:latest
              docker pull emashachathuni/island-table-frontend:latest
              
              # Run backend container
              docker run -d \
                --name island-table-backend \
                --network food-recipe-network \
                --restart unless-stopped \
                -p 5000:5000 \
                -e PORT=5000 \
                -e NODE_ENV=production \
                emashachathuni/island-table-backend:latest
              
              # Run frontend container
              docker run -d \
                --name island-table-frontend \
                --network food-recipe-network \
                --restart unless-stopped \
                -p 80:80 \
                emashachathuni/island-table-frontend:latest
              
              # Signal completion
              touch /var/lib/cloud/instance/deployment-complete
              EOF
}

# outputs.tf
output "public_ip" {
  value       = aws_instance.ubuntu.public_ip
  description = "Public IP address of the EC2 instance"
}

output "public_dns" {
  value       = aws_instance.ubuntu.public_dns
  description = "Public DNS of the EC2 instance"
}

output "application_url" {
  value       = "http://${aws_instance.ubuntu.public_ip}"
  description = "URL to access the Food Recipe App"
}
