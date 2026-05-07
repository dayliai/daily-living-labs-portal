// ============== Main App ==============

const Lock = ({ onUnlock }) => {
  const [pass, setPass] = React.useState("");
  const [err, setErr] = React.useState("");
  const inputRef = React.useRef(null);
  React.useEffect(() => { inputRef.current && inputRef.current.focus(); }, []);

  const submit = (e) => {
    e.preventDefault();
    if (pass.trim().toLowerCase() === "dailydayli") {
      onUnlock();
    } else {
      setErr("That passphrase doesn't match. Try again.");
      setPass("");
    }
  };

  return (
    <div className="lock">
      <div className="lock__card">
        <div className="lock__brand" aria-hidden="true">🦋</div>
        <h1>Daily Living Labs Knowledge Portal</h1>
        <p>Enter the shared passphrase to access the project documentation hub.</p>
        <form onSubmit={submit}>
          <label htmlFor="pass" className="sr-only">Passphrase</label>
          <input ref={inputRef} id="pass" type="password" value={pass}
                 onChange={(e) => { setPass(e.target.value); setErr(""); }}
                 placeholder="Enter passphrase"
                 aria-invalid={!!err} aria-describedby={err ? "pass-err" : undefined} />
          <div className="lock__error" id="pass-err" role="alert">{err}</div>
          <button type="submit" className="btn btn--primary lock__btn">
            <Icon name="lock" size={14} /> Unlock portal
          </button>
        </form>
        <div className="lock__hint">A capstone project for Daily Living Labs · UNT</div>
      </div>
    </div>
  );
};

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "home" },
  { id: "start", label: "Start Here", icon: "compass" },
  { id: "calendar", label: "Calendar & Timeline", icon: "calendar" },
  { id: "documents", label: "Documents", icon: "doc" },
  { id: "signoff", label: "Sign-Off", icon: "check-circle" },
  { id: "ideas", label: "Big Ideas", icon: "lightbulb" },
  { id: "analytics", label: "Analytics", icon: "bar-chart" },
  { id: "admin", label: "Admin", icon: "settings" }
];

const UserMenu = ({ open, onClose, onSignOut, anchor = "top" }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div ref={ref} className={`user-menu user-menu--${anchor}`} role="menu" aria-label="Account menu">
      <div className="user-menu__header">
        <div className="avatar">CK</div>
        <div>
          <div className="user-menu__name">Chelsea</div>
          <div className="user-menu__role">Project Admin · chelsea@dailylivinglabs.com</div>
        </div>
      </div>
      <button className="user-menu__item" role="menuitem" onClick={onSignOut}>
        <Icon name="logout" size={14} /> Sign out
      </button>
    </div>
  );
};

const Sidebar = ({ active, onNav, reviewCount, userMenuOpen, setUserMenuOpen, onSignOut }) => (
  <aside className="sidebar" role="navigation" aria-label="Primary">
    <div className="sidebar__brand">
      <div className="sidebar__brand-mark" aria-hidden="true">🦋</div>
      <div className="sidebar__brand-text">Daily Living Labs<small>Knowledge Portal</small></div>
    </div>
    <nav className="sidebar__nav">
      {NAV_ITEMS.map(item => {
        const isActive = active === item.id ||
          (item.id === "documents" && ["documents", "docs-spring", "docs-fall", "docs-future"].includes(active));
        return (
          <button key={item.id}
                  className={`nav-item ${isActive ? "nav-item--active" : ""}`}
                  onClick={() => onNav(item.id)}
                  aria-current={isActive ? "page" : undefined}>
            <Icon name={item.icon} className="nav-item__icon" />
            {item.label}
            {item.id === "documents" && reviewCount > 0 && <span className="nav-item__badge" aria-label={`${reviewCount} need review`}>{reviewCount}</span>}
          </button>
        );
      })}
    </nav>
    <div className="sidebar__quote">
      <div className="sidebar__quote-text">Little ideas.<br/>Big impact.<br/>Together.</div>
      <div className="sidebar__quote-emoji" aria-hidden="true">🦋</div>
    </div>
    <div className="sidebar__user-wrap">
      <button className="sidebar__user" onClick={() => setUserMenuOpen(o => !o)} aria-haspopup="menu" aria-expanded={userMenuOpen}>
        <div className="avatar">CK</div>
        <div className="sidebar__user-info">
          <div className="sidebar__user-name">Chelsea</div>
          <div className="sidebar__user-role">Project Admin</div>
        </div>
        <Icon name="chevron-down" size={14} />
      </button>
      <UserMenu open={userMenuOpen} onClose={() => setUserMenuOpen(false)} onSignOut={onSignOut} anchor="bottom-left" />
    </div>
    <a className="sidebar__footer-link" href="https://www.dailylivinglabs.com" target="_blank" rel="noopener noreferrer">
      <Icon name="external" size={12} /> Visit Daily Living Labs
    </a>
  </aside>
);

const Topbar = ({ title, subtitle, search, setSearch, theme, setTheme, butterfly, setButterfly, onSearchSubmit, userMenuOpen, setUserMenuOpen, onSignOut }) => (

  <header className="topbar" role="banner">
    <div className="topbar__title">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
    <div className="search">
      <span className="search__icon" aria-hidden="true"><Icon name="search" size={16} /></span>
      <input type="search" placeholder="Search documents, ideas, people…"
             value={search} onChange={(e) => setSearch(e.target.value)}
             onKeyDown={(e) => { if (e.key === "Enter") onSearchSubmit(); }}
             aria-label="Search portal" />
      <span className="search__kbd" aria-hidden="true">⌘K</span>
    </div>
    <div className="toggle-group">
      <div className="theme-toggle" role="group" aria-label="Theme">
        <button aria-pressed={theme === "light"} aria-label="Light theme" onClick={() => setTheme("light")}><Icon name="sun" size={14} /></button>
        <button aria-pressed={theme === "dark"} aria-label="Dark theme" onClick={() => setTheme("dark")}><Icon name="moon" size={14} /></button>
      </div>
      <label className="switch" data-on={butterfly} onClick={() => setButterfly(!butterfly)} role="switch" aria-checked={butterfly} tabIndex={0}
             onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); setButterfly(!butterfly); } }}>
        <span className="switch__label"><span aria-hidden="true">🦋</span> Butterfly Mode</span>
        <span className="switch__track"><span className="switch__thumb"></span></span>
      </label>
      <div className="user-pill-wrap">
        <button className="user-pill" onClick={() => setUserMenuOpen(o => !o)} aria-haspopup="menu" aria-expanded={userMenuOpen} aria-label="Account menu">
          <div className="avatar">CK</div>
          <Icon name="chevron-down" size={14} />
        </button>
        <UserMenu open={userMenuOpen} onClose={() => setUserMenuOpen(false)} onSignOut={onSignOut} anchor="top-right" />
      </div>
    </div>
  </header>
);

// ============== Document Viewer Modal ==============
const DocViewer = ({ doc, onClose }) => {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!doc) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-labelledby="doc-modal-title" aria-modal="true">
        <div className="modal__header">
          <h2 className="modal__title" id="doc-modal-title">{doc.title}</h2>
          <span className={`badge badge--${doc.status === "Approved" ? "approved" : doc.status === "In Review" ? "review" : "draft"}`}>{doc.status}</span>
          <button className="modal__close" onClick={onClose} aria-label="Close viewer"><Icon name="x" size={18} /></button>
        </div>
        <div className="modal__body">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
            <div className="pdf-frame">
              <div className="pdf-placeholder">
                <Icon name="doc" size={48} />
                <div style={{ textAlign: "center" }}>
                  <strong>{doc.title}</strong>
                  <div style={{ fontSize: 11, marginTop: 4, color: "var(--text-3)" }}>
                    Embedded PDF preview · v{doc.version}
                  </div>
                </div>
                <div style={{ fontSize: 11, color: "var(--text-3)" }}>
                  In production, this renders the stable PDF inline.
                </div>
              </div>
            </div>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: 14, marginTop: 0 }}>Document details</h4>
              <dl style={{ fontSize: 12, lineHeight: 1.6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", padding: "6px 0" }}>
                  <dt style={{ color: "var(--text-3)" }}>Phase</dt><dd style={{ margin: 0, fontWeight: 500 }}>{doc.phase}</dd>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", padding: "6px 0" }}>
                  <dt style={{ color: "var(--text-3)" }}>Category</dt><dd style={{ margin: 0, fontWeight: 500 }}>{doc.category}</dd>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", padding: "6px 0" }}>
                  <dt style={{ color: "var(--text-3)" }}>Version</dt><dd style={{ margin: 0, fontWeight: 500 }}>{doc.version}</dd>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", padding: "6px 0" }}>
                  <dt style={{ color: "var(--text-3)" }}>Updated</dt><dd style={{ margin: 0, fontWeight: 500 }}>{fmtDate(doc.updated)}</dd>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", padding: "6px 0" }}>
                  <dt style={{ color: "var(--text-3)" }}>Owner</dt><dd style={{ margin: 0, fontWeight: 500 }}>{doc.owner}</dd>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", padding: "6px 0" }}>
                  <dt style={{ color: "var(--text-3)" }}>Views</dt><dd style={{ margin: 0, fontWeight: 500 }}>{doc.views.toLocaleString()}</dd>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
                  <dt style={{ color: "var(--text-3)" }}>Downloads</dt><dd style={{ margin: 0, fontWeight: 500 }}>{doc.downloads.toLocaleString()}</dd>
                </div>
              </dl>
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 4 }}>Tags</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {doc.tags.map(t => <span key={t} className="chip">{t}</span>)}
                </div>
              </div>
            </div>
          </div>
          <p style={{ marginTop: 16, fontSize: 13, color: "var(--text-2)" }}>{doc.description}</p>
        </div>
        <div className="modal__footer">
          {doc.googleDocs && <button className="btn btn--ghost"><Icon name="google-doc" size={14} /> Open in Google Docs</button>}
          <button className="btn btn--ghost"><Icon name="download" size={14} /> Download PDF</button>
          <button className="btn btn--primary" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
};

// ============== Dashboard view ==============
const Dashboard = ({ docs, ideas, activity, timeline, onView, onDownload, onOpenDoc, onNav, onToggleReview }) => {
  const featured = docs.filter(d => d.phase === "Spring 2026" && d.status === "Approved").slice(0, 4);
  const phaseCount = (p) => docs.filter(d => d.phase === p).length;

  return (
    <div className="dashboard">
      <div className="col-12">
        <StartHere onNavigate={(id) => {
          const map = { exec: "Executive Summary", overview: "Project Overview", specs: "Functional & Technical Requirements",
                        style: "Style Guide", future: "Future State Recommendations" };
          const doc = docs.find(d => d.title === map[id]);
          if (doc) onView(doc);
        }} />
      </div>

      <div className="col-4">
        <PhaseCard name="Spring 2026" count={phaseCount("Spring 2026")} icon="🌱" modifier="spring"
          chips={[{ label: "Research", color: "green" }, { label: "Design", color: "lavender" }, { label: "Technical", color: "blue" }]}
          focus="Discovery, research, and early design foundations."
          onClick={() => onNav("docs-spring")} />
      </div>
      <div className="col-4">
        <PhaseCard name="Fall 2026" count={phaseCount("Fall 2026")} icon="🍂" modifier="fall"
          chips={[{ label: "Design", color: "lavender" }, { label: "Technical", color: "blue" }, { label: "Governance", color: "peach" }]}
          focus="Detailed design, build planning, and governance."
          onClick={() => onNav("docs-fall")} />
      </div>
      <div className="col-4">
        <PhaseCard name="Future Work" count={phaseCount("Future Work")} icon="🚀" modifier="future"
          chips={[{ label: "Technical", color: "blue" }, { label: "Governance", color: "peach" }, { label: "Strategy", color: "lavender" }]}
          focus="Roadmap items, future enhancements, and innovation."
          onClick={() => onNav("docs-future")} />
      </div>

      <div className="col-4"><NeedsReview docs={docs} onFlag={onToggleReview} onViewAll={() => onNav("documents")} /></div>
      <div className="col-4"><RecentActivity items={activity} /></div>
      <div className="col-4"><TimelineWidget items={timeline} onViewAll={() => onNav("calendar")} /></div>

      <div className="col-4"><AnalyticsSnapshot docs={docs} onViewAll={() => onNav("analytics")} /></div>
      <div className="col-8">
        <section className="card">
          <div className="card__header">
            <h3 className="card__title">Big Ideas</h3>
            <a className="card__link" href="#" onClick={(e) => { e.preventDefault(); onNav("ideas"); }}>View all ideas</a>
          </div>
          <BigIdeasBoard ideas={ideas} draggable={false} compact={true} />
        </section>
      </div>

      <div className="col-12">
        <section className="card">
          <div className="card__header">
            <h3 className="card__title">Featured Documents</h3>
            <a className="card__link" href="#" onClick={(e) => { e.preventDefault(); onNav("documents"); }}>View all documents</a>
          </div>
          <div className="docs-row">
            {featured.map(d => <DocCard key={d.id} doc={d} onView={onView} onDownload={onDownload} onOpenDoc={onOpenDoc} />)}
          </div>
        </section>
      </div>
    </div>
  );
};

// ============== Toast ==============
const Toast = ({ msg, onDone }) => {
  React.useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="toast" role="status" aria-live="polite">
      <Icon name="check-circle" size={16} /> {msg}
    </div>
  );
};

// ============== App root ==============
const App = () => {
  const [unlocked, setUnlocked] = React.useState(() => sessionStorage.getItem("dll_unlocked") === "1");
  const [view, setView] = React.useState("dashboard");
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [topUserMenuOpen, setTopUserMenuOpen] = React.useState(false);
  const onSignOut = () => {
    sessionStorage.removeItem("dll_unlocked");
    setUnlocked(false);
    setUserMenuOpen(false);
    setTopUserMenuOpen(false);
    setView("dashboard");
  };
  const [theme, setTheme] = React.useState(() => localStorage.getItem("dll_theme") || "light");
  const [butterfly, setButterfly] = React.useState(() => localStorage.getItem("dll_butterfly") === "1");
  const [search, setSearch] = React.useState("");
  const [docs, setDocs] = React.useState(() => {
    const saved = localStorage.getItem("dll_docs");
    return saved ? JSON.parse(saved) : window.SEED.documents;
  });
  const [ideas, setIdeas] = React.useState(() => {
    const saved = localStorage.getItem("dll_ideas");
    return saved ? JSON.parse(saved) : window.SEED.bigIdeas;
  });
  const [activeDoc, setActiveDoc] = React.useState(null);
  const [toast, setToast] = React.useState("");
  const [events, setEvents] = React.useState(() => {
    const SCHEMA_VERSION = 2;
    const savedVersion = parseInt(localStorage.getItem("dll_events_v") || "0", 10);
    const saved = localStorage.getItem("dll_events");
    if (saved && savedVersion >= SCHEMA_VERSION) return JSON.parse(saved);
    localStorage.setItem("dll_events_v", String(SCHEMA_VERSION));
    return (window.SEED.timeline || []).map(t => ({
      id: t.id, title: t.title, date: t.date, phase: t.phase,
      category: t.status === "Milestone" ? "Milestone" : "Meeting", notes: ""
    }));
  });
  const [signoffForms, setSignoffForms] = React.useState(() => {
    const SCHEMA_VERSION = 4;
    const savedVersion = parseInt(localStorage.getItem("dll_signoff_forms_v") || "0", 10);
    const saved = localStorage.getItem("dll_signoff_forms");
    if (saved && savedVersion >= SCHEMA_VERSION) return JSON.parse(saved);
    localStorage.setItem("dll_signoff_forms_v", String(SCHEMA_VERSION));
    return window.SEED.signoffForms;
  });
  const [submissions, setSubmissions] = React.useState(() => {
    const saved = localStorage.getItem("dll_submissions");
    return saved ? JSON.parse(saved) : [];
  });
  const [deferredItems, setDeferredItems] = React.useState(() => {
    const saved = localStorage.getItem("dll_deferred_items");
    return saved ? JSON.parse(saved) : [];
  });

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("dll_theme", theme);
  }, [theme]);

  React.useEffect(() => {
    document.body.classList.toggle("butterfly-cursor", butterfly);
    localStorage.setItem("dll_butterfly", butterfly ? "1" : "0");
  }, [butterfly]);

  React.useEffect(() => { localStorage.setItem("dll_docs", JSON.stringify(docs)); }, [docs]);
  React.useEffect(() => { localStorage.setItem("dll_ideas", JSON.stringify(ideas)); }, [ideas]);
  React.useEffect(() => { localStorage.setItem("dll_events", JSON.stringify(events)); }, [events]);
  React.useEffect(() => { localStorage.setItem("dll_signoff_forms", JSON.stringify(signoffForms)); }, [signoffForms]);
  React.useEffect(() => { localStorage.setItem("dll_submissions", JSON.stringify(submissions)); }, [submissions]);
  React.useEffect(() => { localStorage.setItem("dll_deferred_items", JSON.stringify(deferredItems)); }, [deferredItems]);

  // Cmd/Ctrl-K focuses search
  React.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const inp = document.querySelector(".search input");
        inp && inp.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!unlocked) {
    return <Lock onUnlock={() => { sessionStorage.setItem("dll_unlocked", "1"); setUnlocked(true); }} />;
  }

  const onView = (doc) => {
    setActiveDoc(doc);
    setDocs(prev => prev.map(d => d.id === doc.id ? { ...d, views: d.views + 1 } : d));
  };
  const onDownload = (doc) => {
    setDocs(prev => prev.map(d => d.id === doc.id ? { ...d, downloads: d.downloads + 1 } : d));
    setToast(`Downloaded ${doc.title}`);
  };
  const onOpenDoc = (doc) => setToast(`Opening ${doc.title} in Google Docs…`);
  const onToggleReview = (id) => setDocs(prev => prev.map(d => d.id === id ? { ...d, needsReview: !d.needsReview } : d));
  const onAddIdea = (idea) => { setIdeas(prev => [idea, ...prev]); setToast("Idea posted to the board!"); };
  const onHideIdea = (id) => setIdeas(prev => prev.filter(i => i.id !== id));
  const onArchive = (id) => { setDocs(prev => prev.map(d => d.id === id ? { ...d, archived: true } : d)); setToast("Document archived"); };
  const onUnarchive = (id) => { setDocs(prev => prev.map(d => d.id === id ? { ...d, archived: false } : d)); setToast("Document restored"); };
  const onDelete = (id) => { setDocs(prev => prev.filter(d => d.id !== id)); setToast("Document permanently deleted"); };
  const onUpload = (meta) => {
    const newDoc = { id: "d" + Date.now(), ...meta, needsReview: false,
      updated: new Date().toISOString().slice(0, 10), audience: meta.audience || ["Sponsor"],
      thumb: meta.thumb || "exec", googleDocs: false, views: 0, downloads: 0 };
    setDocs(prev => [newDoc, ...prev]);
    setToast(`"${meta.title}" added to library`);
  };
  const onEditDoc = (updated) => { setDocs(prev => prev.map(d => d.id === updated.id ? updated : d)); setToast("Document updated"); };
  const onAddSignoffForm = (f) => { setSignoffForms(prev => [...prev, f]); setToast(`"${f.title}" form created`); };
  const onDeleteSignoffForm = (id) => { setSignoffForms(prev => prev.filter(f => f.id !== id)); setToast("Form deleted"); };
  const onSubmitSignoff = (sub) => {
    setSubmissions(prev => [sub, ...prev]);
    const newDeferred = (sub.items || []).filter(it => it.decision === "defer").map(it => ({
      id: `def-${sub.formId}-${it.id}-${Date.now()}`,
      itemId: it.id,
      itemLabel: it.label,
      formId: sub.formId,
      formTitle: sub.formTitle,
      formPhase: sub.formPhase,
      preparedBy: sub.preparedBy,
      deferredAt: sub.submittedAt,
      relatedDocIds: it.relatedDocIds || [],
      context: it.context || ""
    }));
    if (newDeferred.length > 0) {
      setDeferredItems(prev => [...newDeferred, ...prev]);
    }
    const msg = newDeferred.length > 0
      ? `Sign-off submitted — ${newDeferred.length} item${newDeferred.length === 1 ? "" : "s"} moved to Future Work`
      : "Sign-off submitted and PDF generated!";
    setToast(msg);
  };
  const onRemoveDeferred = (id) => { setDeferredItems(prev => prev.filter(d => d.id !== id)); setToast("Deferred item removed"); };

  const reviewCount = docs.filter(d => d.needsReview).length;

  const headers = {
    dashboard: { title: "Daily Living Labs Knowledge Portal", subtitle: "Centralized documentation, review, and future planning." },
    start: { title: "Daily Living Labs Knowledge Portal", subtitle: "Centralized documentation, review, and future planning." },
    documents: { title: "Daily Living Labs Knowledge Portal", subtitle: "Centralized documentation, review, and future planning." },
    "docs-spring": { title: "Daily Living Labs Knowledge Portal", subtitle: "Centralized documentation, review, and future planning." },
    "docs-fall": { title: "Daily Living Labs Knowledge Portal", subtitle: "Centralized documentation, review, and future planning." },
    "docs-future": { title: "Daily Living Labs Knowledge Portal", subtitle: "Centralized documentation, review, and future planning." },
    calendar: { title: "Daily Living Labs Knowledge Portal", subtitle: "Centralized documentation, review, and future planning." },
    signoff: { title: "Daily Living Labs Knowledge Portal", subtitle: "Centralized documentation, review, and future planning." },
    ideas: { title: "Daily Living Labs Knowledge Portal", subtitle: "Centralized documentation, review, and future planning." },
    analytics: { title: "Daily Living Labs Knowledge Portal", subtitle: "Centralized documentation, review, and future planning." },
    admin: { title: "Daily Living Labs Knowledge Portal", subtitle: "Centralized documentation, review, and future planning." }
  };

  return (
    <div className="app">
      <Sidebar active={view} onNav={setView} reviewCount={reviewCount}
               userMenuOpen={userMenuOpen} setUserMenuOpen={setUserMenuOpen} onSignOut={onSignOut} />
      <main className="main">
        <Topbar title={headers[view].title} subtitle={headers[view].subtitle}
                search={search} setSearch={setSearch}
                theme={theme} setTheme={setTheme}
                butterfly={butterfly} setButterfly={setButterfly}
                onSearchSubmit={() => setView("documents")}
                userMenuOpen={topUserMenuOpen} setUserMenuOpen={setTopUserMenuOpen} onSignOut={onSignOut} />
        <div className="page">
          {view === "dashboard" && (
            <Dashboard docs={docs} ideas={ideas} activity={window.SEED.activity} timeline={window.SEED.timeline}
                       onView={onView} onDownload={onDownload} onOpenDoc={onOpenDoc} onNav={setView} onToggleReview={onToggleReview} />
          )}
          {view === "start" && <StartHerePage docs={docs} onNav={setView} onView={onView} />}
          {view === "documents" && <DocumentsPage docs={docs} search={search} onView={onView} onDownload={onDownload} onOpenDoc={onOpenDoc} />}
          {view === "docs-spring" && <DocumentsPage docs={docs} search={search} onView={onView} onDownload={onDownload} onOpenDoc={onOpenDoc} onNav={setView} fixedPhase="Spring 2026" pageTitle="Spring 2026 Documents" pageSubtitle="Discovery, research, and early design foundations." />}
          {view === "docs-fall" && <DocumentsPage docs={docs} search={search} onView={onView} onDownload={onDownload} onOpenDoc={onOpenDoc} onNav={setView} fixedPhase="Fall 2026" pageTitle="Fall 2026 Documents" pageSubtitle="Detailed design, build planning, and governance." />}
          {view === "docs-future" && <DocumentsPage docs={docs} search={search} onView={onView} onDownload={onDownload} onOpenDoc={onOpenDoc} onNav={setView} fixedPhase="Future Work" pageTitle="Future Work Documents" pageSubtitle="Roadmap items, future enhancements, and innovation." deferredItems={deferredItems} onRemoveDeferred={onRemoveDeferred} allDocs={docs} />}
          {view === "calendar" && <CalendarPage events={events} setEvents={setEvents} />}
          {view === "signoff" && <SignOffPage forms={signoffForms} allDocs={docs} onSubmit={onSubmitSignoff} onView={onView} />}
          {view === "ideas" && <BigIdeasPage ideas={ideas} onAdd={onAddIdea} />}
          {view === "analytics" && <AnalyticsPage docs={docs} activity={window.SEED.activity} />}
          {view === "admin" && <AdminPage docs={docs} signoffForms={signoffForms} submissions={submissions} ideas={ideas}
            onToggleReview={onToggleReview} onArchive={onArchive} onUnarchive={onUnarchive} onDelete={onDelete}
            onUpload={onUpload} onEditDoc={onEditDoc}
            onAddSignoffForm={onAddSignoffForm} onDeleteSignoffForm={onDeleteSignoffForm}
            onHideIdea={onHideIdea} />}
        </div>
      </main>
      {activeDoc && <DocViewer doc={activeDoc} onClose={() => setActiveDoc(null)} />}
      {toast && <Toast msg={toast} onDone={() => setToast("")} />}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
