# TeamMatch

---

## Point 1

| APP           | APP TYPE        | MVP FUNCTIONS                                               |
| ------------- | --------------- | ----------------------------------------------------------- |
| **Whatsapp**  | Native / Hybrid | Send and receive message, make calls and send documents     |
| **Instagram** | Native / Hybrid | Create profiles, load content and search other profiles     |
| **Spotify**   | Hybrid          | Search for songs and artists, play music and crate playlist |

---

## Point 2

### 1. What Problem Does TeamMatch Solve?

University students often struggle to find suitable teammates for academic projects. They may not know other students with the required skills, interests, academic background, or availability. As a result, students can spend a significant amount of time searching for teammates, form unbalanced teams, or end up working with people whose skills and schedules are not compatible with the project.

> **TeamMatch solves this problem by helping university students find compatible teammates based on their skills, interests, academic profile, and availability.**

---

### 2. Who Is the App Designed For?

TeamMatch is designed primarily for university students who need to form teams for:

- Academic projects and assignments
- University competitions and hackathons
- Research or extracurricular projects
- Collaborative activities and student initiatives

The main target user is a student who needs to find one or more teammates with specific skills, interests, or availability to successfully complete a project.

---

### 3. Three Essential MVP Features

#### 1. Student Profile

Students can create a profile containing essential information such as:

- Academic program or major
- Skills
- Interests
- Academic level
- Availability
- Short personal/project description

This information serves as the foundation for finding compatible teammates.

---

#### 2. Smart Teammate Matching

TeamMatch recommends students who are compatible with the user's needs and preferences.

The matching system should consider factors such as:

- Relevant skills
- Shared interests
- Academic background
- Availability
- Project requirements

> For the MVP, the matching algorithm can be relatively simple and rule-based rather than relying on complex AI.

---

#### 3. Project Creation & Team Requests

Students can create a project specifying:

- Project title and description
- Required skills
- Number of teammates needed
- Preferred availability
- Other relevant requirements

Other students can discover projects that match their profiles and **send or receive team requests**, allowing them to connect and form a team.

---

## Point 3

> **Technology: Ionic react**

### Why Ionic React is a good choice for TeamMatch

#### **Cross-platform development**

Ionic React allows you to build the application using React and web technologies while deploying it to both Android and iOS. This means you can maintain a largely shared codebase instead of developing two separate native applications.

#### **Fast MVP development**

Since TeamMatch is still in its early stage, speed is important. Ionic provides ready-made mobile UI components such as buttons, cards, tabs, forms, modals, and navigation. This makes it easier to build and test the MVP quickly.

#### **React ecosystem**

React has a large ecosystem and is widely used for modern application development. You can take advantage of existing React libraries for things such as form validation, state management, authentication, API communication, and more.

#### **Good fit for TeamMatch's functionality**

The initial MVP mainly requires features such as:

- Student profiles
- Project creation
- Matching students
- Search and filtering
- Team requests
- Authentication
- Communication with a backend

These features don't require heavy native processing, so Ionic React is a practical choice.

#### **Easy to scale later**

If TeamMatch grows, you can integrate native device capabilities through Capacitor, such as push notifications, camera access, geolocation, or other native functionality, without having to completely rewrite the application.

> **Ionic React is a good choice for TeamMatch because it allows us to develop a mobile-first application quickly using React, reuse most of the code across Android and iOS, leverage a large ecosystem, and keep the architecture flexible for future development.**

---
