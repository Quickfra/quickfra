# Contributing to Quickfra

Thanks for joining the Quickfra community! We appreciate your time and expertise. Below is a streamlined guide to get you started.

---

## 📂 Repository Layout

```bash
quickfra/
├─ apps/
│  ├─ ui/                # Next.js 15 + Tailwind + shadcn/ui
│  ├─ api/               # NestJS + GraphQL
│  └─ dashboard/         # Admin console (Crossplane, Grafana…)
│
├─ packages/
│  ├─ cli/               # “quickfra” command-line tool
│  ├─ sdk/               # TypeScript/JS client for the API
│  ├─ infra-utils/       # Terraform helpers & OCI wrappers
│  └─ ui-components/     # Shared React components
│
├─ infra/
│  ├─ modules/           # Terraform modules (oci-vm, aws-vpc, common)
│  ├─ compositions/      # Crossplane CustomResources
│  └─ environments/      # Dev / Staging / Prod settings
│
├─ charts/                # Helm charts & Kustomize
├─ scripts/               # Utility scripts (bootstrap, deploy-all)
├─ .github/               # CI workflows & issue/PR templates
├─ docs/                  # ADRs, runbooks, whitepapers
├─ LICENSE                # Apache 2.0
└─ README.md
```

---

## 🛠️ Getting Set Up

1. **Clone & install**

   ```bash
   git clone git@github.com:YOUR_ORG/quickfra.git
   cd quickfra
   pnpm install
   ```
2. **Environment**
   Copy and fill in credentials:

   ```bash
   cp infra/environments/dev/terraform.tfvars.example infra/environments/dev/terraform.tfvars
   ```
3. **Start local services**

   * UI: `pnpm --filter=ui dev`
   * API: `pnpm --filter=api dev`
   * CLI: `pnpm --filter=cli dev`
   * Terraform (dev):

     ```bash
     cd infra/environments/dev
     terraform init && terraform apply
     ```

---

## 🔀 Branching & Workflow

* **main** always deployable, passing CI.
  * feature/***name*** work on new functionality.
  * release/***x.y.z*** pre-release stabilization.
  * hotfix/***issue*** urgent fixes against main.

Open a Pull Request from your feature branch into main once your changes are tested and documented.

---

## ✅ Pull Request Checklist

1. **Scope**

   * One feature or fix per PR.
2. **Title & Description**

   * Prefix: `feat:`, `fix:`, `chore:`.
   * Include “what” and “why”.
3. **Tests**

   * Add or update unit tests.
   * Ensure existing tests pass.
4. **Documentation**

   * Update `README.md` or add new docs under `docs/`.
5. **CI**

   * PR must pass lint, formatting, build, and tests.

---

## ⚙️ Testing

* **Unit tests**: `pnpm test` or `pnpm --filter=<pkg> test`
* **Coverage**: run with `COVERAGE=true pnpm test`
* **E2E**:

  * UI: `pnpm --filter=ui test:e2e`
  * API: `pnpm --filter=api test:e2e`

---

## 🚀 Releasing

1. Bump version: `pnpm version patch|minor|major`
2. Update `CHANGELOG.md`.
3. Open `release/vX.Y.Z` branch and PR.
4. On merge, GitHub Actions publishes packages and tags the release.

---

## 📝 Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md). Respect, clarity, and kindness are expected in all interactions.

---

## 🤝 Contributor License Agreement

All contributors must sign the [CLA](CONTRIBUTOR_LICENSE_AGREEMENT.md) before a PR can be merged. A bot will guide you through this when you open your first PR.

---

Thanks again for your interest in Quickfra, your contributions move the project forward! If you have questions, drop us a line on the issue tracker or join the discussion in Slack.
