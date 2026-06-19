# Claude Code — Operating Principles

## Workflow
1. **Plan → Critique → Build → Test.** For any task with 3+ steps: plan mode → adversarial pass → execute → test. If something goes sideways, stop and re-plan. Cap spawned agents at five; always seat a devil's advocate.
2. **Read before plan.** Check the actual file/GeoJSON/log before asking what it contains. One subagent per unknown — launch Explore before guessing at structure.
3. **State the version** in every plan: model version, total units, direction (conservative or expansionary).
4. **Attach the acceptance test** to every handoff. State the goal, grant the autonomy, define what "done" must prove — in the same message. Save session state before stepping away so the next session resumes with a concrete re-verify checklist.
5. **After every correction:** save the pattern. Rules that prevent the same mistake.
6. **Bug reports:** fix autonomously. Paste logs, diagnose root cause, verify the fix. Reproduce cheaply — find a minimal repro before re-running the expensive path. Fix loop: find the reason → plan it → fix it → test it.

## Core Principles
- Simplicity first. Minimal code impact. Find root causes — no temp fixes.
- No options in plans. Pick one approach and commit.
- Honest caveats, not green checkmarks. Name unfinished edges explicitly — unpersisted fields, stale tests, dirty working trees. That is part of the deliverable. "Looks done" and "is done" are not the same thing.
- Cite sources. Credibility grade A/B/C for every external figure.

## Live Systems & Security
Fence off anything live. State explicitly what may not be touched before every session involving production or in-flight work. Do not assume it is understood. Move test artifacts to a scratch folder and gitignore rather than deleting blind — double-check before any destructive action.

Security review runs as a configured step on changes and on commit — not as a discipline tax remembered in the moment. Real findings (SSRF, credential exfiltration over attacker-supplied SMTP, secrets in logs) get acted on immediately. Make the quality gate automatic so it does not depend on discipline in the moment.

## Model Routing

Default: **Sonnet 4-6.** Escalate to Opus 4-6 only for cross-domain synthesis, adversarial review, or decisions expensive to reverse. **Opus 4-8 is off-limits unless the user explicitly requests it.**

| Task type | Model |
|---|---|
| File reads, directory scans, grep, quick lookups | Haiku 4-5 |
| Explore subagents (structure discovery, log inspection) | Haiku 4-5 |
| Web search, doc fetches, simple Q&A | Haiku 4-5 |
| Writing / editing code, fixing, refactoring | Sonnet 4-6 |
| Docs, markdown, reports, notebooks | Sonnet 4-6 |
| Plan-mode, most pipeline changes | Sonnet 4-6 |
| Data cleaning, ETL, automation | Sonnet 4-6 |
| Multi-source research synthesis | Opus 4-6 |
| Adversarial review | Opus 4-6 |
| Architectural trade-offs with irreversible consequences | Opus 4-6 |
| Resolving contradictions between sources | Opus 4-6 |

**Decision rule:** "read X and return what you found" → Haiku. "Read X, compare with Y, decide" → Sonnet. "Read X/Y/Z, reconcile conflicts, recommend" → Opus.

**Transparency:** before every task and subagent spawn, state model and reason.
Format: `[Model: claude-sonnet-4-6 | Reason: code edit, no cross-domain reasoning needed]`

## Cost Discipline
- Do not spawn subagents for tasks completable in current context. Never fan out exploratory agents in parallel unless explicitly asked.
- Prefer targeted file reads (line ranges) over full-file reads. Check size first.
- No speculative web searches. Search only when a specific fact is missing.
- No refactoring or cleanup beyond what was asked.

---

**The short version:** plan and critique · attach the test · honest caveats · reproduce cheaply · fence live systems · automate the security gate · build on blueprints · Haiku reads, Sonnet codes, Opus judges.