![](https://github.com/Quickfra/quickfra/raw/main/assets/banner.png)
# Quickfra - Raw Journey to MVP

This branch is not a tutorial. It’s a log of technical obstacles and how they got resolved.

| Step | Description | Evidence |
|------|-------------|----------|
| 1. **Study** | Pck a brand‑new tool/tech (e.g., Terraform, OCI, AWS, GCP, Cloudflare API). | Dedicated folder `learning/technology` |
| 2. **Experiment** | Break things in a throw‑away sandbox until it finally works. | Atomic commits (`feat`, `fix`, `docs`) |
| 3. **Record** | 30‑second, no‑edit video clip: problem → solution → commit hash. | Playable video in README.md |

---


https://github.com/user-attachments/assets/890a4c2f-1a3b-40ed-b57d-3c157e3e7fd3

*Intro: (65s) Purpose & Workflow*

## Roadmap (MVP‑first, polish later)

- [x] Day 0 – Spin up first VM with Terraform (Oracle Cloud).
  - [Click to see the result](https://bsky.app/profile/justdiego.com/post/3lsy3navxoc2l)

- [x] Day 1 – Installation of Coolify inside the VM.
  - [Click to see the result](https://bsky.app/profile/justdiego.com/post/3lsyszlway22a)
  
- [ ] Day 2 – 🚧 *In progress* | Automate Coolify account registration based on user credentials.

- [ ] Day 3 – Deploy & validate mail add-on container (send/receive working).

- [ ] Day 4 – Wildcard DNS + Cloudflare Tunnel autoconfig.

- [ ] Day 5 – Replicate flow on AWS & GCP.

- [ ] Day 6 – CI pipeline (GitHub Actions) runs terraform apply, triggers tests.

- [ ] Day 7 – ≥ 80 % test coverage (unit + basic e2e).

- [ ] Day 8 – Merge first stable slice into `main` and deploy demo.

#### Notes
- Roadmap is updated as features shift or blockers appear.  
- Major changes, pivots, or cancellations will be logged here.
- Want to suggest/track progress? Open an [issue](https://github.com/Quickfra/quickfra/issues).

### If you’re a recruiter/CTO:
Scroll the commit history, watch two clips, skim the daily log. Check the whole raw process.

– Diego Rodríguez