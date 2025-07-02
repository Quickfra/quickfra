locals {
  instance_name = "${var.global_name}-instance"
  instance_shape = "VM.Standard.A1.Flex"
  vcn_name      = "${var.global_name}-vcn"
  subnet_name   = "${var.global_name}-subnet"
  igw_name      = "${var.global_name}-igw"
  rt_name       = "${var.global_name}-rt"
  sl_name       = "${var.global_name}-sl"
}