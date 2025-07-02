# Oracle Cloud Infrastructure Module for Quickfra

terraform {
  required_providers {
    oci = {
      source  = "hashicorp/oci"
      version = ">= 5.0.0"
    }
  }
}

provider "oci" {
  region           = "${var.oracle_region}"
  tenancy_ocid     = "${var.oracle_tenancy_ocid}"
  user_ocid        = "${var.oracle_user_ocid}"
  fingerprint      = "${var.oracle_fingerprint}"
  private_key_path = "${var.oracle_private_key_path}"
}