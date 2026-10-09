# Security Policy

## Reporting a vulnerability

Please **do not** open a public issue for security vulnerabilities.

Instead, report it privately using GitHub's
[Security Advisories](../../security/advisories/new) for this repository, or by
contacting the maintainer directly.

Please include:

- a description of the issue and its impact,
- steps to reproduce,
- any relevant logs, requests, or proof-of-concept.

You can expect an acknowledgement within a few days. Please give us reasonable
time to release a fix before any public disclosure.

## Scope

The API endpoints under `app/api/` and the database access layer in `lib/` are
the most security-sensitive parts of this project. Authentication is not part of
the current codebase.
