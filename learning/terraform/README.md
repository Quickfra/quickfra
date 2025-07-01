# Setting up Terraform with AWS

1. Installing AWS on bash
```bash
sudo apt-get install awscli
```

2. Getting access to the AWS credentials
![](https://i.imgur.com/PQ1hAx0.png)


3. Creating the Access Key
![](https://i.imgur.com/1fUMHbZ.png)

4. Configuring the AWS CLI with the Access Key
![](https://i.imgur.com/l6P0lSt.png)
![](https://i.imgur.com/8cvazNU.png)

It's currently using the "default" profile.

![](https://i.imgur.com/HpktfKK.png)


# Initializing AWS Instance with Terraform
```bash
terraform init
```

# Finding AWS Instance Image ID
https://cloud-images.ubuntu.com/locator/ec2/