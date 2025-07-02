# Create Internet Gateway
resource "oci_core_internet_gateway" "simple_igw" {
  compartment_id = var.tenancy_ocid
  vcn_id         = oci_core_vcn.simple_vcn.id
  display_name   = "simple-igw"
}