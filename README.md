![](./assets/banner.png)

# Quickfra - Automated platform deployment tool
Quickfra is a web & command-line tool designed to simplify the deployment of complex infrastructure setups across multiple cloud providers. It supports services like Coolify, Stalwart Mail, and Uptime Kuma, enabling users to deploy a fully functional platform with a single command.

# Key Features
- **Multi-cloud Support**: Deploy across AWS, OCI, and other cloud providers.
- **Service Integration**: Easily deploy and manage services like Coolify, inside Coolify, Stalwart Mail, and Uptime Kuma.
- **Single Command Deployment**: Use `quickfra up` to deploy your entire platform with a single command.
- **Observability**: Built-in monitoring and logging for all deployed services.
- **User-friendly UI**: Next.js-based web interface for configuration and management.

# Quick Start
With Quickfra you got multiple options to deploy your platform. The simplest way is to use the command line interface (CLI) to deploy a predefined set of services.

With CLI:
```bash
quickfra up --cloud oci --services coolify,mail,status
```

Using the Web UI:
((TODO: Add instructions for deploying via the web UI))

# Architecture Overview
Quickfra uses a microservices architecture with the following components:
- **Next.js UI**: Provides a user-friendly interface for managing deployments.
- **NestJS API**: Handles backend logic and communicates with the orchestrator.
- **Orchestrator**: Uses Crossplane to manage resources across different cloud providers.
- **Coolify**: Manages application deployments.
- **Stalwart Mail**: Provides email services with a web admin interface.
- **Uptime Kuma**: Monitors service status and provides a status page.
- **NATS Streaming**: Facilitates communication between services.
- **Helm & Kustomize**: Used for deploying and managing Kubernetes resources.
- **Terraform**: Manages cloud infrastructure across providers like AWS and OCI.
- **Nx Monorepo**: Organizes the codebase into apps, packages, charts, and infrastructure modules.
- **GitOps Workflow**: Uses a GitOps approach for managing deployments, ensuring that all changes are versioned and auditable.
- **Documentation**: Includes ADRs, runbooks, and threat models to ensure maintainability and security.
- **CLI**: Built with oclif in TypeScript, providing a powerful command-line interface for managing deployments.
- **Crossplane**: Abstracts cloud providers and allows for resource composition using Custom Resource Definitions (CRDs).

# Support
If you need help or have questions, please open an issue on the repository and also check out our website at [quickfra.io](https://quickfra.io).

# License
Quickfra is licensed under the Apache License 2.0.

- **Source Availability:** Quickfra is open source and available on GitHub.
- **Extensible:** The architecture allows for easy addition of new services and cloud providers.
- **Community Driven:** Contributions are welcome, and the project encourages community involvement.
- **Permissive License:** Allowed for commercial use, modification, and distribution.
- **Patent grant:** Protecting users from patent claims related to the software.

# Contributing
We welcome contributions to Quickfra! Please read our [contributing guidelines](CONTRIBUTING.md) for more information on how to get involved.