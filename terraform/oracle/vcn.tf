# Create VCN
resource "oci_core_vcn" "simple_vcn" {
  cidr_block     = "10.0.0.0/16"
  compartment_id = var.tenancy_ocid
  display_name   = "simple-vcn"
}
