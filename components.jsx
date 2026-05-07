// ============== Dashboard widgets ==============

const StartHere = ({ onNavigate }) => {
  const tiles = [
    { id: "exec", label: "Executive Summary", icon: "doc" },
    { id: "overview", label: "Project Overview", icon: "user" },
    { id: "specs", label: "Functional & Technical Requirements", icon: "code" },
    { id: "style", label: "Style Guide", icon: "brush" },
    { id: "future", label: "Future State Recommendations", icon: "spark" }
  ];
  return (
    <section className="card start-here" aria-labelledby="start-here-heading">
      <div className="start-here__intro">
        <div className="start-here__intro-icon" aria-hidden="true">👋</div>
        <div>
          <h2 id="start-here-heading">Start Here</h2>
          <p>Welcome to the Daily Living Labs Knowledge Portal. Begin with these key resources to get aligned.</p>
        </div>
      </div>
      {tiles.map(t => (
        <a key={t.id} className="start-tile" href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(t.id); }}>
          <div className="start-tile__icon"><Icon name={t.icon} size={20} /></div>
          <span className="start-tile__label">{t.label}</span>
          <span className="start-tile__chevron"><Icon name="chevron-right" size={14} /></span>
        </a>
      ))}
    </section>
  );
};

const PhaseCard = ({ name, count, focus, chips, modifier, icon, onClick }) => (
  <button className={`phase-card phase-card--${modifier}`} onClick={onClick} aria-label={`Open ${name} phase`}>
    <div className="phase-card__header">
      <div className="phase-card__icon" aria-hidden="true">{icon}</div>
      <div>
        <h3 className="phase-card__name">{name}</h3>
        <div className="phase-card__count">{count} documents</div>
      </div>
      <span className="phase-card__chevron"><Icon name="chevron-right" /></span>
    </div>
    <div className="phase-card__body">
      <div className="phase-card__chips">
        {chips.map((c, i) => <span key={i} className={`chip chip--${c.color}`}>{c.label}</span>)}
      </div>
      <p className="phase-card__focus"><strong>Focus:</strong> {focus}</p>
    </div>
  </button>
);

const NeedsReview = ({ docs, onView, onFlag, onViewAll }) => {
  const flagged = docs.filter(d => d.needsReview || d.status === "For Review").slice(0, 3);
  return (
    <section className="card" aria-labelledby="needs-review-heading">
      <div className="card__header">
        <h3 className="card__title" id="needs-review-heading">
          Needs Review <span style={{ background: "var(--status-changes-bg)", color: "var(--status-changes-text)", borderRadius: "999px", padding: "1px 8px", fontSize: "11px", marginLeft: "6px", verticalAlign: "middle" }}>{flagged.length}</span>
        </h3>
        <a className="card__link" href="#" onClick={(e) => { e.preventDefault(); onViewAll(); }}>View all</a>
      </div>
      {flagged.length === 0 ? (
        <div className="empty"><div className="empty__emoji">✨</div><div className="empty__title">All clear</div><div className="empty__msg">Nothing needs review right now.</div></div>
      ) : flagged.map(d => (
        <div className="review-row" key={d.id}>
          <div className="review-row__thumb" aria-hidden="true"><DocThumb kind={d.thumb} /></div>
          <div>
            <div className="review-row__title">{d.title}</div>
            <div className="review-row__meta">{d.category} · Updated {fmtDate(d.updated)}</div>
          </div>
          <span className={`badge ${d.status === "Changes Requested" ? "badge--changes" : "badge--review"}`}>{d.status}</span>
          <button className="flag-btn" aria-label={`Toggle review flag for ${d.title}`} onClick={() => onFlag(d.id)}>
            <Icon name="flag" size={16} />
          </button>
        </div>
      ))}
    </section>
  );
};

const ACTIVITY_META = {
  view:         { icon: "eye",          label: "Viewed" },
  download:     { icon: "download",     label: "Downloaded" },
  upload:       { icon: "plus",         label: "Added" },
  edit:         { icon: "edit",         label: "Edited" },
  archive:      { icon: "archive",      label: "Archived" },
  delete:       { icon: "trash",        label: "Deleted" },
  signoff:      { icon: "check-circle", label: "Sign-off submitted" },
  "event-add":  { icon: "calendar",     label: "Event created" },
  "event-edit": { icon: "calendar",     label: "Event updated" },
  "event-del":  { icon: "calendar",     label: "Event deleted" },
};

const fmtRelTime = (iso) => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

const RecentActivity = ({ items, onViewAll }) => (
  <section className="card" aria-labelledby="recent-activity-heading">
    <div className="card__header">
      <h3 className="card__title" id="recent-activity-heading">Recent Activity</h3>
      <a className="card__link" href="#" onClick={(e) => { e.preventDefault(); onViewAll && onViewAll(); }}>View all</a>
    </div>
    {(!items || items.length === 0) ? (
      <div className="empty" style={{ padding: "12px 0" }}>
        <div className="empty__emoji">🕐</div>
        <div className="empty__msg">No activity recorded yet.</div>
      </div>
    ) : items.slice(0, 6).map(a => {
      const meta = ACTIVITY_META[a.type] || { icon: "flag", label: "Action" };
      const when = a.when && a.when.includes("T") ? fmtRelTime(a.when) : (a.when || "");
      return (
        <div className="activity-row" key={a.id}>
          <div className={`activity-row__icon activity-row__icon--${a.type}`}>
            <Icon name={meta.icon} size={14} />
          </div>
          <div>
            <div className="activity-row__title">{a.title}</div>
            <div className="activity-row__sub">{meta.label} by {a.who}</div>
          </div>
          <div className="activity-row__time">{when}</div>
        </div>
      );
    })}
  </section>
);

const TimelineWidget = ({ items, onViewAll }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcoming = [...items]
    .filter(t => t.date)
    .sort((a, b) => new Date(a.date + "T00:00") - new Date(b.date + "T00:00"))
    .filter(t => new Date(t.date + "T00:00") >= today)
    .slice(0, 4);
  return (
    <section className="card" aria-labelledby="timeline-heading">
      <div className="card__header">
        <h3 className="card__title" id="timeline-heading">Calendar & Timeline</h3>
        <a className="card__link" href="#" onClick={(e) => { e.preventDefault(); onViewAll(); }}>View full calendar</a>
      </div>
      <div className="timeline-list">
        {upcoming.length === 0 ? (
          <div className="empty" style={{ padding: "12px 0" }}>
            <div className="empty__emoji">📅</div>
            <div className="empty__msg">No upcoming events. Add one in Calendar & Timeline.</div>
          </div>
        ) : upcoming.map((t, i) => {
          const d = new Date(t.date + "T00:00");
          const month = d.toLocaleString("en", { month: "short" }).toUpperCase();
          const day = String(d.getDate()).padStart(2, "0");
          const isMilestone = t.category === "Milestone";
          return (
            <div className="timeline-row" key={t.id}>
              <div className="timeline-row__date">{month}<strong>{day}</strong></div>
              <div className={`timeline-dot ${i === 0 ? "timeline-dot--filled" : ""}`}></div>
              <div className="timeline-row__title">{t.title}</div>
              <span className={`badge ${isMilestone ? "badge--milestone" : "badge--upcoming"}`}>{t.category}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const AnalyticsSnapshot = ({ docs, onViewAll }) => {
  const top = [...docs].sort((a, b) => b.views - a.views)[0];
  const totalViews = docs.reduce((s, d) => s + d.views, 0);
  const totalDownloads = docs.reduce((s, d) => s + d.downloads, 0);
  return (
    <section className="card" aria-labelledby="analytics-heading">
      <div className="card__header">
        <h3 className="card__title" id="analytics-heading">Analytics Snapshot</h3>
        <a className="card__link" href="#" onClick={(e) => { e.preventDefault(); onViewAll(); }}>View full analytics</a>
      </div>
      <div className="kpi-row">
        <div className="kpi">
          <div className="kpi__icon"><Icon name="eye" size={14} /></div>
          <div className="kpi__label">Most Viewed</div>
          <div className="kpi__value">{top.views.toLocaleString()}</div>
          <div className="kpi__sub">{top.title}</div>
        </div>
        <div className="kpi">
          <div className="kpi__icon"><Icon name="download" size={14} /></div>
          <div className="kpi__label">Total Downloads</div>
          <div className="kpi__value">{totalDownloads.toLocaleString()}</div>
          <div className="kpi__sub">across all documents</div>
        </div>
        <div className="kpi">
          <div className="kpi__icon"><Icon name="doc" size={14} /></div>
          <div className="kpi__label">Documents</div>
          <div className="kpi__value">{docs.length}</div>
          <div className="kpi__sub">in library</div>
        </div>
      </div>
    </section>
  );
};

// ============== Big Ideas (draggable) ==============
const BigIdeasBoard = ({ ideas, onAdd, draggable = true, compact = false, onDelete }) => {
  const [items, setItems] = React.useState(ideas);
  const [draggingId, setDraggingId] = React.useState(null);
  const [overTrash, setOverTrash] = React.useState(false);
  const boardRef = React.useRef(null);
  const trashRef = React.useRef(null);

  React.useEffect(() => { setItems(ideas); }, [ideas]);

  const dragRef = React.useRef({ id: null, el: null, startX: 0, startY: 0, baseX: 0, baseY: 0, raf: 0, latestX: 0, latestY: 0, clientX: 0, clientY: 0 });

  const onPointerDown = (e, id) => {
    if (!draggable) return;
    if (e.target.closest("button, a, input, textarea, select")) return;
    const sticky = e.currentTarget;
    const item = items.find(i => i.id === id);
    const board = boardRef.current.getBoundingClientRect();
    const rect = sticky.getBoundingClientRect();
    const baseX = item && item.free ? (item.x || 0) : (rect.left - board.left);
    const baseY = item && item.free ? (item.y || 0) : (rect.top - board.top);
    dragRef.current = { id, el: sticky, startX: e.clientX, startY: e.clientY, baseX, baseY, raf: 0, latestX: baseX, latestY: baseY, clientX: e.clientX, clientY: e.clientY };
    setDraggingId(id);
    if (!item.free) {
      setItems(prev => prev.map(it => it.id === id ? { ...it, x: baseX, y: baseY, free: true } : it));
    }
    sticky.setPointerCapture(e.pointerId);
    e.preventDefault();
  };
  const flush = () => {
    dragRef.current.raf = 0;
    const { id, el, latestX, latestY } = dragRef.current;
    if (!id || !el) return;
    el.style.transform = `translate3d(${latestX}px, ${latestY}px, 0) rotate(-1.5deg) scale(1.04)`;
  };
  const checkOverTrash = (clientX, clientY) => {
    if (!trashRef.current || !onDelete) return false;
    const tr = trashRef.current.getBoundingClientRect();
    return clientX >= tr.left && clientX <= tr.right && clientY >= tr.top && clientY <= tr.bottom;
  };
  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (!d.id) return;
    d.latestX = d.baseX + (e.clientX - d.startX);
    d.latestY = d.baseY + (e.clientY - d.startY);
    d.clientX = e.clientX;
    d.clientY = e.clientY;
    if (!d.raf) d.raf = requestAnimationFrame(flush);
    setOverTrash(checkOverTrash(e.clientX, e.clientY));
  };
  const onPointerUp = (e) => {
    const d = dragRef.current;
    if (!d.id) return;
    if (d.raf) cancelAnimationFrame(d.raf);
    if (d.el) d.el.style.transform = "";
    const cx = e ? e.clientX : d.clientX;
    const cy = e ? e.clientY : d.clientY;
    if (onDelete && checkOverTrash(cx, cy)) {
      setItems(prev => prev.filter(it => it.id !== d.id));
      onDelete(d.id);
    } else {
      setItems(prev => prev.map(it => it.id === d.id ? { ...it, x: d.latestX, y: d.latestY, free: true } : it));
    }
    setOverTrash(false);
    dragRef.current = { id: null, el: null, startX: 0, startY: 0, baseX: 0, baseY: 0, raf: 0, latestX: 0, latestY: 0, clientX: 0, clientY: 0 };
    setDraggingId(null);
  };

  const onKeyDown = (e, id) => {
    const STEP = 12;
    let dx = 0, dy = 0;
    if (e.key === "ArrowLeft") dx = -STEP;
    else if (e.key === "ArrowRight") dx = STEP;
    else if (e.key === "ArrowUp") dy = -STEP;
    else if (e.key === "ArrowDown") dy = STEP;
    else if ((e.key === "Delete" || e.key === "Backspace") && onDelete) {
      e.preventDefault();
      setItems(prev => prev.filter(it => it.id !== id));
      onDelete(id);
      return;
    } else return;
    e.preventDefault();
    setItems(prev => prev.map(it => {
      if (it.id !== id) return it;
      const x = (it.x || 0) + dx;
      const y = (it.y || 0) + dy;
      return { ...it, x, y, free: true };
    }));
  };

  const display = compact ? items.slice(0, 4) : items;

  return (
    <div className={`big-ideas-board${compact ? " big-ideas-board--compact" : ""}`} ref={boardRef} onPointerMove={onPointerMove} onPointerUp={onPointerUp}>
      {onDelete && !compact && (
        <div ref={trashRef} style={{ position: "absolute", top: 12, right: 12, zIndex: 25, pointerEvents: "none",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
          padding: "10px 14px", borderRadius: 10,
          border: overTrash ? "2px solid #C0392B" : "2px dashed #bbb",
          background: overTrash ? "#fff0ee" : "rgba(255,255,255,0.82)",
          color: overTrash ? "#C0392B" : "#999", fontSize: 11, userSelect: "none" }}>
          <Icon name="trash" size={20} />
          <span style={{ fontWeight: 500 }}>{overTrash ? "Release!" : "Delete"}</span>
        </div>
      )}
      <div className="big-ideas-grid">
        {display.map(it => (
          <div
            key={it.id}
            className={`sticky sticky--${it.color} ${draggingId === it.id ? "sticky--dragging" : ""}`}
            style={it.free ? { transform: `translate3d(${it.x}px, ${it.y}px, 0)`, transition: draggingId === it.id ? "none" : undefined } : {}}
            onPointerDown={(e) => onPointerDown(e, it.id)}
            onKeyDown={(e) => onKeyDown(e, it.id)}
            tabIndex={0}
            role="article"
            aria-label={`Idea: ${it.title} by ${it.author || "anonymous"}. Use arrow keys to reposition.`}
          >
            <div className="sticky__pin" aria-hidden="true"></div>
            <h4 className="sticky__title">{it.title}</h4>
            {it.desc && <p style={{ margin: 0, fontSize: 11, lineHeight: 1.4 }}>{it.desc}</p>}
            <div className="sticky__author">
              <Icon name="user" size={11} /> {it.author || "Anonymous"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============== Document thumb (placeholder) ==============
const DocThumb = ({ kind }) => {
  const palettes = {
    exec: ["#1F4E5F", "#2A6A7E"],
    project: ["#E8DBFF", "#C9B1FF"],
    specs: ["#1B1230", "#3D2766"],
    style: ["#F4ECFF", "#D6BAFF"],
    future: ["#FFE4D0", "#FFC299"],
    journey: ["#FFF1A8", "#FFD970"],
    interviews: ["#C7F2D7", "#8FE0A2"],
    mission: ["#C9DCFF", "#A8C2F5"],
    pitch: ["#2E0B5C", "#5B1AC9"],
    governance: ["#FFE0E0", "#FF9999"],
    arch: ["#1B1230", "#56476E"],
    api: ["#E0D0FF", "#B89BFF"],
    ai: ["#0F0A1F", "#6B21D9"],
    rbac: ["#56476E", "#8A7DA1"]
  };
  const [bg, accent] = palettes[kind] || ["#E8E2F2", "#B89BFF"];
  return (
    <div style={{
      width: "100%", height: "100%",
      background: `linear-gradient(135deg, ${bg} 0%, ${accent} 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "rgba(255,255,255,0.9)",
      fontFamily: "var(--font-mono)",
      fontSize: 9
    }}>
      <div style={{
        width: "60%", height: "70%", background: "rgba(255,255,255,0.85)",
        borderRadius: 4, padding: 6,
        display: "flex", flexDirection: "column", gap: 2
      }}>
        <div style={{ height: 4, width: "70%", background: accent, borderRadius: 2 }}></div>
        <div style={{ height: 2, background: "rgba(0,0,0,0.15)", borderRadius: 1, marginTop: 2 }}></div>
        <div style={{ height: 2, width: "85%", background: "rgba(0,0,0,0.15)", borderRadius: 1 }}></div>
        <div style={{ height: 2, width: "60%", background: "rgba(0,0,0,0.15)", borderRadius: 1 }}></div>
        <div style={{ flex: 1, background: "rgba(0,0,0,0.05)", borderRadius: 2, marginTop: 2 }}></div>
      </div>
    </div>
  );
};

// ============== Document card ==============
const DocCard = ({ doc, onView, onDownload, onOpenDoc }) => (
  <article className="doc-card">
    <div className="doc-card__thumb">
      <DocThumb kind={doc.thumb} />
      {doc.needsReview && (
        <span className="doc-card__needs-review badge badge--needs-review" title="Needs review">
          <Icon name="flag" size={11} /> Needs Review
        </span>
      )}
      <button className="doc-card__menu" aria-label={`Options for ${doc.title}`} title="Options">
        <Icon name="more" size={16} />
      </button>
    </div>
    <div className="doc-card__body">
      <h4 className="doc-card__title">{doc.title}</h4>
      <div className="doc-card__sub">v{doc.version} · Updated {fmtDate(doc.updated)}</div>
    </div>
    <div className="doc-card__actions">
      <button className="doc-card__action" onClick={() => onView(doc)} aria-label={`View ${doc.title}`}>
        <Icon name="eye" size={13} /> View
      </button>
      <button className="doc-card__action" onClick={() => onDownload(doc)} aria-label={`Download ${doc.title}`}>
        <Icon name="download" size={13} /> Download
      </button>
      {doc.googleDocs && (
        <button className="doc-card__action" onClick={() => onOpenDoc(doc)} aria-label={`Open ${doc.title} in Google Docs`}>
          <Icon name="google-doc" size={13} /> Docs
        </button>
      )}
    </div>
  </article>
);

// ============== Document list row ==============
const DocListRow = ({ doc, onView, onDownload, onOpenDoc }) => (
  <article className="doc-row">
    <div className="doc-row__thumb"><DocThumb kind={doc.thumb} /></div>
    <div className="doc-row__main">
      <div className="doc-row__title-line">
        <h4 className="doc-row__title">{doc.title}</h4>
        {doc.needsReview && (
          <span className="badge badge--needs-review" title="Needs review">
            <Icon name="flag" size={10} /> Needs Review
          </span>
        )}
      </div>
      <div className="doc-row__meta">
        <span>v{doc.version}</span>
        <span aria-hidden="true">·</span>
        <span>Updated {fmtDate(doc.updated)}</span>
        {doc.owner && (<><span aria-hidden="true">·</span><span>{doc.owner}</span></>)}
      </div>
    </div>
    <div className="doc-row__actions">
      <button className="doc-card__action" onClick={() => onView(doc)} aria-label={`View ${doc.title}`}>
        <Icon name="eye" size={13} /> View
      </button>
      <button className="doc-card__action" onClick={() => onDownload(doc)} aria-label={`Download ${doc.title}`}>
        <Icon name="download" size={13} /> Download
      </button>
      {doc.googleDocs && onOpenDoc && (
        <button className="doc-card__action" onClick={() => onOpenDoc(doc)} aria-label={`Open ${doc.title} in Google Docs`}>
          <Icon name="google-doc" size={13} /> Docs
        </button>
      )}
    </div>
  </article>
);

// ============== Helpers ==============
const fmtDate = (iso) => {
  const d = new Date(iso + "T00:00");
  return d.toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" });
};

// ============== Deferred (from sign-off) card ==============
const DeferredCard = ({ item, allDocs = [], onView, onRemove }) => {
  const refs = (item.relatedDocIds || []).map(id => allDocs.find(d => d.id === id)).filter(Boolean);
  const date = new Date(item.deferredAt);
  const dateStr = date.toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" });
  return (
    <article className="deferred-card">
      <div className="deferred-card__header">
        <span className="deferred-card__badge">
          <Icon name="clock" size={11} /> Deferred
        </span>
        <span className="deferred-card__date">{dateStr}</span>
      </div>
      <h4 className="deferred-card__title">{item.itemLabel}</h4>
      <div className="deferred-card__source">
        From <strong>{item.formTitle}</strong>
      </div>
      {item.context && (
        <div className="deferred-card__context">
          <Icon name="message" size={11} /> {item.context}
        </div>
      )}
      <div className="deferred-card__refs">
        {refs.length === 0 ? (
          <span className="deferred-card__no-refs">No reference documents linked</span>
        ) : (
          refs.map(d => (
            <button key={d.id} type="button" className="deferred-card__ref" onClick={() => onView && onView(d)}>
              <Icon name="link" size={11} /> {d.title}
            </button>
          ))
        )}
      </div>
      {onRemove && (
        <button type="button" className="deferred-card__dismiss" onClick={() => onRemove(item.id)} aria-label={`Remove deferred item: ${item.itemLabel}`} title="Remove">
          <Icon name="x" size={12} />
        </button>
      )}
    </article>
  );
};

// ============== Generic toned badge ==============
const Badge = ({ tone = "gray", children }) => {
  const styles = {
    green:  { background: "#E3F8E8", color: "#1F6B33" },
    amber:  { background: "#FFF3D6", color: "#8A6608" },
    red:    { background: "#FFE0E0", color: "#A8201F" },
    gray:   { background: "#E8E2F2", color: "#56476E" },
    purple: { background: "var(--primary-light)", color: "var(--primary)" },
  };
  return <span className="badge" style={styles[tone] || styles.gray}>{children}</span>;
};

Object.assign(window, {
  StartHere, PhaseCard, NeedsReview, RecentActivity, TimelineWidget,
  AnalyticsSnapshot, BigIdeasBoard, DocCard, DocListRow, DocThumb, DeferredCard, Badge, fmtDate
});
