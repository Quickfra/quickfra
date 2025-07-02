locals {
  instance_name = "${var.global_name}-instance"
  instance_shape = "VM.Standard.A1.Flex"
  vcn_name      = "${var.global_name}-vcn"
  subnet_name   = "${var.global_name}-subnet"
  igw_name      = "${var.global_name}-igw"
  rt_name       = "${var.global_name}-rt"
  sl_name       = "${var.global_name}-sl"
  web_ports = [
    80,   # HTTP
    443,  # HTTPS
  ]
  mail_ports = [
    25,   # SMTP
    465,  # SMTPS
    587,  # Submission
    110,  # POP3
    995,  # POP3S
    143,  # IMAP
    993   # IMAPS
  ]
}
