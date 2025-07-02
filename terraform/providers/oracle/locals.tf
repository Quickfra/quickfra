locals {
  common = yamldecode(file("${path.module}/../../common/ports.yaml"))
  config = yamldecode(file("${path.module}/../../config.yaml"))
  instance_name = "${local.config.app_name}-instance"
  instance_shape = "VM.Standard.A1.Flex"
  vcn_name      = "${local.config.app_name}-vcn"
  subnet_name   = "${local.config.app_name}-subnet"
  igw_name      = "${local.config.app_name}-igw"
  rt_name       = "${local.config.app_name}-rt"
  sl_name       = "${local.config.app_name}-sl"
}
