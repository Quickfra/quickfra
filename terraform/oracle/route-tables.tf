# Create Route Table
resource "oci_core_route_table" "simple_rt" {
  compartment_id = var.tenancy_ocid
  vcn_id         = oci_core_vcn.simple_vcn.id
  display_name   = "simple-rt"
  
  route_rules {
    destination       = "0.0.0.0/0"
    network_entity_id = oci_core_internet_gateway.simple_igw.id
  }
}