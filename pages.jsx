// ============== Pages: Documents, Calendar, Sign-Off, Big Ideas, Analytics, Admin, Start Here ==============

const PHASES = ["Spring 2026", "Summer 2026", "Fall 2026", "Future Work", "Evergreen"];
const CATEGORIES = ["Project Overview", "Strategy & Planning", "Research & Insights", "UX & Design",
  "Technical Documentation", "Governance & Sign-Offs", "Presentations", "Future Opportunities"];

// ----- Documents Page -----
const DocumentsPage = ({ docs, search, onView, onDownload, onOpenDoc, onNav, fixedPhase, pageTitle, pageSubtitle, deferredItems = [], onRemoveDeferred, allDocs }) => {
  const [phase, setPhase] = React.useState(fixedPhase || "All");
  const [category, setCategory] = React.useState("All");
  const [status, setStatus] = React.useState("All");
  const [sort, setSort] = React.useState("recent");
  const [viewMode, setViewMode] = React.useState("grid"); // grid | list

  React.useEffect(() => { if (fixedPhase) setPhase(fixedPhase); }, [fixedPhase]);

  const filtered = docs.filter(d => {
    if (phase !== "All" && d.phase !== phase) return false;
    if (category !== "All" && d.category !== category) return false;
    if (status !== "All" && d.status !== status) return false;
    if (search && !`${d.title} ${d.description} ${d.tags.join(" ")}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "recent") return new Date(b.updated) - new Date(a.updated);
    if (sort === "az") return a.title.localeCompare(b.title);
    if (sort === "views") return b.views - a.views;
    return 0;
  });

  const subcats = {};
  sorted.forEach(d => { (subcats[d.category] = subcats[d.category] || []).push(d); });
  const subcatOrder = CATEGORIES.filter(c => subcats[c]);

  return (
    <div>
      {fixedPhase && (
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <button className="breadcrumb__link" onClick={() => onNav && onNav("dashboard")}>Dashboard</button>
          <span className="breadcrumb__sep">›</span>
          <button className="breadcrumb__link" onClick={() => onNav && onNav("documents")}>Documents</button>
          <span className="breadcrumb__sep">›</span>
          <span className="breadcrumb__current">{fixedPhase}</span>
        </nav>
      )}
      <div className="page-header">
        <h1>{pageTitle || "Documents"}</h1>
        <p>{pageSubtitle || "All project documentation across phases."}</p>
      </div>

      <div className="filters-bar">
        {!fixedPhase && (
          <select className="filter-select" value={phase} onChange={(e) => setPhase(e.target.value)} aria-label="Phase">
            <option>All</option>{PHASES.map(p => <option key={p}>{p}</option>)}
          </select>
        )}
        <select className="filter-select" value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Category">
          <option>All</option>{CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select className="filter-select" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status">
          <option>All</option><option>Approved</option><option>Current</option><option>For Review</option><option>In Progress</option><option>Archived</option>
        </select>
        <select className="filter-select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
          <option value="recent">Most recent</option><option value="az">A → Z</option><option value="views">Most viewed</option>
        </select>
        <div className="view-toggle" role="group" aria-label="View mode">
          <button className={viewMode === "grid" ? "is-active" : ""} onClick={() => setViewMode("grid")} aria-pressed={viewMode === "grid"}>Grid</button>
          <button className={viewMode === "list" ? "is-active" : ""} onClick={() => setViewMode("list")} aria-pressed={viewMode === "list"}>List</button>
        </div>
        <span style={{ marginLeft: "auto", color: "var(--text-3)", fontSize: 12 }}>{sorted.length} documents</span>
      </div>

      {sorted.length === 0 && !(fixedPhase === "Future Work" && deferredItems.length > 0) ? (
        <section className="card empty">
          <div className="empty__emoji">📭</div>
          <div className="empty__title">No documents match your filters</div>
          <div className="empty__msg">Try adjusting your filters or clearing the search.</div>
        </section>
      ) : fixedPhase ? (
        <div className="subcat-stack">
          {fixedPhase === "Future Work" && deferredItems.length > 0 && (
            <section className="subcat-section">
              <div className="subcat-section__header">
                <h2 className="subcat-section__title">Deferred from Sign-Off</h2>
                <span className="subcat-section__count">{deferredItems.length} item{deferredItems.length === 1 ? "" : "s"}</span>
              </div>
              <div className="deferred-grid">
                {deferredItems.map(d => (
                  <DeferredCard key={d.id} item={d} allDocs={allDocs || docs} onView={onView} onRemove={onRemoveDeferred} />
                ))}
              </div>
            </section>
          )}
          {subcatOrder.map(cat => (
            <section key={cat} className="subcat-section">
              <div className="subcat-section__header">
                <h2 className="subcat-section__title">{cat}</h2>
                <span className="subcat-section__count">{subcats[cat].length} doc{subcats[cat].length === 1 ? "" : "s"}</span>
              </div>
              {viewMode === "grid" ? (
                <div className="docs-row">
                  {subcats[cat].map(d => <DocCard key={d.id} doc={d} onView={onView} onDownload={onDownload} onOpenDoc={onOpenDoc} />)}
                </div>
              ) : (
                <div className="doc-list">
                  {subcats[cat].map(d => <DocListRow key={d.id} doc={d} onView={onView} onDownload={onDownload} />)}
                </div>
              )}
            </section>
          ))}
        </div>
      ) : viewMode === "grid" ? (
        <div className="docs-row">
          {sorted.map(d => <DocCard key={d.id} doc={d} onView={onView} onDownload={onDownload} onOpenDoc={onOpenDoc} />)}
        </div>
      ) : (
        <div className="doc-list">
          {sorted.map(d => <DocListRow key={d.id} doc={d} onView={onView} onDownload={onDownload} />)}
        </div>
      )}
    </div>
  );
};

// ----- Start Here Page -----
const StartHerePage = ({ docs, onView, onNav, onStartTour, readDocs = new Set(), pins = {}, onSavePins }) => {
  const steps = START_HERE_STEPS;
  const [pickerStep, setPickerStep] = React.useState(null);

  const pin = (stepId, docId) => {
    if (onSavePins) onSavePins({ ...pins, [stepId]: docId });
    setPickerStep(null);
  };
  const unpin = (stepId) => {
    const next = { ...pins }; delete next[stepId];
    if (onSavePins) onSavePins(next);
  };
  const getDoc = (step) => {
    const pinnedId = pins[step.id];
    return pinnedId
      ? docs.find(d => d.id === pinnedId)
      : docs.find(d => d.title === step.defaultTitle);
  };

  return (
    <div>
      <div className="page-header">
        <h1>Start Here</h1>
        <p>A guided path through five core resources — best for first-time visitors. Use 📌 to pin any document from your library to each step.</p>
      </div>
      <div className="dashboard">
        {steps.map(step => {
          const pinnedId = pins[step.id];
          const pinnedDoc = pinnedId ? docs.find(d => d.id === pinnedId) : null;
          const resolvedDoc = getDoc(step);
          const isOpen = pickerStep === step.id;
          const isRead = resolvedDoc && readDocs.has(resolvedDoc.id);
          return (
            <div key={step.id} className="col-12 start-here-step-wrap">
              <div className="card start-here-step">
                <div className="start-here-step__emoji">{step.emoji}</div>
                <div className="start-here-step__body">
                  <div className="start-here-step__title">{step.label}</div>
                  <div className="start-here-step__desc">
                    {resolvedDoc
                      ? resolvedDoc.description
                      : "No document linked yet — pin one using the 📌 button."}
                  </div>
                  {pinnedDoc && pinnedDoc.title !== step.label && (
                    <div className="start-here-step__pin-label">📌 {pinnedDoc.title}</div>
                  )}
                  {isRead && <div className="start-here-step__read">✓ Read</div>}
                </div>
                <button
                  className={`start-here-step__pin-btn${pinnedDoc ? " is-pinned" : ""}`}
                  onClick={() => setPickerStep(prev => prev === step.id ? null : step.id)}
                  title={pinnedDoc ? `Pinned: ${pinnedDoc.title} — click to change` : "Pin a document to this step"}
                  aria-label={`Pin document to ${step.label}`}
                  aria-expanded={isOpen}
                >
                  📌
                </button>
                <button
                  className="start-here-step__open-btn"
                  onClick={() => { if (resolvedDoc && onView) onView(resolvedDoc); }}
                  disabled={!resolvedDoc}
                  aria-label={`Open ${step.label}`}
                >
                  <Icon name="chevron-right" size={18} />
                </button>
              </div>
              {isOpen && (
                <StartHerePicker
                  stepId={step.id}
                  docs={docs}
                  pins={pins}
                  onPin={pin}
                  onUnpin={unpin}
                  onClose={() => setPickerStep(null)}
                />
              )}
            </div>
          );
        })}
        <div className="col-12">
          <button className="card card--clickable" onClick={() => { onNav && onNav("dashboard"); if (onStartTour) onStartTour(); }}
                  style={{ width: "100%", textAlign: "left", padding: 18, display: "grid", gridTemplateColumns: "56px 1fr auto", gap: 18, alignItems: "center", border: "1px solid var(--border)", cursor: "pointer", font: "inherit", color: "inherit", background: "var(--surface)", borderRadius: "var(--radius)" }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: "var(--surface-2)", display: "grid", placeItems: "center", fontSize: 26 }}>🏠</div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, marginBottom: 4 }}>Explore the Dashboard</div>
              <div style={{ fontSize: 13, color: "var(--text-3)" }}>Get an at-a-glance view of the entire portal.</div>
            </div>
            <Icon name="chevron-right" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ----- Calendar Page -----
const CAT_META = {
  Milestone: { emoji: "🎯", color: "#6B3FBF" },
  Meeting:   { emoji: "🗓️", color: "#3D8FBF" },
  Review:    { emoji: "📋", color: "#D4843A" },
  Deadline:  { emoji: "⏰", color: "#C0392B" },
  Workshop:  { emoji: "💡", color: "#3D8F5C" },
  Event:     { emoji: "🎉", color: "#0891B2" },
  Other:     { emoji: "📌", color: "#7A6FBF" }
};

const CalendarPage = ({ events, setEvents, onActivity }) => {
  const [cursor, setCursor] = React.useState(new Date(2026, 4, 1));
  const [picker, setPicker] = React.useState(null);
  const [filter, setFilter] = React.useState("All");

  const monthStart = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const monthEnd = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0);
  const firstWeekday = monthStart.getDay();
  const daysInMonth = monthEnd.getDate();
  const monthName = cursor.toLocaleString("en-US", { month: "long", year: "numeric" });

  const filtered = (events || []).filter(e => filter === "All" || e.category === filter);
  const eventsByDate = {};
  filtered.forEach(e => { (eventsByDate[e.date] = eventsByDate[e.date] || []).push(e); });

  const fmtDateKey = (y, m, d) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const today = new Date();
  const isToday = (y, m, d) => today.getFullYear() === y && today.getMonth() === m && today.getDate() === d;

  const milestones = [
    { id: "m-pitch", date: "2026-06-01", title: "Capstone Pitch", labelDate: "Jun 1" },
    { id: "m-final", date: "2026-12-05", title: "Capstone Presentation", labelDate: "Dec TBD" },
  ];
  const now = new Date("2026-05-15");
  const totalSpan = new Date(milestones[milestones.length - 1].date) - new Date(milestones[0].date);
  const elapsed = Math.max(0, Math.min(totalSpan, now - new Date(milestones[0].date)));
  const progressPct = (elapsed / totalSpan) * 100;
  const reachedIdx = milestones.findIndex(m => new Date(m.date) > now) - 1;
  const activeIdx = milestones.findIndex(m => new Date(m.date) >= now);

  const openCreate = (dateKey) => setPicker({ date: dateKey, event: null });
  const openEdit = (ev) => setPicker({ date: ev.date, event: ev });
  const saveEvent = (data) => {
    if (data.id) {
      setEvents(prev => prev.map(e => e.id === data.id ? data : e));
      onActivity && onActivity("event-edit", data.title);
    } else {
      setEvents(prev => [...prev, { ...data, id: "ev" + Date.now() }]);
      onActivity && onActivity("event-add", data.title);
    }
    setPicker(null);
  };
  const deleteEvent = (id) => {
    const ev = (events || []).find(e => e.id === id);
    setEvents(prev => prev.filter(e => e.id !== id));
    if (ev) onActivity && onActivity("event-del", ev.title);
    setPicker(null);
  };

  // Build 6-row grid (with leading/trailing blanks)
  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push({ blank: true, key: "b" + i });
  for (let d = 1; d <= daysInMonth; d++) {
    const dk = fmtDateKey(cursor.getFullYear(), cursor.getMonth(), d);
    cells.push({ day: d, key: dk, dateKey: dk, evs: eventsByDate[dk] || [], isToday: isToday(cursor.getFullYear(), cursor.getMonth(), d) });
  }

  return (
    <div>
      <div className="page-header"><h1>Calendar & Timeline</h1><p>Project milestones, meetings, and deadlines across both phases.</p></div>

      <section className="card" style={{ marginBottom: 20, paddingBottom: 56 }}>
        <h3 className="card__title" style={{ marginBottom: 8 }}>Project Progress</h3>
        <div className="tracker">
          <div className="tracker__rail"></div>
          <div className="tracker__fill" style={{ width: `${progressPct}%` }}></div>
          <div className="tracker__stops">
            {milestones.map((m, i) => {
              const pos = ((new Date(m.date) - new Date(milestones[0].date)) / totalSpan) * 100;
              const cls = i <= reachedIdx ? "tracker__stop--done" : i === activeIdx ? "tracker__stop--active" : "";
              return (
                <div key={m.id} className={`tracker__stop ${cls}`} style={{ left: `${pos}%` }}>
                  <div className="tracker__dot">{i + 1}</div>
                  <div className="tracker__label">
                    <div className="tracker__label-date">{m.labelDate || fmtDate(m.date)}</div>
                    <div className="tracker__label-title-wrap"><div className="tracker__label-title">{m.title}</div></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="filters-bar">
        <button className="btn btn--ghost btn--small" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))} aria-label="Previous month" title="Previous month"><Icon name="chevron-left" size={14} /></button>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, minWidth: 180, textAlign: "center" }}>{monthName}</div>
        <button className="btn btn--ghost btn--small" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))} aria-label="Next month" title="Next month"><Icon name="chevron-right" size={14} /></button>
        <button className="btn btn--ghost btn--small" onClick={() => setCursor(new Date(2026, 4, 1))}>Today</button>
        <select className="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Category">
          <option>All</option>{Object.keys(CAT_META).map(k => <option key={k}>{k}</option>)}
        </select>
        <button className="btn btn--primary btn--small" style={{ marginLeft: "auto" }} onClick={() => openCreate(fmtDateKey(cursor.getFullYear(), cursor.getMonth(), 1))}>
          <Icon name="plus" size={12} /> Add event
        </button>
      </div>

      <div className="calendar">
        <div className="calendar__grid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => <div key={d} className="calendar__day-name">{d}</div>)}
          {cells.map(c => c.blank ? <div key={c.key} className="calendar__day calendar__day--other" aria-hidden="true"></div> : (
            <div key={c.key} className={`calendar__day ${c.isToday ? "calendar__day--today" : ""}`}
                 onClick={() => openCreate(c.dateKey)} role="button" tabIndex={0}
                 onKeyDown={(e) => { if (e.key === "Enter") openCreate(c.dateKey); }}>
              <div className="calendar__day-num">{c.day}</div>
              {c.evs.slice(0, 3).map(ev => {
                const meta = CAT_META[ev.category] || CAT_META.Other;
                const bg = ev.color || meta.color;
                const em = ev.emoji || meta.emoji;
                const timeStr = ev.time ? (ev.timeEnd ? `${ev.time}–${ev.timeEnd} ` : `${ev.time} `) : "";
                return (
                  <button key={ev.id} className="calendar__event" style={{ background: bg, color: "white" }}
                          onClick={(e) => { e.stopPropagation(); openEdit(ev); }} title={`${timeStr}${ev.title}`}>
                    {em} {timeStr}{ev.title}
                  </button>
                );
              })}
              {c.evs.length > 3 && <div style={{ fontSize: 10, color: "var(--text-3)", marginTop: 2 }}>+{c.evs.length - 3} more</div>}
            </div>
          ))}
        </div>
      </div>

      {picker && <EventModal event={picker.event} date={picker.date} onSave={saveEvent} onDelete={deleteEvent} onClose={() => setPicker(null)} />}

      <section className="card" style={{ marginTop: 24 }}>
        <h3 className="card__title" style={{ marginBottom: 12 }}>All Events</h3>
        <div className="timeline-list">
          {(() => {
            const all = (events || []).map(e => ({
              id: e.id, date: e.date, title: e.title, category: e.category, ev: e
            })).sort((a, b) => new Date(a.date) - new Date(b.date));
            if (all.length === 0) {
              return <div style={{ padding: "16px 0", color: "var(--text-3)", fontSize: 13 }}>No events scheduled.</div>;
            }
            return all.map((item, i) => {
              const dt = new Date(item.date + "T00:00");
              const day = dt.getDate();
              const mo = dt.toLocaleString("en-US", { month: "short" });
              const yr = dt.getFullYear();
              const meta = CAT_META[item.category] || CAT_META.Other;
              const isPast = dt < new Date("2026-05-15");
              // Honor per-event custom emoji + color overrides
              const em = item.ev.emoji || meta.emoji;
              const color = item.ev.color || meta.color;
              // Option C: soft tinted bg + dark-saturated text derived from the category color
              const badgeStyle = {
                background: `color-mix(in oklch, ${color} 18%, #fff)`,
                color: `color-mix(in oklch, ${color} 80%, #000 20%)`,
                border: `1px solid color-mix(in oklch, ${color} 35%, #fff)`,
              };
              return (
                <button
                  type="button"
                  key={item.id || i}
                  className="timeline-row timeline-row--clickable"
                  onClick={() => openEdit(item.ev)}
                >
                  <div className="timeline-row__date">
                    <strong>{day}</strong>
                    {mo} {yr}
                  </div>
                  <div className={`timeline-dot ${isPast ? "timeline-dot--filled" : ""}`} style={{ borderColor: color }}></div>
                  <div className="timeline-row__title">
                    <span style={{ marginRight: 8 }}>{em}</span>{item.title}
                  </div>
                  <span className="badge" style={badgeStyle}>
                    {item.category}
                  </span>
                </button>
              );
            });
          })()}
        </div>
      </section>
    </div>
  );
};

// ----- Event Modal (rich: emoji + time + category swatches) -----
const EMOJI_PALETTE = [
  "🎯","📋","📝","📊","📈","📉","📌","🔖","📅","🗓️","⏰","⌛","⏳","🔔","📢","📣","🚨","🏁","🎌",
  "💬","💭","📞","📱","💻","🖥️","📡","🔗","📤","📥","✉️","🗂️","📁","📂","📚","🎓","🏫",
  "💡","🔍","🔬","🛠️","⚙️","🔧","🔨","🏗️","🔑","🗝️","🔐","💰","💎","🧪","🧬","🤖",
  "🎉","🎊","🎈","🥳","🏆","🥇","🎁","🎂","🎀","⭐","🌟","💫","✨","🔥","💥","⚡","❄️",
  "🚀","🛤️","🗺️","🧭","📍","🏠","🌐","🏔️","⛰️","🌊","🌈","🌙","☀️","🌞","🌅",
  "🌱","🌿","🍀","🌺","🌸","🌻","🌹","🌷","🍁","🌴","🎋","🌵","🍄","🌾","🪸",
  "🦋","🐝","🦁","🐯","🦊","🐻","🦅","🦉","🐬","🦄","🐸","🦒","🐙","🦩","🐺",
  "👋","👍","👏","🙌","🤝","💪","🧠","👁️","🫶","🤲","🎤","🎨","🎵","🎭","🎪",
  "💜","💙","💚","❤️","🧡","💛","🩷","🤍","💎","🔮","✅","❌","❓","❗","🔴","🟡","🟢",
];

const EventModal = ({ event, date, onSave, onDelete, onClose }) => {
  const initial = event || {
    title: "",
    date,
    dateEnd: "",
    time: "",
    timeEnd: "",
    category: "Meeting",
    phase: "Spring 2026",
    emoji: "",
    color: "",
    notes: ""
  };
  const [form, setForm] = React.useState({
    id: initial.id || "",
    title: initial.title || "",
    date: initial.date || date,
    dateEnd: initial.dateEnd || "",
    time: initial.time || "",
    timeEnd: initial.timeEnd || "",
    category: initial.category || "Meeting",
    phase: initial.phase || "Spring 2026",
    emoji: initial.emoji || "",
    color: initial.color || "",
    notes: initial.notes || ""
  });
  const [dateMode, setDateMode] = React.useState(initial.dateEnd ? "range" : "single");
  const [timeMode, setTimeMode] = React.useState(initial.timeEnd ? "range" : "start");
  const [emojiOpen, setEmojiOpen] = React.useState(false);
  const [catOpen, setCatOpen] = React.useState(false);

  const meta = CAT_META[form.category] || CAT_META.Other;
  const displayEmoji = form.emoji || meta.emoji;
  const displayColor = form.color || meta.color;

  const update = (patch) => setForm(f => ({ ...f, ...patch }));

  const save = () => {
    if (!form.title.trim()) return;
    const out = { ...form };
    if (out.emoji === meta.emoji) out.emoji = "";
    if (out.color === meta.color) out.color = "";
    if (dateMode === "single") out.dateEnd = "";
    if (timeMode === "start") out.timeEnd = "";
    onSave(out);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal modal--narrow" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2>{event ? "Edit event" : "New event"}</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close" title="Close"><Icon name="x" size={16} /></button>
        </div>
        <div className="modal__body">
          {/* Emoji + title row */}
          <div className="event-row">
            <button
              type="button"
              className="emoji-btn"
              onClick={() => { setEmojiOpen(o => !o); setCatOpen(false); }}
              aria-label="Choose emoji"
              aria-expanded={emojiOpen}
              title="Choose emoji"
              style={{ fontSize: 22 }}
            >
              {displayEmoji}
            </button>
            <input
              className="event-title-input"
              placeholder="Event title"
              value={form.title}
              onChange={(e) => update({ title: e.target.value })}
              autoFocus
            />
          </div>

          {emojiOpen && (
            <div className="emoji-grid emoji-grid--large" role="listbox" aria-label="Emoji">
              {EMOJI_PALETTE.map(em => (
                <button
                  key={em}
                  type="button"
                  className={`emoji-grid__item${form.emoji === em ? " is-selected" : ""}`}
                  onClick={() => { update({ emoji: em }); setEmojiOpen(false); }}
                >
                  {em}
                </button>
              ))}
            </div>
          )}

          {/* Date */}
          <div className="field">
            <label>Date</label>
            <div className="range-toggle">
              <button type="button" className={`range-toggle__btn${dateMode === "single" ? " is-active" : ""}`} onClick={() => setDateMode("single")}>Single date</button>
              <button type="button" className={`range-toggle__btn${dateMode === "range" ? " is-active" : ""}`} onClick={() => setDateMode("range")}>Date range</button>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input type="date" value={form.date} onChange={(e) => update({ date: e.target.value })} style={{ flex: 1 }} />
              {dateMode === "range" && (
                <React.Fragment>
                  <span style={{ color: "var(--text-3)", fontSize: 12, whiteSpace: "nowrap" }}>to</span>
                  <input type="date" value={form.dateEnd} onChange={(e) => update({ dateEnd: e.target.value })} style={{ flex: 1 }} />
                </React.Fragment>
              )}
            </div>
          </div>

          {/* Time */}
          <div className="field">
            <label>Time <span style={{ color: "var(--text-3)", fontWeight: 400, fontSize: 11 }}>(optional)</span></label>
            <div className="range-toggle">
              <button type="button" className={`range-toggle__btn${timeMode === "start" ? " is-active" : ""}`} onClick={() => setTimeMode("start")}>Start only</button>
              <button type="button" className={`range-toggle__btn${timeMode === "range" ? " is-active" : ""}`} onClick={() => setTimeMode("range")}>Start &amp; end</button>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input type="time" value={form.time} onChange={(e) => update({ time: e.target.value })} style={{ flex: 1 }} />
              {timeMode === "range" && (
                <React.Fragment>
                  <span style={{ color: "var(--text-3)", fontSize: 12, whiteSpace: "nowrap" }}>to</span>
                  <input type="time" value={form.timeEnd} onChange={(e) => update({ timeEnd: e.target.value })} style={{ flex: 1 }} />
                </React.Fragment>
              )}
            </div>
          </div>

          {/* Category trigger */}
          <div className="field">
            <label>Category</label>
            <button
              type="button"
              className="cat-trigger"
              onClick={() => { setCatOpen(o => !o); setEmojiOpen(false); }}
              aria-expanded={catOpen}
              title="Choose category"
            >
              <span className="cat-trigger__swatch" style={{ background: displayColor }} />
              <span>{form.category}</span>
              <Icon name="chevron-down" size={14} />
            </button>
            {catOpen && (
              <div className="cat-pop">
                <div className="cat-pop__list">
                  {Object.entries(CAT_META).map(([k, m]) => (
                    <button
                      key={k}
                      type="button"
                      className="cat-pop__item"
                      onClick={() => { update({ category: k, color: "" }); setCatOpen(false); }}
                    >
                      <span className="cat-trigger__swatch" style={{ background: m.color }} />
                      <span>{k}</span>
                    </button>
                  ))}
                </div>
                <div className="cat-pop__custom">
                  <label style={{ fontSize: 11, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 6 }}>
                    Custom color for this event
                  </label>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input
                      type="color"
                      value={displayColor}
                      onChange={(e) => update({ color: e.target.value })}
                      style={{ width: 40, height: 32, border: "1px solid var(--border)", borderRadius: 6, padding: 2, background: "var(--surface)", cursor: "pointer" }}
                    />
                    <code style={{ fontSize: 12, color: "var(--text-2)" }}>{displayColor}</code>
                    {form.color && (
                      <button type="button" className="btn btn--ghost btn--small" onClick={() => update({ color: "" })} style={{ marginLeft: "auto" }}>
                        Reset to category
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Phase */}
          <div className="field">
            <label>Phase</label>
            <select className="filter-select" value={form.phase} onChange={(e) => update({ phase: e.target.value })}>
              <option>Spring 2026</option><option>Summer 2026</option><option>Fall 2026</option><option>Future Work</option><option>Evergreen</option>
            </select>
          </div>

          {/* Notes */}
          <div className="field">
            <label>Notes</label>
            <textarea rows={3} value={form.notes} onChange={(e) => update({ notes: e.target.value })} />
          </div>
        </div>
        <div className="modal__footer">
          {event && (
            <button className="btn btn--ghost btn--danger" onClick={() => onDelete(event.id)}>
              Delete
            </button>
          )}
          <button className="btn btn--ghost" onClick={onClose} style={{ marginLeft: event ? 0 : "auto" }}>Cancel</button>
          <button className="btn btn--primary" onClick={save} disabled={!form.title.trim()}>Save</button>
        </div>
      </div>
    </div>
  );
};

// ----- Sign-off PDF generator -----
const generateSignoffPDF = (sub) => {
  const approveCount = sub.items.filter(i => i.decision === "approve").length;
  const discussCount = sub.items.filter(i => i.decision === "discuss").length;
  const deferredCount = sub.items.filter(i => i.decision === "defer").length;
  const dateStr = new Date(sub.submittedAt).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" });
  const nowStr = new Date().toLocaleString();
  const rows = sub.items.map((it, i) => `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #E8E2F2;color:#8A7DA1;text-align:center;">${i + 1}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #E8E2F2;font-size:13px;color:#1B1230;">${it.label}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #E8E2F2;font-weight:700;font-size:13px;
        color:${it.decision === "approve" ? "#1F8A5B" : it.decision === "discuss" ? "#B8830A" : "#5B4FCF"};">
        ${it.decision === "approve" ? "✓ Approved" : it.decision === "discuss" ? "◎ Discuss" : "→ Deferred"}
      </td>
    </tr>`).join("");
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
    <title>Sign-Off: ${sub.formTitle}</title>
    <style>
      body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:700px;margin:40px auto;color:#1B1230;font-size:14px;}
      h1{font-size:26px;margin:0 0 4px;font-weight:700;}
      .sub{color:#8A7DA1;font-size:13px;margin:0 0 24px;}
      .meta{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:16px;background:#F4ECFF;border-radius:10px;margin-bottom:24px;}
      .meta dt{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#8A7DA1;margin:0 0 2px;}
      .meta dd{margin:0;font-weight:600;font-size:14px;}
      .pills{display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap;}
      .pill{padding:5px 14px;border-radius:999px;font-size:12px;font-weight:600;}
      .pa{background:#E3F8E8;color:#1F6B33;}.pd{background:#FFF3D6;color:#8A6608;}.pf{background:#E8E2F2;color:#5B4FCF;}
      table{width:100%;border-collapse:collapse;}
      th{text-align:left;padding:8px 12px;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#8A7DA1;border-bottom:2px solid #E8E2F2;}
      th:first-child{text-align:center;width:40px;}
      .footer{margin-top:32px;font-size:11px;color:#8A7DA1;border-top:1px solid #E8E2F2;padding-top:16px;}
      @media print{body{margin:20px;}}
    </style></head><body>
    <h1>Sign-Off Record</h1>
    <p class="sub">${sub.formTitle} &middot; Submitted ${dateStr}</p>
    <dl class="meta">
      <div><dt>Prepared By</dt><dd>${sub.preparedBy || "—"}</dd></div>
      <div><dt>Prepared For</dt><dd>${sub.preparedFor || "—"}</dd></div>
      ${sub.monthYear ? `<div><dt>Month &amp; Year</dt><dd>${sub.monthYear}</dd></div>` : ""}
      ${sub.version ? `<div><dt>Version</dt><dd>${sub.version}</dd></div>` : ""}
    </dl>
    <div class="pills">
      <span class="pill pa">✓ ${approveCount} Approved</span>
      <span class="pill pd">◎ ${discussCount} Discuss</span>
      <span class="pill pf">→ ${deferredCount} Deferred</span>
    </div>
    <table><thead><tr><th>#</th><th>Item</th><th>Decision</th></tr></thead><tbody>${rows}</tbody></table>
    <div class="footer">Daily Living Labs Knowledge Portal &middot; Generated ${nowStr}</div>
  </body></html>`;
  const win = window.open("", "_blank");
  if (win) { win.document.write(html); win.document.close(); setTimeout(() => win.print(), 300); }
};

// ----- Sign-Off Page (cards + form) -----
const SignOffPage = ({ forms, allDocs, onSubmit, onView }) => {
  const [active, setActive] = React.useState(null); // form definition

  if (active) {
    return <SignOffForm form={active} allDocs={allDocs} onSubmit={onSubmit} onView={onView} onBack={() => setActive(null)} />;
  }

  const phaseChipClass = (phase) => {
    if (phase === "Spring 2026") return "chip--green";
    if (phase === "Summer 2026") return "chip--yellow";
    if (phase === "Fall 2026")   return "chip--peach";
    if (phase === "Future Work") return "chip--lavender";
    return "";
  };

  return (
    <div>
      <div className="page-header">
        <h1>Sign-Off</h1>
        <p>Approve documentation packages. Each sign-off generates a stamped PDF for the record.</p>
      </div>
      <div className="signoff-grid">
        {forms.map(f => (
          <button key={f.id} className="signoff-card" onClick={() => setActive(f)} aria-label={`Open ${f.title}`}>
            <div className="signoff-card__icon"><Icon name={f.icon} size={20} /></div>
            <h3 className="signoff-card__title">{f.title}</h3>
            <p className="signoff-card__sub">{f.subtitle}</p>
            <div className="signoff-card__meta">
              <span className="signoff-card__owner"><Icon name="user" size={11} /> {f.owner}</span>
              <span className={`chip ${phaseChipClass(f.phase)}`}>{f.phase}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// ----- Generic Sign-Off Form -----
const SignOffForm = ({ form, allDocs = [], onSubmit, onBack, onView }) => {
  // Normalize legacy string-only checklists into objects so older saved forms keep working.
  const normalizedChecklist = React.useMemo(() => (form.checklist || []).map((it, i) =>
    typeof it === "string"
      ? { id: `${form.id}-${i}`, label: it.replace(/^I (reviewed|approve|understand)\s+/i, "").replace(/\.$/, ""), description: "", relatedDocIds: [] }
      : { id: it.id || `${form.id}-${i}`, label: it.label, description: it.description || "", relatedDocIds: it.relatedDocIds || [] }
  ), [form]);

  const preparedBy = form.preparedBy || "";
  const preparedFor = form.preparedFor || "";
  const monthYear = form.monthYear || "";
  const version = form.version || "";
  const formNotes = form.notes || "";
  const [decisions, setDecisions] = React.useState({}); // { [itemId]: 'approve'|'discuss'|'defer' }
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(null);

  const setDecision = (id, val) => setDecisions(prev => ({ ...prev, [id]: val }));

  const docById = (id) => allDocs.find(d => d.id === id);
  const formRelatedDocs = (form.relatedDocIds || []).map(docById).filter(Boolean);

  const validate = () => {
    const e = {};
    const undecided = normalizedChecklist.filter(it => !decisions[it.id]);
    if (undecided.length > 0) e.decisions = `Choose Approve, Discuss, or Defer for all ${normalizedChecklist.length} items (${undecided.length} remaining)`;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) {
      // Scroll to first error if matrix is incomplete
      const firstUndecided = normalizedChecklist.find(it => !decisions[it.id]);
      if (firstUndecided) {
        const el = document.getElementById(`row-${firstUndecided.id}`);
        if (el) el.scrollIntoView({ block: "center", behavior: "smooth" });
      }
      return;
    }
    const items = normalizedChecklist.map(it => ({
      id: it.id, label: it.label, decision: decisions[it.id],
      description: it.description || "",
      relatedDocIds: it.relatedDocIds || []
    }));
    const sub = {
      formId: form.id, formTitle: form.title, formPhase: form.phase,
      preparedBy, preparedFor, monthYear, version,
      relatedDocIds: form.relatedDocIds || [],
      items, notes: formNotes,
      submittedAt: new Date().toISOString()
    };
    setSubmitted(sub);
    onSubmit(sub);
  };

  if (submitted) {
    const deferredCount = submitted.items.filter(i => i.decision === "defer").length;
    const discussCount = submitted.items.filter(i => i.decision === "discuss").length;
    const approveCount = submitted.items.filter(i => i.decision === "approve").length;
    return (
      <div>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <button className="breadcrumb__link" onClick={onBack}>Sign-Off</button>
          <span className="breadcrumb__sep">›</span>
          <span className="breadcrumb__current">{form.title}</span>
        </nav>
        <div className="page-header">
          <h1>Sign-Off Submitted</h1>
          <p>{form.title} — thank you for reviewing.</p>
        </div>
        <section className="card signoff-success">
          <div className="signoff-success__icon" aria-hidden="true">✅</div>
          <h2 className="signoff-success__title">Submission recorded</h2>
          <p className="signoff-success__msg">
            A stamped PDF has been added to <strong>Governance & Sign-Offs</strong>.
          </p>
          <div className="signoff-success__counts">
            <span className="decision-pill decision-pill--approve"><span className="decision-pill__dot" />{approveCount} approved</span>
            <span className="decision-pill decision-pill--discuss"><span className="decision-pill__dot" />{discussCount} to discuss</span>
            <span className="decision-pill decision-pill--defer"><span className="decision-pill__dot" />{deferredCount} deferred</span>
          </div>
          {deferredCount > 0 && (
            <p className="signoff-success__defer-note">
              Deferred items now appear on the <strong>Future Work</strong> page.
            </p>
          )}
          <div className="signoff-success__actions">
            <button className="btn btn--primary" onClick={() => generateSignoffPDF(submitted)}>
              <Icon name="download" size={14} /> Download PDF
            </button>
            <button className="btn btn--ghost" onClick={onBack}>Back to sign-offs</button>
          </div>
        </section>
      </div>
    );
  }

  const decisionCount = normalizedChecklist.filter(it => decisions[it.id]).length;
  const totalCount = normalizedChecklist.length;
  const progressPct = totalCount === 0 ? 0 : Math.round((decisionCount / totalCount) * 100);

  return (
    <div>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <button className="breadcrumb__link" onClick={onBack}>Sign-Off</button>
        <span className="breadcrumb__sep">›</span>
        <span className="breadcrumb__current">{form.title}</span>
      </nav>
      <div className="page-header">
        <h1>{form.title}</h1>
        <p>{form.subtitle}</p>
      </div>

      <form onSubmit={submit} noValidate className="signoff-form">

        {/* Prepared By / Prepared For — read-only, set by admin */}
        <section className="card signoff-section">
          <h3 className="signoff-section__title">Prepared by &amp; Prepared for</h3>
          <div className="signoff-prepared signoff-prepared--readonly">
            <div className="signoff-readonly">
              <span className="signoff-readonly__label">Prepared By</span>
              <span className="signoff-readonly__value">{preparedBy || "—"}</span>
            </div>
            <div className="signoff-prepared__divider" aria-hidden="true" />
            <div className="signoff-readonly">
              <span className="signoff-readonly__label">Prepared For</span>
              <span className="signoff-readonly__value">{preparedFor || "—"}</span>
            </div>
          </div>
        </section>

        {/* Document details — read-only */}
        {(monthYear || version || formRelatedDocs.length > 0) && (
          <section className="card signoff-section">
            <h3 className="signoff-section__title">Document details</h3>
            {(monthYear || version) && (
              <div className="signoff-meta-grid signoff-meta-grid--readonly">
                {monthYear && (
                  <div className="signoff-readonly">
                    <span className="signoff-readonly__label">Month &amp; Year</span>
                    <span className="signoff-readonly__value">{monthYear}</span>
                  </div>
                )}
                {version && (
                  <div className="signoff-readonly">
                    <span className="signoff-readonly__label">Version</span>
                    <span className="signoff-readonly__value">{version}</span>
                  </div>
                )}
              </div>
            )}
            {formRelatedDocs.length > 0 && (
              <div className="signoff-related">
                <div className="signoff-related__label">Related documents</div>
                <ul className="signoff-related__list">
                  {formRelatedDocs.map(d => (
                    <li key={d.id}>
                      <button type="button" className="signoff-related__link" onClick={() => onView && onView(d)}>
                        <Icon name="link" size={12} /> {d.title}
                        <span className="signoff-related__meta">v{d.version} · {d.phase}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* Decision matrix */}
        <section className="card signoff-section signoff-section--matrix">
          <div className="signoff-matrix__header">
            <h3 className="signoff-section__title" style={{ margin: 0 }}>Review items <span className="req">*</span></h3>
            <div className="signoff-progress" role="status" aria-live="polite">
              <div className="signoff-progress__bar"><div className="signoff-progress__fill" style={{ width: progressPct + "%" }} /></div>
              <span className="signoff-progress__count">{decisionCount} / {totalCount}</span>
            </div>
          </div>
          <p className="signoff-matrix__hint">For each item, mark <strong>Approve</strong>, <strong>Discuss</strong>, or <strong>Defer</strong>. Deferred items move to <em>Future Work</em>. Add context below any item if helpful.</p>

          <div className="signoff-matrix" role="table" aria-label="Sign-off review items">
            <div className="signoff-matrix__head" role="row">
              <div role="columnheader">Item</div>
              <div role="columnheader" className="signoff-matrix__col-approve">Approve</div>
              <div role="columnheader" className="signoff-matrix__col-discuss">Discuss</div>
              <div role="columnheader" className="signoff-matrix__col-defer">Defer</div>
            </div>
            {normalizedChecklist.map((it, idx) => {
              const decision = decisions[it.id];
              const itemRelatedDocs = (it.relatedDocIds || []).map(docById).filter(Boolean);
              return (
                <div key={it.id} id={`row-${it.id}`} className={`signoff-row ${decision ? `signoff-row--${decision}` : ""}`} role="row">
                  <div className="signoff-row__main" role="cell">
                    <div className="signoff-row__num">{idx + 1}</div>
                    <div className="signoff-row__body">
                      <div className="signoff-row__label">{it.label}</div>
                      {it.description && (
                        <div className="signoff-row__desc">{it.description}</div>
                      )}
                      {itemRelatedDocs.length > 0 && (
                        <div className="signoff-row__refs">
                          {itemRelatedDocs.map(d => (
                            <button key={d.id} type="button" className="signoff-row__ref" onClick={() => onView && onView(d)}>
                              <Icon name="link" size={10} /> {d.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {[
                    { val: "approve", label: "Approve" },
                    { val: "discuss", label: "Discuss" },
                    { val: "defer", label: "Defer" }
                  ].map(opt => (
                    <label key={opt.val} className={`signoff-radio signoff-radio--${opt.val} ${decision === opt.val ? "is-selected" : ""}`} role="cell">
                      <input
                        type="radio"
                        name={`row-${it.id}`}
                        value={opt.val}
                        checked={decision === opt.val}
                        onChange={() => setDecision(it.id, opt.val)}
                      />
                      <span className="signoff-radio__dot" aria-hidden="true" />
                      <span className="signoff-radio__label">{opt.label}</span>
                    </label>
                  ))}
                </div>
              );
            })}
          </div>
          {errors.decisions && <div className="field__error" style={{ marginTop: 12 }}>{errors.decisions}</div>}
        </section>

        {/* Notes from preparer (read-only) */}
        {formNotes && (
          <section className="card signoff-section">
            <h3 className="signoff-section__title">Notes from the preparer</h3>
            <div className="signoff-notes">{formNotes}</div>
          </section>
        )}

        <div className="signoff-form__actions">
          <button type="button" className="btn btn--ghost" onClick={onBack}>Cancel</button>
          <button type="submit" className="btn btn--primary"><Icon name="check-circle" size={14} /> Submit sign-off</button>
        </div>
      </form>
    </div>
  );
};

// ----- Big Ideas Page -----
const BigIdeasPage = ({ ideas, onAdd, onDelete, profile }) => {
  const [draft, setDraft] = React.useState({ title: "", desc: "", category: "Future Feature", anonymous: true, color: "yellow" });
  const [filter, setFilter] = React.useState("All");
  const cats = ["All", "Future Feature", "Research Opportunity", "Accessibility Improvement", "Partnership Idea",
                "Content Idea", "Technical Improvement", "Wild / Experimental", "Open Question"];
  const colors = ["yellow", "pink", "mint", "blue", "lavender", "peach"];

  const submit = (e) => {
    e.preventDefault();
    if (!draft.title.trim()) return;
    onAdd({ id: "i" + Date.now(), title: draft.title, desc: draft.desc, category: draft.category,
            author: draft.anonymous ? "Anonymous" : (profile?.username || "Anonymous"), color: draft.color, x: 0, y: 0 });
    setDraft({ title: "", desc: "", category: "Future Feature", anonymous: true, color: "yellow" });
  };

  const filtered = filter === "All" ? ideas : ideas.filter(i => i.category === filter);

  return (
    <div>
      <div className="page-header">
        <h1>Big Ideas 💡</h1>
        <p>A wall for future-facing ideas, suggestions, and open questions. Drag notes around — or use arrow keys.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, alignItems: "flex-start" }}>
        <div>
          <div className="filters-bar">
            {cats.map(c => (
              <button key={c} className={`btn btn--small ${filter === c ? "btn--primary" : "btn--ghost"}`} onClick={() => setFilter(c)}>{c}</button>
            ))}
          </div>
          <BigIdeasBoard ideas={filtered} draggable={true} onDelete={onDelete} />
        </div>
        <form onSubmit={submit} className="sticky-add">
          <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 16 }}>Add an idea</h3>
          <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="Idea title…" required aria-label="Idea title" />
          <textarea value={draft.desc} onChange={(e) => setDraft({ ...draft, desc: e.target.value })} placeholder="Describe it…" rows={3} aria-label="Idea description" />
          <select className="filter-select" value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} aria-label="Category">
            {cats.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
          </select>
          <label className="switch" data-on={!draft.anonymous} onClick={() => setDraft({ ...draft, anonymous: !draft.anonymous })} role="switch" aria-checked={!draft.anonymous} tabIndex={0}
                 onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); setDraft({ ...draft, anonymous: !draft.anonymous }); } }}>
            <span className="switch__track"><span className="switch__thumb"></span></span>
            <span className="switch__label">Include my name</span>
          </label>
          {!draft.anonymous && (
            profile?.username
              ? <div style={{ fontSize: 12, color: "var(--text-2)", padding: "4px 8px", background: "var(--surface-2)", borderRadius: 6 }}>
                  Will post as <strong>{profile.username}</strong>
                </div>
              : <input value={draft.name || ""} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Your name" aria-label="Your name" />
          )}
          <div className="sticky-add__colors" role="radiogroup" aria-label="Sticky color">
            <span style={{ fontSize: 11, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Color</span>
            {colors.map(c => (
              <button type="button" key={c} className={`color-swatch color-swatch--${c} ${draft.color === c ? "color-swatch--selected" : ""}`}
                      onClick={() => setDraft({ ...draft, color: c })} role="radio" aria-checked={draft.color === c} aria-label={`${c} sticky`}>
                {draft.color === c && <Icon name="check-circle" size={12} />}
              </button>
            ))}
          </div>
          <div className="sticky-add__row">
            <button type="submit" className="btn btn--primary btn--small"><Icon name="plus" size={12} /> Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ----- Analytics Page -----
const AMETA = {
  view:        { icon: "eye",          label: "Viewed" },
  download:    { icon: "download",     label: "Downloaded" },
  upload:      { icon: "plus",         label: "Added" },
  edit:        { icon: "edit",         label: "Edited" },
  archive:     { icon: "archive",      label: "Archived" },
  delete:      { icon: "trash",        label: "Deleted" },
  signoff:     { icon: "check-circle", label: "Sign-off submitted" },
  "event-add": { icon: "calendar",     label: "Event created" },
  "event-edit":{ icon: "calendar",     label: "Event updated" },
  "event-del": { icon: "calendar",     label: "Event deleted" },
};

const fmtActivityTime = (when) => {
  if (!when || !when.includes("T")) return when || "";
  const diff = Date.now() - new Date(when).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(when).toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const ActivityRow = ({ a }) => {
  const m = AMETA[a.type] || { icon: "flag", label: "Action" };
  return (
    <div className="activity-row">
      <div className={`activity-row__icon activity-row__icon--${a.type}`}><Icon name={m.icon} size={14} /></div>
      <div>
        <div className="activity-row__title">{a.title}</div>
        <div className="activity-row__sub">{m.label} by {a.who}</div>
      </div>
      <div className="activity-row__time">{fmtActivityTime(a.when)}</div>
    </div>
  );
};

const ActivityHistoryModal = ({ activity, onClose }) => {
  const [typeFilter, setTypeFilter] = React.useState("all");
  const [userFilter, setUserFilter] = React.useState("");
  const [dateFilter, setDateFilter] = React.useState("");

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const filtered = activity.filter(a => {
    if (typeFilter !== "all" && a.type !== typeFilter) return false;
    if (userFilter && !(a.who || "").toLowerCase().includes(userFilter.toLowerCase())) return false;
    if (dateFilter && a.when?.includes("T")) {
      if (new Date(a.when).toISOString().slice(0, 10) !== dateFilter) return false;
    }
    return true;
  });

  const uniqueUsers = [...new Set(activity.map(a => a.who).filter(Boolean))].sort();

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Activity history">
        <div className="modal__header">
          <h2>Activity History</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close"><Icon name="x" size={18} /></button>
        </div>
        <div className="modal__body">
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <select className="filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ flex: 1, minWidth: 140 }}>
              <option value="all">All actions</option>
              {Object.entries(AMETA).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
            <select className="filter-select" value={userFilter} onChange={e => setUserFilter(e.target.value)} style={{ flex: 1, minWidth: 140 }}>
              <option value="">All users</option>
              {uniqueUsers.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
            <input type="date" className="filter-select" value={dateFilter} onChange={e => setDateFilter(e.target.value)} style={{ flex: 1, minWidth: 140 }} />
            {(typeFilter !== "all" || userFilter || dateFilter) && (
              <button className="btn btn--ghost btn--small" onClick={() => { setTypeFilter("all"); setUserFilter(""); setDateFilter(""); }}>
                Clear filters
              </button>
            )}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 10 }}>
            {filtered.length} of {activity.length} entries
          </div>
          <div style={{ maxHeight: 420, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
            {filtered.length === 0 ? (
              <div style={{ padding: "24px 0", textAlign: "center", color: "var(--text-3)", fontSize: 13 }}>No activity matches these filters.</div>
            ) : filtered.map(a => <ActivityRow key={a.id} a={a} />)}
          </div>
        </div>
        <div className="modal__footer">
          <button className="btn btn--primary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

const AnalyticsPage = ({ docs, activity = [] }) => {
  const [showHistory, setShowHistory] = React.useState(false);
  const sortedV = [...docs].sort((a, b) => b.views - a.views);
  const sortedD = [...docs].sort((a, b) => b.downloads - a.downloads);
  const totalV = docs.reduce((s, d) => s + d.views, 0);
  const totalD = docs.reduce((s, d) => s + d.downloads, 0);
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recentActions = activity.filter(a => a.when && a.when.includes("T") && new Date(a.when).getTime() > sevenDaysAgo).length;
  return (
    <div>
      {showHistory && <ActivityHistoryModal activity={activity} onClose={() => setShowHistory(false)} />}
      <div className="page-header"><h1>Analytics & History</h1><p>Document views, downloads, and portal activity.</p></div>
      <div className="dashboard">
        <section className="card col-4">
          <div className="kpi__icon"><Icon name="eye" size={14} /></div>
          <div className="kpi__label">Total Views</div>
          <div className="kpi__value">{totalV.toLocaleString()}</div>
          <div className="kpi__sub">across {docs.length} document{docs.length !== 1 ? "s" : ""}</div>
        </section>
        <section className="card col-4">
          <div className="kpi__icon"><Icon name="download" size={14} /></div>
          <div className="kpi__label">Total Downloads</div>
          <div className="kpi__value">{totalD.toLocaleString()}</div>
          <div className="kpi__sub">across all phases</div>
        </section>
        <section className="card col-4">
          <div className="kpi__icon"><Icon name="trend-up" size={14} /></div>
          <div className="kpi__label">Actions (7 days)</div>
          <div className="kpi__value">{recentActions}</div>
          <div className="kpi__sub">views, uploads, downloads & more</div>
        </section>
        <section className="card col-4">
          <h3 className="card__title" style={{ marginBottom: 12 }}>Most Viewed</h3>
          <MiniBarChart items={sortedV.slice(0, 5).map(d => ({ label: d.title, value: d.views }))} />
        </section>
        <section className="card col-4">
          <h3 className="card__title" style={{ marginBottom: 12 }}>Most Downloaded</h3>
          <MiniBarChart items={sortedD.slice(0, 5).map(d => ({ label: d.title, value: d.downloads }))} color="#1F8A5B" />
        </section>
        <section className="card col-4">
          <div className="card__header" style={{ marginBottom: 12 }}>
            <h3 className="card__title">Recent Activity</h3>
            {activity.length > 10 && (
              <button className="card__link" onClick={() => setShowHistory(true)}>View all history</button>
            )}
          </div>
          {activity.length === 0 ? (
            <div style={{ padding: "12px 0", color: "var(--text-3)", fontSize: 13 }}>No activity recorded yet.</div>
          ) : activity.slice(0, 10).map(a => <ActivityRow key={a.id} a={a} />)}
          {activity.length > 10 && (
            <button className="btn btn--ghost btn--small" style={{ marginTop: 12, width: "100%" }} onClick={() => setShowHistory(true)}>
              View all {activity.length} entries
            </button>
          )}
        </section>
      </div>
    </div>
  );
};

// ----- Admin Page -----
const AdminPage = ({ docs, signoffForms, submissions = [], onToggleReview, onArchive, onUnarchive, onDelete, onUpload, onEditDoc, onAddSignoffForm, onDeleteSignoffForm, ideas, onHideIdea }) => {
  const [tab, setTab] = React.useState("documents");
  const [showArchived, setShowArchived] = React.useState(false);
  const [uploadOpen, setUploadOpen] = React.useState(false);
  const [editing, setEditing] = React.useState(null); // doc being edited
  const [confirm, setConfirm] = React.useState(null); // { kind, doc }
  const [newFormOpen, setNewFormOpen] = React.useState(false);

  const visibleDocs = docs.filter(d => showArchived ? true : !d.archived);

  return (
    <div>
      <div className="page-header"><h1>Admin</h1><p>Manage documents, sign-off forms, submissions, and Big Ideas.</p></div>
      <div className="filters-bar" role="tablist">
        {["documents", "signoffs", "submissions", "ideas"].map(t => (
          <button key={t} role="tab" aria-selected={tab === t} className={`btn btn--small ${tab === t ? "btn--primary" : "btn--ghost"}`} onClick={() => setTab(t)}>
            {t === "documents" ? "Documents" : t === "signoffs" ? "Sign-off forms" : t === "submissions" ? "Submissions" : "Big Ideas"}
          </button>
        ))}
        <div className="admin-actions">
          {tab === "documents" && (
            <>
              <label style={{ fontSize: 12, color: "var(--text-3)", display: "flex", alignItems: "center", gap: 6 }}>
                <input type="checkbox" checked={showArchived} onChange={(e) => setShowArchived(e.target.checked)} /> Show archived
              </label>
              <button className="btn btn--primary btn--small" onClick={() => setUploadOpen(true)}><Icon name="plus" size={12} /> Add document</button>
            </>
          )}
          {tab === "signoffs" && <button className="btn btn--primary btn--small" onClick={() => setNewFormOpen(true)}><Icon name="plus" size={12} /> New sign-off form</button>}
        </div>
      </div>

      {tab === "documents" && (
        <section className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead style={{ background: "var(--surface-2)" }}>
              <tr>{["Title", "Phase", "Category", "Status", "Updated", "Needs Review", ""].map(h =>
                <th key={h} style={{ textAlign: "left", padding: "10px 14px", fontSize: 11, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {visibleDocs.map(d => (
                <tr key={d.id} className={d.archived ? "archived-row" : ""} style={{ borderTop: "1px solid var(--border)" }}>
                  <td style={{ padding: "10px 14px", fontWeight: 500 }}>
                    {d.title} {d.archived && <span className="chip" style={{ marginLeft: 6 }}>Archived</span>}
                  </td>
                  <td style={{ padding: "10px 14px", color: "var(--text-2)" }}>{d.phase}</td>
                  <td style={{ padding: "10px 14px", color: "var(--text-2)" }}>{d.category}</td>
                  <td style={{ padding: "10px 14px" }}><span className={`badge badge--${d.status === "Approved" ? "approved" : d.status === "Current" ? "current" : d.status === "For Review" ? "review" : d.status === "Archived" ? "archived" : "draft"}`}>{d.status}</span></td>
                  <td style={{ padding: "10px 14px", color: "var(--text-3)" }}>{fmtDate(d.updated)}</td>
                  <td style={{ padding: "10px 14px" }}>
                    <label className="switch" data-on={d.needsReview} onClick={() => onToggleReview(d.id)} role="switch" aria-checked={d.needsReview} tabIndex={0}
                           onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); onToggleReview(d.id); } }}>
                      <span className="switch__track"><span className="switch__thumb"></span></span>
                    </label>
                  </td>
                  <td style={{ padding: "10px 14px", display: "flex", gap: 4 }}>
                    <button className="btn btn--ghost btn--small" aria-label={`Edit ${d.title}`} title="Edit" onClick={() => setEditing(d)}><Icon name="edit" size={12} /></button>
                    {d.archived
                      ? <>
                          <button className="btn btn--ghost btn--small" onClick={() => onUnarchive(d.id)} aria-label="Restore">Restore</button>
                          <button className="btn btn--ghost btn--small" style={{ color: "#C0392B" }} onClick={() => setConfirm({ kind: "delete", doc: d })} aria-label="Delete permanently" title="Delete permanently"><Icon name="trash" size={12} /></button>
                        </>
                      : <button className="btn btn--ghost btn--small" onClick={() => setConfirm({ kind: "archive", doc: d })} aria-label="Archive" title="Archive"><Icon name="archive" size={12} /></button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {tab === "signoffs" && (
        <section className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead style={{ background: "var(--surface-2)" }}><tr>{["Title", "Phase", "Checklist items", ""].map(h =>
              <th key={h} style={{ textAlign: "left", padding: "10px 14px", fontSize: 11, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>)}</tr></thead>
            <tbody>
              {signoffForms.map(f => (
                <tr key={f.id} style={{ borderTop: "1px solid var(--border)" }}>
                  <td style={{ padding: "10px 14px", fontWeight: 500 }}>{f.title}</td>
                  <td style={{ padding: "10px 14px", color: "var(--text-2)" }}>{f.phase}</td>
                  <td style={{ padding: "10px 14px", color: "var(--text-3)" }}>{f.checklist.length} items</td>
                  <td style={{ padding: "10px 14px" }}>
                    <button className="btn btn--ghost btn--small" style={{ color: "#C0392B" }} onClick={() => onDeleteSignoffForm(f.id)} title="Delete form"><Icon name="trash" size={12} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {tab === "submissions" && (
        submissions.length === 0 ? (
          <section className="card empty"><div className="empty__emoji">📝</div><div className="empty__title">No sign-off submissions yet</div><div className="empty__msg">Submitted sign-offs will appear here for download and audit.</div></section>
        ) : (
          <section className="card" style={{ padding: 0, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead style={{ background: "var(--surface-2)" }}><tr>{["Form", "Prepared by", "Prepared for", "Decision", "Submitted", ""].map(h =>
                <th key={h} style={{ textAlign: "left", padding: "10px 14px", fontSize: 11, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>)}</tr></thead>
              <tbody>
                {submissions.map((s, i) => {
                  const decision = s.decision || "approved";
                  const decisionLabel = decision === "approved" ? "Approved" : decision === "changes" ? "Changes requested" : "Deferred";
                  const decisionTone = decision === "approved" ? "green" : decision === "changes" ? "amber" : "gray";
                  return (
                    <tr key={i} style={{ borderTop: "1px solid var(--border)" }}>
                      <td style={{ padding: "10px 14px", fontWeight: 500 }}>{s.formTitle}{s.version ? <span style={{ color: "var(--text-3)", fontWeight: 400, marginLeft: 6 }}>v{s.version}</span> : null}</td>
                      <td style={{ padding: "10px 14px" }}>{s.preparedBy || "—"}</td>
                      <td style={{ padding: "10px 14px", color: "var(--text-2)" }}>{s.preparedFor || "—"}</td>
                      <td style={{ padding: "10px 14px" }}><Badge tone={decisionTone}>{decisionLabel}</Badge></td>
                      <td style={{ padding: "10px 14px", color: "var(--text-3)", whiteSpace: "nowrap" }}>{new Date(s.submittedAt).toLocaleString()}</td>
                      <td style={{ padding: "10px 14px" }}><button className="btn btn--ghost btn--small"><Icon name="download" size={12} /> PDF</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        )
      )}

      {tab === "ideas" && (
        <section className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead style={{ background: "var(--surface-2)" }}><tr>{["Title", "Author", "Category", ""].map(h =>
              <th key={h} style={{ textAlign: "left", padding: "10px 14px", fontSize: 11, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>)}</tr></thead>
            <tbody>
              {ideas.map(i => (
                <tr key={i.id} style={{ borderTop: "1px solid var(--border)" }}>
                  <td style={{ padding: "10px 14px", fontWeight: 500 }}>{i.title}</td>
                  <td style={{ padding: "10px 14px", color: "var(--text-2)" }}>{i.author}</td>
                  <td style={{ padding: "10px 14px", color: "var(--text-2)" }}>{i.category}</td>
                  <td style={{ padding: "10px 14px" }}><button className="btn btn--ghost btn--small" onClick={() => onHideIdea(i.id)}>Hide</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {uploadOpen && <UploadDocModal onClose={() => setUploadOpen(false)} onUpload={(meta) => { onUpload(meta); setUploadOpen(false); }} />}
      {editing && <EditDocModal doc={editing} onClose={() => setEditing(null)} onSave={(updated) => { onEditDoc(updated); setEditing(null); }} />}
      {newFormOpen && <NewSignoffFormModal onClose={() => setNewFormOpen(false)} onSave={(f) => { onAddSignoffForm(f); setNewFormOpen(false); }} allDocs={docs.filter(d => !d.archived)} />}
      {confirm && (
        <ConfirmModal
          title={confirm.kind === "archive" ? "Archive document?" : "Delete permanently?"}
          message={confirm.kind === "archive"
            ? `"${confirm.doc.title}" will be hidden from the library but can be restored later.`
            : `"${confirm.doc.title}" will be permanently removed. This cannot be undone.`}
          confirmLabel={confirm.kind === "archive" ? "Archive" : "Delete forever"}
          danger={confirm.kind === "delete"}
          onConfirm={() => { confirm.kind === "archive" ? onArchive(confirm.doc.id) : onDelete(confirm.doc.id); setConfirm(null); }}
          onClose={() => setConfirm(null)}
        />
      )}
    </div>
  );
};

// ----- Confirm Modal -----
const ConfirmModal = ({ title, message, confirmLabel, danger, onConfirm, onClose }) => (
  <div className="modal-backdrop" onClick={onClose}>
    <div className="modal modal--narrow" onClick={(e) => e.stopPropagation()}>
      <div className="modal__header"><h2>{title}</h2>
        <button className="modal__close" onClick={onClose} aria-label="Close" title="Close"><Icon name="x" size={16} /></button>
      </div>
      <div className="modal__body"><p style={{ margin: 0, color: "var(--text-2)" }}>{message}</p></div>
      <div className="modal__footer">
        <button className="btn btn--ghost" onClick={onClose}>Cancel</button>
        <button className={`btn ${danger ? "btn--danger" : "btn--primary"}`} onClick={onConfirm}>{confirmLabel}</button>
      </div>
    </div>
  </div>
);

const THUMB_KINDS = ["exec","project","specs","style","future","journey","interviews","mission","pitch","governance","arch","api","ai","rbac"];

// ----- Upload Doc Modal -----
const UploadDocModal = ({ onClose, onUpload }) => {
  const [file, setFile] = React.useState(null);
  const [meta, setMeta] = React.useState({ title: "", description: "", phase: "Spring 2026", category: "Project Overview",
    status: "In Progress", version: "1.0", owner: "Chelsea", tags: "", audience: ["Sponsor"],
    thumb: THUMB_KINDS[Math.floor(Math.random() * THUMB_KINDS.length)], googleDocsUrl: "" });
  const [uploading, setUploading] = React.useState(false);
  const fileRef = React.useRef(null);

  const onPick = (f) => {
    if (!f) return;
    setFile(f);
    if (!meta.title) setMeta(m => ({ ...m, title: f.name.replace(/\.[^.]+$/, "") }));
  };

  const submit = async () => {
    if (!file || !meta.title.trim() || uploading) return;
    setUploading(true);
    const docId = "d" + Date.now();
    const path = `${docId}/${file.name}`;
    const fileUrl = await window.DLL_DB.uploadFile(path, file);
    onUpload({
      ...meta,
      id: docId,
      tags: meta.tags.split(",").map(s => s.trim()).filter(Boolean),
      filename: file.name,
      fileUrl: fileUrl || null,
      storagePath: fileUrl ? path : null
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header"><h2>Add document</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close" title="Close"><Icon name="x" size={16} /></button>
        </div>
        <div className="modal__body">
          {!file ? (
            <div className="upload-dropzone" onClick={() => fileRef.current?.click()}
                 onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); onPick(e.dataTransfer.files[0]); }}
                 role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") fileRef.current?.click(); }}>
              <div className="upload-dropzone__icon">📄</div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Drop a file here, or click to browse</div>
              <div style={{ fontSize: 12, color: "var(--text-3)" }}>PDF, DOCX, or any document up to 25MB</div>
              <input ref={fileRef} type="file" hidden onChange={(e) => onPick(e.target.files[0])} />
            </div>
          ) : (
            <div style={{ marginBottom: 16 }}>
              <span className="upload-file-pill"><Icon name="doc" size={12} /> {file.name}
                <button onClick={() => setFile(null)} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer", marginLeft: 4 }} aria-label="Remove file" title="Remove file"><Icon name="x" size={10} /></button>
              </span>
            </div>
          )}

          <div className="form-grid">
            <div className="field"><label>Title *</label><input value={meta.title} onChange={(e) => setMeta({ ...meta, title: e.target.value })} /></div>
            <div className="field"><label>Version</label><input value={meta.version} onChange={(e) => setMeta({ ...meta, version: e.target.value })} /></div>
            <div className="field" style={{ gridColumn: "1 / -1" }}><label>Description</label><textarea rows={2} value={meta.description} onChange={(e) => setMeta({ ...meta, description: e.target.value })} /></div>
            <div className="field"><label>Phase</label><select className="filter-select" value={meta.phase} onChange={(e) => setMeta({ ...meta, phase: e.target.value })}>{PHASES.map(p => <option key={p}>{p}</option>)}</select></div>
            <div className="field"><label>Category</label><select className="filter-select" value={meta.category} onChange={(e) => setMeta({ ...meta, category: e.target.value })}>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></div>
            <div className="field"><label>Status</label><select className="filter-select" value={meta.status} onChange={(e) => setMeta({ ...meta, status: e.target.value })}><option>In Progress</option><option>For Review</option><option>Approved</option><option>Current</option><option>Archived</option></select></div>
            <div className="field"><label>Owner</label><input value={meta.owner} onChange={(e) => setMeta({ ...meta, owner: e.target.value })} /></div>
            <div className="field" style={{ gridColumn: "1 / -1" }}><label>Tags (comma-separated)</label><input value={meta.tags} onChange={(e) => setMeta({ ...meta, tags: e.target.value })} placeholder="research, MVP, governance" /></div>
            <div className="field" style={{ gridColumn: "1 / -1" }}><label>Google Docs URL <span style={{ color: "var(--text-3)", fontWeight: 400, fontSize: 11 }}>(optional)</span></label><input value={meta.googleDocsUrl || ""} onChange={(e) => setMeta({ ...meta, googleDocsUrl: e.target.value })} placeholder="https://docs.google.com/…" /></div>
          </div>
        </div>
        <div className="modal__footer">
          <button className="btn btn--ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn--primary" onClick={submit} disabled={!file || !meta.title.trim() || uploading}>
            <Icon name="plus" size={14} /> {uploading ? "Uploading…" : "Add document"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ----- Edit Doc Modal -----
const EditDocModal = ({ doc, onClose, onSave }) => {
  const [m, setM] = React.useState({ ...doc, tags: doc.tags.join(", ") });
  const submit = () => onSave({ ...m, tags: m.tags.split(",").map(s => s.trim()).filter(Boolean), updated: new Date().toISOString().slice(0, 10) });
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header"><h2>Edit document</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close" title="Close"><Icon name="x" size={16} /></button>
        </div>
        <div className="modal__body">
          <div className="form-grid">
            <div className="field"><label>Title</label><input value={m.title} onChange={(e) => setM({ ...m, title: e.target.value })} /></div>
            <div className="field"><label>Version</label><input value={m.version} onChange={(e) => setM({ ...m, version: e.target.value })} /></div>
            <div className="field" style={{ gridColumn: "1 / -1" }}><label>Description</label><textarea rows={2} value={m.description} onChange={(e) => setM({ ...m, description: e.target.value })} /></div>
            <div className="field"><label>Phase</label><select className="filter-select" value={m.phase} onChange={(e) => setM({ ...m, phase: e.target.value })}>{PHASES.map(p => <option key={p}>{p}</option>)}</select></div>
            <div className="field"><label>Category</label><select className="filter-select" value={m.category} onChange={(e) => setM({ ...m, category: e.target.value })}>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></div>
            <div className="field"><label>Status</label><select className="filter-select" value={m.status} onChange={(e) => setM({ ...m, status: e.target.value })}><option>In Progress</option><option>For Review</option><option>Approved</option><option>Current</option><option>Archived</option></select></div>
            <div className="field"><label>Owner</label><input value={m.owner} onChange={(e) => setM({ ...m, owner: e.target.value })} /></div>
            <div className="field" style={{ gridColumn: "1 / -1" }}><label>Tags (comma-separated)</label><input value={m.tags} onChange={(e) => setM({ ...m, tags: e.target.value })} /></div>
            <div className="field" style={{ gridColumn: "1 / -1" }}><label>Google Docs URL <span style={{ color: "var(--text-3)", fontWeight: 400, fontSize: 11 }}>(optional)</span></label><input value={m.googleDocsUrl || ""} onChange={(e) => setM({ ...m, googleDocsUrl: e.target.value })} placeholder="https://docs.google.com/…" /></div>
          </div>
        </div>
        <div className="modal__footer">
          <button className="btn btn--ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn--primary" onClick={submit}>Save changes</button>
        </div>
      </div>
    </div>
  );
};

// ----- Multi-select Document Picker (dropdown w/ search) -----
const DocMultiPicker = ({ docs, selected, onChange, placeholder = "Select documents…", size = "md" }) => {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);
  const selectedDocs = selected.map(id => docs.find(d => d.id === id)).filter(Boolean);
  const q = query.trim().toLowerCase();
  const filtered = q ? docs.filter(d => d.title.toLowerCase().includes(q) || (d.phase || "").toLowerCase().includes(q)) : docs;
  const toggle = (id) => onChange(selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id]);
  const remove = (id) => onChange(selected.filter(x => x !== id));
  return (
    <div className={`docpicker docpicker--${size}`} ref={ref}>
      <button type="button" className="docpicker__trigger" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-haspopup="listbox">
        {selectedDocs.length === 0 ? (
          <span className="docpicker__placeholder">{placeholder}</span>
        ) : (
          <span className="docpicker__chips">
            {selectedDocs.slice(0, 3).map(d => (
              <span key={d.id} className="docpicker__chip">
                <span className="docpicker__chip-text">{d.title}</span>
                <span role="button" tabIndex={0} className="docpicker__chip-x" aria-label={`Remove ${d.title}`}
                  onClick={(e) => { e.stopPropagation(); remove(d.id); }}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); remove(d.id); } }}>
                  <Icon name="x" size={10} />
                </span>
              </span>
            ))}
            {selectedDocs.length > 3 && <span className="docpicker__chip docpicker__chip--more">+{selectedDocs.length - 3} more</span>}
          </span>
        )}
        <Icon name="chevron-down" size={12} />
      </button>
      {open && (
        <div className="docpicker__panel" role="listbox">
          <div className="docpicker__search">
            <Icon name="search" size={12} />
            <input autoFocus type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search documents…" />
          </div>
          <div className="docpicker__list">
            {filtered.length === 0 ? (
              <div className="docpicker__empty">No documents match "{query}"</div>
            ) : filtered.map(d => {
              const isOn = selected.includes(d.id);
              return (
                <button key={d.id} type="button" role="option" aria-selected={isOn} className={`docpicker__option ${isOn ? "is-on" : ""}`} onClick={() => toggle(d.id)}>
                  <span className={`docpicker__check ${isOn ? "is-on" : ""}`} aria-hidden="true">
                    {isOn && <Icon name="check" size={10} />}
                  </span>
                  <span className="docpicker__option-text">
                    <span className="docpicker__option-title">{d.title}</span>
                    <span className="docpicker__option-meta">{d.phase} · v{d.version}</span>
                  </span>
                </button>
              );
            })}
          </div>
          {selectedDocs.length > 0 && (
            <div className="docpicker__footer">
              <span className="docpicker__count">{selectedDocs.length} selected</span>
              <button type="button" className="docpicker__clear" onClick={() => onChange([])}>Clear all</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ----- New Sign-off Form Modal -----
const NewSignoffFormModal = ({ onClose, onSave, allDocs = [] }) => {
  const [f, setF] = React.useState({
    title: "", subtitle: "", phase: "Spring 2026", icon: "check-circle",
    owner: "Chelsea", preparedBy: "Chelsea", preparedFor: "Daily Living Labs Sponsor",
    monthYear: "", version: "1.0", relatedDocIds: [], notes: "",
    checklist: [
      { id: "i1", label: "", description: "", relatedDocIds: [] },
      { id: "i2", label: "", description: "", relatedDocIds: [] }
    ]
  });
  const [errors, setErrors] = React.useState({});
  const updateItem = (i, patch) => setF({ ...f, checklist: f.checklist.map((x, j) => j === i ? { ...x, ...patch } : x) });
  const addItem = () => setF({ ...f, checklist: [...f.checklist, { id: "i" + Date.now(), label: "", description: "", relatedDocIds: [] }] });
  const removeItem = (i) => setF({ ...f, checklist: f.checklist.filter((_, j) => j !== i) });
  const submit = () => {
    const e = {};
    if (!f.title.trim()) e.title = "Title is required";
    if (!f.preparedBy.trim()) e.preparedBy = "Prepared By is required";
    if (!f.preparedFor.trim()) e.preparedFor = "Prepared For is required";
    const items = f.checklist.filter(it => it.label.trim());
    if (items.length < 2) e.checklist = "At least 2 review items required";
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    onSave({
      ...f, id: "sf-" + Date.now(),
      preparedBy: f.preparedBy.trim(),
      preparedFor: f.preparedFor.trim(),
      monthYear: f.monthYear.trim(),
      version: f.version.trim(),
      notes: (f.notes || "").trim(),
      checklist: items.map(it => ({
        id: it.id,
        label: it.label.trim(),
        description: (it.description || "").trim(),
        relatedDocIds: it.relatedDocIds || []
      }))
    });
  };
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal modal--wide" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header"><h2>New sign-off form</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close" title="Close"><Icon name="x" size={16} /></button>
        </div>
        <div className="modal__body">
          <div className="newform-section">
            <h3 className="newform-section__title">Form details</h3>
            <div className="form-grid">
              <div className="field" style={{ gridColumn: "1 / -1" }}>
                <label>Title <span className="req">*</span></label>
                <input value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} placeholder="e.g. Marketing Sign-Off" aria-invalid={!!errors.title} />
                {errors.title && <div className="field__error">{errors.title}</div>}
              </div>
              <div className="field" style={{ gridColumn: "1 / -1" }}>
                <label>Subtitle / description</label>
                <textarea rows={2} value={f.subtitle} onChange={(e) => setF({ ...f, subtitle: e.target.value })} placeholder="What does this sign-off cover?" />
              </div>
              <div className="field"><label>Phase</label>
                <select className="filter-select" value={f.phase} onChange={(e) => setF({ ...f, phase: e.target.value })}>{PHASES.map(p => <option key={p}>{p}</option>)}</select>
              </div>
              <div className="field"><label>Owner</label>
                <input value={f.owner} onChange={(e) => setF({ ...f, owner: e.target.value })} />
              </div>
            </div>
          </div>

          <div className="newform-section">
            <h3 className="newform-section__title">Prepared by &amp; for</h3>
            <p className="newform-section__hint">Reviewers see these as read-only on the form. They are not asked to fill anything in — only check boxes.</p>
            <div className="form-grid">
              <div className="field">
                <label>Prepared By <span className="req">*</span></label>
                <input value={f.preparedBy} onChange={(e) => setF({ ...f, preparedBy: e.target.value })} placeholder="e.g. Chelsea" aria-invalid={!!errors.preparedBy} />
                {errors.preparedBy && <div className="field__error">{errors.preparedBy}</div>}
              </div>
              <div className="field">
                <label>Prepared For <span className="req">*</span></label>
                <input value={f.preparedFor} onChange={(e) => setF({ ...f, preparedFor: e.target.value })} placeholder="e.g. Daily Living Labs Sponsor" aria-invalid={!!errors.preparedFor} />
                {errors.preparedFor && <div className="field__error">{errors.preparedFor}</div>}
              </div>
              <div className="field"><label>Month &amp; Year <span className="newform-section__optional">(optional)</span></label>
                <input value={f.monthYear} onChange={(e) => setF({ ...f, monthYear: e.target.value })} placeholder="e.g. May 2026" />
              </div>
              <div className="field"><label>Version <span className="newform-section__optional">(optional)</span></label>
                <input value={f.version} onChange={(e) => setF({ ...f, version: e.target.value })} placeholder="e.g. 1.0" />
              </div>
            </div>
          </div>

          <div className="newform-section">
            <h3 className="newform-section__title">Related documents <span className="newform-section__optional">(optional)</span></h3>
            <p className="newform-section__hint">Top-level reference documents shown to reviewers above all items.</p>
            <DocMultiPicker
              docs={allDocs}
              selected={f.relatedDocIds}
              onChange={(ids) => setF({ ...f, relatedDocIds: ids })}
              placeholder="Select documents to attach…"
            />
          </div>

          <div className="newform-section">
            <h3 className="newform-section__title">Notes for reviewer <span className="newform-section__optional">(optional)</span></h3>
            <p className="newform-section__hint">Anything else you want the reviewer to read before they decide. Shown read-only at the bottom of the form.</p>
            <textarea rows={4} value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} placeholder="e.g. Please pay particular attention to items 3 and 5 — these align with feedback from the May focus group." />
          </div>

          <div className="newform-section">
            <h3 className="newform-section__title">Review items <span className="req">*</span></h3>
            <p className="newform-section__hint">Reviewers will mark each item <strong>Approve</strong>, <strong>Discuss</strong>, or <strong>Defer</strong>. Type the question or statement they should assess.</p>
            <div className="newform-items">
              {f.checklist.map((item, i) => (
                <div key={item.id} className="newform-item">
                  <div className="newform-item__header">
                    <span className="newform-item__num">{i + 1}</span>
                    <input type="text" className="newform-item__input" value={item.label} onChange={(e) => updateItem(i, { label: e.target.value })} placeholder={`Item ${i + 1} — e.g. "Approve final brand colors and logo lockup"`} />
                    {f.checklist.length > 2 && (
                      <button type="button" className="newform-item__del" onClick={() => removeItem(i)} aria-label={`Remove item ${i + 1}`} title="Remove item"><Icon name="trash" size={12} /></button>
                    )}
                  </div>
                  <div className="newform-item__body">
                    <div className="newform-item__field">
                      <label className="newform-item__label">Description <span className="newform-section__optional">(optional)</span></label>
                      <textarea rows={2} className="newform-item__textarea" value={item.description || ""} onChange={(e) => updateItem(i, { description: e.target.value })} placeholder="Add context the reviewer should consider before deciding." />
                    </div>
                    <div className="newform-item__field">
                      <label className="newform-item__label">Reference documents <span className="newform-section__optional">(optional)</span></label>
                      <DocMultiPicker
                        docs={allDocs}
                        selected={item.relatedDocIds || []}
                        onChange={(ids) => updateItem(i, { relatedDocIds: ids })}
                        placeholder="Link reference documents…"
                        size="sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" className="btn btn--ghost btn--small" onClick={addItem} style={{ alignSelf: "flex-start", marginTop: 4 }}><Icon name="plus" size={12} /> Add item</button>
              {errors.checklist && <div className="field__error">{errors.checklist}</div>}
            </div>
          </div>
        </div>
        <div className="modal__footer">
          <button className="btn btn--ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn--primary" onClick={submit}>Create form</button>
        </div>
      </div>
    </div>
  );
};

// ----- Changelog Page -----
const CHANGELOG_ENTRIES = [
  {
    version: "1.3.0", date: "2026-05-07", type: "major", title: "Auth Flows, Alerts & Cross-User Sharing",
    items: [
      "Forgot Password: Supabase reset-link email sent directly from sign-in modal",
      "Forgot Email: admin contact screen for account recovery assistance",
      "Account settings tab in profile: Update Email, Change Password, Delete Account",
      "Dashboard event alerts — yellow reminder 2–3 days out, red alert ≤1 day, all dismissible per user",
      "Dashboard sign-off alert — yellow notice for any sign-off form unsigned after 1 week, dismissible",
      "Event creation: toggle between single date and date range",
      "Event creation: toggle between start time only and start + end time",
      "\"Event\" category added with 🎉 and cyan color",
      "Full emoji picker for event emoji — 90+ options across 9 thematic groups",
      "Full emoji picker for profile avatar — 80 options across 4 rows",
      "Start Here pins now saved to Supabase — shared globally across all users and devices",
      "\"Coming Soon\" badge on the DLL & Dayli AI Guided Tour tile",
      "\"Current\" document status option added",
      "\"Evergreen\" phase added for documents, sign-off forms, and events",
      "Summer 2026 phase emoji updated from ☀️ to 🌻",
      "Phase card focus text and chip labels updated for all four phases",
      "Dashboard responsive fixes: Needs Review badge overflow, KPI text overflow, equal phase card heights",
      "Bug fix: ghost butterfly emoji no longer appears in Account settings tab",
      "Bug fix: read state now persists correctly across sign-out and sign-in",
    ]
  },
  {
    version: "1.2.0", date: "2026-05-07", type: "major", title: "Realtime, Comments & Mobile",
    items: [
      "Realtime sync — documents, ideas, and activity update live across all open browser sessions",
      "Document comment threads with realtime sync, emoji avatars, and Cmd+Enter to post",
      "Mobile hamburger nav — sidebar slides in as a 248px drawer on tablet and phone (≤880px)",
      "Start Here dashboard widget now respects pinned documents from the Start Here page",
      "Portal Build Summary and Functional Requirements added as readable in-portal documents",
      "Analytics inline bar charts for most viewed and most downloaded documents",
      "Supabase Storage policies fixed — file uploads now land correctly and preview in the viewer",
      "Removed non-functional three-dot menu button from document cards",
    ]
  },
  {
    version: "1.0.0", date: "2026-05-07", type: "major", title: "Portal Launch 🦋",
    items: [
      "Initial release of the Daily Living Labs Knowledge Portal",
      "Document library with phase organization: Spring, Summer, Fall, and Future Work",
      "Start Here guided onboarding path with 5 core document steps",
      "Sign-off workflow with Approve / Discuss / Defer decision matrix",
      "Deferred items pipeline automatically flows to Future Work",
      "Big Ideas sticky note board with drag-and-drop reordering",
      "Calendar & Timeline with milestone tracker and event creation",
      "Analytics & activity history with real-time view and download tracking",
      "Admin panel for document and sign-off form management",
      "Supabase integration for authentication, storage, and live data",
      "Dark mode and 🦋 Butterfly Mode cursor",
      "Onboarding tour for first-time users with 9 coach-mark steps",
      "Profile nudge after onboarding to encourage profile setup",
      "Pin any document to each Start Here step",
      "Live search dropdown with instant document results",
      "Sign-off PDF export via browser print",
      "Read tracking — completed Start Here steps marked with ✓",
      "Google Docs URL field on document upload and edit",
    ]
  },
  {
    version: "0.9.0", date: "2026-05-07", type: "minor", title: "Beta Testing",
    items: [
      "Drag-and-drop sticky notes on Big Ideas board with pointer capture",
      "Document viewer with PDF preview and image support",
      "Phase-filtered document views (Spring, Summer, Fall, Future Work)",
      "Rich sign-off form builder with multi-select document picker",
      "Deferred items displayed on Future Work page as cards",
      "Needs Review flag toggle on dashboard and admin panel",
    ]
  },
  {
    version: "0.8.0", date: "2026-05-07", type: "minor", title: "Core Features",
    items: [
      "Authentication with Supabase Auth — sign up, sign in, confirm email",
      "Document upload with Supabase Storage and metadata editing",
      "Profile settings with emoji avatars and role labels",
      "Calendar view with per-day event creation and category color coding",
      "Activity feed capturing views, uploads, edits, and sign-offs",
      "Analytics snapshot widget on dashboard",
    ]
  },
  {
    version: "0.5.0", date: "2026-05-07", type: "minor", title: "Design System",
    items: [
      "Brand palette: lavender-forward with dark purple primary",
      "Fraunces display font + Inter body + JetBrains Mono",
      "Light and dark theme with CSS custom properties",
      "Responsive sidebar navigation with badge counts",
      "Card, badge, chip, and button component library",
      "Empty and loading states across all pages",
    ]
  },
];

const ChangelogPage = () => (
  <div>
    <div className="page-header">
      <h1>Changelog</h1>
      <p>A history of portal development — features added, improved, and shipped.</p>
    </div>
    <div className="changelog-list">
      {CHANGELOG_ENTRIES.map(entry => (
        <div key={entry.version} className="changelog-entry">
          <div className="changelog-dot-col">
            <div className={`changelog-dot${entry.type === "major" ? " changelog-dot--major" : ""}`} />
            <div className="changelog-version">{entry.version}</div>
            <div className="changelog-date">{new Date(entry.date + "T00:00").toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}</div>
          </div>
          <div className="changelog-body">
            <div className="changelog-title">
              {entry.title}
              <span className={`changelog-badge changelog-badge--${entry.type}`}>{entry.type}</span>
            </div>
            <ul className="changelog-items">
              {entry.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
);

Object.assign(window, { DocumentsPage, StartHerePage, CalendarPage, SignOffPage, BigIdeasPage, AnalyticsPage, AdminPage, ChangelogPage });
