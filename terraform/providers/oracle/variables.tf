variable "app_name" {
  description = "Name of the application or project"
  type        = string
}

variable "oracle_tenancy_ocid" {
  description = "The OCID of the tenancy / Compartment"
  type        = string
}

variable "oracle_user_ocid" {
  description = "The OCID of the user"
  type        = string
}

variable "oracle_fingerprint" {
  description = "The fingerprint of the API key"
  type        = string
}

variable "oracle_private_key_path" {
  description = "Path to the private key file"
  type        = string
}

variable "oracle_region" {
  description = "Oracle Cloud region"
  type        = string
}