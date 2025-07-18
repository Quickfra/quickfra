# This project is currently on development
### To see the current progress (Terraform deployment) go to the [feature/terraform-infra](https://github.com/Quickfra/quickfra/tree/feature/terraform-infra) branch

# Preview
https://github.com/user-attachments/assets/844e1aa0-d52d-4ef1-83d7-4771f88d4ab8

![](./assets/banner.png)

# Quickfra - Automated platform deployment tool
Quickfra is a command-line tool designed to simplify the deployment of complex infrastructure setups across multiple cloud providers. It automatically installs [Coolify](https://coolify.io) (an open-source self-hostable Heroku alternative) and deploys your chosen services as managed resources within Coolify, enabling you to deploy a fully functional platform with a single command.

# Key Features
- **Multi-cloud Support**: Deploy across AWS, OCI, DigitalOcean, Hetzner, and other cloud providers.
- **Coolify Integration**: Automatically installs and configures Coolify as your deployment platform.
- **Service Orchestration**: Deploy databases, web services, and automation tools as Coolify resources.
- **Single Command Deployment**: Use `quickfra up` to provision infrastructure and deploy services instantly.
- **Zero Configuration**: Sensible defaults with automatic SSL, networking, and service discovery.
- **Observability**: Built-in monitoring via Uptime Kuma and Coolify's integrated dashboards.

# Quick Start
With Quickfra you have multiple options to deploy your platform. The simplest way is to use the command line interface (CLI) to deploy a predefined set of services.

## CLI Usage
The `quickfra up` command installs [Coolify](https://coolify.io) on your cloud provider and automatically adds the selected services as resources within Coolify for easy management.

### Basic Usage
```bash
# Deploy with specific cloud provider and services
quickfra up --cloud <provider> --services <service1,service2,...>
```

### Examples
```bash
# Deploy to Oracle Cloud with web services and databases
quickfra up --cloud oci --services webmail,mail,status,n8n,postgres,mariadb,mysql,redis

# Deploy to AWS with minimal services
quickfra up --cloud aws --services coolify,mail,status

# Deploy to DigitalOcean with automation tools
quickfra up --cloud digitalocean --services webmail,n8n,postgres,redis
```

### Supported Cloud Providers
- `aws` - Amazon Web Services
- `oci` - Oracle Cloud Infrastructure  
- `digitalocean` - DigitalOcean
- `hetzner` - Hetzner Cloud

### Available Addons
- `webmail` - Stalwart Mail with web interface
- `mail` - Stalwart Mail server only
- `status` - Uptime Kuma monitoring and status page
- `n8n` - Workflow automation platform
- `postgres` - PostgreSQL database
- `redis` - Redis cache and data store

### How it Works
1. **Cloud Setup**: Quickfra provisions a virtual machine on your chosen cloud provider
2. **Coolify Installation**: Automatically installs Coolify using their official installation script
3. **Addon Deployment**: Adds selected addons as resources within Coolify
4. **Configuration**: Sets up networking, SSL certificates, and service interconnections
5. **Access**: Provides you with URLs and credentials to access your deployed services

All services are managed through Coolify's intuitive web interface, giving you full control over deployments, monitoring, and scaling.

## Web UI
Access the Quickfra web interface for visual configuration and management:
```
# Coming soon - deploy via web interface
```

# Architecture Overview
Quickfra simplifies infrastructure deployment by leveraging Coolify as the core deployment platform:

## Core Components
- **Quickfra CLI**: TypeScript-based command-line tool for automated deployments
- **Cloud Provisioning**: Automated VM setup across multiple cloud providers
- **Coolify Platform**: Self-hosted deployment platform (automatically installed)
  - Manages all application deployments and services
  - Provides web UI for ongoing management
  - Handles SSL certificates, backups, and monitoring
- **Service Ecosystem**: Pre-configured services deployed as Coolify resources:
  - **Stalwart Mail**: Email server with web administration
  - **Uptime Kuma**: Status monitoring and uptime tracking  
  - **n8n**: Workflow automation and integration platform
  - **Databases**: PostgreSQL, MySQL, MariaDB, Redis

## Deployment Flow
1. **Infrastructure**: Quickfra provisions cloud resources (VM, networking, storage)
2. **Platform**: Coolify is installed and configured automatically
3. **Addons**: Selected services are deployed as Coolify applications
4. **Management**: All ongoing operations handled through Coolify's interface

# Support
If you need help or have questions, please open an issue on the repository and also check out our website at [quickfra.com](https://quickfra.com).

# License
Quickfra is licensed under the Apache License 2.0.

- **Source Availability:** Quickfra is open source and available on GitHub.
- **Extensible:** The architecture allows for easy addition of new services and cloud providers.
- **Community Driven:** Contributions are welcome, and the project encourages community involvement.
- **Permissive License:** Allowed for commercial use, modification, and distribution.
- **Patent grant:** Protecting users from patent claims related to the software.

# Contributing
We welcome contributions to Quickfra! Please read our [contributing guidelines](CONTRIBUTING.md) for more information on how to get involved.

# History behind Quickfra
**Quickfra** (Quick infraestructure) is a project born out of the burnout and frustration of managing and continuosly repeating the process of complex infrastructure setups. It aims to simplify the deployment process, making it accessible to developers and teams without deep DevOps expertise.

It started as a personal project to automate the deployment of my own services using coolify and docker images, but has since evolved into a more comprehensive tool that can be used by anyone looking to streamline their infrastructure management.

By creating a guide on how to configure my VPS with all the necessary tools and services, including Coolify, Stalwart Mail, and Uptime Kuma, i wanted to it with others, but i thought "why not automate the whole process instead of just writing a guide which will make everyone follow the steps one by one and waste time?".

I was tired of setting up mail servers, monitoring tools, and other services manually, so I created Quickfra to automate these tasks. The goal is to provide a one-stop solution for deploying and managing complex infrastructure setups with minimal effort.

> _**Diego Rodriguez**, the Founder and CEO of Quickfra, quickfra.com._
