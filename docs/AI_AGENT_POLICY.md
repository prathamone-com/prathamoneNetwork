# PrathamOne: AI Agent Framework & Governance Policy

This document defines the roles, responsibilities, and operational constraints for the autonomous AI agents and data handling within the PrathamOne Sovereign Network.

---

## 1. Core AI Agent Directory

| Agent | Functional Domain | Role |
| :--- | :--- | :--- |
| **Lecture Composer** | Content Generation | Assembles lecture scripts, slide structures, and student handouts in a unified generation pipeline. |
| **Assessment Agent** | Evaluation | Dynamically creates graded exams and automated quizzes based on curriculum mastery levels. |
| **Report Agent** | Analytics | Generates periodic (weekly/monthly) student performance PDFs for parents and institutes. |
| **Recommendation Agent** | Pedagogy | Recommends the next optimal learning module based on a student's historical performance and weaknesses. |
| **Plagiarism Agent** | Integrity | Validates student submissions against known content pools and peer data. |
| **Certificate Agent** | Governance | Generates cryptographically signed PDF certificates upon curriculum completion (Class 10-12). |

---

## 2. Governance Policies

### 2.1 Lecturer Override Policy
- **Primary Control**: Lecturers have final authority over AI-generated content.
- **Auditing**: All lecturer edits are logged, versioned, and attributed back to the author.
- **Feedback Loop**: Edits are analyzed periodically to improve the base generation models.

### 2.2 Parent Data Visibility Policy
- **Transparency**: Parents have real-time access to child attendance, progress percentage, and streak data.
- **Privacy**: Peer-level leaderboard data is "opt-in" only. Private correspondence between student and AI tutor is anonymized before parent review.

### 2.3 Institute Data Isolation (Multi-Tenancy)
- **Zero Leakage**: No institute data (student profiles, lecture plans, custom branding) can be accessed by other tenants.
- **RLS Enforcement**: Every database query MUST be filtered by a validated `institute_id` claim in the application context.

### 2.4 AI Exam Integrity
- **Persistence**: Generated exam questions for a specific student cohort must not repeat within a rolling 90-day window.
- **Randomization**: Logic-based variations (number changes in Math/Physics) are required for all test items.

### 2.5 DPDP Act & Minor Compliance
- **Consent**: Explicit parental consent is required for students under 18 years of age.
- **Right to Erasure**: Students/Parents can request full deletion of profile data, which must be executed across both Cloud (Supabase) and Local (SQLite) storage within 72 hours.

### 2.6 Communication Policy (WhatsApp/SMS)
- **Non-Intrusive**: Alerts for attendance or progress are opt-in only.
- **No Personal Contact**: Direct communication between lecturers and parents occurs within the platform via masked messaging to protect the privacy of all stakeholders.

---

## 3. Tech Stack Governance

- **Edge Deployment**: AI calls should be handled via Vercel Edge Functions or Supabase Edge Functions to ensure low latency.
- **Data Locality**: Regional Indian data residency is preferred for compliance with evolving Bharat data laws.
- **Offline Integrity**: Local SQLite snapshots must be encrypted and synced with the Sovereign Cloud regularly.

---

> [!IMPORTANT]
> This policy is a living document and must be reviewed by the **AI Systems Architect** (Jawahar R Mallah) periodically to ensure alignment with the AITDL Network standards.
