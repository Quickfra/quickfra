# Outputs for the Oracle Cloud Infrastructure module

output "public_ip" {
  description = "Public IP address of the instance"
  value       = oci_core_instance.main.public_ip
}

output "instance_id" {
  description = "OCID of the created instance"
  value       = oci_core_instance.main.id
}

output "vcn_id" {
  description = "OCID of the VCN"
  value       = oci_core_vcn.main.id
}

output "subnet_id" {
  description = "OCID of the subnet"
  value       = oci_core_subnet.main.id
}

output "availability_domain" {
  description = "Availability domain where the instance is deployed"
  value       = oci_core_instance.main.availability_domain
}