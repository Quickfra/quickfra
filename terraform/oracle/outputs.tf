# Outputs for the simple Oracle Cloud instance

output "public_ip" {
  description = "Public IP address of the instance"
  value       = oci_core_instance.simple_instance.public_ip
}

output "instance_id" {
  description = "OCID of the created instance"
  value       = oci_core_instance.simple_instance.id
}
