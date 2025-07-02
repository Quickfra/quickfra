# Simple Oracle Cloud Instance with Terraform

This is an extremely simple Terraform script that creates a basic Oracle Cloud Infrastructure (OCI) instance.

## What it creates

- **VCN** (Virtual Cloud Network) with basic networking
- **Internet Gateway** for public access
- **Subnet** for the instance
- **Security rules** allowing SSH (port 22) and HTTP (port 80)
- **VM.Standard.A1.Flex instance** (1 OCPU, 2GB RAM - Always Free tier)
- **Ubuntu 22.04 LTS** operating system

## Prerequisites

1. [OCI CLI configured](https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/cliinstall.htm) with your credentials in `~/.oci/config`
2. [Terraform installed](https://www.terraform.io/downloads.html)
3. SSH key pair generated (`ssh-keygen -t rsa`)

## How to use

1. **Copy the example variables file:**
   ```bash
   cd terraform/oracle/
   cp terraform.tfvars.example terraform.tfvars
   ```

2. **Edit `terraform.tfvars` with your details:**
   ```hcl
   compartment_id = "ocid1.compartment.oc1..your-compartment-id"
   ssh_public_key_path = "~/.ssh/id_rsa.pub"
   ```

3. **Run Terraform:**
   ```bash
   terraform init
   terraform plan
   terraform apply
   ```

4. **Connect to your instance:**
   ```bash
   ssh -i ~/.ssh/id_rsa ubuntu@<public_ip>
   ```

## Finding your compartment ID

1. Go to [OCI Console](https://cloud.oracle.com)
2. Navigate to Identity & Security → Compartments
3. Copy the OCID of your root compartment or create a new one

## Clean up

To delete all resources:
```bash
terraform destroy
```

That's it! You now have a simple Oracle Cloud instance running.
