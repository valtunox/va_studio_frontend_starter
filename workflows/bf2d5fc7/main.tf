# =============================================================================
# TERRAFORM CONFIGURATION - Auto-generated from Workflow Canvas
# Generated: 2026-03-28T01:34:42.234Z
# Nodes: 5 | Connections: 4
# =============================================================================

terraform {
  required_version = ">= 1.0"
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
    http = {
      source  = "hashicorp/http"
      version = "~> 3.0"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}

# =============================================================================
# VARIABLES
# =============================================================================

variable "gcp_project_id" {
  description = "GCP project ID"
  type        = string
}
variable "gcp_region" {
  description = "GCP region"
  type        = string
  default     = "us-central1"
}

variable "cloudflare_api_token" {
  description = "Cloudflare API token"
  type        = string
  sensitive   = true
}

# =============================================================================
# DATA SOURCES - HTTP Requests (Execute BEFORE resources)
# Use these to trigger external APIs, webhooks, or pre-deploy checks
# =============================================================================

data "http" "make_integromat_5" {
  url    = "https://hook.integromat.com"
  method = "POST"

  request_headers = {
    Accept = "application/json"
  }

  request_body = jsonencode({
    status  = "initializing"
    source  = "terraform"
  })

  # Lifecycle: This data source runs during plan/apply refresh phase
  # Any resource that references this will wait for the HTTP call to complete
}

# =============================================================================
# RESOURCES
# =============================================================================

resource "cloudflare_certificate_pack" "cloudflare_ssl_2" {
  type = "advanced"
}

resource "google_cloudfunctions_function" "cloud_functions_3" {
  runtime = "python312"

  tags = {
    Name        = "cloud_functions_3"
    Environment = "development"
    ManagedBy   = "terraform"
    CreatedBy   = "workflow-canvas"
  }

  depends_on = [
    cloudflare_certificate_pack.cloudflare_ssl_2,
  ]
}

resource "google_bigquery_dataset" "bigquery_4" {

  tags = {
    Name        = "bigquery_4"
    Environment = "development"
    ManagedBy   = "terraform"
    CreatedBy   = "workflow-canvas"
  }

  depends_on = [
    cloudflare_certificate_pack.cloudflare_ssl_2,
  ]
}

# =============================================================================
# OUTPUTS
# =============================================================================

output "cloudflare_ssl_2_id" {
  description = "ID of cloudflare_ssl_2"
  value       = cloudflare_certificate_pack.cloudflare_ssl_2.id
}

output "cloud_functions_3_id" {
  description = "ID of cloud_functions_3"
  value       = google_cloudfunctions_function.cloud_functions_3.id
}

output "bigquery_4_id" {
  description = "ID of bigquery_4"
  value       = google_bigquery_dataset.bigquery_4.id
}

output "make_integromat_5_status" {
  description = "HTTP status code for make_integromat_5"
  value       = data.http.make_integromat_5.status_code
}
