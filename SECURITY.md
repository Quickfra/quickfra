# Security Policy

## Supported Versions
| Version | Supported |
|---------|-----------|
| `main`  | ✅ Always |
| `>= 1.x`| ✅        |
| `< 1.0` | ❌ End‑of‑life |

We support the **current `main` branch** and the latest minor releases. End‑of‑life versions receive no security patches.

## Reporting a Vulnerability
1. **DO NOT create a public GitHub issue** for critical or high‑impact vulnerabilities.
2. Email **security@quickfra.com** with:
   - A descriptive title
   - Steps to reproduce / PoC
   - Impact assessment (CVSS if possible)
   - Suggested remediation, if any
3. Expect an acknowledgment within **24 h** and a detailed response within **72 h**.
4. We coordinate disclosure; you’ll be credited unless you request otherwise.

## Disclosure Process
| Stage | Timeline |
|-------|----------|
| Acknowledgment | < 24 h |
| Triage & reproduce | < 72 h |
| Fix development | 1–7 days (high severity) |
| Private patch release | As soon as fix validated |
| Public advisory & CVE | Within 48 h of release |

## Security Hardening
- CodeQL & secret‑scanning on every PR.
- Dependabot security updates auto‑merged after CI.
- SBOM published with each release tag.