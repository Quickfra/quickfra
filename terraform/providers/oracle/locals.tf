locals {
  common = yamldecode(file("${path.module}/../../ports.yaml"))
  instance_name = "${var.app_name}-instance"
  instance_shape = "VM.Standard.A1.Flex"
  vcn_name      = "${var.app_name}-vcn"
  subnet_name   = "${var.app_name}-subnet"
  igw_name      = "${var.app_name}-igw"
  rt_name       = "${var.app_name}-rt"
  sl_name       = "${var.app_name}-sl"
}
