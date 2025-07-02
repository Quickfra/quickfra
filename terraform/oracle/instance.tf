# Create Compute Instance
resource "oci_core_instance" "simple_instance" {
  availability_domain = data.oci_identity_availability_domains.ads.availability_domains[0].name
  compartment_id      = var.tenancy_ocid
  display_name        = "simple-instance"
  shape               = "VM.Standard.A1.Flex"
  
  shape_config {
    ocpus         = 1
    memory_in_gbs = 2
  }
  
  create_vnic_details {
    subnet_id        = oci_core_subnet.simple_subnet.id
    assign_public_ip = true
  }
  
  source_details {
    source_type = "image"
    source_id   = data.oci_core_images.ubuntu-22-04-minimal.images[0].id
  }

}
