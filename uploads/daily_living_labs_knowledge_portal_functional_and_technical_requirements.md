# Daily Living Labs Knowledge Portal
## Functional and Technical Requirements

**Product:** Daily Living Labs Knowledge Portal  
**Project:** Daily Living Labs / Dayli AI  
**Version:** 1.0  
**Phase:** MVP  
**Prepared for:** Spring 2026 / Fall 2026 / Future Work project documentation  
**Primary purpose:** A passphrase-protected knowledge hub for storing, viewing, downloading, reviewing, and approving project documentation across project phases.

---

## 1. Executive Summary

The Daily Living Labs Knowledge Portal is a centralized, passphrase-protected project documentation hub. It will organize project materials by phase, provide searchable and filterable access to embedded documents, support stakeholder onboarding, preserve project history, and capture formal review through a sign-off form that saves submissions and generates a PDF record.

The portal is intended to support academic review, sponsor communication, project continuity, future development, and stakeholder handoff. It should feel professional, accessible, organized, and lightly playful, reflecting the Daily Living Labs / Dayli AI brand while remaining clear and usable for a broad audience.

---

## 2. Product Goals

### 2.1 Primary Goals

1. Provide a centralized place to store and access all project documentation.
2. Organize documents by project phase: Spring 2026, Fall 2026, and Future Work.
3. Allow stakeholders to read documents on-site or download them.
4. Support quick discovery through search, filters, metadata, and document categories.
5. Provide a clear onboarding path for new users through a “Start Here” section.
6. Capture stakeholder review through a sign-off form.
7. Generate a downloadable PDF record of each sign-off submission.
8. Support project governance through document metadata, review flags, analytics, and history.
9. Include a Big Ideas submission wall for future-facing ideas, sticky notes, and speculative opportunities.
10. Meet WCAG 2.2 AA accessibility standards.

### 2.2 Secondary Goals

1. Present the project as organized, sustainable, and ready for continuation.
2. Make documentation easier to maintain over time.
3. Reduce the need for repeated verbal explanations to sponsors, supervisors, or collaborators.
4. Create a lightweight record of what was reviewed, approved, updated, downloaded, and viewed.
5. Support both polished stakeholder presentation and practical project management.

---

## 3. Intended Users

### 3.1 Primary Users

- Project sponsor
- Academic supervisor
- Capstone evaluators
- Project collaborators
- Future designers or developers
- Daily Living Labs stakeholders

### 3.2 Secondary Users

- Researchers
- Accessibility reviewers
- Content contributors
- Future student teams
- Administrative reviewers

### 3.3 Admin Users

- Portal owner
- Project lead
- Documentation manager
- Authorized maintainer

---

## 4. MVP Scope

### 4.1 In Scope

The MVP includes:

- Passphrase access
- “Start Here” onboarding section
- Calendar and timeline
- Dashboard with Spring 2026 / Fall 2026 / Future Work sections
- Document cards with thumbnails
- Embedded PDF viewer
- Download button
- Search and filters
- Document metadata
- Sign-off form
- Saved sign-off submissions
- Generated sign-off PDF
- Simple admin area
- “Needs Review” flag
- Analytics/history view for recent views, most viewed documents, and downloads
- Big Ideas submission wall / sticky note board
- WCAG 2.2 AA accessibility support
- Fun toggle that switches the cursor to a butterfly emoji
- Mobile responsiveness
- Light and dark mode

### 4.2 Out of Scope for MVP

The following are not required for MVP but may be considered for future work:

- Full user account system
- Role-based permissions
- Individual stakeholder logins
- AI-powered document Q&A
- Real-time collaborative editing
- Document commenting and threaded discussion
- E-signature integration
- Email notifications
- External CMS integration
- Advanced document version comparison
- Full-text PDF indexing, unless technically feasible within the build tool
- Multi-language support

---

## 5. Information Architecture

### 5.1 Top-Level Navigation

The portal should include the following primary navigation items:

1. Dashboard
2. Start Here
3. Calendar & Timeline
4. Documents
5. Sign-Off
6. Big Ideas
7. Analytics / History
8. Admin

### 5.2 Primary Project Sections

The dashboard and document library should be organized around three project phases:

1. Spring 2026
2. Fall 2026
3. Future Work

### 5.3 Recommended Document Categories

Each phase may include the following categories:

- Project Overview
- Strategy & Planning
- Research & Insights
- UX & Design
- Technical Documentation
- Content & Assets
- Governance & Sign-Offs
- Presentations
- Future Opportunities

---

## 6. Functional Requirements

## 6.1 Passphrase Access

### Description

The portal shall be protected by a shared passphrase. Users must enter the correct passphrase before accessing portal content.

### Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-001 | The system shall display a passphrase entry screen before portal access is granted. | Must Have |
| FR-002 | The system shall validate the entered passphrase against the stored passphrase. | Must Have |
| FR-003 | The system shall display a clear error message when the passphrase is incorrect. | Must Have |
| FR-004 | The system shall allow the passphrase to be updated by an admin. | Should Have |
| FR-005 | The system shall store access state for the active browser session. | Must Have |
| FR-006 | The system shall provide a manual logout or “lock portal” option. | Should Have |
| FR-007 | The passphrase screen shall include project branding and a short description of the portal purpose. | Must Have |

### Acceptance Criteria

- Users cannot access portal content without entering the correct passphrase.
- Incorrect passphrase attempts show a helpful, non-technical error message.
- The passphrase form is keyboard accessible.
- The passphrase field has a visible label.
- The passphrase page works on mobile and desktop.

---

## 6.2 Start Here Onboarding Section

### Description

The portal shall provide a clear onboarding path for new users, directing them to the most important documents and actions first.

### Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-008 | The system shall include a “Start Here” section accessible from the dashboard and main navigation. | Must Have |
| FR-009 | The Start Here section shall include a short welcome message explaining how to use the portal. | Must Have |
| FR-010 | The Start Here section shall list recommended first documents in a logical review order. | Must Have |
| FR-011 | The Start Here section shall include quick links to the document library, sign-off form, timeline, and Big Ideas board. | Should Have |
| FR-012 | The Start Here section shall visually distinguish required/recommended documents from optional resources. | Should Have |

### Recommended Start Here Document Order

1. Executive Summary
2. Project Overview
3. Mission Impact Statement
4. Functional & Technical Requirements
5. Style Guide
6. Future State Recommendations
7. Sign-Off Form

### Acceptance Criteria

- A new stakeholder can identify where to begin within 10 seconds.
- Start Here links open the correct documents or sections.
- The section is readable and usable on mobile.

---

## 6.3 Calendar and Timeline

### Description

The portal shall include a calendar and/or timeline view showing project milestones, documentation phases, key deadlines, sign-off windows, and future work markers.

### Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-013 | The system shall display a visual timeline of major project phases. | Must Have |
| FR-014 | The system shall include Spring 2026, Fall 2026, and Future Work as major timeline sections. | Must Have |
| FR-015 | The system shall allow timeline items to include title, date, description, phase, status, and related document links. | Must Have |
| FR-016 | The system shall support a calendar-style view or list-style timeline view. | Should Have |
| FR-017 | Admin users shall be able to add, edit, and remove timeline items. | Should Have |
| FR-018 | Timeline items may link to relevant documents, sign-off forms, or Big Ideas notes. | Could Have |

### Acceptance Criteria

- Users can see the project’s phase structure and major milestones.
- Timeline items are readable on mobile.
- Timeline items use accessible color and text labels, not color alone.

---

## 6.4 Dashboard

### Description

The dashboard shall serve as the main landing page after passphrase access. It should summarize project sections, featured documents, review needs, and recent activity.

### Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-019 | The dashboard shall display Spring 2026, Fall 2026, and Future Work sections. | Must Have |
| FR-020 | Each section shall provide a short description of what documents or resources it contains. | Must Have |
| FR-021 | The dashboard shall include cards or links to featured documents. | Must Have |
| FR-022 | The dashboard shall include a “Needs Review” area showing documents flagged for review. | Must Have |
| FR-023 | The dashboard shall include recent activity, such as recently viewed or recently added documents. | Should Have |
| FR-024 | The dashboard shall include quick links to Start Here, Sign-Off, Timeline, Big Ideas, and Admin. | Must Have |

### Acceptance Criteria

- Users can navigate to all major portal areas from the dashboard.
- The dashboard clearly communicates the three major project phases.
- The dashboard remains usable on mobile without horizontal scrolling.

---

## 6.5 Document Cards with Thumbnails

### Description

Documents shall be displayed as cards with thumbnail previews and metadata to help users quickly identify and open resources.

### Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-025 | The system shall display each document as a card. | Must Have |
| FR-026 | Each card shall include a thumbnail image or generated preview. | Must Have |
| FR-027 | Each card shall include document title, short description, category, phase, status, version, and last updated date. | Must Have |
| FR-028 | Each card shall include a View button. | Must Have |
| FR-029 | Each card shall include a Download button. | Must Have |
| FR-029A | Each card shall include an Open in Google Docs button when a Google Docs source link is available. | Should Have |
| FR-030 | Each card shall visually indicate when a document is flagged as “Needs Review.” | Must Have |
| FR-031 | Each card shall include accessible alt text for thumbnails. | Must Have |

### Acceptance Criteria

- Document cards are scannable and visually consistent.
- Users can open or download a document from the card.
- The thumbnail does not replace the need for a readable title and description.

---

## 6.6 Embedded PDF Viewer

### Description

Users shall be able to view PDF documents directly within the portal.

### Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-032 | The system shall allow users to open a document in an embedded PDF viewer. | Must Have |
| FR-033 | The embedded viewer shall include a fallback link to open or download the PDF if embedding fails. | Must Have |
| FR-034 | The document detail page or modal shall include document metadata. | Must Have |
| FR-034A | The document detail page or modal shall include an Open in Google Docs action when a Google Docs source link is available. | Should Have |
| FR-035 | The viewer shall be usable on desktop and mobile. | Must Have |
| FR-036 | The viewer shall not trap keyboard focus. | Must Have |
| FR-037 | The viewer shall provide a close/back control that is keyboard accessible. | Must Have |

### Acceptance Criteria

- Users can read PDFs without leaving the portal.
- Users can still download the document if the viewer fails.
- The PDF viewer is accessible by keyboard and screen reader users to the extent supported by the chosen viewer.

---

## 6.7 Download Button

### Description

Each document shall be downloadable from the document card and document detail view.

### Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-038 | Each document shall have a visible Download button. | Must Have |
| FR-039 | Download actions shall be tracked in analytics/history. | Must Have |
| FR-040 | Download buttons shall include accessible labels identifying the document title. | Must Have |
| FR-041 | If a document is unavailable, the system shall display a clear error or unavailable state. | Must Have |

### Acceptance Criteria

- Users can download available documents.
- Download activity is recorded.
- The button is usable with keyboard and touch input.

---

## 6.8 Search and Filters

### Description

The portal shall include search and filtering to help users locate documents quickly.

### Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-042 | The system shall provide a search field for document discovery. | Must Have |
| FR-043 | Search shall return results based on document title, description, tags, category, phase, and status. | Must Have |
| FR-044 | The system shall provide filters for phase, category, status, document type, and audience. | Must Have |
| FR-045 | Users shall be able to combine search terms and filters. | Should Have |
| FR-046 | Users shall be able to clear all filters. | Must Have |
| FR-047 | The system shall display an empty state when no results are found. | Must Have |
| FR-048 | The system shall preserve accessibility of search results for screen reader and keyboard users. | Must Have |

### Recommended Filters

- Phase: Spring 2026, Fall 2026, Future Work
- Category: Project Overview, Strategy & Planning, Research & Insights, UX & Design, Technical Documentation, Content & Assets, Governance & Sign-Offs, Presentations
- Status: Draft, In Review, Approved, Needs Review, Needs Update, Archived
- Audience: Sponsor, Academic Supervisor, Designer, Developer, Researcher, General Stakeholder
- Document Type: PDF, Presentation, Guide, Checklist, Research, Requirements, Asset

### Acceptance Criteria

- Users can find a known document by searching its title or related keywords.
- Filters update the visible document list.
- Search and filter controls are labeled and accessible.

---

## 6.9 Document Metadata

### Description

Each document shall include structured metadata to support organization, governance, filtering, and review.

### Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-049 | Each document shall have a title. | Must Have |
| FR-050 | Each document shall have a short description. | Must Have |
| FR-051 | Each document shall have a phase. | Must Have |
| FR-052 | Each document shall have a category. | Must Have |
| FR-053 | Each document shall have a status. | Must Have |
| FR-054 | Each document shall have a version number. | Must Have |
| FR-055 | Each document shall have a last updated date. | Must Have |
| FR-056 | Each document shall have an owner or maintainer. | Should Have |
| FR-057 | Each document shall support tags. | Should Have |
| FR-058 | Each document shall support audience labels. | Should Have |
| FR-059 | Each document shall support a Needs Review flag. | Must Have |

### Metadata Fields

| Field | Type | Required |
|---|---|---|
| Document ID | Unique identifier | Yes |
| Title | Text | Yes |
| Description | Text | Yes |
| Phase | Select | Yes |
| Category | Select | Yes |
| Status | Select | Yes |
| Needs Review | Boolean | Yes |
| Version | Text | Yes |
| Last Updated | Date | Yes |
| Owner | Text | No |
| Tags | Multi-select | No |
| Audience | Multi-select | No |
| File URL | URL | Yes |
| Thumbnail URL | URL | Yes |
| Google Docs Source URL | URL | No |
| Download Count | Number | System-generated |
| View Count | Number | System-generated |
| Google Docs Open Count | Number | System-generated, optional |
| Last Viewed | Date/time | System-generated |

---

## 6.10 Sign-Off Form

### Description

The portal shall include a sign-off form allowing stakeholders to confirm that they reviewed selected documents and understand the current project status.

### Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-060 | The system shall include a sign-off form accessible from navigation and relevant document sections. | Must Have |
| FR-061 | The form shall collect reviewer name, role, organization/affiliation, email, and date. | Must Have |
| FR-062 | The form shall include review confirmation checkboxes. | Must Have |
| FR-063 | The form shall include optional comments. | Must Have |
| FR-064 | The form shall require users to confirm required review items before submission. | Should Have |
| FR-065 | The form shall show validation messages for incomplete required fields. | Must Have |
| FR-066 | The form shall be keyboard accessible and screen reader friendly. | Must Have |

### Recommended Sign-Off Checklist Items

- I reviewed the Executive Summary.
- I reviewed the Project Overview.
- I reviewed the Functional & Technical Requirements.
- I reviewed the Style Guide.
- I reviewed the Future State Recommendations.
- I understand the current project scope.
- I understand known risks and limitations.
- I understand which items are complete and which items are future work.
- I approve this documentation package for continuation or review.

### Acceptance Criteria

- Users can complete and submit the form.
- Required fields prevent incomplete submission.
- Checkbox labels are clear and selectable.
- Submitted data is saved.

---

## 6.11 Saved Sign-Off Submissions

### Description

Submitted sign-off forms shall be saved and available to admin users. For MVP, sign-off submissions shall also create a generated PDF and automatically add that PDF to the document library as a new document card.

### Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-067 | The system shall save each sign-off submission. | Must Have |
| FR-068 | Each saved submission shall include reviewer details, checklist selections, comments, date, and timestamp. | Must Have |
| FR-069 | Admin users shall be able to view saved sign-off submissions. | Must Have |
| FR-070 | Admin users shall be able to download generated PDF records. | Must Have |
| FR-071 | The system shall prevent accidental loss of submitted sign-off data. | Must Have |
| FR-071A | The system shall automatically create a new document card for each generated sign-off PDF. | Must Have |
| FR-071B | Generated sign-off PDF document cards shall include metadata such as title, date submitted, category, phase, and status. | Must Have |
| FR-071C | Generated sign-off PDFs shall be categorized under Governance & Sign-Offs unless otherwise assigned by an admin. | Must Have |

### Acceptance Criteria

- Submitted sign-offs appear in the admin area.
- Saved submissions match what the reviewer submitted.
- Admin can access the generated PDF record.

---

## 6.12 Generated Sign-Off PDF

### Description

After form submission, the system shall generate a PDF record of the sign-off. The generated PDF shall be added back into the portal as a new document card so it becomes part of the project documentation archive.

### Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-072 | The system shall generate a PDF after successful sign-off submission. | Must Have |
| FR-073 | The PDF shall include project name, reviewer details, checklist selections, comments, date, and timestamp. | Must Have |
| FR-074 | The PDF shall include the sign-off form version. | Should Have |
| FR-075 | The PDF shall use readable formatting and project branding. | Should Have |
| FR-076 | The PDF shall be downloadable by the reviewer after submission. | Must Have |
| FR-077 | The PDF shall be downloadable by admin users from saved submissions. | Must Have |
| FR-077A | The system shall create a new document library record for the generated PDF after successful submission. | Must Have |
| FR-077B | The generated sign-off PDF shall appear as a document card with a thumbnail or default generated PDF thumbnail. | Must Have |
| FR-077C | The generated sign-off PDF shall be visible in the relevant phase and Governance & Sign-Offs category. | Must Have |

### Acceptance Criteria

- A PDF is generated for each successful submission.
- PDF content accurately reflects the submitted form data.
- PDF can be downloaded from the confirmation screen or admin area.

---

## 6.13 Simple Admin Area

### Description

The portal shall include an admin area for managing documents, metadata, review flags, timeline items, Big Ideas submissions, and sign-off records.

### Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-078 | The system shall provide an admin area protected from general users. | Must Have |
| FR-079 | Admin users shall be able to add, edit, and archive documents. | Must Have |
| FR-080 | Admin users shall be able to upload or link PDF files. | Must Have |
| FR-081 | Admin users shall be able to upload or link thumbnail images. | Must Have |
| FR-082 | Admin users shall be able to edit document metadata. | Must Have |
| FR-083 | Admin users shall be able to toggle the Needs Review flag. | Must Have |
| FR-084 | Admin users shall be able to view sign-off submissions. | Must Have |
| FR-085 | Admin users shall be able to view document analytics/history. | Must Have |
| FR-086 | Admin users shall be able to moderate Big Ideas submissions. | Should Have |
| FR-087 | Admin users shall be able to add, edit, and remove timeline/calendar items. | Should Have |

### Acceptance Criteria

- Admin users can maintain the document library without changing code.
- Admin users can update review states.
- Admin users can access sign-off and analytics records.

---

## 6.14 Needs Review Flag

### Description

Documents may be flagged as needing review. This flag shall appear on document cards, document detail pages, dashboard summaries, and admin views.

### Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-088 | The system shall support a Needs Review flag for each document. | Must Have |
| FR-089 | The Needs Review flag shall be visually displayed on document cards. | Must Have |
| FR-090 | The dashboard shall include a list or section of documents marked Needs Review. | Must Have |
| FR-091 | Admin users shall be able to turn the Needs Review flag on or off. | Must Have |
| FR-092 | Needs Review indicators shall not rely on color alone. | Must Have |

### Acceptance Criteria

- Users can identify documents needing review.
- Admin can manage review status.
- The review indicator is accessible.

---

## 6.15 Analytics / History View

### Description

The portal shall track document views and downloads to show usage history and identify which documents are being accessed most often.

### Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-093 | The system shall track document views. | Must Have |
| FR-094 | The system shall track document downloads. | Must Have |
| FR-095 | The system shall record date/time of document views. | Must Have |
| FR-096 | The system shall record date/time of document downloads. | Must Have |
| FR-097 | The analytics/history view shall display recently viewed documents. | Must Have |
| FR-098 | The analytics/history view shall display most viewed documents. | Must Have |
| FR-099 | The analytics/history view shall display most downloaded documents. | Must Have |
| FR-100 | The analytics/history view shall avoid collecting unnecessary personal data. | Must Have |
| FR-101 | Admin users shall be able to view analytics/history. | Must Have |

### Recommended Analytics Fields

| Field | Description |
|---|---|
| Document ID | Document associated with the event |
| Event Type | View or download |
| Timestamp | Date and time of event |
| Session ID | Anonymous session identifier, if needed |
| Document Phase | Spring 2026, Fall 2026, or Future Work |
| Document Category | Category at time of event |

### Acceptance Criteria

- Views and downloads are tracked accurately.
- Admin can see which documents were viewed recently.
- Admin can see which documents are viewed and downloaded most often.
- Analytics do not expose unnecessary sensitive user details.

---

## 6.16 Big Ideas Submission Wall / Sticky Note Board

### Description

The portal shall include a Big Ideas area where users can submit future-facing ideas, suggestions, questions, or opportunities. Submissions may be anonymous and should appear visually like sticky notes on a board.

### Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-102 | The system shall include a Big Ideas submission form. | Must Have |
| FR-103 | Users shall be able to submit an idea title and description. | Must Have |
| FR-104 | Users shall be able to optionally include their name or role, but anonymous submissions shall be allowed. | Must Have |
| FR-105 | Submitted ideas shall appear on a sticky note-style board. | Must Have |
| FR-106 | Ideas shall support category or theme tags. | Should Have |
| FR-107 | Ideas shall display submission date. | Should Have |
| FR-108 | Admin users shall be able to hide, archive, or delete submissions. | Should Have |
| FR-109 | The sticky note board shall be accessible and readable in both light and dark mode. | Must Have |
| FR-110 | The sticky note board shall remain usable on mobile. | Must Have |

### Recommended Idea Categories

- Future Feature
- Research Opportunity
- Accessibility Improvement
- Partnership Idea
- Content Idea
- Technical Improvement
- Wild / Experimental
- Open Question

### Acceptance Criteria

- Users can submit ideas.
- Submitted ideas are saved and displayed.
- Sticky notes are readable, keyboard accessible, and screen reader compatible.
- Admin can moderate submissions if needed.

---

## 6.17 Fun Toggle: Butterfly Cursor

### Description

The portal shall include an optional “fun” toggle that changes the cursor to a butterfly emoji or butterfly-themed cursor. This feature should add delight without reducing accessibility or usability.

### Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-111 | The system shall include a visible fun toggle. | Should Have |
| FR-112 | When enabled, the cursor shall switch to a butterfly emoji or butterfly cursor. | Should Have |
| FR-113 | Users shall be able to turn the butterfly cursor off. | Must Have |
| FR-114 | The fun toggle setting shall persist during the current session. | Should Have |
| FR-115 | The butterfly cursor shall not obscure controls, text, focus indicators, or form fields. | Must Have |
| FR-116 | The butterfly cursor shall not replace required keyboard focus indicators. | Must Have |
| FR-117 | The butterfly cursor shall be disabled or simplified if it creates usability issues on touch devices. | Must Have |

### Acceptance Criteria

- Users can turn the butterfly cursor on and off.
- The feature does not interfere with keyboard navigation.
- The feature does not interfere with pointer accuracy.
- The feature is treated as optional delight, not core navigation.

---

## 6.18 Light and Dark Mode

### Description

The portal shall support light and dark mode to improve readability, user comfort, and brand flexibility.

### Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-118 | The system shall provide a light mode. | Must Have |
| FR-119 | The system shall provide a dark mode. | Must Have |
| FR-120 | Users shall be able to manually switch between light and dark mode. | Must Have |
| FR-121 | The system should respect the user’s device-level color scheme preference when possible. | Should Have |
| FR-122 | The selected mode should persist during the current session or across visits. | Should Have |
| FR-123 | All text, icons, borders, form fields, cards, sticky notes, and buttons shall meet WCAG 2.2 AA contrast expectations in both modes. | Must Have |

### Acceptance Criteria

- Users can switch between light and dark mode.
- All portal areas remain readable in both modes.
- Status indicators and sticky notes remain accessible in both modes.

---

## 6.19 Mobile Responsiveness

### Description

The portal shall be usable across desktop, tablet, and mobile devices.

### Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-124 | The portal shall use responsive layouts. | Must Have |
| FR-125 | The dashboard shall stack content appropriately on smaller screens. | Must Have |
| FR-126 | Document cards shall reflow into mobile-friendly layouts. | Must Have |
| FR-127 | Search and filter controls shall remain usable on mobile. | Must Have |
| FR-128 | The PDF viewer shall provide a usable mobile fallback if embedded viewing is limited. | Must Have |
| FR-129 | Touch targets shall be large enough for mobile interaction. | Must Have |
| FR-130 | The sticky note board shall adapt to mobile without requiring horizontal scrolling. | Must Have |

### Acceptance Criteria

- The portal works on common mobile, tablet, and desktop viewport sizes.
- Users can access, view, search, filter, download, and submit forms on mobile.
- No core task requires desktop-only interaction.

---

## 7. Accessibility Requirements

## 7.1 Accessibility Standard

The portal shall be designed and developed to conform to WCAG 2.2 Level AA standards.

### General Accessibility Requirements

| ID | Requirement | Priority |
|---|---|---|
| AR-001 | The portal shall meet WCAG 2.2 AA standards. | Must Have |
| AR-002 | All interactive elements shall be keyboard accessible. | Must Have |
| AR-003 | The site shall include visible focus indicators. | Must Have |
| AR-004 | Focus indicators shall not be hidden, covered, or obscured by sticky headers, modals, or overlays. | Must Have |
| AR-005 | All non-text content shall have appropriate text alternatives. | Must Have |
| AR-006 | The portal shall use semantic HTML structure wherever possible. | Must Have |
| AR-007 | Headings shall follow a logical hierarchy. | Must Have |
| AR-008 | Form inputs shall have visible labels and accessible names. | Must Have |
| AR-009 | Form validation errors shall be clearly described and programmatically associated with fields where possible. | Must Have |
| AR-010 | Color shall not be the only way to communicate information. | Must Have |
| AR-011 | Text and meaningful UI components shall meet minimum contrast requirements. | Must Have |
| AR-012 | The interface shall support browser zoom up to at least 200% without loss of content or functionality. | Must Have |
| AR-013 | The portal shall avoid keyboard traps. | Must Have |
| AR-014 | Motion, animation, or decorative effects shall not interfere with usability. | Must Have |
| AR-015 | The butterfly cursor toggle shall not interfere with pointer accuracy, keyboard access, or focus visibility. | Must Have |
| AR-016 | Touch targets shall be large enough and spaced appropriately. | Must Have |
| AR-017 | Dragging shall not be the only way to interact with sticky notes or board items. | Must Have |
| AR-018 | The PDF viewer shall include accessible fallback actions, such as open/download. | Must Have |

### Accessibility Acceptance Criteria

- A keyboard-only user can access all core functionality.
- A screen reader user can understand navigation, forms, document cards, and status indicators.
- A low-vision user can read and interact with the portal in light and dark mode.
- A motor-impaired user can complete the sign-off form and submit Big Ideas without drag-only interactions.
- A mobile user can complete all core tasks using touch input.

---

## 8. Technical Requirements

## 8.1 Recommended Architecture

The MVP should use a lightweight full-stack architecture appropriate for rapid prototyping and project documentation management.

### Recommended Options

1. Lovable + Supabase for MVP build
2. Figma / Figma Make for prototype and interface concepting
3. Claude Code for code cleanup, custom PDF generation, advanced logic, or exportable production refinement

### Core System Components

- Frontend web application
- Passphrase access logic
- Document database
- File storage for PDFs and thumbnails
- Embedded PDF viewer
- Sign-off form submission storage
- PDF generation service/library
- Admin interface
- Analytics/history event tracking
- Big Ideas submission database

---

## 8.2 Data Models

### Document

| Field | Type | Notes |
|---|---|---|
| id | UUID | Unique document ID |
| title | Text | Required |
| description | Text | Required |
| phase | Enum | Spring 2026, Fall 2026, Future Work |
| category | Enum | Document category |
| status | Enum | Draft, In Review, Approved, Needs Update, Archived |
| needs_review | Boolean | Default false |
| version | Text | Example: 1.0 |
| owner | Text | Optional |
| audience | Array | Optional |
| tags | Array | Optional |
| file_url | URL | PDF/document location |
| thumbnail_url | URL | Thumbnail image location |
| created_at | Timestamp | System-generated |
| updated_at | Timestamp | System-generated |
| last_viewed_at | Timestamp | System-generated |
| view_count | Number | System-generated |
| download_count | Number | System-generated |
| google_docs_url | URL | Optional editable source link |
| google_docs_open_count | Number | Optional system-generated count |

### Sign-Off Submission

| Field | Type | Notes |
|---|---|---|
| id | UUID | Unique submission ID |
| reviewer_name | Text | Required |
| reviewer_role | Text | Required |
| organization | Text | Optional |
| email | Email | Required or optional depending on privacy decision |
| checklist_items | JSON/Array | Required |
| comments | Text | Optional |
| submitted_at | Timestamp | System-generated |
| pdf_url | URL | Generated PDF location |
| form_version | Text | Optional |

### Timeline Item

| Field | Type | Notes |
|---|---|---|
| id | UUID | Unique timeline item ID |
| title | Text | Required |
| description | Text | Optional |
| date | Date | Required |
| phase | Enum | Spring 2026, Fall 2026, Future Work |
| status | Enum | Planned, In Progress, Complete, Deferred |
| related_document_ids | Array | Optional |
| created_at | Timestamp | System-generated |
| updated_at | Timestamp | System-generated |

### Analytics Event

| Field | Type | Notes |
|---|---|---|
| id | UUID | Unique event ID |
| document_id | UUID | Related document |
| event_type | Enum | View or download |
| timestamp | Timestamp | System-generated |
| session_id | Text | Anonymous if used |
| phase | Text | Captured from document metadata |
| category | Text | Captured from document metadata |

### Big Idea

| Field | Type | Notes |
|---|---|---|
| id | UUID | Unique idea ID |
| title | Text | Required |
| description | Text | Required |
| category | Enum | Optional |
| submitted_by | Text | Optional |
| submitter_role | Text | Optional |
| status | Enum | Visible, Hidden, Archived |
| created_at | Timestamp | System-generated |
| updated_at | Timestamp | System-generated |

---

## 8.3 File Storage Requirements

### Recommended MVP Storage Approach

For a solo MVP build, the recommended approach is to upload stable PDF exports and thumbnail images directly into the app’s connected storage environment, such as Supabase Storage if using Lovable. This is generally more reliable than embedding documents from Google Drive because it reduces permission problems, broken links, and inconsistent preview behavior.

Editable source files may still live in Google Drive, Figma, or another working space. The portal should store the polished exported version intended for stakeholder viewing and download, while optionally linking back to the editable Google Docs source when available.

| ID | Requirement | Priority |
|---|---|---|
| TR-001 | The system shall store or reference PDF files for embedded viewing and download. | Must Have |
| TR-002 | The system shall store or reference thumbnail images for document cards. | Must Have |
| TR-002A | The system shall support an optional Google Docs source URL for documents with editable source files. | Should Have |
| TR-003 | File URLs shall not expose unnecessary private storage details. | Should Have |
| TR-004 | The system shall support replacing a document file while preserving or updating metadata. | Should Have |
| TR-005 | The system shall support common file naming conventions. | Should Have |

### Recommended Naming Convention

`DLL_[Phase]_[Category]_[DocumentTitle]_v[Version]_[YYYY-MM-DD].pdf`

Example:  
`DLL_Spring2026_TechnicalRequirements_KnowledgePortal_v1.0_2026-05-06.pdf`

---

## 8.4 PDF Generation Requirements

| ID | Requirement | Priority |
|---|---|---|
| TR-006 | The system shall generate a PDF from sign-off form data. | Must Have |
| TR-007 | Generated PDFs shall be saved and associated with the original submission. | Must Have |
| TR-008 | Generated PDFs shall include readable text, not only screenshots or flattened images. | Should Have |
| TR-009 | Generated PDFs shall include project name and submission timestamp. | Must Have |
| TR-010 | Generated PDFs shall be downloadable by admin users. | Must Have |

---

## 8.5 Search Requirements

| ID | Requirement | Priority |
|---|---|---|
| TR-011 | The system shall search document metadata fields. | Must Have |
| TR-012 | Search shall be case-insensitive. | Must Have |
| TR-013 | Search shall return partial matches where feasible. | Should Have |
| TR-014 | Search shall work in combination with filters. | Should Have |
| TR-015 | Full-text PDF search may be deferred to a future version. | Could Have |

---

## 8.6 Security and Privacy Requirements

### MVP Security Decision

For MVP, all general portal users shall use the same shared passphrase. Admin functions may use the same passphrase in the earliest prototype, but a separate admin passphrase or protected admin route is recommended before broader stakeholder sharing.

Analytics shall be anonymous and should not identify individual users.

| ID | Requirement | Priority |
|---|---|---|
| TR-016 | Portal content shall not be publicly accessible without passphrase access. | Must Have |
| TR-017 | Admin functions shall be separated from general portal functions. | Must Have |
| TR-018 | The portal shall avoid collecting unnecessary personal information. | Must Have |
| TR-019 | Sign-off data shall be stored securely. | Must Have |
| TR-020 | Analytics shall use anonymous session data and shall not associate activity with named users. | Must Have |
| TR-021 | The system shall avoid displaying sensitive submission data to non-admin users. | Must Have |
| TR-022 | Admin access should require stronger protection than the general portal passphrase. | Should Have |

---

## 8.7 Performance Requirements

| ID | Requirement | Priority |
|---|---|---|
| TR-023 | The dashboard shall load quickly on typical broadband connections. | Should Have |
| TR-024 | Document thumbnails shall be optimized for web use. | Should Have |
| TR-025 | PDF files shall be optimized where possible to reduce load time. | Should Have |
| TR-026 | Search and filters shall update results without excessive delay. | Must Have |
| TR-027 | Mobile performance shall be considered during design and testing. | Must Have |

---

## 8.8 Browser and Device Support

The portal should support current versions of major modern browsers:

- Chrome
- Safari
- Firefox
- Edge

The portal should be tested across:

- Desktop
- Tablet
- Mobile phone

Minimum target viewport widths:

- 320px mobile
- 768px tablet
- 1024px desktop
- 1440px large desktop

---

## 9. Design and UX Requirements

## 9.1 Visual Tone

The portal should feel:

- Clear
- Professional
- Trustworthy
- Organized
- Calm
- Friendly
- Lightly playful
- Accessible
- Future-facing

The design should avoid feeling like a generic file dump. It should feel like a curated project knowledge environment.

## 9.2 Core UI Components

The MVP should include:

- Passphrase screen
- Top navigation
- Dashboard cards
- Phase cards
- Document cards
- Document detail modal/page
- Embedded PDF viewer
- Search bar
- Filter controls
- Status badges
- Needs Review badge
- Timeline/calendar component
- Sign-off form
- PDF generation confirmation state
- Admin tables/forms
- Analytics cards/tables
- Big Ideas sticky note board
- Light/dark mode toggle
- Fun/butterfly cursor toggle

---

## 10. Content Requirements

## 10.1 Required Content Types

The portal should support the following content types:

- PDF documents
- Document thumbnails
- Document descriptions
- Project timeline entries
- Sign-off checklist language
- Big Ideas submissions
- Analytics labels
- Empty states
- Error messages
- Admin instructions

## 10.2 Empty States

The portal should include friendly empty states for:

- No documents found
- No documents in a phase
- No documents need review
- No sign-off submissions yet
- No analytics yet
- No Big Ideas submitted yet

Example:

“No documents match your search yet. Try clearing filters or searching by project phase, category, or document title.”

---

## 11. Admin Workflow Requirements

### Add New Document

1. Admin opens Admin area.
2. Admin selects “Add Document.”
3. Admin enters title, description, phase, category, status, version, owner, tags, and audience.
4. Admin uploads or links the PDF.
5. Admin uploads or links thumbnail.
6. Admin saves document.
7. Document appears in the correct portal section.

### Update Document Review Status

1. Admin opens document record.
2. Admin toggles Needs Review on or off.
3. Admin saves changes.
4. Dashboard and document card update immediately.

### Review Sign-Off Submissions

1. Admin opens Sign-Off Submissions.
2. Admin views submission list.
3. Admin opens individual submission.
4. Admin reviews checklist, comments, and timestamp.
5. Admin downloads generated PDF if needed.

### Moderate Big Ideas

1. Admin opens Big Ideas management area.
2. Admin reviews submitted ideas.
3. Admin marks ideas as visible, hidden, or archived.
4. Public Big Ideas wall updates accordingly.

---

## 12. Acceptance Testing Checklist

### Core Access

- [ ] Portal is locked before passphrase entry.
- [ ] Correct passphrase grants access.
- [ ] Incorrect passphrase shows error.
- [ ] User can lock/logout of portal.

### Dashboard

- [ ] Dashboard displays Spring 2026, Fall 2026, and Future Work.
- [ ] Dashboard includes Start Here links.
- [ ] Dashboard includes Needs Review documents.
- [ ] Dashboard works on mobile.

### Documents

- [ ] Document cards display thumbnails and metadata.
- [ ] View button opens embedded PDF.
- [ ] Download button downloads document.
- [ ] Open in Google Docs button appears when a Google Docs source link is available.
- [ ] Needs Review badge appears when enabled.
- [ ] Document detail page includes metadata.

### Search and Filters

- [ ] Search returns relevant documents.
- [ ] Filters work independently.
- [ ] Search and filters work together.
- [ ] Clear filters resets results.
- [ ] Empty states display when no results match.

### Sign-Off

- [ ] Sign-off form validates required fields.
- [ ] Checkbox selections save correctly.
- [ ] Submission is stored.
- [ ] PDF is generated.
- [ ] Admin can view submission and download PDF.

### Admin

- [ ] Admin can add document.
- [ ] Admin can edit document.
- [ ] Admin can archive document.
- [ ] Admin can update Needs Review flag.
- [ ] Admin can view analytics.
- [ ] Admin can view sign-off submissions.
- [ ] Admin can moderate Big Ideas submissions.

### Big Ideas

- [ ] Users can submit ideas.
- [ ] Ideas appear as sticky notes.
- [ ] Sticky notes are readable in light and dark mode.
- [ ] Sticky note board works on mobile.
- [ ] Board does not rely on drag-only interaction.

### Accessibility

- [ ] All core functionality is keyboard accessible.
- [ ] Focus indicators are visible.
- [ ] Form fields have labels.
- [ ] Error messages are clear.
- [ ] Color is not the only status indicator.
- [ ] Text contrast meets WCAG 2.2 AA expectations.
- [ ] Touch targets are appropriately sized.
- [ ] Site supports zoom up to at least 200%.
- [ ] No keyboard traps are present.

### Appearance and Delight

- [ ] Light mode works.
- [ ] Dark mode works.
- [ ] User can toggle modes.
- [ ] Fun toggle changes cursor to butterfly.
- [ ] Butterfly cursor can be turned off.
- [ ] Butterfly cursor does not interfere with accessibility.

---

## 13. Risks and Considerations

### 13.1 Technical Risks

- Embedded PDF viewers may behave inconsistently across browsers and mobile devices.
- PDF generation may require custom code or a third-party library.
- Search may be limited if only metadata is indexed.
- Passphrase protection is simpler than full authentication but less secure.
- Analytics must be implemented carefully to avoid unnecessary data collection.

### 13.2 UX Risks

- Too many document categories may make the portal feel cluttered.
- The Big Ideas board could become noisy without moderation.
- The fun toggle could become distracting if not optional.
- Admin features could become too complex for MVP.

### 13.3 Accessibility Risks

- PDF content may not be accessible unless the PDFs themselves are structured accessibly.
- Sticky note boards can create accessibility problems if they rely on drag-and-drop.
- Custom cursors can reduce usability if they obscure content or interfere with pointer precision.
- Dark mode must be tested carefully for contrast issues.

---

## 14. Future Enhancements

Potential post-MVP enhancements include:

- Full user login
- Role-based access
- Stakeholder-specific dashboards
- Commenting on documents
- Document approval workflows
- Email notifications for sign-off submissions
- Document expiration/review reminders
- AI-powered document Q&A
- Full-text PDF search
- Export documentation package as ZIP
- Version comparison
- Integration with Google Drive or Notion
- Public/private document visibility
- More advanced analytics
- Accessibility audit reports

---

## 15. Definition of Done

The MVP is considered complete when:

1. Users can access the portal with a passphrase.
2. Users can navigate the Start Here section.
3. Users can view project phases on the dashboard.
4. Users can browse document cards with thumbnails.
5. Users can open embedded PDFs.
6. Users can download documents.
7. Users can search and filter documents.
8. Documents include required metadata.
9. Users can complete a sign-off form.
10. Sign-off submissions are saved.
11. A PDF is generated from each sign-off submission.
12. Admin users can manage documents and submissions.
13. Needs Review flags appear and can be managed.
14. Analytics/history shows recent views, most viewed documents, and downloads.
15. Users can submit Big Ideas to a sticky note board.
16. The portal supports light mode, dark mode, mobile responsiveness, and the optional butterfly cursor toggle.
17. The portal meets WCAG 2.2 AA accessibility expectations for the MVP interface.

---

## 16. Recommended MVP Build Approach

### Recommended Build Path

1. Design core screens in Figma / Figma Make.
2. Build the MVP in Lovable using a database-backed structure.
3. Use Supabase or equivalent for document records, file storage, submissions, and analytics events.
4. Use Claude Code for custom PDF generation, accessibility refinement, styling cleanup, and production hardening if needed.

### Suggested Build Order

1. Passphrase access
2. Dashboard structure
3. Document database and cards
4. PDF viewer and download flow
5. Search and filters
6. Admin document management
7. Sign-off form and saved submissions
8. Generated PDF output
9. Automatic document card creation for generated sign-off PDFs
10. Needs Review flag
11. Analytics/history
12. Calendar/timeline
13. Big Ideas sticky note board
14. Future Work handling for deferred sign-off items
15. Light/dark mode
16. Mobile polish
17. Accessibility QA
18. Butterfly cursor fun toggle

---

## 17. Product Decisions and Remaining Open Questions

### 17.1 Confirmed Product Decisions

1. **Access model:** All users shall use the same shared passphrase for MVP access. Full user accounts and role-based permissions are deferred.
2. **Big Ideas submissions:** Big Ideas may be submitted anonymously.
3. **Sign-off behavior:** The sign-off form shall use a simple Submit button. On submission, the system shall generate a PDF from the submitted selections and create a new document card for the generated sign-off PDF.
4. **Generated PDF delivery:** Generated sign-off PDFs shall be downloadable only for MVP. Email delivery is deferred.
5. **Fall 2026 visibility:** Fall 2026 shall be visible as a planned section, with its subcategories already in place.
6. **Future Work behavior:** Future Work shall include any items marked as Defer from sign-off submissions.
7. **Analytics:** Analytics shall be anonymous. The system should track document activity without associating views or downloads with named users.
8. **Privacy notice:** A dedicated privacy notice is not required for MVP, though the system should still avoid unnecessary personal data collection.
9. **Future document support:** The system should be designed with future support for non-PDF documents in mind, even if PDF is the primary MVP format.

### 17.2 Document Storage Decision

Each document record shall support three user-facing actions when available:

1. **View:** Opens the stable PDF version inside the portal using the embedded PDF viewer.
2. **Download:** Downloads the stable PDF version from the portal.
3. **Open in Google Docs:** Opens the editable source document in Google Docs when a Google Docs link is available.

For the MVP, the recommended approach is to store stable PDF exports and thumbnails directly in the app’s connected storage/database environment, such as Supabase Storage if using Lovable. This keeps the portal reliable for viewing and downloading.

Google Docs links may be included as optional source links for editable working documents. This gives stakeholders or future collaborators a way to access the living source file when appropriate, while still preserving the portal as the clean, stable documentation hub.

If a Google Docs source link is not available for a document, the “Open in Google Docs” action shall be hidden or disabled.

---

## 18. Summary

The Daily Living Labs Knowledge Portal MVP will provide a structured, accessible, and stakeholder-friendly documentation hub for the project. It will support project continuity through organized documents, onboarding, timeline context, metadata, review flags, analytics, and sign-off records. The portal should balance professional credibility with a small amount of brand personality through light/dark mode, friendly content, and an optional butterfly cursor toggle.

The MVP should remain focused: it does not need to become a full enterprise document management system. Its value comes from making project knowledge easier to access, review, preserve, and hand off.

