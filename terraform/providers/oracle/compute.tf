# Oracle Cloud Infrastructure Compute Instance

resource "oci_core_instance" "main" {
  availability_domain = data.oci_identity_availability_domains.ads.availability_domains[0].name
  compartment_id      = var.oracle_tenancy_ocid
  display_name        = local.instance_name
  shape               = local.instance_shape
  
  shape_config {
    ocpus         = 1
    memory_in_gbs = 4
  }
  
  create_vnic_details {
    subnet_id        = oci_core_subnet.main.id
    assign_public_ip = true
  }
  
  source_details {
    source_type = "image"
    source_id   = data.oci_core_images.ubuntu_22_04_minimal.images[0].id
  }
  
  # Basic cloud-init configuration
  metadata = {
    ssh_authorized_keys = fileexists("~/.ssh/id_rsa.pub") ? file("~/.ssh/id_rsa.pub") : ""
    user_data = base64encode(templatefile("${path.module}/../../scripts/main.sh", {
        app_name = var.app_name,
        coolify_email = var.coolify_email,
        coolify_password = var.coolify_password,
        cloudflare_tunnel_token = var.cloudflare_tunnel_token,
        domain_name = var.domain_name,
    }))
  }
}
