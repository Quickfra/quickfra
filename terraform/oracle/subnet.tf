# Create Subnet
resource "oci_core_subnet" "simple_subnet" {
  cidr_block        = "10.0.1.0/24"
  compartment_id    = var.tenancy_ocid
  vcn_id            = oci_core_vcn.simple_vcn.id
  display_name      = local.subnet_name
  route_table_id    = oci_core_route_table.simple_rt.id
  security_list_ids = [oci_core_security_list.simple_sl.id]
}