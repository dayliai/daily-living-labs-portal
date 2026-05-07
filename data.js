// Seed data for Daily Living Labs Knowledge Portal
window.SEED = {
  documents: [
    // Spring 2026 — Project Overview / Strategy
    { id: "d1", title: "Executive Summary", description: "Top-level overview of the Daily Living Labs Knowledge Portal capstone.",
      phase: "Spring 2026", category: "Project Overview", status: "Approved", needsReview: false,
      version: "1.0", updated: "2026-05-10", owner: "Chelsea", tags: ["overview", "summary"],
      audience: ["Sponsor", "Academic Supervisor"], thumb: "exec", googleDocs: true,
      views: 1248, downloads: 214 },
    { id: "d2", title: "Project Overview", description: "Full project background, scope, and approach.",
      phase: "Spring 2026", category: "Project Overview", status: "Approved", needsReview: false,
      version: "1.2", updated: "2026-05-08", owner: "Chelsea", tags: ["scope"],
      audience: ["Sponsor"], thumb: "project", googleDocs: true,
      views: 892, downloads: 138 },
    { id: "d3", title: "Functional & Technical Requirements", description: "Detailed FR and TR specs for the portal MVP.",
      phase: "Spring 2026", category: "Technical Documentation", status: "In Review", needsReview: true,
      version: "1.3", updated: "2026-05-09", owner: "Chelsea", tags: ["requirements", "MVP"],
      audience: ["Designer", "Developer"], thumb: "specs", googleDocs: true,
      views: 561, downloads: 72 },
    { id: "d4", title: "Style Guide", description: "Brand colors, type, components, accessibility tokens.",
      phase: "Spring 2026", category: "UX & Design", status: "Approved", needsReview: false,
      version: "1.0", updated: "2026-05-07", owner: "Chelsea", tags: ["brand", "design system"],
      audience: ["Designer"], thumb: "style", googleDocs: true,
      views: 410, downloads: 64 },
    { id: "d5", title: "Future State Recommendations", description: "Roadmap of post-MVP recommendations.",
      phase: "Spring 2026", category: "Future Opportunities", status: "Draft", needsReview: false,
      version: "0.8", updated: "2026-05-04", owner: "Chelsea", tags: ["roadmap"],
      audience: ["Sponsor"], thumb: "future", googleDocs: true,
      views: 220, downloads: 31 },
    { id: "d6", title: "User Journey Map v2", description: "Stakeholder-by-phase journey across the portal.",
      phase: "Spring 2026", category: "UX & Design", status: "In Review", needsReview: true,
      version: "2.0", updated: "2026-05-12", owner: "Chelsea", tags: ["research", "journey"],
      audience: ["Designer"], thumb: "journey", googleDocs: false,
      views: 188, downloads: 22 },
    { id: "d7", title: "Stakeholder Interview Summary", description: "Findings from sponsor + advisor interviews.",
      phase: "Spring 2026", category: "Research & Insights", status: "Approved", needsReview: false,
      version: "1.0", updated: "2026-04-28", owner: "Chelsea", tags: ["research"],
      audience: ["Sponsor"], thumb: "interviews", googleDocs: true,
      views: 312, downloads: 45 },
    { id: "d8", title: "Mission Impact Statement", description: "Daily Living Labs mission alignment.",
      phase: "Spring 2026", category: "Strategy & Planning", status: "Approved", needsReview: false,
      version: "1.0", updated: "2026-04-22", owner: "Chelsea", tags: ["mission"],
      audience: ["Sponsor"], thumb: "mission", googleDocs: true,
      views: 280, downloads: 38 },
    { id: "d9", title: "Capstone Pitch Deck", description: "June 1 capstone pitch presentation.",
      phase: "Spring 2026", category: "Presentations", status: "Approved", needsReview: false,
      version: "1.0", updated: "2026-05-30", owner: "Chelsea", tags: ["pitch"],
      audience: ["Academic Supervisor"], thumb: "pitch", googleDocs: false,
      views: 145, downloads: 28 },
    // Fall 2026 placeholders
    { id: "d10", title: "Data Governance Policy", description: "How stakeholder and analytics data is handled.",
      phase: "Fall 2026", category: "Governance & Sign-Offs", status: "Draft", needsReview: true,
      version: "0.4", updated: "2026-05-06", owner: "Chelsea", tags: ["governance"],
      audience: ["Sponsor"], thumb: "governance", googleDocs: true,
      views: 88, downloads: 12 },
    { id: "d11", title: "Technical Architecture (planned)", description: "Detailed architecture, services, and integrations.",
      phase: "Fall 2026", category: "Technical Documentation", status: "Draft", needsReview: false,
      version: "0.1", updated: "2026-05-01", owner: "Chelsea", tags: ["architecture"],
      audience: ["Developer"], thumb: "arch", googleDocs: false,
      views: 42, downloads: 4 },
    { id: "d12", title: "API Requirements (draft)", description: "External and internal API surface for the portal.",
      phase: "Fall 2026", category: "Technical Documentation", status: "In Review", needsReview: true,
      version: "0.3", updated: "2026-05-09", owner: "Chelsea", tags: ["api"],
      audience: ["Developer"], thumb: "api", googleDocs: true,
      views: 60, downloads: 8 },
    // Future Work
    { id: "d13", title: "AI-Powered Document Q&A", description: "Speculative feature spec.",
      phase: "Future Work", category: "Future Opportunities", status: "Draft", needsReview: false,
      version: "0.1", updated: "2026-04-15", owner: "Chelsea", tags: ["AI"],
      audience: ["Developer"], thumb: "ai", googleDocs: false,
      views: 30, downloads: 3 },
    { id: "d14", title: "Role-Based Permissions Plan", description: "Future auth architecture.",
      phase: "Future Work", category: "Strategy & Planning", status: "Draft", needsReview: false,
      version: "0.1", updated: "2026-04-10", owner: "Chelsea", tags: ["auth"],
      audience: ["Developer"], thumb: "rbac", googleDocs: false,
      views: 22, downloads: 1 },
    // Start Here seeded documents
    { id: "d15", title: "Collaboration Guide", description: "How to contribute, communicate, and collaborate across the Daily Living Labs team.",
      phase: "Spring 2026", category: "Project Overview", status: "In Progress", needsReview: false,
      version: "1.0", updated: "2026-05-07", owner: "Chelsea", tags: ["collaboration", "guide"],
      audience: ["Sponsor", "Designer", "Developer"], thumb: "project", googleDocs: false,
      views: 0, downloads: 0 },
    { id: "d16", title: "DLL & Dayli AI Guided Tour", description: "A step-by-step walkthrough of Daily Living Labs and the Dayli AI platform for new team members.",
      phase: "Spring 2026", category: "Project Overview", status: "In Progress", needsReview: false,
      version: "1.0", updated: "2026-05-07", owner: "Chelsea", tags: ["tour", "onboarding"],
      audience: ["Sponsor", "Designer", "Developer", "Academic Supervisor"], thumb: "mission", googleDocs: false,
      views: 0, downloads: 0 },
    { id: "d17", title: "Roadmap 2026", description: "Strategic roadmap for the Daily Living Labs portal through Fall 2026 and beyond.",
      phase: "Spring 2026", category: "Strategy & Planning", status: "In Progress", needsReview: false,
      version: "1.0", updated: "2026-05-07", owner: "Chelsea", tags: ["roadmap", "strategy"],
      audience: ["Sponsor", "Academic Supervisor"], thumb: "future", googleDocs: false,
      views: 0, downloads: 0 },
    { id: "d18", title: "Portal Build Summary", description: "Technical and strategic overview of how the Knowledge Portal was designed and built.",
      phase: "Spring 2026", category: "Technical Documentation", status: "Approved", needsReview: false,
      version: "1.0", updated: "2026-05-07", owner: "Chelsea", tags: ["build", "technical", "architecture"],
      audience: ["Sponsor", "Developer", "Academic Supervisor"], thumb: "arch", googleDocs: false,
      views: 0, downloads: 0,
      content: `<h2>Portal Build Summary</h2>
<p>A technical and strategic overview of how the Daily Living Labs Knowledge Portal was designed and built for the Spring 2026 capstone project.</p>
<h3>Technology Stack</h3>
<ul>
  <li><strong>React 18</strong> — UI rendering and state management (UMD/CDN, no build step required)</li>
  <li><strong>Babel Standalone</strong> — In-browser JSX transpilation across five source files</li>
  <li><strong>Supabase</strong> — Authentication, PostgreSQL database, file storage, and realtime subscriptions</li>
  <li><strong>Inter, Fraunces, JetBrains Mono</strong> — Google Fonts typography system</li>
  <li><strong>Vanilla CSS</strong> — Design tokens via CSS custom properties, full light and dark mode support</li>
</ul>
<h3>Architecture</h3>
<p>All database tables use a single unified schema: <code>id text PK, data jsonb, created_at timestamptz</code>. Every entity (document, activity entry, sign-off submission) is stored as a complete JSON object in the <code>data</code> column. This eliminates schema migrations when fields are added and keeps the API layer minimal.</p>
<p>Components are split across four Babel-transpiled files — <code>icons.jsx</code>, <code>components.jsx</code>, <code>pages.jsx</code>, and <code>app.jsx</code> — each exporting to <code>window</code> via <code>Object.assign</code> so later files can reference earlier ones without a module bundler.</p>
<h3>Key Features Shipped</h3>
<ul>
  <li>Document library with upload, versioning, tagging, and Google Docs integration</li>
  <li>Live search dropdown across titles, descriptions, and tags</li>
  <li>Stakeholder sign-off checklists with PDF export via browser print dialog</li>
  <li>Big Ideas drag-and-drop sticky note board with categories and colors</li>
  <li>Analytics dashboard with inline bar charts and activity feed</li>
  <li>Realtime updates via Supabase Postgres change subscriptions</li>
  <li>Document comment threads with realtime sync across sessions</li>
  <li>Dark mode and Butterfly Mode easter egg</li>
  <li>Onboarding tour and profile setup nudge for new users</li>
  <li>Read tracking: Start Here and Dashboard show which docs you have opened</li>
</ul>
<h3>Design System</h3>
<p>The portal uses a lavender-forward brand palette (<code>--primary: #6B21D9</code>) built entirely with CSS custom properties. The system supports both light and dark mode via a <code>[data-theme="dark"]</code> attribute on the root element. Display headings use Fraunces, body copy uses Inter, and code elements use JetBrains Mono.</p>` },
    { id: "d19", title: "Portal Functional Requirements", description: "Core functional requirements for the Knowledge Portal MVP, organized by feature area.",
      phase: "Spring 2026", category: "Technical Documentation", status: "Approved", needsReview: false,
      version: "1.3", updated: "2026-05-07", owner: "Chelsea", tags: ["requirements", "MVP", "specs"],
      audience: ["Sponsor", "Developer", "Academic Supervisor"], thumb: "specs", googleDocs: false,
      views: 0, downloads: 0,
      content: `<h2>Functional Requirements</h2>
<p>Core functional requirements for the Daily Living Labs Knowledge Portal MVP, organized by feature area. Version 1.3 — Spring 2026.</p>
<h3>Authentication</h3>
<ul>
  <li><strong>FR-001</strong> Users must sign in with email and password before accessing any portal content</li>
  <li><strong>FR-002</strong> Users can create accounts; email confirmation is required before first sign-in</li>
  <li><strong>FR-003</strong> Users can set a display name, avatar emoji, and role from their profile settings</li>
</ul>
<h3>Document Management</h3>
<ul>
  <li><strong>FR-004</strong> Admins can upload documents with metadata: title, description, phase, category, version, status, tags, and audience</li>
  <li><strong>FR-005</strong> Documents can link to external Google Docs URLs for collaborative editing</li>
  <li><strong>FR-006</strong> Users can search documents by title, description, and tags with a live dropdown showing instant results</li>
  <li><strong>FR-007</strong> Documents automatically track view and download counts, updated on each interaction</li>
  <li><strong>FR-008</strong> Documents can be flagged for review, archived, or permanently deleted by admins</li>
</ul>
<h3>Sign-Off Workflow</h3>
<ul>
  <li><strong>FR-009</strong> Stakeholders complete structured sign-off checklists per project phase</li>
  <li><strong>FR-010</strong> Each checklist item can be approved, conditionally approved, or deferred with optional notes</li>
  <li><strong>FR-011</strong> Completed sign-offs generate a printable PDF summary via the browser print dialog</li>
  <li><strong>FR-012</strong> Deferred items are tracked in a Future Work register accessible from the admin panel</li>
</ul>
<h3>Collaboration</h3>
<ul>
  <li><strong>FR-013</strong> Team members can post Big Ideas to a shared sticky note board with categories and color coding</li>
  <li><strong>FR-014</strong> Document viewers can leave comments on individual documents</li>
  <li><strong>FR-015</strong> Comments and new documents sync in realtime across all open browser sessions via Supabase subscriptions</li>
</ul>
<h3>Analytics</h3>
<ul>
  <li><strong>FR-016</strong> The portal tracks document views, downloads, edits, and user activity in an activity log</li>
  <li><strong>FR-017</strong> An analytics dashboard shows top viewed and downloaded documents with inline bar charts</li>
  <li><strong>FR-018</strong> A changelog page documents version history and feature releases for transparency</li>
</ul>
<h3>Out of Scope for MVP</h3>
<ul>
  <li>Role-based access control — all authenticated users have equal permissions in MVP</li>
  <li>AI-powered semantic document search across PDF contents</li>
  <li>Email notifications or automated digest summaries</li>
  <li>Native mobile application</li>
</ul>` }
  ],

  bigIdeas: [
    { id: "i1", title: "Adaptive Onboarding Experience", desc: "Personalize Start Here per stakeholder role.", author: "Alex K.", category: "Future Feature", color: "yellow", x: 0, y: 0 },
    { id: "i2", title: "AI-Powered Search Enhancements", desc: "Semantic search across PDF contents.", author: "Jamie L.", category: "Technical Improvement", color: "pink", x: 0, y: 0 },
    { id: "i3", title: "Unified Component Library", desc: "Shared UI kit across DLL products.", author: "Taylor S.", category: "Technical Improvement", color: "mint", x: 0, y: 0 },
    { id: "i4", title: "Data Insights for Daily Living Outcomes", desc: "Tie analytics to lived-experience metrics.", author: "Priya M.", category: "Research Opportunity", color: "blue", x: 0, y: 0 },
    { id: "i5", title: "Accessible Sticky Note Reordering", desc: "Keyboard shortcuts to rearrange notes.", author: "Anonymous", category: "Accessibility Improvement", color: "lavender", x: 0, y: 0 },
    { id: "i6", title: "Sponsor Quarterly Digest", desc: "Auto-summarize portal activity each quarter.", author: "Chelsea", category: "Content Idea", color: "peach", x: 0, y: 0 }
  ],

  activity: [
    { id: "a1", type: "view", title: "Style Guide", who: "you", when: "2h ago" },
    { id: "a2", type: "edit", title: "Functional Requirements v1.3", who: "Jamie Lee", when: "5h ago" },
    { id: "a3", type: "view", title: "Stakeholder Interview Summary", who: "Taylor Smith", when: "Yesterday" },
    { id: "a4", type: "download", title: "Project Overview", who: "you", when: "2d ago" },
    { id: "a5", type: "review", title: "Data Governance Policy flagged", who: "Chelsea", when: "3d ago" }
  ],

  signoffForms: [
    { id: "sf-branding", title: "Branding Sign-Off", subtitle: "Approve brand colors, type system, logo usage, and visual identity guidelines.",
      icon: "palette", owner: "Chelsea", phase: "Spring 2026",
      preparedBy: "Chelsea", preparedFor: "Daily Living Labs Sponsor",
      monthYear: "May 2026", version: "1.0",
      relatedDocIds: ["d4"],
      checklist: [
        { id: "b1", label: "Brand color palette and contrast ratios", relatedDocIds: ["d4"] },
        { id: "b2", label: "Typography system and hierarchy", relatedDocIds: ["d4"] },
        { id: "b3", label: "Logo usage and clear-space rules", relatedDocIds: ["d4"] },
        { id: "b4", label: "Iconography and illustration style", relatedDocIds: ["d4"] },
        { id: "b5", label: "Overall brand identity for the portal", relatedDocIds: ["d4"] }
      ] },
    { id: "sf-social", title: "Social Media Sign-Off", subtitle: "Approve social channels, voice, posting cadence, and visual templates.",
      icon: "share", owner: "Chelsea", phase: "Spring 2026",
      preparedBy: "Chelsea", preparedFor: "Daily Living Labs Sponsor",
      monthYear: "May 2026", version: "0.9",
      relatedDocIds: ["d8"],
      checklist: [
        { id: "s1", label: "Proposed channel strategy", relatedDocIds: ["d8"] },
        { id: "s2", label: "Voice & tone guidelines", relatedDocIds: ["d8"] },
        { id: "s3", label: "Post-template visual system", relatedDocIds: ["d4", "d8"] },
        { id: "s4", label: "Overall social media plan", relatedDocIds: ["d8"] }
      ] },
    { id: "sf-tech", title: "Tech Stack Sign-Off", subtitle: "Approve hosting, frameworks, integrations, and data architecture.",
      icon: "code", owner: "Chelsea", phase: "Fall 2026",
      preparedBy: "Chelsea", preparedFor: "Daily Living Labs Sponsor",
      monthYear: "September 2026", version: "0.4",
      relatedDocIds: ["d11", "d12"],
      checklist: [
        { id: "t1", label: "Front-end framework choice", relatedDocIds: ["d11"] },
        { id: "t2", label: "Hosting and CI/CD plan", relatedDocIds: ["d11"] },
        { id: "t3", label: "Third-party integrations", relatedDocIds: ["d12"] },
        { id: "t4", label: "Data and storage model", relatedDocIds: ["d10", "d11"] },
        { id: "t5", label: "Overall technical stack", relatedDocIds: ["d11", "d12"] }
      ] },
    { id: "sf-fsr", title: "Future State Recommendations", subtitle: "Acknowledge post-MVP recommendations and the prioritized roadmap.",
      icon: "compass", owner: "Chelsea", phase: "Future Work",
      preparedBy: "Chelsea", preparedFor: "Daily Living Labs Sponsor",
      monthYear: "May 2026", version: "0.8",
      relatedDocIds: ["d5"],
      checklist: [
        { id: "f1", label: "Recommended next-phase features", relatedDocIds: ["d5", "d13"] },
        { id: "f2", label: "Items out of scope for MVP", relatedDocIds: ["d5"] },
        { id: "f3", label: "Prioritization rationale", relatedDocIds: ["d5"] },
        { id: "f4", label: "Future-state roadmap as a working plan", relatedDocIds: ["d5", "d14"] }
      ] }
  ],

  timeline: [
    { id: "t1", date: "2026-05-20", title: "Design Review Workshop", phase: "Spring 2026", status: "Upcoming" },
    { id: "t2", date: "2026-06-01", title: "Capstone Pitch", phase: "Spring 2026", status: "Milestone" },
    { id: "t3", date: "2026-06-17", title: "Governance Committee Meeting", phase: "Spring 2026", status: "Upcoming" },
    { id: "t4", date: "2026-07-01", title: "Summer Build Kickoff", phase: "Spring 2026", status: "Upcoming" },
    { id: "t5", date: "2026-08-25", title: "Fall 2026 Phase Begins", phase: "Fall 2026", status: "Milestone" },
    { id: "t6", date: "2026-09-15", title: "Technical Architecture Sign-Off", phase: "Fall 2026", status: "Upcoming" },
    { id: "t7", date: "2026-10-20", title: "Mid-Capstone Review", phase: "Fall 2026", status: "Upcoming" },
    { id: "t8", date: "2026-12-05", title: "Capstone Presentation", phase: "Fall 2026", status: "Milestone" }
  ]
};
