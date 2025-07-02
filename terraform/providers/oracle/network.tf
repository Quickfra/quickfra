# Oracle Cloud Infrastructure Networking Resources

# Virtual Cloud Network (VCN)
resource "oci_core_vcn" "main" {
  cidr_block     = "10.0.0.0/16"
  compartment_id = var.oracle_tenancy_ocid
  display_name   = local.vcn_name
}

# Internet Gateway
resource "oci_core_internet_gateway" "main" {
  compartment_id = var.oracle_tenancy_ocid
  vcn_id         = oci_core_vcn.main.id
  display_name   = local.igw_name
  enabled        = true
}

# Route Table
resource "oci_core_route_table" "main" {
  compartment_id = var.oracle_tenancy_ocid
  vcn_id         = oci_core_vcn.main.id
  display_name   = local.rt_name
  
  route_rules {
    destination       = "0.0.0.0/0"
    destination_type  = "CIDR_BLOCK"
    network_entity_id = oci_core_internet_gateway.main.id
  }

}

# Security List
resource "oci_core_security_list" "main" {
  compartment_id = var.oracle_tenancy_ocid
  vcn_id         = oci_core_vcn.main.id
  display_name   = local.sl_name
  
  # Egress rules - Allow all outbound traffic
  egress_security_rules {
    destination = "0.0.0.0/0"
    protocol    = "all"
  }
  
  # Ingress rules - SSH
  ingress_security_rules {
    protocol = "6" # TCP
    source   = "0.0.0.0/0"
    
    tcp_options {
      min = local.common.ssh_ports[0]
      max = local.common.ssh_ports[0]
    }
  }
  
  # Ingress rules - Web ports (HTTP/HTTPS)
  dynamic "ingress_security_rules" {
    for_each = local.common.web_ports
    content {
      protocol = "6" # TCP
      source   = "0.0.0.0/0"
      
      tcp_options {
        min = ingress_security_rules.value
        max = ingress_security_rules.value
      }
    }
  }
  
  # Ingress rules - Mail ports
  dynamic "ingress_security_rules" {
    for_each = local.common.mail_ports
    content {
      protocol = "6" # TCP
      source   = "0.0.0.0/0"
      
      tcp_options {
        min = ingress_security_rules.value
        max = ingress_security_rules.value
      }
    }
  }
}

# Subnet
resource "oci_core_subnet" "main" {
  availability_domain = data.oci_identity_availability_domains.ads.availability_domains[0].name
  cidr_block          = "10.0.1.0/24"
  compartment_id      = var.oracle_tenancy_ocid
  vcn_id              = oci_core_vcn.main.id
  display_name        = local.subnet_name
  route_table_id      = oci_core_route_table.main.id
  security_list_ids   = [oci_core_security_list.main.id]
}
