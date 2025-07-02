# Get Ubuntu image
data "oci_core_images" "ubuntu-22-04-minimal" {
  compartment_id   = var.tenancy_ocid
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