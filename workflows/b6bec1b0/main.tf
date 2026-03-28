# =============================================================================
# TERRAFORM CONFIGURATION - Auto-generated from Workflow Canvas
# Generated: 2026-03-28T01:09:23.616Z
# Nodes: 4 | Connections: 3
# =============================================================================

terraform {
  required_version = ">= 1.0"
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    null = {
      source  = "hashicorp/null"
      version = "~> 3.0"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

provider "aws" {
  region = var.aws_region
}

# =============================================================================
# VARIABLES
# =============================================================================

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "cloudflare_api_token" {
  description = "Cloudflare API token"
  type        = string
  sensitive   = true
}

# =============================================================================
# RESOURCES
# =============================================================================

resource "cloudflare_worker_script" "cloudflare_workers_2" {
}

resource "aws_instance" "ec2_instance_3" {
  ami = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"

  tags = {
    Name        = "ec2_instance_3"
    Environment = "development"
    ManagedBy   = "terraform"
    CreatedBy   = "workflow-canvas"
  }

  depends_on = [
    cloudflare_worker_script.cloudflare_workers_2,
  ]
}

# =============================================================================
# NULL RESOURCES (Scripts, Commands, Notifications)
# =============================================================================

resource "null_resource" "deploy_service_4" {
  triggers = {
    always_run = timestamp()
  }

  provisioner "local-exec" {
    command = "echo \"Deploying service...\""
  }

  depends_on = [
    aws_instance.ec2_instance_3,
  ]
}

# =============================================================================
# OUTPUTS
# =============================================================================

output "cloudflare_workers_2_id" {
  description = "ID of cloudflare_workers_2"
  value       = cloudflare_worker_script.cloudflare_workers_2.id
}

output "ec2_instance_3_id" {
  description = "ID of ec2_instance_3"
  value       = aws_instance.ec2_instance_3.id
}
