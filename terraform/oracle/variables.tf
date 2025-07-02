# Variables for the simple Oracle Cloud Terraform configuration
variable "tenancy_ocid" {
  description = "The OCID of the tenancy / Compartment"
  type        = string
}

variable "user_ocid" {
  description = "The OCID of the user"
  type        = string
}

variable "fingerprint" {
  description = "The fingerprint of the API key"
  type        = string
}

variable "private_key_path" {
  description = "Path to the private key file"
  type        = string
  default     = "~/.oci/oci_api_key.pem"
}


variable "region" {
  description = "Region of the domain"
  type        = string
}

