# TeamMatch — User Stories & Prioritized Backlog

## 1. User Stories

### US01 — Create Student Profile

**As a student**, I want to create and complete my academic profile to showcase my skills, interests and availability, and thus make it easier to find compatible study partners.

**Acceptance Criteria:**

- [ ] The student can enter their academic program, academic level, skills, interests, and availability.
- [ ] The student can save and edit their profile information.

---

### US02 — Create a Project

**As a student**, I want to set up a project, outlining its requirements, in order to find fellow students with the necessary skills to carry it out.

**Acceptance Criteria:**

- [ ] The student can enter the project title, description, required skills, number of teammates, and preferred availability.
- [ ] The project is saved and can be viewed by other students.

---

### US03 — Find Compatible Teammates

**As a student**, I’d like to receive recommendations for suitable peers so that I can find students who meet the requirements of my project.

**Acceptance Criteria:**

- [ ] The app recommends students based on skills, interests, academic background, availability, and project requirements.
- [ ] Each recommendation displays relevant information about the student's profile.

---

### US04 — Discover Projects

**As a student**, I want to explore the projects on offer to find opportunities that match my skills and interests.

**Acceptance Criteria:**

- [ ] The student can view a list of available projects.
- [ ] Each project displays its title, description, required skills, and number of teammates needed.

---

### US05 — Send Team Request

**As a student**, I would like to apply to join a project so that I can be part of a team that matches my skills and interests.

**Acceptance Criteria:**

- [ ] The student can send a team request to an available project.
- [ ] The student can see the status of their request.

---

### US06 — Manage Team Requests

**As the project creator**, I want to accept or reject team requests in order to select the students who will be part of my project team.

**Acceptance Criteria:**

- [ ] The project creator can view incoming team requests.
- [ ] The project creator can accept or reject each request.

---

# 2. Prioritized Backlog

| Priority           | ID   | User Story                | Type           |
| ------------------ | ---- | ------------------------- | -------------- |
| 🔴 **Must Have**   | US01 | Create Student Profile    | Imprescindible |
| 🔴 **Must Have**   | US02 | Create a Project          | Imprescindible |
| 🔴 **Must Have**   | US03 | Find Compatible Teammates | Imprescindible |
| 🔴 **Must Have**   | US05 | Send Team Request         | Imprescindible |
| 🟡 **Should Have** | US04 | Discover Projects         | Deseable       |
| 🟡 **Should Have** | US06 | Manage Team Requests      | Deseable       |

---

# 3. Sprint Planning

## Sprint 1 — Profiles & Projects

**Goal:** Establish the basic information required for TeamMatch to work.

| ID       | User Story             | Priority          |
| -------- | ---------------------- | ----------------- |
| **US01** | Create Student Profile | 🔴 Imprescindible |
| **US02** | Create a Project       | 🔴 Imprescindible |

### Sprint Outcome

At the end of Sprint 1, students can create their profiles and publish projects with their requirements.

---

## Sprint 2 — Matching & Discovery

**Goal:** Allow students to discover compatible teammates and projects.

| ID       | User Story                | Priority          |
| -------- | ------------------------- | ----------------- |
| **US03** | Find Compatible Teammates | 🔴 Imprescindible |
| **US04** | Discover Projects         | 🟡 Deseable       |

### Sprint Outcome

At the end of Sprint 2, students can receive teammate recommendations and explore available projects.

---

## Sprint 3 — Team Formation

**Goal:** Enable students to interact with projects and complete the team formation process.

| ID       | User Story           | Priority          |
| -------- | -------------------- | ----------------- |
| **US05** | Send Team Request    | 🔴 Imprescindible |
| **US06** | Manage Team Requests | 🟡 Deseable       |

### Sprint Outcome

At the end of Sprint 3, students can send team requests, while project creators can review and manage those requests.

---

# Backlog Overview

```text
                    TEAMMATCH MVP
                         │
          ┌──────────────┴──────────────┐
          │                             │
    🔴 IMPRESCINDIBLE              🟡 DESEABLE
          │                             │
    ┌─────┼─────┬─────┐          ┌─────┴─────┐
    │     │     │     │          │           │
   US01  US02  US03  US05       US04        US06
    │     │     │     │          │           │
 Profile Project Match Request  Projects   Requests
    │     │     │     │          │           │
    └─────┴─────┴─────┴──────────┴───────────┘
                         │
                 3 SPRINTS
```

### Sprint Summary

| Sprint       | Focus                | Stories    |
| ------------ | -------------------- | ---------- |
| **Sprint 1** | Profiles & Projects  | US01, US02 |
| **Sprint 2** | Matching & Discovery | US03, US04 |
| **Sprint 3** | Team Formation       | US05, US06 |
