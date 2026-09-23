# TeamMatch — Data Model, Wireframes & Navigation

## 1. Data Model

For the TeamMatch MVP, the system can be modeled using **4 main entities**: `Student`, `Project`, `Skill`, and `TeamRequest`.

### Entities and Attributes

#### Student

| Attribute          | Type     | Description               |
| ------------------ | -------- | ------------------------- |
| `student_id`       | UUID     | Unique identifier         |
| `name`             | String   | Student's full name       |
| `email`            | String   | University email          |
| `academic_program` | String   | Student's degree or major |
| `academic_level`   | Integer  | Current academic level    |
| `bio`              | String   | Short student description |
| `availability`     | String   | Available days/times      |
| `created_at`       | DateTime | Profile creation date     |

---

#### Project

| Attribute          | Type     | Description                     |
| ------------------ | -------- | ------------------------------- |
| `project_id`       | UUID     | Unique identifier               |
| `creator_id`       | UUID     | Student who created the project |
| `title`            | String   | Project title                   |
| `description`      | String   | Project description             |
| `required_members` | Integer  | Number of teammates needed      |
| `availability`     | String   | Preferred project schedule      |
| `status`           | String   | Open / Closed                   |
| `created_at`       | DateTime | Project creation date           |

---

#### Skill

| Attribute  | Type   | Description       |
| ---------- | ------ | ----------------- |
| `skill_id` | UUID   | Unique identifier |
| `name`     | String | Skill name        |
| `category` | String | Skill category    |

Examples: `React`, `Python`, `UI/UX Design`, `Database`, `Project Management`.

---

#### TeamRequest

| Attribute    | Type     | Description                   |
| ------------ | -------- | ----------------------------- |
| `request_id` | UUID     | Unique identifier             |
| `project_id` | UUID     | Target project                |
| `student_id` | UUID     | Student sending the request   |
| `status`     | String   | Pending / Accepted / Rejected |
| `created_at` | DateTime | Request creation date         |

---

## Relationships

### Student → Project

**1-to-N**

One student can create multiple projects, while each project has only one creator.

```text
Student (1) ──────────── (N) Project
```

### Project → TeamRequest

**1-to-N**

A project can receive multiple team requests, while each request belongs to one project.

```text
Project (1) ──────────── (N) TeamRequest
```

### Student → TeamRequest

**1-to-N**

A student can send multiple team requests, while each request belongs to one student.

```text
Student (1) ──────────── (N) TeamRequest
```

### Student ↔ Skill

**N-to-N**

A student can have multiple skills, and a skill can belong to multiple students.

```text
Student (N) ──────────── (N) Skill
```

This relationship would normally require an intermediate entity such as:

`StudentSkill(student_id, skill_id)`

---

### Complete Data Model

```text
                         ┌───────────────┐
                         │    Student    │
                         ├───────────────┤
                         │ student_id PK │
                         │ name          │
                         │ email         │
                         │ program       │
                         │ level         │
                         │ bio           │
                         │ availability  │
                         └───────┬───────┘
                                 │
                         1       │       N
                                 │
                    ┌────────────▼────────────┐
                    │        Project          │
                    ├─────────────────────────┤
                    │ project_id PK           │
                    │ creator_id FK           │
                    │ title                   │
                    │ description             │
                    │ required_members        │
                    │ availability            │
                    │ status                  │
                    └────────────┬────────────┘
                                 │
                         1       │       N
                                 │
                    ┌────────────▼────────────┐
                    │      TeamRequest        │
                    ├─────────────────────────┤
                    │ request_id PK           │
                    │ project_id FK           │
                    │ student_id FK           │
                    │ status                  │
                    │ created_at              │
                    └─────────────────────────┘


        ┌───────────────┐              ┌────────────────┐
        │    Student    │              │     Skill      │
        └───────┬───────┘              └───────┬────────┘
                │                              │
                │              N : N           │
                └──────────────────────────────┘
                         StudentSkill
```

---

# 2. Low-Fidelity Wireframes

The following wireframes represent **three key screens** for the TeamMatch MVP.

---

## Wireframe 1 — Student Profile

```text
┌─────────────────────────────────┐
│          ←  My Profile          │
├─────────────────────────────────┤
│                                 │
│             [  👤  ]            │
│                                 │
│          John Smith             │
│       Computer Science          │
│                                 │
├─────────────────────────────────┤
│ Academic Level                  │
│ [ 6th Semester              ]   │
│                                 │
│ Skills                          │
│ [ React ] [ Python ] [ SQL ]    │
│ [+ Add Skill]                   │
│                                 │
│ Interests                       │
│ [ AI ] [ Web Development ]      │
│ [+ Add Interest]                │
│                                 │
│ Availability                    │
│ [ Mon - Fri | 2PM - 6PM     ]   │
│                                 │
│ Bio                             │
│ [ Interested in software... ]   │
│                                 │
│       [ Save Profile ]          │
│                                 │
└─────────────────────────────────┘
```

**Purpose:** Allow students to create and maintain the information used by the matching system.

---

## Wireframe 2 — Project & Teammate Matching

```text
┌─────────────────────────────────┐
│          ←  My Project          │
├─────────────────────────────────┤
│                                 │
│  Smart Campus App               │
│  ─────────────────────────      │
│                                 │
│  Build a mobile application     │
│  for university students.       │
│                                 │
│  Required Skills:               │
│  [ React ] [ UI/UX ] [ SQL ]    │
│                                 │
│  Members Needed: 3              │
│  Availability: Mon-Fri          │
│                                 │
├─────────────────────────────────┤
│                                 │
│       Compatible Teammates      │
│                                 │
│  ┌───────────────────────────┐  │
│  │ 👤 Maria Garcia           │  │
│  │ Computer Science          │  │
│  │ React • UI/UX • SQL       │  │
│  │ Availability: Mon-Fri     │  │
│  │                           │  │
│  │       [ View Profile ]    │  │
│  │       [ Send Request ]    │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │ 👤 Carlos Lopez           │  │
│  │ Software Engineering      │  │
│  │ React • Python            │  │
│  │                           │  │
│  │       [ View Profile ]    │  │
│  │       [ Send Request ]    │  │
│  └───────────────────────────┘  │
│                                 │
└─────────────────────────────────┘
```

**Purpose:** Display the project requirements and recommended teammates based on compatibility.

---

## Wireframe 3 — Team Requests

```text
┌─────────────────────────────────┐
│          ← Team Requests        │
├─────────────────────────────────┤
│                                 │
│  Smart Campus App               │
│                                 │
│  Incoming Requests              │
│  ─────────────────────────      │
│                                 │
│  ┌───────────────────────────┐  │
│  │ 👤 Maria Garcia           │  │
│  │                           │  │
│  │ React • UI/UX • SQL       │  │
│  │ Computer Science          │  │
│  │                           │  │
│  │ [ Accept ]  [ Reject ]    │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │ 👤 Carlos Lopez           │  │
│  │                           │  │
│  │ React • Python            │  │
│  │ Software Engineering      │  │
│  │                           │  │
│  │ [ Accept ]  [ Reject ]    │  │
│  └───────────────────────────┘  │
│                                 │
├─────────────────────────────────┤
│  🏠 Home   🔎 Search   👤 Profile│
└─────────────────────────────────┘
```

**Purpose:** Allow project creators to review and manage students who want to join their project.

---

# 3. Navigation Map

The main navigation flow for the MVP can be represented as follows:

```text
                         ┌──────────────┐
                         │    Login     │
                         └──────┬───────┘
                                │
                                ▼
                     ┌────────────────────┐
                     │       Home         │
                     └───────┬─────┬──────┘
                             │     │
              ┌──────────────┘     └──────────────┐
              ▼                                   ▼
     ┌─────────────────┐                 ┌─────────────────┐
     │  My Projects    │                 │  Find Projects  │
     └────────┬────────┘                 └────────┬────────┘
              │                                   │
              ▼                                   ▼
     ┌─────────────────┐                 ┌─────────────────┐
     │ Project Details │                 │ Project Details │
     └────────┬────────┘                 └────────┬────────┘
              │                                   │
              ▼                                   ▼
     ┌─────────────────┐                 ┌─────────────────┐
     │ Find Teammates  │                 │ Send Request    │
     └────────┬────────┘                 └─────────────────┘
              │
              ▼
     ┌─────────────────┐
     │ Student Profile │
     └─────────────────┘


              Home
                │
                ▼
       ┌─────────────────┐
       │ Team Requests   │
       └────────┬────────┘
                │
          ┌─────┴─────┐
          ▼           ▼
      [ Accept ]   [ Reject ]


              Home
                │
                ▼
       ┌─────────────────┐
       │  My Profile     │
       └────────┬────────┘
                │
                ▼
       ┌─────────────────┐
       │ Edit Profile    │
       └─────────────────┘
```

### Main Navigation Structure

```text
Login
  │
  ▼
Home
  ├── My Projects
  │     ├── Project Details
  │     ├── Find Teammates
  │     └── Team Requests
  │
  ├── Find Projects
  │     └── Project Details
  │           └── Send Request
  │
  └── My Profile
        └── Edit Profile
```

---

# 4. Local vs. Remote Data

For TeamMatch, the majority of the application's important data should be stored **remotely**, because the app depends on connecting multiple students and sharing information between them.

## Remote Data

The following data should be stored in the backend/database:

| Data                 | Storage    | Reason                                               |
| -------------------- | ---------- | ---------------------------------------------------- |
| Student profiles     | **Remote** | Other students need access to profiles for matching. |
| Skills               | **Remote** | Skills are required by the matching system.          |
| Projects             | **Remote** | Projects must be visible to other students.          |
| Team requests        | **Remote** | Requests must be synchronized between students.      |
| Matching information | **Remote** | Matching requires data from multiple students.       |
| Authentication data  | **Remote** | User accounts must be securely managed.              |

## Local Data

The application can store a small amount of temporary or convenience data locally:

| Data                         | Storage   | Reason                                                              |
| ---------------------------- | --------- | ------------------------------------------------------------------- |
| Authentication/session token | **Local** | Allows the student to remain logged in.                             |
| User preferences             | **Local** | Improves the user's experience.                                     |
| Recently viewed projects     | **Local** | Provides faster access to recently visited content.                 |
| Temporary form data          | **Local** | Prevents loss of information if the user temporarily leaves a form. |

### Architecture Decision

> **TeamMatch should use a remote-first data architecture.** Core application data such as student profiles, projects, skills, and team requests must be stored remotely because TeamMatch depends on real-time interaction between multiple students.

Local storage should be used mainly for **session management, temporary data, and performance improvements**, rather than as the primary source of truth.

This approach also fits well with the previously selected **Ionic React** architecture, where the mobile application communicates with a backend API to retrieve and modify the remote data.
