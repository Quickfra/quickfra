# Oracle Cloud Instance with Terraform

This Terraform configuration sets up an Oracle Cloud Infrastructure (OCI) with the following components:

- A Virtual Cloud Network (VCN)
- An Internet Gateway
- A Subnet for the instance
- A Route Table for routing traffic
- A Security List with rules for SSH and HTTP, HTTPs, mail ports and everything required for Coolify.
- A VM.Standard.A1.Flex instance (1 OCPU, 4GB RAM - Always Free tier)
- An Ubuntu 22.04 LTS operating system

![](https://i.imgur.com/D1bdNKv.png)

## Prerequisites

Get your **OCI credentials** so terraform can set up the quickfra environment.
Here's how to do it:

1. **Log in to the OCI Console**: [OCI Console](https://cloud.oracle.com)
2. **Go to User Settings**
   ![](https://i.imgur.com/f2G17Rf.png)

3. **Go to Tokens and Keys**
   ![](https://i.imgur.com/LHMyYc6.png)
4. **Generate a new API key** and choose `Generate API key pair`
   ![](https://i.imgur.com/4qxJ8oI.png)
5. **Download the private key** and save it securely under `terraform/oracle/private_key.pem`
   ![](https://i.imgur.com/Wsc3C7v.png)
6. **Fill in the `terraform.tfvars` file** with your details:
   - `tenancy_ocid`: Your tenancy OCID
   - `user_ocid`: Your user OCID
   - `fingerprint`: The fingerprint of your API key
   - `region`: The region you want to deploy in (e.g., `us-ashburn-1`)
   - `private_key_path`: Path to your private key file
   ![](https://i.imgur.com/jaFeevF.png)


## How to use


1. **Run Terraform:**
   ```bash
   terraform init
   terraform plan
   terraform apply
   ```

2. **Access the Instance:**
   After the infrastructure is created, you will be able to access the Coolify Web Panel on `IP:8000`


This is how it will look like:
![](https://i.imgur.com/DzXQMMU.png)
## Clean up

To delete all resources:
```bash
terraform destroy
```

That's it! You now have an Oracle Cloud instance running Coolify and everything ready to customize your infrastructure.