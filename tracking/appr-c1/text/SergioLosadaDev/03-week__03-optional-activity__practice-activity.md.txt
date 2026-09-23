# TeamMatch — Functional & Non-Functional Requirements

## A. Statement

### 1. Functional Requirements

The following requirements describe what the TeamMatch application **must do**. Each requirement is written to be clear and verifiable.

| ID        | Functional Requirement                                                                                                                                          | Verification                                                                                                                   |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **FR-01** | The system shall allow a student to create and edit a profile containing their academic program, academic level, skills, interests, and availability.           | Verify that a student can create a profile with all required fields and successfully save and edit the information.            |
| **FR-02** | The system shall allow a student to create a project by entering a title, description, required skills, number of teammates needed, and preferred availability. | Verify that a project is created and its information is displayed correctly after submission.                                  |
| **FR-03** | The system shall recommend potential teammates based on their skills, interests, academic background, availability, and the requirements of the project.        | Verify that the recommendation list contains students whose profiles match at least one of the project's defined requirements. |
| **FR-04** | The system shall allow a student to send a team request to a project and allow the project creator to accept or reject the request.                             | Verify that a request can be sent and that the project creator can change its status to accepted or rejected.                  |

---

### 2. Non-Functional Requirements

The following requirements describe **how the application should perform** rather than specific functions.

| ID                       | Non-Functional Requirement                                                                                                                                       | Verification                                                                                                                  |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **NFR-01 — Performance** | The system shall display the student's teammate recommendations within **3 seconds** after the matching request is submitted, under normal operating conditions. | Measure the response time of at least 10 consecutive matching requests and verify that each response is ≤ 3 seconds.          |
| **NFR-02 — Usability**   | The application shall allow a new student to create a complete profile in **5 minutes or less** without external assistance.                                     | Conduct a usability test with at least 5 students and verify that each participant can complete the profile within 5 minutes. |

---

# 3. Use Case — Find Compatible Teammates

## Use Case Information

| Field             | Description                                                                     |
| ----------------- | ------------------------------------------------------------------------------- |
| **Use Case ID**   | UC-01                                                                           |
| **Name**          | Find Compatible Teammates                                                       |
| **Primary Actor** | Student                                                                         |
| **Goal**          | Find students whose profiles are compatible with the requirements of a project. |
| **Priority**      | High                                                                            |

### Actor

**Student:** A university student who wants to find potential teammates for an academic project.

### Preconditions

Before starting the use case:

1. The student must be registered and logged into TeamMatch.
2. The student must have a completed profile.
3. The student must have created or selected a project.
4. The selected project must contain at least one requirement, such as a required skill or availability.

---

## Main Flow

| Step  | Actor                                      | System                                                                                                                              |
| ----- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| **1** | The student selects a project.             | The system displays the project's information and requirements.                                                                     |
| **2** | The student selects **"Find Teammates"**.  | The system retrieves students who are available for team formation.                                                                 |
| **3** | —                                          | The system compares student profiles with the project's requirements.                                                               |
| **4** | —                                          | The system calculates a compatibility result for each potential teammate.                                                           |
| **5** | —                                          | The system displays a list of recommended students ordered by compatibility.                                                        |
| **6** | The student selects a recommended student. | The system displays the student's relevant profile information, including skills, interests, academic background, and availability. |
| **7** | The student reviews the recommendation.    | The system allows the student to send a team request.                                                                               |

### Expected Result

The student receives a list of potential teammates ranked according to their compatibility with the selected project.

---

## Alternative Flow — No Compatible Students Found

**A1. No students match the project requirements**

1. The student selects **"Find Teammates"**.
2. The system searches for students matching the project requirements.
3. The system determines that there are no compatible students.
4. The system displays a message informing the student that no suitable matches were found.
5. The system suggests modifying the project requirements or trying again later.
6. The use case ends.

**Expected Result:**
The student is informed that no matches are currently available and can modify the search criteria.

---

# Optional — Use Case Diagram

```text
                         ┌─────────────────────────┐
                         │       TeamMatch         │
                         │                         │
                         │  ┌───────────────────┐  │
                         │  │ Create Profile    │  │
                         │  └───────────────────┘  │
                         │            ▲            │
                         │            │            │
                         │  ┌───────────────────┐  │
                         │  │ Create Project    │  │
                         │  └───────────────────┘  │
                         │            ▲            │
                         │            │            │
                         │  ┌───────────────────┐  │
Student ─────────────────┼─►│ Find Compatible   │  │
                         │  │ Teammates         │  │
                         │  └───────────────────┘  │
                         │            │            │
                         │            ▼            │
                         │  ┌───────────────────┐  │
                         │  │ Send Team Request │  │
                         │  └───────────────────┘  │
                         │                         │
                         └─────────────────────────┘
```

> **Note:** For the assignment, **UC-01 — Find Compatible Teammates** is the main use case because it represents the core value proposition of TeamMatch: helping students find suitable teammates based on project requirements and student profiles.
