# Data sources for Oracle Cloud Infrastructure

# Get availability domains
data "oci_identity_availability_domains" "ads" {
  compartment_id = var.oracle_tenancy_ocid
}

# Get Ubuntu 22.04 LTS Minimal image
data "oci_core_images" "ubuntu_22_04_minimal" {
  compartment_id   = var.oracle_tenancy_ocid
  shape            = local.instance_shape
  operating_system = "Canonical Ubuntu"
  sort_by          = "TIMECREATED"
  sort_order       = "DESC"
  state            = "AVAILABLE"
  
  filter {
    name   = "display_name"
    values = [".*22\\.04.*[Mm]inimal.*"]
    regex  = true
  }
}
