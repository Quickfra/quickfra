# Create Security List
resource "oci_core_security_list" "simple_sl" {
  compartment_id = var.tenancy_ocid
  vcn_id         = oci_core_vcn.simple_vcn.id
  display_name   = local.sl_name
  
  # Allow SSH
  ingress_security_rules {
    protocol = "6"
    source   = "0.0.0.0/0"
    
    tcp_options {
      min = 22
      max = 22
    }
  }
  
  # Allow HTTP
  ingress_security_rules {
    protocol = "6"
    source   = "0.0.0.0/0"
    
    tcp_options {
      min = 80
      max = 80
    }
  }
  
  # Allow all outbound traffic
  egress_security_rules {
    protocol    = "all"
    destination = "0.0.0.0/0"
  }
}