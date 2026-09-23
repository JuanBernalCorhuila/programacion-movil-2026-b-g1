# 🎓 TeamMatch

> _Intelligent Team Formation for University Students_

---

## 💡 App Idea

**TeamMatch** is a mobile university application designed to intelligently connect students who need to form teams for academic projects, assignments, competitions, hackathons, research, and other collaborative activities.

The application matches students based on relevant criteria such as:

- 🎯 **Skills**
- 💬 **Interests**
- 📚 **Academic background**
- ⏰ **Availability**

This helps them find teammates who are compatible with their project requirements.

> **The core idea:** Make the process of forming university teams **faster, easier, and more effective**, instead of relying only on friends, classmates, or random team assignments.

---

## 🎯 Problem TeamMatch Solves

**The Challenge:** University students often struggle to find suitable teammates for academic projects. A student may have a specific project idea or assignment but not know other students who have the skills, interests, academic background, or availability needed to successfully complete it.

### ❌ Common Pain Points

- ⏱️ Spending significant time searching for teammates
- 🔍 Difficulty finding students with complementary skills
- ⚖️ Creating unbalanced teams
- 📅 Working with teammates whose schedules are incompatible
- 🚫 Missing opportunities to collaborate outside one's immediate social circle

### ✅ TeamMatch Solution

**TeamMatch solves this by providing a centralized platform where students can:**

- Create profiles showcasing their skills and interests
- Publish projects with specific requirements
- Discover compatible teammates based on their characteristics and project needs

#### The Transformation

| Before                                                | After                                                                           |
| ----------------------------------------------------- | ------------------------------------------------------------------------------- |
| **"I need a teammate, but I don't know who to ask."** | **"I have a project, and TeamMatch can help me find the right people for it."** |

---

## 🚀 Main Value Proposition

> ✨ **TeamMatch helps university students build better project teams by intelligently connecting them with compatible peers based on their skills, interests, academic background, and availability.**

---

## 🧑🏻‍💻 Who Is the App Designed For?

**Target Users:** University students who need to form teams for:

| Type             | Examples                                         |
| ---------------- | ------------------------------------------------ |
| 🎓 Academic      | Projects, assignments                            |
| 🏆 Competitive   | Competitions, hackathons                         |
| 🔬 Research      | Research or extracurricular projects             |
| 🤝 Collaborative | Student initiatives and collaborative activities |

**Primary User Profile:** A student who needs to find one or more teammates with specific skills, interests, or availability to successfully complete a project.

---

## ⚠️ Essential MVP Features

### 1️⃣ Student Profile

**What students can do:**

- 👤 Set their academic program or major
- 🛠️ Add skills and expertise areas
- 💭 Share interests and passions
- 📊 Indicate academic level
- ⏰ Define availability
- 📝 Write a short personal/project description

> This profile information serves as the foundation for finding compatible teammates and being discovered by others.

---

### 2️⃣ Smart Teammate Matching

**Intelligent recommendation system** that connects compatible students.

**Matching considers:**

- 🎯 Relevant skills alignment
- 💫 Shared interests
- 🏫 Academic background compatibility
- ⏰ Availability overlap
- 📋 Project requirements fit

> **MVP Approach:** For the MVP, the matching algorithm will be relatively simple and rule-based rather than relying on complex AI.

---

### 3️⃣ Project Creation & Team Requests

**Project creators can specify:**

- 📌 Project title and detailed description
- 🔧 Required skills for team members
- 👥 Number of teammates needed
- ⏱️ Preferred availability
- 📝 Other relevant requirements

**Other students can:**

- Discover projects that match their profiles
- Send or receive team requests
- Connect with project creators
- Form teams collaboratively

---

Other students can discover projects that match their profiles and **send or receive team requests**, allowing them to connect and form a team.

---

# 📋 TeamMatch — User Stories & Prioritized Backlog

---

### US01 — Create Student Profile

**As a student**, I want to create and complete my academic profile to showcase my skills, interests and availability, and thus make it easier to find compatible study partners.

**Acceptance Criteria:**

- ✅ The student can enter their academic program, academic level, skills, interests, and availability.
- ✅ The student can save and edit their profile information.

---

### US02 — Create a Project

**As a student**, I want to set up a project, outlining its requirements, in order to find fellow students with the necessary skills to carry it out.

**Acceptance Criteria:**

- ✅ The student can enter the project title, description, required skills, number of teammates, and preferred availability.
- ✅ The project is saved and can be viewed by other students.

---

### US03 — Find Compatible Teammates

**As a student**, I’d like to receive recommendations for suitable peers so that I can find students who meet the requirements of my project.

**Acceptance Criteria:**

- ✅ The app recommends students based on skills, interests, academic background, availability, and project requirements.
- ✅ Each recommendation displays relevant information about the student's profile.

---

### US04 — Discover Projects

**As a student**, I want to explore the projects on offer to find opportunities that match my skills and interests.

**Acceptance Criteria:**

- ✅ The student can view a list of available projects.
- ✅ Each project displays its title, description, required skills, and number of teammates needed.

---

### US05 — Send Team Request

**As a student**, I would like to apply to join a project so that I can be part of a team that matches my skills and interests.

**Acceptance Criteria:**

- ✅ The student can send a team request to an available project.
- ✅ The student can see the status of their request.

---

### US06 — Manage Team Requests

**As the project creator**, I want to accept or reject team requests in order to select the students who will be part of my project team.

**Acceptance Criteria:**

- ✅ The project creator can view incoming team requests.
- ✅ The project creator can accept or reject each request.

---

## 📊 Prioritized Backlog

|    Priority     |  ID  | User Story                | Classification |
| :-------------: | :--: | ------------------------- | -------------- |
| 🔴 **Critical** | US01 | Create Student Profile    | Must Have      |
| 🔴 **Critical** | US02 | Create a Project          | Must Have      |
| 🔴 **Critical** | US03 | Find Compatible Teammates | Must Have      |
| 🔴 **Critical** | US05 | Send Team Request         | Must Have      |
|   🟡 **High**   | US04 | Discover Projects         | Should Have    |
|   🟡 **High**   | US06 | Manage Team Requests      | Should Have    |

---

# 💻 TeamMatch — App Type and Development Methodology

---

## 📱 Why is TeamMatch a Hybrid App?

**TeamMatch is a hybrid mobile application** developed using **Ionic React**, which allows us to:

- Build with web technologies: **React, HTML, CSS, and JavaScript**
- Deploy as a native mobile application for **Android and iOS**

### ✅ Key Advantages for TeamMatch

| Advantage             | Benefit                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------ |
| 🌐 **Cross-platform** | Share most code between Android and iOS, reducing development time and effort                                |
| ⚡ **Fast MVP**       | Ionic provides pre-built mobile UI components (buttons, cards, forms, tabs, navigation)                      |
| 🎯 **Perfect Fit**    | Features needed (profiles, projects, matching, search, requests) don't require intensive native capabilities |
| 💰 **Cost-effective** | Shared codebase is more practical than maintaining separate native apps                                      |
| 🚀 **Future Ready**   | Capacitor allows access to native features (push notifications, camera, geolocation) if needed later         |

> **Result:** Hybrid approach enables rapid MVP development while keeping options open for native capabilities.

---

## 🔄 Why is the Methodology Scrum?

**Scrum is ideal for TeamMatch** because:

- The application is developed **incrementally** with potentially evolving requirements
- Short cycles (**Sprints**) allow for testing and validation of functionality step by step
- Feedback from students can guide improvements

### 📅 MVP Sprint Structure

|     Sprint      | Main Focus           | User Stories |
| :-------------: | -------------------- | ------------ |
| **Sprint 1** 🎯 | Profiles & Projects  | US01, US02   |
| **Sprint 2** 🔍 | Matching & Discovery | US03, US04   |
| **Sprint 3** 🤝 | Team Formation       | US05, US06   |

### 🎁 Scrum Benefits for TeamMatch

- 📈 **Incremental Development** — Each Sprint produces a more complete version
- 📊 **Continuous Feedback** — Students test and provide input after each Sprint
- 🔄 **Adaptability** — Requirements can be modified as we learn user needs
- 📋 **Clear Prioritization** — MVP backlog separates must-have from desirable features
- ✅ **Early Validation** — Core concept (finding compatible teammates) tested first
- 🏗️ **Better Organization** — User stories, acceptance criteria, and planning provide clear structure

> **Scrum enables incremental development, continuous validation, and seamless adaptation to emerging feedback.**

---

## 🎯 Summary

| Aspect             | Decision                 | Justification                                                                     |
| ------------------ | ------------------------ | --------------------------------------------------------------------------------- |
| **📱 App Type**    | **Hybrid (Ionic React)** | Cross-platform development, fast MVP creation, lower effort, future native access |
| **🔄 Methodology** | **Scrum**                | Short Sprints, prioritized stories, continuous feedback, incremental development  |

### 🌟 How They Work Together

> **Ionic React + Scrum** create a powerful combination: Ionic React provides a practical way to build the cross-platform mobile MVP, while Scrum provides an iterative methodology to develop, test, and improve the application progressively.
