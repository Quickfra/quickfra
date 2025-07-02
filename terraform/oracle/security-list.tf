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
  
  # Allow Web
  dynamic "ingress_security_rules" {
    for_each = local.web_ports
    content {
      protocol = "6"           # TCP
      source   = "0.0.0.0/0"

      tcp_options {
        min = ingress_security_rules.value
        max = ingress_security_rules.value
      }
    }
  }

  # Allow Mail
  dynamic "ingress_security_rules" {
    for_each = local.mail_ports
    content {
      protocol = "6"           # TCP
      source   = "0.0.0.0/0"

      tcp_options {
        min = ingress_security_rules.value
        max = ingress_security_rules.value
      }
    }
  }

  
  # Allow all outbound traffic
  egress_security_rules {
    protocol    = "all"
    destination = "0.0.0.0/0"
  }
}