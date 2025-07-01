provider "aws" {
  profile = "default"
  region = "eu-west-1"
}

# Resources block
resource "aws_instance" "box" {
  ami           = "ami-0dc0ac921efee9f9d" # Ubuntu 22.04 LTS
  instance_type = "t2.micro"

  tags = {
    Name = "quickfra-box"
  }
}