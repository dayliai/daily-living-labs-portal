// ============== Main App ==============

const AuthScreen = () => {
  const [tab, setTab] = React.useState("signin");
  const [form, setForm] = React.useState({ email: "", password: "" });
  const [err, setErr] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const up = (patch) => setForm(f => ({ ...f, ...patch }));

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true); setErr("");
    const { error } = await window.DLL_DB.signIn(form.email, form.password);
    if (error) { setErr(error.message); setLoading(false); }
  };

  const signUp = async (e) => {
    e.preventDefault();
    setLoading(true); setErr("");
    const { data, error } = await window.DLL_DB.signUp(form.email, form.password);
    if (error) { setErr(error.message); setLoading(false); return; }
    if (!data.session) {
      setMsg("Account created! Check your email to confirm, then sign in. You can set your name and avatar from the profile menu after logging in.");
      setLoading(false);
    }
  };

  return (
    <div className="lock">
      <div className="lock__card">
        <div className="lock__brand" aria-hidden="true">🦋</div>
        <h1>Daily Living Labs<br />Knowledge Portal</h1>
        <div className="auth-tabs">
          <button className={tab === "signin" ? "is-active" : ""} onClick={() => { setTab("signin"); setErr(""); setMsg(""); }}>Sign In</button>
          <button className={tab === "signup" ? "is-active" : ""} onClick={() => { setTab("signup"); setErr(""); setMsg(""); }}>Create Account</button>
        </div>
        {msg ? (
          <p style={{ textAlign: "center", color: "var(--text-2)", fontSize: 14 }}>{msg}</p>
        ) : tab === "signin" ? (
          <form onSubmit={signIn}>
            <div className="field"><label>Email</label>
              <input type="email" value={form.email} onChange={e => up({ email: e.target.value })} placeholder="you@example.com" required autoFocus />
            </div>
            <div className="field"><label>Password</label>
              <input type="password" value={form.password} onChange={e => up({ password: e.target.value })} placeholder="Your password" required />
            </div>
            <div className="lock__error" role="alert">{err}</div>
            <button type="submit" className="btn btn--primary lock__btn" disabled={loading}>
              <Icon name="lock" size={14} /> {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        ) : (
          <form onSubmit={signUp}>
            <div className="field"><label>Email</label>
              <input type="email" value={form.email} onChange={e => up({ email: e.target.value })} placeholder="you@example.com" required autoFocus />
            </div>
            <div className="field"><label>Password <span style={{ color: "var(--text-3)", fontSize: 11 }}>(min 6 chars)</span></label>
              <input type="password" value={form.password} onChange={e => up({ password: e.target.value })} placeholder="Create a password" required />
            </div>
            <div className="lock__error" role="alert">{err}</div>
            <button type="submit" className="btn btn--primary lock__btn" disabled={loading}>
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>
        )}
        <div className="lock__hint">Last updated May 7, 2026 · v1.0 · Created with Claude Design</div>
      </div>
    </div>
  );
};

const ProfileModal = ({ profile, email, onSave, onClose }) => {
  const [form, setForm] = React.useState({
    username: profile?.username || "",
    avatar_emoji: profile?.avatar_emoji || "🦋",
    role: profile?.role || ""
  });
  const up = (patch) => setForm(f => ({ ...f, ...patch }));
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal modal--narrow" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h2>Profile settings</h2>
          <button className="modal__close" onClick={onClose} title="Close"><Icon name="x" size={16} /></button>
        </div>
        <div className="modal__body">
          {email && <div style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 16 }}>Signed in as <strong>{email}</strong></div>}
          <div className="profile-avatar-preview">{form.avatar_emoji}</div>
          <div className="field">
            <label>Avatar</label>
            <div className="emoji-grid emoji-grid--avatar">
              {AVATAR_EMOJIS.map(em => (
                <button key={em} type="button" className={`emoji-grid__item ${form.avatar_emoji === em ? "is-selected" : ""}`} onClick={() => up({ avatar_emoji: em })}>{em}</button>
              ))}
            </div>
          </div>
          <div className="field">
            <label>Username</label>
            <input value={form.username} onChange={e => up({ username: e.target.value })} placeholder="Your display name" />
          </div>
          <div className="field">
            <label>Role</label>
            <input value={form.role} onChange={e => up({ role: e.target.value })} placeholder="e.g. Project Lead, Sponsor, Designer" />
          </div>
        </div>
        <div className="modal__footer">
          <button className="btn btn--ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn--primary" onClick={() => onSave(form)} disabled={!form.username.trim()}>Save</button>
        </div>
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

const AVATAR_EMOJIS = [
  "🦋","🌱","🌻","🌸","🐝","🌊","🔥","⭐","🎯","💡",
  "🦁","🐯","🦊","🐻","🐼","🦅","🦉","🌺","🍀","🎨",
  "🚀","🌙","☀️","🌈","🎵","🏔️","🌿","💜","🦄","🐬"
];

const UserAvatar = ({ profile, size = 20 }) => (
  <div className="avatar" style={{ fontSize: profile?.avatar_emoji ? size : undefined }}>
    {profile?.avatar_emoji || (profile?.username ? profile.username.slice(0, 2).toUpperCase() : "?")}
  </div>
);

const UserMenu = ({ open, onClose, onSignOut, onProfileOpen, profile, email, anchor = "top" }) => {
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
        <UserAvatar profile={profile} size={18} />
        <div>
          <div className="user-menu__name">{profile?.username || "User"}</div>
          <div className="user-menu__role">{profile?.role || "Team Member"}{email ? ` · ${email}` : ""}</div>
        </div>
      </div>
      <button className="user-menu__item" role="menuitem" onClick={() => { onProfileOpen(); onClose(); }}>
        <Icon name="settings" size={14} /> Profile settings
      </button>
      <button className="user-menu__item" role="menuitem" onClick={onSignOut}>
        <Icon name="logout" size={14} /> Sign out
      </button>
    </div>
  );
};

const Sidebar = ({ active, onNav, reviewCount, userMenuOpen, setUserMenuOpen, onSignOut, onProfileOpen, profile, email }) => (
  <aside className="sidebar" role="navigation" aria-label="Primary">
    <div className="sidebar__brand">
      <div className="sidebar__brand-mark" aria-hidden="true">🦋</div>
      <div className="sidebar__brand-text">Daily Living Labs<small>Knowledge Portal</small></div>
    </div>
    <nav className="sidebar__nav">
      {NAV_ITEMS.map(item => {
        const isActive = active === item.id ||
          (item.id === "documents" && ["documents", "docs-spring", "docs-summer", "docs-fall", "docs-future"].includes(active));
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
        <UserAvatar profile={profile} size={18} />
        <div className="sidebar__user-info">
          <div className="sidebar__user-name">{profile?.username || "User"}</div>
          <div className="sidebar__user-role">{profile?.role || "Team Member"}</div>
        </div>
        <Icon name="chevron-down" size={14} />
      </button>
      <UserMenu open={userMenuOpen} onClose={() => setUserMenuOpen(false)} onSignOut={onSignOut} onProfileOpen={onProfileOpen} profile={profile} email={email} anchor="bottom-left" />
    </div>
    <a className="sidebar__footer-link" href="https://www.dailylivinglabs.com" target="_blank" rel="noopener noreferrer">
      <Icon name="external" size={12} /> Visit Daily Living Labs
    </a>
  </aside>
);

const Topbar = ({ title, subtitle, search, setSearch, theme, setTheme, butterfly, setButterfly, onSearchSubmit, userMenuOpen, setUserMenuOpen, onSignOut, onProfileOpen, profile, email }) => (
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
        <button aria-pressed={theme === "light"} aria-label="Light theme" title="Light theme" onClick={() => setTheme("light")}><Icon name="sun" size={14} /></button>
        <button aria-pressed={theme === "dark"} aria-label="Dark theme" title="Dark theme" onClick={() => setTheme("dark")}><Icon name="moon" size={14} /></button>
      </div>
      <label className="switch" data-on={butterfly} onClick={() => setButterfly(!butterfly)} role="switch" aria-checked={butterfly} tabIndex={0}
             onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); setButterfly(!butterfly); } }}>
        <span className="switch__label"><span aria-hidden="true">🦋</span> Butterfly Mode</span>
        <span className="switch__track"><span className="switch__thumb"></span></span>
      </label>
      <div className="user-pill-wrap">
        <button className="user-pill" onClick={() => setUserMenuOpen(o => !o)} aria-haspopup="menu" aria-expanded={userMenuOpen} aria-label="Account menu">
          <UserAvatar profile={profile} size={18} />
          <Icon name="chevron-down" size={14} />
        </button>
        <UserMenu open={userMenuOpen} onClose={() => setUserMenuOpen(false)} onSignOut={onSignOut} onProfileOpen={onProfileOpen} profile={profile} email={email} anchor="top-right" />
      </div>
    </div>
  </header>
);

// ============== Document Viewer Modal ==============
const DocViewer = ({ doc, onClose, onDownload }) => {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!doc) return null;

  const ext = doc.filename ? doc.filename.split(".").pop().toLowerCase() : "";
  const renderPreview = () => {
    if (!doc.fileUrl) {
      return (
        <div className="pdf-placeholder">
          <Icon name="doc" size={48} />
          <div style={{ textAlign: "center" }}>
            <strong>{doc.title}</strong>
            <div style={{ fontSize: 11, marginTop: 4, color: "var(--text-3)" }}>No file attached · v{doc.version}</div>
          </div>
        </div>
      );
    }
    if (ext === "pdf") {
      return <iframe src={doc.fileUrl} title={doc.title} style={{ width: "100%", height: "100%", border: "none", borderRadius: 8 }} />;
    }
    if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(ext)) {
      return <img src={doc.fileUrl} alt={doc.title} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 8 }} />;
    }
    return (
      <div className="pdf-placeholder">
        <Icon name="doc" size={48} />
        <div style={{ textAlign: "center" }}>
          <strong>{doc.title}</strong>
          <div style={{ fontSize: 11, marginTop: 4, color: "var(--text-3)" }}>{doc.filename || "Document"}</div>
        </div>
        <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--small">Open file</a>
      </div>
    );
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-labelledby="doc-modal-title" aria-modal="true">
        <div className="modal__header">
          <h2 className="modal__title" id="doc-modal-title">{doc.title}</h2>
          <span className={`badge badge--${doc.status === "Approved" ? "approved" : doc.status === "For Review" ? "review" : doc.status === "Archived" ? "archived" : "draft"}`}>{doc.status}</span>
          <button className="modal__close" onClick={onClose} aria-label="Close viewer" title="Close"><Icon name="x" size={18} /></button>
        </div>
        <div className="modal__body">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
            <div className="pdf-frame">
              {renderPreview()}
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
          {doc.fileUrl && (
            <button className="btn btn--ghost" onClick={() => onDownload && onDownload(doc)}>
              <Icon name="download" size={14} /> Download
            </button>
          )}
          <button className="btn btn--primary" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
};

// ============== Dashboard view ==============
const Dashboard = ({ docs, ideas, activity, timeline, onView, onDownload, onOpenDoc, onNav, onToggleReview }) => {
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

      <div className="col-3">
        <PhaseCard name="Spring 2026" count={phaseCount("Spring 2026")} icon="🌱" modifier="spring"
          chips={[{ label: "Research", color: "green" }, { label: "Design", color: "lavender" }, { label: "Technical", color: "blue" }]}
          focus="Discovery, research, and early design foundations."
          onClick={() => onNav("docs-spring")} />
      </div>
      <div className="col-3">
        <PhaseCard name="Summer 2026" count={phaseCount("Summer 2026")} icon="☀️" modifier="summer"
          chips={[{ label: "Design", color: "lavender" }, { label: "Research", color: "green" }, { label: "Testing", color: "blue" }]}
          focus="Prototyping, user testing, and design iteration."
          onClick={() => onNav("docs-summer")} />
      </div>
      <div className="col-3">
        <PhaseCard name="Fall 2026" count={phaseCount("Fall 2026")} icon="🍂" modifier="fall"
          chips={[{ label: "Design", color: "lavender" }, { label: "Technical", color: "blue" }, { label: "Governance", color: "peach" }]}
          focus="Detailed design, build planning, and governance."
          onClick={() => onNav("docs-fall")} />
      </div>
      <div className="col-3">
        <PhaseCard name="Future Work" count={phaseCount("Future Work")} icon="🚀" modifier="future"
          chips={[{ label: "Technical", color: "blue" }, { label: "Governance", color: "peach" }, { label: "Strategy", color: "lavender" }]}
          focus="Roadmap items, future enhancements, and innovation."
          onClick={() => onNav("docs-future")} />
      </div>

      <div className="col-4"><NeedsReview docs={docs} onFlag={onToggleReview} onViewAll={() => onNav("documents")} /></div>
      <div className="col-4"><RecentActivity items={activity} onViewAll={() => onNav("analytics")} /></div>
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

// ============== Loading screen ==============
const LoadingScreen = () => (
  <div className="lock">
    <div className="lock__card" style={{ textAlign: "center" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🦋</div>
      <div style={{ color: "var(--text-3)", fontSize: 14 }}>Loading portal…</div>
    </div>
  </div>
);

// ============== App root ==============
const App = () => {
  const [authChecked, setAuthChecked] = React.useState(false);
  const [unlocked, setUnlocked] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [profile, setProfile] = React.useState(null);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [view, setView] = React.useState("dashboard");
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [topUserMenuOpen, setTopUserMenuOpen] = React.useState(false);

  React.useEffect(() => {
    window.DLL_DB.getSession().then(({ data: { session } }) => {
      if (session) { setCurrentUser(session.user); setUnlocked(true); }
      setAuthChecked(true);
    });
    const { data: { subscription } } = window.DLL_DB.onAuthStateChange((event, session) => {
      if (session) { setCurrentUser(session.user); setUnlocked(true); }
      else { setCurrentUser(null); setUnlocked(false); }
    });
    return () => subscription.unsubscribe();
  }, []);

  React.useEffect(() => {
    if (!currentUser) {
      setProfile(null); setDocs([]); setIdeas([]); setActivity([]);
      setEventsRaw([]); setSignoffForms([]); setSubmissions([]);
      setDeferredItems([]); setDbReady(false); loadedRef.current = false;
    }
  }, [currentUser]);

  const onSignOut = async () => {
    setUserMenuOpen(false); setTopUserMenuOpen(false); setView("dashboard");
    await window.DLL_DB.signOut();
  };

  const onSaveProfile = async (updates) => {
    if (!currentUser) return;
    const updated = { id: currentUser.id, ...updates };
    await window.DLL_DB.upsertProfile(updated);
    setProfile(updated);
    setProfileOpen(false);
  };

  const [theme, setTheme] = React.useState(() => localStorage.getItem("dll_theme") || "light");
  const [butterfly, setButterfly] = React.useState(() => localStorage.getItem("dll_butterfly") === "1");
  const [search, setSearch] = React.useState("");

  // DB load state
  const [dbReady, setDbReady] = React.useState(false);
  const loadedRef = React.useRef(false);

  // Data — starts empty; loaded from Supabase after unlock
  const [docs, setDocs] = React.useState([]);
  const [ideas, setIdeas] = React.useState([]);
  const [activity, setActivity] = React.useState([]);
  const [activeDoc, setActiveDoc] = React.useState(null);
  const [toast, setToast] = React.useState("");
  const [eventsRaw, setEventsRaw] = React.useState([]);
  const [signoffForms, setSignoffForms] = React.useState([]);
  const [submissions, setSubmissions] = React.useState([]);
  const [deferredItems, setDeferredItems] = React.useState([]);

  // Wrapped setEvents: diffs prev vs next and syncs only changed rows to DB
  const setEvents = React.useCallback((updater) => {
    setEventsRaw(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      if (loadedRef.current) {
        const prevMap = new Map(prev.map(e => [e.id, e]));
        const nextMap = new Map(next.map(e => [e.id, e]));
        prev.forEach(e => { if (!nextMap.has(e.id)) window.DLL_DB.deleteOne("events", e.id); });
        next.forEach(e => { if (!prevMap.has(e.id) || prevMap.get(e.id) !== e) window.DLL_DB.upsertOne("events", e); });
      }
      return next;
    });
  }, []);

  // Load all data from Supabase once the user is authenticated
  React.useEffect(() => {
    if (!currentUser) return;
    const load = async () => {
      const dbProfile = await window.DLL_DB.getProfile(currentUser.id);
      setProfile(dbProfile || { username: currentUser.email?.split("@")[0] || "User", avatar_emoji: "🦋", role: "Team Member" });
      const [dbDocs, dbIdeas, dbEvts, dbForms, dbSubs, dbDeferred, dbActivity] = await Promise.all([
        window.DLL_DB.getAll("documents"),
        window.DLL_DB.getAll("big_ideas"),
        window.DLL_DB.getAll("events"),
        window.DLL_DB.getAll("signoff_forms"),
        window.DLL_DB.getAllDesc("submissions"),
        window.DLL_DB.getAll("deferred_items"),
        window.DLL_DB.getAllDesc("activity"),
      ]);

      setDocs(dbDocs);
      setIdeas(dbIdeas);
      setEventsRaw(dbEvts);
      setSignoffForms(dbForms);
      setSubmissions(dbSubs);
      setDeferredItems(dbDeferred);
      setActivity(dbActivity);

      loadedRef.current = true;
      setDbReady(true);
    };
    load();
  }, [currentUser?.id]);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("dll_theme", theme);
  }, [theme]);

  React.useEffect(() => {
    document.body.classList.toggle("butterfly-cursor", butterfly);
    localStorage.setItem("dll_butterfly", butterfly ? "1" : "0");
  }, [butterfly]);

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

  if (!authChecked) return <LoadingScreen />;
  if (!unlocked) return <AuthScreen />;
  if (!dbReady) return <LoadingScreen />;

  // ---- Handlers (all persist to Supabase) ----

  const logActivity = (type, title) => {
    const entry = { id: "act-" + Date.now(), type, title, who: profile?.username || "User", when: new Date().toISOString() };
    setActivity(prev => [entry, ...prev.slice(0, 99)]);
    window.DLL_DB.upsertOne("activity", entry);
  };

  const onView = (doc) => {
    const updated = { ...doc, views: doc.views + 1 };
    setActiveDoc(doc);
    setDocs(prev => prev.map(d => d.id === doc.id ? updated : d));
    window.DLL_DB.upsertOne("documents", updated);
    logActivity("view", doc.title);
  };

  const onDownload = (doc) => {
    const updated = { ...doc, downloads: doc.downloads + 1 };
    setDocs(prev => prev.map(d => d.id === doc.id ? updated : d));
    window.DLL_DB.upsertOne("documents", updated);
    if (doc.fileUrl) {
      window.open(doc.fileUrl, "_blank", "noopener,noreferrer");
    }
    logActivity("download", doc.title);
    setToast(`Downloaded ${doc.title}`);
  };

  const onOpenDoc = (doc) => setToast(`Opening ${doc.title} in Google Docs…`);

  const onToggleReview = (id) => {
    setDocs(prev => {
      const next = prev.map(d => d.id === id ? { ...d, needsReview: !d.needsReview } : d);
      window.DLL_DB.upsertOne("documents", next.find(d => d.id === id));
      return next;
    });
  };

  const onAddIdea = (idea) => {
    setIdeas(prev => [idea, ...prev]);
    window.DLL_DB.upsertOne("big_ideas", idea);
    setToast("Idea posted to the board!");
  };

  const onHideIdea = (id) => {
    setIdeas(prev => prev.filter(i => i.id !== id));
    window.DLL_DB.deleteOne("big_ideas", id);
  };

  const onArchive = (id) => {
    const doc = docs.find(d => d.id === id);
    setDocs(prev => {
      const next = prev.map(d => d.id === id ? { ...d, archived: true } : d);
      window.DLL_DB.upsertOne("documents", next.find(d => d.id === id));
      return next;
    });
    if (doc) logActivity("archive", doc.title);
    setToast("Document archived");
  };

  const onUnarchive = (id) => {
    setDocs(prev => {
      const next = prev.map(d => d.id === id ? { ...d, archived: false } : d);
      window.DLL_DB.upsertOne("documents", next.find(d => d.id === id));
      return next;
    });
    setToast("Document restored");
  };

  const onDelete = (id) => {
    const doc = docs.find(d => d.id === id);
    setDocs(prev => prev.filter(d => d.id !== id));
    window.DLL_DB.deleteOne("documents", id);
    if (doc) logActivity("delete", doc.title);
    setToast("Document permanently deleted");
  };

  const onUpload = (meta) => {
    const newDoc = {
      id: meta.id || "d" + Date.now(), ...meta, needsReview: false,
      updated: new Date().toISOString().slice(0, 10),
      audience: meta.audience || ["Sponsor"],
      thumb: meta.thumb || "exec", googleDocs: false, views: 0, downloads: 0
    };
    setDocs(prev => [newDoc, ...prev]);
    window.DLL_DB.upsertOne("documents", newDoc);
    logActivity("upload", meta.title);
    setToast(`"${meta.title}" added to library`);
  };

  const onEditDoc = (updated) => {
    setDocs(prev => prev.map(d => d.id === updated.id ? updated : d));
    window.DLL_DB.upsertOne("documents", updated);
    logActivity("edit", updated.title);
    setToast("Document updated");
  };

  const onAddSignoffForm = (f) => {
    setSignoffForms(prev => [...prev, f]);
    window.DLL_DB.upsertOne("signoff_forms", f);
    setToast(`"${f.title}" form created`);
  };

  const onDeleteSignoffForm = (id) => {
    setSignoffForms(prev => prev.filter(f => f.id !== id));
    window.DLL_DB.deleteOne("signoff_forms", id);
    setToast("Form deleted");
  };

  const onSubmitSignoff = (sub) => {
    const subWithId = { ...sub, id: "sub-" + Date.now() };
    setSubmissions(prev => [subWithId, ...prev]);
    window.DLL_DB.upsertOne("submissions", subWithId);
    logActivity("signoff", sub.formTitle);

    const newDeferred = (sub.items || []).filter(it => it.decision === "defer").map(it => ({
      id: `def-${sub.formId}-${it.id}-${Date.now()}`,
      itemId: it.id, itemLabel: it.label,
      formId: sub.formId, formTitle: sub.formTitle, formPhase: sub.formPhase,
      preparedBy: sub.preparedBy, deferredAt: sub.submittedAt,
      relatedDocIds: it.relatedDocIds || [], context: it.context || ""
    }));

    if (newDeferred.length > 0) {
      setDeferredItems(prev => [...newDeferred, ...prev]);
      window.DLL_DB.upsertMany("deferred_items", newDeferred);
    }

    const msg = newDeferred.length > 0
      ? `Sign-off submitted — ${newDeferred.length} item${newDeferred.length === 1 ? "" : "s"} moved to Future Work`
      : "Sign-off submitted and PDF generated!";
    setToast(msg);
  };

  const onRemoveDeferred = (id) => {
    setDeferredItems(prev => prev.filter(d => d.id !== id));
    window.DLL_DB.deleteOne("deferred_items", id);
    setToast("Deferred item removed");
  };

  const reviewCount = docs.filter(d => d.needsReview).length;

  const headers = {
    dashboard:     { title: "Daily Living Labs Knowledge Portal", subtitle: "Centralized documentation, review, and future planning." },
    start:         { title: "Daily Living Labs Knowledge Portal", subtitle: "Centralized documentation, review, and future planning." },
    documents:     { title: "Daily Living Labs Knowledge Portal", subtitle: "Centralized documentation, review, and future planning." },
    "docs-spring":  { title: "Daily Living Labs Knowledge Portal", subtitle: "Centralized documentation, review, and future planning." },
    "docs-summer":  { title: "Daily Living Labs Knowledge Portal", subtitle: "Centralized documentation, review, and future planning." },
    "docs-fall":    { title: "Daily Living Labs Knowledge Portal", subtitle: "Centralized documentation, review, and future planning." },
    "docs-future":  { title: "Daily Living Labs Knowledge Portal", subtitle: "Centralized documentation, review, and future planning." },
    calendar:      { title: "Daily Living Labs Knowledge Portal", subtitle: "Centralized documentation, review, and future planning." },
    signoff:       { title: "Daily Living Labs Knowledge Portal", subtitle: "Centralized documentation, review, and future planning." },
    ideas:         { title: "Daily Living Labs Knowledge Portal", subtitle: "Centralized documentation, review, and future planning." },
    analytics:     { title: "Daily Living Labs Knowledge Portal", subtitle: "Centralized documentation, review, and future planning." },
    admin:         { title: "Daily Living Labs Knowledge Portal", subtitle: "Centralized documentation, review, and future planning." }
  };

  return (
    <div className="app">
      <Sidebar active={view} onNav={setView} reviewCount={reviewCount}
               userMenuOpen={userMenuOpen} setUserMenuOpen={setUserMenuOpen}
               onSignOut={onSignOut} onProfileOpen={() => setProfileOpen(true)}
               profile={profile} email={currentUser?.email} />
      <main className="main">
        <Topbar title={(headers[view] || headers.dashboard).title}
                subtitle={(headers[view] || headers.dashboard).subtitle}
                search={search} setSearch={setSearch}
                theme={theme} setTheme={setTheme}
                butterfly={butterfly} setButterfly={setButterfly}
                onSearchSubmit={() => setView("documents")}
                userMenuOpen={topUserMenuOpen} setUserMenuOpen={setTopUserMenuOpen}
                onSignOut={onSignOut} onProfileOpen={() => setProfileOpen(true)}
                profile={profile} email={currentUser?.email} />
        <div className="page">
          {view === "dashboard"   && <Dashboard docs={docs} ideas={ideas} activity={activity} timeline={eventsRaw} onView={onView} onDownload={onDownload} onOpenDoc={onOpenDoc} onNav={setView} onToggleReview={onToggleReview} />}
          {view === "start"       && <StartHerePage docs={docs} onNav={setView} onView={onView} />}
          {view === "documents"   && <DocumentsPage docs={docs} search={search} onView={onView} onDownload={onDownload} onOpenDoc={onOpenDoc} />}
          {view === "docs-spring"  && <DocumentsPage docs={docs} search={search} onView={onView} onDownload={onDownload} onOpenDoc={onOpenDoc} onNav={setView} fixedPhase="Spring 2026"  pageTitle="Spring 2026 Documents"  pageSubtitle="Discovery, research, and early design foundations." />}
          {view === "docs-summer"  && <DocumentsPage docs={docs} search={search} onView={onView} onDownload={onDownload} onOpenDoc={onOpenDoc} onNav={setView} fixedPhase="Summer 2026"  pageTitle="Summer 2026 Documents"  pageSubtitle="Prototyping, user testing, and design iteration." />}
          {view === "docs-fall"    && <DocumentsPage docs={docs} search={search} onView={onView} onDownload={onDownload} onOpenDoc={onOpenDoc} onNav={setView} fixedPhase="Fall 2026"    pageTitle="Fall 2026 Documents"    pageSubtitle="Detailed design, build planning, and governance." />}
          {view === "docs-future" && <DocumentsPage docs={docs} search={search} onView={onView} onDownload={onDownload} onOpenDoc={onOpenDoc} onNav={setView} fixedPhase="Future Work" pageTitle="Future Work Documents" pageSubtitle="Roadmap items, future enhancements, and innovation." deferredItems={deferredItems} onRemoveDeferred={onRemoveDeferred} allDocs={docs} />}
          {view === "calendar"    && <CalendarPage events={eventsRaw} setEvents={setEvents} onActivity={logActivity} />}
          {view === "signoff"     && <SignOffPage forms={signoffForms} allDocs={docs} onSubmit={onSubmitSignoff} onView={onView} />}
          {view === "ideas"       && <BigIdeasPage ideas={ideas} onAdd={onAddIdea} onDelete={onHideIdea} profile={profile} />}
          {view === "analytics"   && <AnalyticsPage docs={docs} activity={activity} />}
          {view === "admin"       && <AdminPage docs={docs} signoffForms={signoffForms} submissions={submissions} ideas={ideas} onToggleReview={onToggleReview} onArchive={onArchive} onUnarchive={onUnarchive} onDelete={onDelete} onUpload={onUpload} onEditDoc={onEditDoc} onAddSignoffForm={onAddSignoffForm} onDeleteSignoffForm={onDeleteSignoffForm} onHideIdea={onHideIdea} />}
        </div>
      </main>
      {activeDoc && <DocViewer doc={activeDoc} onClose={() => setActiveDoc(null)} onDownload={onDownload} />}
      {profileOpen && <ProfileModal profile={profile} email={currentUser?.email} onSave={onSaveProfile} onClose={() => setProfileOpen(false)} />}
      {toast && <Toast msg={toast} onDone={() => setToast("")} />}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
