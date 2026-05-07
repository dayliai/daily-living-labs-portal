// ============== Main App ==============

const AuthScreen = () => {
  const [tab, setTab] = React.useState("signin"); // "signin" | "signup" | "forgot-password" | "forgot-email"
  const [form, setForm] = React.useState({ email: "", password: "" });
  const [err, setErr] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const up = (patch) => setForm(f => ({ ...f, ...patch }));
  const goTab = (t) => { setTab(t); setErr(""); setMsg(""); };

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

  const sendReset = async (e) => {
    e.preventDefault();
    setLoading(true); setErr("");
    const { error } = await window.DLL_DB.resetPasswordForEmail(form.email);
    setLoading(false);
    if (error) { setErr(error.message); return; }
    setMsg("Password reset email sent! Check your inbox and follow the link to set a new password.");
  };

  const isForgot = tab === "forgot-password" || tab === "forgot-email";

  return (
    <div className="lock">
      <div className="lock__card">
        <div className="lock__brand" aria-hidden="true">🦋</div>
        <h1>Daily Living Labs<br />Knowledge Portal</h1>

        {!isForgot && (
          <div className="auth-tabs">
            <button className={tab === "signin" ? "is-active" : ""} onClick={() => goTab("signin")}>Sign In</button>
            <button className={tab === "signup" ? "is-active" : ""} onClick={() => goTab("signup")}>Create Account</button>
          </div>
        )}

        {msg ? (
          <div>
            <p style={{ textAlign: "center", color: "var(--text-2)", fontSize: 14, lineHeight: 1.6 }}>{msg}</p>
            <button className="btn btn--ghost lock__btn" onClick={() => goTab("signin")}>← Back to Sign In</button>
          </div>
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
            <div className="lock__forgot-row">
              <button type="button" className="lock__text-btn" onClick={() => goTab("forgot-password")}>Forgot password?</button>
              <button type="button" className="lock__text-btn" onClick={() => goTab("forgot-email")}>Forgot email?</button>
            </div>
          </form>
        ) : tab === "signup" ? (
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
        ) : tab === "forgot-password" ? (
          <form onSubmit={sendReset}>
            <button type="button" className="lock__text-btn lock__back-btn" onClick={() => goTab("signin")}>← Back to Sign In</button>
            <h3 className="lock__sub-heading">Reset Password</h3>
            <p className="lock__sub-desc">Enter your email and we'll send you a link to set a new password.</p>
            <div className="field"><label>Email</label>
              <input type="email" value={form.email} onChange={e => up({ email: e.target.value })} placeholder="you@example.com" required autoFocus />
            </div>
            <div className="lock__error" role="alert">{err}</div>
            <button type="submit" className="btn btn--primary lock__btn" disabled={loading || !form.email.trim()}>
              {loading ? "Sending…" : "Send reset link"}
            </button>
          </form>
        ) : tab === "forgot-email" ? (
          <div>
            <button type="button" className="lock__text-btn lock__back-btn" onClick={() => goTab("signin")}>← Back to Sign In</button>
            <h3 className="lock__sub-heading">Forgot Email?</h3>
            <p className="lock__sub-desc">Not sure which email you used to sign up? Reach out to the portal admin for help.</p>
            <a href="mailto:chelsea.alexandra.dustin@gmail.com" className="lock__admin-link">
              chelsea.alexandra.dustin@gmail.com
            </a>
          </div>
        ) : null}

        <div className="lock__hint">Last updated May 7, 2026 · v1.2 · Designed with Claude</div>
      </div>
    </div>
  );
};

const ProfileModal = ({ profile, email, onSave, onClose }) => {
  const [section, setSection] = React.useState("profile");
  const [form, setForm] = React.useState({
    username: profile?.username || "",
    avatar_emoji: profile?.avatar_emoji || "🦋",
    role: profile?.role || ""
  });
  const [newEmail, setNewEmail] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [acctMsg, setAcctMsg] = React.useState("");
  const [acctErr, setAcctErr] = React.useState("");
  const [acctLoading, setAcctLoading] = React.useState("");
  const up = (patch) => setForm(f => ({ ...f, ...patch }));

  const handleUpdateEmail = async () => {
    if (!newEmail.trim()) return;
    setAcctLoading("email"); setAcctErr(""); setAcctMsg("");
    const { error } = await window.DLL_DB.updateUserEmail(newEmail.trim());
    setAcctLoading("");
    if (error) { setAcctErr(error.message); return; }
    setAcctMsg(`Confirmation sent to ${newEmail}. Check your inbox to confirm the change.`);
    setNewEmail("");
  };

  const handleUpdatePassword = async () => {
    if (!newPassword || newPassword.length < 6) { setAcctErr("Password must be at least 6 characters."); return; }
    setAcctLoading("password"); setAcctErr(""); setAcctMsg("");
    const { error } = await window.DLL_DB.updateUserPassword(newPassword);
    setAcctLoading("");
    if (error) { setAcctErr(error.message); return; }
    setAcctMsg("Password updated successfully.");
    setNewPassword("");
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal modal--narrow" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h2>Profile settings</h2>
          <button className="modal__close" onClick={onClose} title="Close"><Icon name="x" size={16} /></button>
        </div>
        <div className="modal__body">
          <div className="range-toggle" style={{ marginBottom: 20 }}>
            <button type="button" className={`range-toggle__btn${section === "profile" ? " is-active" : ""}`} onClick={() => setSection("profile")}>Profile</button>
            <button type="button" className={`range-toggle__btn${section === "account" ? " is-active" : ""}`} onClick={() => { setSection("account"); setAcctMsg(""); setAcctErr(""); setConfirmDelete(false); }}>Account</button>
          </div>

          {section === "profile" ? (
            <React.Fragment>
              {email && <div style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 16 }}>Signed in as <strong>{email}</strong></div>}
              <div className="profile-avatar-preview">{form.avatar_emoji}</div>
              <div className="field">
                <label>Avatar</label>
                <div className="emoji-grid emoji-grid--avatar">
                  {AVATAR_EMOJIS.map((em, idx) => (
                    <button key={idx} type="button" className={`emoji-grid__item ${form.avatar_emoji === em ? "is-selected" : ""}`} onClick={() => up({ avatar_emoji: em })}>{em}</button>
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
            </React.Fragment>
          ) : (
            <React.Fragment>
              {acctMsg && <div className="acct-banner acct-banner--ok">{acctMsg}</div>}
              {acctErr && <div className="acct-banner acct-banner--err">{acctErr}</div>}

              <div className="field">
                <label>Update Email</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input type="email" value={newEmail} onChange={e => { setNewEmail(e.target.value); setAcctErr(""); }} placeholder="New email address" style={{ flex: 1 }} />
                  <button className="btn btn--primary btn--small" onClick={handleUpdateEmail} disabled={!newEmail.trim() || acctLoading === "email"}>
                    {acctLoading === "email" ? "Sending…" : "Update"}
                  </button>
                </div>
              </div>

              <div className="field" style={{ marginTop: 20 }}>
                <label>Change Password</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input type="password" value={newPassword} onChange={e => { setNewPassword(e.target.value); setAcctErr(""); }} placeholder="New password (min 6 chars)" style={{ flex: 1 }} />
                  <button className="btn btn--primary btn--small" onClick={handleUpdatePassword} disabled={!newPassword || acctLoading === "password"}>
                    {acctLoading === "password" ? "Saving…" : "Update"}
                  </button>
                </div>
              </div>

              <div className="acct-danger-zone">
                <div className="acct-danger-zone__label">Danger Zone</div>
                {!confirmDelete ? (
                  <button className="btn btn--ghost btn--danger" style={{ width: "100%" }} onClick={() => setConfirmDelete(true)}>
                    Delete Account
                  </button>
                ) : (
                  <div className="acct-danger-confirm">
                    <p>Account deletion requires admin action. This will sign you out — to fully remove your account contact <strong>chelsea.alexandra.dustin@gmail.com</strong>.</p>
                    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                      <button className="btn btn--ghost btn--small" onClick={() => setConfirmDelete(false)}>Cancel</button>
                      <button className="btn btn--small" style={{ background: "#C0392B", color: "white", border: "none", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontFamily: "inherit", fontSize: 13 }} onClick={() => window.DLL_DB.signOut()}>
                        Sign out &amp; request deletion
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </React.Fragment>
          )}
        </div>
        <div className="modal__footer">
          <button className="btn btn--ghost" onClick={onClose}>Cancel</button>
          {section === "profile" && (
            <button className="btn btn--primary" onClick={() => onSave(form)} disabled={!form.username.trim()}>Save</button>
          )}
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
  { id: "changelog", label: "Changelog", icon: "clock" },
  { id: "admin", label: "Admin", icon: "settings" }
];

const AVATAR_EMOJIS = [
  "🦋","🌱","🌻","🌸","🌺","🌹","🌷","🍀","🌿","🌊","🌈","🌙","☀️","⭐","🌟","💫","✨","🔥","❄️","⚡",
  "🐝","🦁","🐯","🦊","🐻","🐼","🦅","🦉","🐬","🦄","🐸","🐨","🦭","🦒","🦋","🐺","🦚","🐙","🦀","🦩",
  "🎯","💡","🚀","🎨","🎵","🏔️","💜","💙","💚","❤️","🧡","💛","🩷","🤍","💎","🔮","🧿","🪬","🎪","🎭",
  "🍁","🌴","🎋","🌵","🍄","🍒","🍓","🍑","🥝","🌰","🪸","🪷","💐","🌾","🪨","🌏","🗺️","🏄","🧘","🌞",
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

const Sidebar = ({ active, onNav, reviewCount, pendingSignoffs, userMenuOpen, setUserMenuOpen, onSignOut, onProfileOpen, profile, email, open, onClose }) => (
  <aside className={`sidebar${open ? " sidebar--open" : ""}`} role="navigation" aria-label="Primary">
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
                  data-nav={item.id}
                  className={`nav-item ${isActive ? "nav-item--active" : ""}`}
                  onClick={() => { onNav(item.id); onClose && onClose(); }}
                  aria-current={isActive ? "page" : undefined}>
            <Icon name={item.icon} className="nav-item__icon" />
            {item.label}
            {item.id === "documents" && reviewCount > 0 && <span className="nav-item__badge" aria-label={`${reviewCount} need review`}>{reviewCount}</span>}
            {item.id === "signoff" && pendingSignoffs > 0 && <span className="nav-item__badge nav-item__badge--alert" aria-label="Sign-offs pending">!</span>}
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

const Topbar = ({ docs = [], onViewDoc, title, subtitle, search, setSearch, theme, setTheme, butterfly, setButterfly, onSearchSubmit, userMenuOpen, setUserMenuOpen, onSignOut, onProfileOpen, profile, email, onMenuOpen }) => {
  const [showDrop, setShowDrop] = React.useState(false);
  const dropRef = React.useRef(null);
  const inputRef = React.useRef(null);

  const q = search.trim().toLowerCase();
  const results = q.length >= 1
    ? docs.filter(d => `${d.title} ${d.description} ${(d.tags || []).join(" ")}`.toLowerCase().includes(q)).slice(0, 6)
    : [];

  React.useEffect(() => {
    if (!showDrop) return;
    const onDown = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setShowDrop(false); };
    const onKey = (e) => { if (e.key === "Escape") { setShowDrop(false); } };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [showDrop]);

  const handleChange = (e) => { setSearch(e.target.value); setShowDrop(e.target.value.trim().length > 0); };
  const handleSelect = (doc) => { setShowDrop(false); setSearch(""); onViewDoc && onViewDoc(doc); };
  const handleViewAll = () => { setShowDrop(false); onSearchSubmit(); };

  return (
    <header className="topbar" role="banner">
      <button className="topbar__menu-btn" onClick={onMenuOpen} aria-label="Open navigation"><Icon name="menu" size={20} /></button>
      <div className="topbar__title">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="search-wrap" ref={dropRef}>
        <div className="search">
          <span className="search__icon" aria-hidden="true"><Icon name="search" size={16} /></span>
          <input ref={inputRef} type="search" placeholder="Search documents, ideas, people…"
                 value={search} onChange={handleChange}
                 onFocus={() => { if (search.trim()) setShowDrop(true); }}
                 onKeyDown={(e) => { if (e.key === "Enter") { setShowDrop(false); onSearchSubmit(); } }}
                 aria-label="Search portal" aria-autocomplete="list" />
          <span className="search__kbd" aria-hidden="true">⌘K</span>
        </div>
        {showDrop && (
          <div className="search-dropdown" role="listbox" aria-label="Search results">
            {results.length === 0 ? (
              <div className="search-dropdown__empty">No documents match "{search}"</div>
            ) : results.map(doc => (
              <button key={doc.id} className="search-dropdown__item" role="option" onClick={() => handleSelect(doc)}>
                <div className="search-dropdown__item-thumb"><DocThumb kind={doc.thumb} /></div>
                <div className="search-dropdown__item-body">
                  <div className="search-dropdown__item-title">{doc.title}</div>
                  <div className="search-dropdown__item-meta">{doc.phase} · {doc.category}</div>
                </div>
              </button>
            ))}
            <div className="search-dropdown__footer">
              <button className="search-dropdown__all" onClick={handleViewAll}>
                View all results <Icon name="chevron-right" size={12} />
              </button>
            </div>
          </div>
        )}
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
};

// ============== Document Viewer Modal ==============
const DocViewer = ({ doc, onClose, onDownload, profile, currentUser }) => {
  const [comments, setComments] = React.useState([]);
  const [commentText, setCommentText] = React.useState("");
  const [posting, setPosting] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  React.useEffect(() => {
    if (!doc) return;
    window.DLL_DB.getComments(doc.id).then(setComments);
    const ch = window.DLL_DB.subscribeToTable("comments", (payload) => {
      const { eventType, new: row, old } = payload;
      if (eventType === "INSERT") {
        const c = row.data;
        if (c.docId !== doc.id) return;
        setComments(prev => prev.find(x => x.id === c.id) ? prev : [...prev, c]);
      } else if (eventType === "DELETE") {
        setComments(prev => prev.filter(x => x.id !== old.id));
      }
    });
    return () => window.DLL_DB.unsubscribe(ch);
  }, [doc?.id]);

  const fmtCommentTime = (iso) => {
    const d = new Date(iso);
    const diff = Date.now() - d;
    if (diff < 60000) return "just now";
    if (diff < 3600000) return Math.floor(diff / 60000) + "m ago";
    if (diff < 86400000) return Math.floor(diff / 3600000) + "h ago";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const postComment = async () => {
    if (!commentText.trim() || !currentUser) return;
    setPosting(true);
    const c = {
      id: "cmt-" + Date.now(),
      docId: doc.id,
      text: commentText.trim(),
      author: profile?.username || currentUser?.email?.split("@")[0] || "User",
      avatar: profile?.avatar_emoji || "🦋",
      createdAt: new Date().toISOString()
    };
    setComments(prev => [...prev, c]);
    setCommentText("");
    await window.DLL_DB.addComment(c);
    setPosting(false);
  };

  if (!doc) return null;

  const ext = doc.filename ? doc.filename.split(".").pop().toLowerCase() : "";
  const renderPreview = () => {
    if (!doc.fileUrl) {
      if (doc.content) {
        return <div className="doc-content-frame" dangerouslySetInnerHTML={{ __html: doc.content }} />;
      }
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
          <div className="comment-thread">
            <h4 className="comment-thread__title">Discussion ({comments.length})</h4>
            {comments.length === 0 && <div className="comment-thread__empty">No comments yet. Be the first to add one.</div>}
            {comments.map(c => (
              <div key={c.id} className="comment">
                <div className="comment__avatar">{c.avatar || "🦋"}</div>
                <div className="comment__body">
                  <div className="comment__header">
                    <span className="comment__author">{c.author}</span>
                    <span className="comment__time">{fmtCommentTime(c.createdAt)}</span>
                  </div>
                  <div className="comment__text">{c.text}</div>
                </div>
              </div>
            ))}
            {currentUser && (
              <div className="comment-form">
                <div className="comment__avatar">{profile?.avatar_emoji || "🦋"}</div>
                <div style={{ flex: 1 }}>
                  <textarea className="comment-form__input" rows={2}
                    placeholder="Add a comment… (Cmd+Enter to post)"
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) postComment(); }} />
                  <button className="btn btn--primary btn--small" disabled={!commentText.trim() || posting} onClick={postComment} style={{ marginTop: 6 }}>
                    {posting ? "Posting…" : "Post comment"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="modal__footer">
          {doc.googleDocsUrl && <a href={doc.googleDocsUrl} target="_blank" rel="noopener noreferrer" className="btn btn--ghost"><Icon name="google-doc" size={14} /> Open in Google Docs</a>}
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
const Dashboard = ({ docs, ideas, activity, timeline, events, signoffForms, submissions, userId, onView, onDownload, onOpenDoc, onNav, onToggleReview, readDocs }) => {
  const phaseCount = (p) => docs.filter(d => d.phase === p).length;

  const dismissKey = userId ? `dll_dismissed_alerts_${userId}` : "dll_dismissed_alerts";
  const [dismissed, setDismissed] = React.useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem(dismissKey) || "[]")); }
    catch { return new Set(); }
  });
  const dismiss = (id) => {
    const next = new Set([...dismissed, id]);
    setDismissed(next);
    localStorage.setItem(dismissKey, JSON.stringify([...next]));
  };

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const eventAlerts = (events || [])
    .filter(ev => {
      if (!ev.date || dismissed.has("ev-" + ev.id)) return false;
      const diff = Math.round((new Date(ev.date + "T00:00") - today) / 86400000);
      return diff >= 0 && diff <= 3;
    })
    .map(ev => ({ ...ev, diff: Math.round((new Date(ev.date + "T00:00") - today) / 86400000) }))
    .sort((a, b) => a.diff - b.diff);

  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const signoffAlerts = (signoffForms || []).filter(f => {
    if (dismissed.has("sf-alert-" + f.id)) return false;
    if ((submissions || []).find(s => s.formId === f.id)) return false;
    const ts = parseInt((f.id || "").replace("sf-", "")) || 0;
    return ts > 0 && ts < oneWeekAgo;
  });

  return (
    <div className="dashboard">
      {eventAlerts.map(ev => (
        <div key={ev.id} className="col-12">
          <div className={`dash-alert dash-alert--${ev.diff <= 1 ? "red" : "yellow"}`}>
            <span className="dash-alert__text">
              {ev.diff <= 1 ? "⚠️" : "🔔"} <strong>Reminder! Upcoming event —</strong>{" "}
              <button className="dash-alert__link" onClick={() => onNav("calendar")}>{ev.title}</button>
              <span className="dash-alert__when">{ev.diff === 0 ? " · today" : ev.diff === 1 ? " · tomorrow" : ` · in ${ev.diff} days`}</span>
            </span>
            <button className="dash-alert__dismiss" onClick={() => dismiss("ev-" + ev.id)} aria-label="Dismiss alert">×</button>
          </div>
        </div>
      ))}

      {signoffAlerts.map(f => (
        <div key={f.id} className="col-12">
          <div className="dash-alert dash-alert--yellow">
            <span className="dash-alert__text">
              📋 <strong>Sign-off pending —</strong>{" "}
              <button className="dash-alert__link" onClick={() => onNav("signoff")}>{f.title}</button>
              {" "}has not been submitted.
            </span>
            <button className="dash-alert__dismiss" onClick={() => dismiss("sf-alert-" + f.id)} aria-label="Dismiss alert">×</button>
          </div>
        </div>
      ))}

      <div className="col-12">
        <StartHere docs={docs} onView={onView} readDocs={readDocs} userId={userId} />
      </div>

      <div className="col-3">
        <PhaseCard name="Spring 2026" count={phaseCount("Spring 2026")} icon="🌱" modifier="spring"
          chips={[{ label: "Build", color: "blue" }, { label: "Maintenance", color: "green" }, { label: "Docs", color: "lavender" }]}
          focus="Current build maintenance, documentation."
          onClick={() => onNav("docs-spring")} />
      </div>
      <div className="col-3">
        <PhaseCard name="Summer 2026" count={phaseCount("Summer 2026")} icon="🌻" modifier="summer"
          chips={[{ label: "Discovery", color: "lavender" }, { label: "Research", color: "green" }, { label: "Strategy", color: "peach" }]}
          focus="Discovery, research, and strategy."
          onClick={() => onNav("docs-summer")} />
      </div>
      <div className="col-3">
        <PhaseCard name="Fall 2026" count={phaseCount("Fall 2026")} icon="🍂" modifier="fall"
          chips={[{ label: "Build", color: "blue" }, { label: "Features", color: "peach" }, { label: "Implementation", color: "lavender" }]}
          focus="Critical build &amp; feature implementation."
          onClick={() => onNav("docs-fall")} />
      </div>
      <div className="col-3">
        <PhaseCard name="Future Work" count={phaseCount("Future Work")} icon="🚀" modifier="future"
          chips={[{ label: "Roadmap", color: "lavender" }, { label: "Sustainability", color: "green" }, { label: "Innovation", color: "blue" }]}
          focus="Roadmap, sustainability, and innovation."
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

// ============== Feedback ==============
const FEEDBACK_TYPES = [
  { id: "bug",        label: "🐛 Bug" },
  { id: "suggestion", label: "💡 Suggestion" },
  { id: "question",   label: "❓ Question" },
];
const PAGE_LABELS = {
  dashboard: "Dashboard", start: "Start Here", documents: "Documents",
  "docs-spring": "Spring 2026 Docs", "docs-summer": "Summer 2026 Docs",
  "docs-fall": "Fall 2026 Docs", "docs-future": "Future Work Docs",
  calendar: "Calendar & Timeline", signoff: "Sign-Off", ideas: "Big Ideas",
  analytics: "Analytics", changelog: "Changelog", admin: "Admin",
};

const FeedbackModal = ({ view, profile, onClose }) => {
  const [type, setType] = React.useState("bug");
  const [message, setMessage] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const submit = async () => {
    if (!message.trim()) return;
    setSubmitting(true);
    await window.DLL_DB.submitFeedback({
      id: "fb-" + Date.now(),
      type, message: message.trim(),
      page: PAGE_LABELS[view] || view,
      author: profile?.username || "Anonymous",
      createdAt: new Date().toISOString()
    });
    setSubmitted(true);
    setSubmitting(false);
  };

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal modal--narrow" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Send feedback">
        <div className="modal__header">
          <h2>🐛 Send Feedback</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close"><Icon name="x" size={16} /></button>
        </div>
        {submitted ? (
          <div className="modal__body" style={{ textAlign: "center", padding: "32px 24px" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🦋</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Thank you!</div>
            <div style={{ fontSize: 13, color: "var(--text-2)" }}>Your feedback has been recorded. Chelsea will review it soon.</div>
            <button className="btn btn--primary" style={{ marginTop: 20 }} onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <div className="modal__body">
              <div className="field">
                <label>Type</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {FEEDBACK_TYPES.map(t => (
                    <button key={t.id}
                      className={`btn ${type === t.id ? "btn--primary" : "btn--ghost"}`}
                      style={{ flex: 1, fontSize: 12 }}
                      onClick={() => setType(t.id)}>{t.label}</button>
                  ))}
                </div>
              </div>
              <div className="field">
                <label>Page</label>
                <input value={PAGE_LABELS[view] || view} disabled style={{ opacity: 0.6 }} />
              </div>
              <div className="field">
                <label>Message *</label>
                <textarea rows={4} placeholder="Describe the issue or share your thought…"
                  value={message} onChange={e => setMessage(e.target.value)} />
              </div>
            </div>
            <div className="modal__footer">
              <button className="btn btn--ghost" onClick={onClose}>Cancel</button>
              <button className="btn btn--primary" disabled={!message.trim() || submitting} onClick={submit}>
                {submitting ? "Sending…" : "Send feedback"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const FeedbackButton = ({ onClick }) => (
  <button className="feedback-fab" onClick={onClick} aria-label="Send feedback or report a bug">
    <span className="feedback-fab__emoji">🐛</span>
    <span className="feedback-fab__badge">?</span>
  </button>
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
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [feedbackOpen, setFeedbackOpen] = React.useState(false);

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
  const [showTour, setShowTour] = React.useState(false);
  const [showProfileNudge, setShowProfileNudge] = React.useState(false);
  const [readDocs, setReadDocs] = React.useState(new Set());

  React.useEffect(() => {
    if (!currentUser) { setReadDocs(new Set()); return; }
    try { setReadDocs(new Set(JSON.parse(localStorage.getItem(`dll_read_docs_${currentUser.id}`) || "[]"))); }
    catch { setReadDocs(new Set()); }
  }, [currentUser?.id]);

  const startTour = () => setShowTour(true);
  const closeTour = () => {
    const key = currentUser ? `dll_onboarding_seen_${currentUser.id}` : "dll_onboarding_seen";
    const firstTime = !localStorage.getItem(key);
    localStorage.setItem(key, "1");
    setShowTour(false);
    if (firstTime) setTimeout(() => setShowProfileNudge(true), 500);
  };

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
      if (!localStorage.getItem(`dll_onboarding_seen_${currentUser.id}`)) {
        setTimeout(() => setShowTour(true), 600);
      }
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

  // Realtime subscriptions — sync documents, ideas, and activity across sessions
  React.useEffect(() => {
    if (!dbReady) return;
    const chDocs = window.DLL_DB.subscribeToTable("documents", (payload) => {
      const { eventType, new: row, old } = payload;
      if (eventType === "INSERT" || eventType === "UPDATE") {
        const d = row.data;
        setDocs(prev => {
          const idx = prev.findIndex(x => x.id === d.id);
          if (idx >= 0) return prev.map(x => x.id === d.id ? d : x);
          return [d, ...prev];
        });
      } else if (eventType === "DELETE") {
        setDocs(prev => prev.filter(x => x.id !== old.id));
      }
    });
    const chIdeas = window.DLL_DB.subscribeToTable("big_ideas", (payload) => {
      const { eventType, new: row, old } = payload;
      if (eventType === "INSERT") {
        const i = row.data;
        setIdeas(prev => prev.find(x => x.id === i.id) ? prev : [i, ...prev]);
      } else if (eventType === "DELETE") {
        setIdeas(prev => prev.filter(x => x.id !== old.id));
      }
    });
    const chActivity = window.DLL_DB.subscribeToTable("activity", (payload) => {
      const { eventType, new: row } = payload;
      if (eventType === "INSERT") {
        const a = row.data;
        setActivity(prev => prev.find(x => x.id === a.id) ? prev : [a, ...prev.slice(0, 99)]);
      }
    });
    return () => {
      window.DLL_DB.unsubscribe(chDocs);
      window.DLL_DB.unsubscribe(chIdeas);
      window.DLL_DB.unsubscribe(chActivity);
    };
  }, [dbReady]);

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
    setReadDocs(prev => {
      const next = new Set(prev);
      next.add(doc.id);
      if (currentUser) localStorage.setItem(`dll_read_docs_${currentUser.id}`, JSON.stringify([...next]));
      return next;
    });
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
  const pendingSignoffs = signoffForms.filter(f => !submissions.find(s => s.formId === f.id)).length;

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
    changelog:     { title: "Daily Living Labs Knowledge Portal", subtitle: "Centralized documentation, review, and future planning." },
    admin:         { title: "Daily Living Labs Knowledge Portal", subtitle: "Centralized documentation, review, and future planning." }
  };

  return (
    <div className="app">
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      <Sidebar active={view} onNav={setView} reviewCount={reviewCount} pendingSignoffs={pendingSignoffs}
               userMenuOpen={userMenuOpen} setUserMenuOpen={setUserMenuOpen}
               onSignOut={onSignOut} onProfileOpen={() => setProfileOpen(true)}
               profile={profile} email={currentUser?.email}
               open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="main">
        <Topbar docs={docs} onViewDoc={onView}
                title={(headers[view] || headers.dashboard).title}
                subtitle={(headers[view] || headers.dashboard).subtitle}
                search={search} setSearch={setSearch}
                theme={theme} setTheme={setTheme}
                butterfly={butterfly} setButterfly={setButterfly}
                onSearchSubmit={() => setView("documents")}
                userMenuOpen={topUserMenuOpen} setUserMenuOpen={setTopUserMenuOpen}
                onSignOut={onSignOut} onProfileOpen={() => setProfileOpen(true)}
                profile={profile} email={currentUser?.email}
                onMenuOpen={() => setSidebarOpen(true)} />
        <div className="page">
          {view === "dashboard"   && <Dashboard docs={docs} ideas={ideas} activity={activity} timeline={eventsRaw} events={eventsRaw} signoffForms={signoffForms} submissions={submissions} userId={currentUser?.id} onView={onView} onDownload={onDownload} onOpenDoc={onOpenDoc} onNav={setView} onToggleReview={onToggleReview} readDocs={readDocs} />}
          {view === "start"       && <StartHerePage docs={docs} onNav={setView} onView={onView} onStartTour={startTour} readDocs={readDocs} userId={currentUser?.id} />}
          {view === "documents"   && <DocumentsPage docs={docs} search={search} onView={onView} onDownload={onDownload} onOpenDoc={onOpenDoc} />}
          {view === "docs-spring"  && <DocumentsPage docs={docs} search={search} onView={onView} onDownload={onDownload} onOpenDoc={onOpenDoc} onNav={setView} fixedPhase="Spring 2026"  pageTitle="Spring 2026 Documents"  pageSubtitle="Current build maintenance, documentation." />}
          {view === "docs-summer"  && <DocumentsPage docs={docs} search={search} onView={onView} onDownload={onDownload} onOpenDoc={onOpenDoc} onNav={setView} fixedPhase="Summer 2026"  pageTitle="Summer 2026 Documents"  pageSubtitle="Discovery, research, and strategy." />}
          {view === "docs-fall"    && <DocumentsPage docs={docs} search={search} onView={onView} onDownload={onDownload} onOpenDoc={onOpenDoc} onNav={setView} fixedPhase="Fall 2026"    pageTitle="Fall 2026 Documents"    pageSubtitle="Critical build & feature implementation." />}
          {view === "docs-future" && <DocumentsPage docs={docs} search={search} onView={onView} onDownload={onDownload} onOpenDoc={onOpenDoc} onNav={setView} fixedPhase="Future Work" pageTitle="Future Work Documents" pageSubtitle="Roadmap, sustainability, and innovation." deferredItems={deferredItems} onRemoveDeferred={onRemoveDeferred} allDocs={docs} />}
          {view === "calendar"    && <CalendarPage events={eventsRaw} setEvents={setEvents} onActivity={logActivity} />}
          {view === "signoff"     && <SignOffPage forms={signoffForms} allDocs={docs} onSubmit={onSubmitSignoff} onView={onView} />}
          {view === "ideas"       && <BigIdeasPage ideas={ideas} onAdd={onAddIdea} onDelete={onHideIdea} profile={profile} />}
          {view === "analytics"   && <AnalyticsPage docs={docs} activity={activity} />}
          {view === "changelog"   && <ChangelogPage />}
          {view === "admin"       && <AdminPage docs={docs} signoffForms={signoffForms} submissions={submissions} ideas={ideas} onToggleReview={onToggleReview} onArchive={onArchive} onUnarchive={onUnarchive} onDelete={onDelete} onUpload={onUpload} onEditDoc={onEditDoc} onAddSignoffForm={onAddSignoffForm} onDeleteSignoffForm={onDeleteSignoffForm} onHideIdea={onHideIdea} />}
        </div>
      </main>
      {activeDoc && <DocViewer doc={activeDoc} onClose={() => setActiveDoc(null)} onDownload={onDownload} profile={profile} currentUser={currentUser} />}
      {profileOpen && <ProfileModal profile={profile} email={currentUser?.email} onSave={onSaveProfile} onClose={() => setProfileOpen(false)} />}
      {toast && <Toast msg={toast} onDone={() => setToast("")} />}
      <FeedbackButton onClick={() => setFeedbackOpen(true)} />
      {feedbackOpen && <FeedbackModal view={view} profile={profile} onClose={() => setFeedbackOpen(false)} />}
      {showTour && <OnboardingTour onClose={closeTour} />}
      {showProfileNudge && !showTour && (
        <ProfileNudge
          onOpenProfile={() => { setProfileOpen(true); setShowProfileNudge(false); }}
          onClose={() => setShowProfileNudge(false)}
        />
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
