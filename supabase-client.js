// Supabase client — initialised before any JSX loads
(function () {
  const { createClient } = window.supabase;
  const client = createClient(
    "https://joosmreonfvvlbszuqbc.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impvb3NtcmVvbmZ2dmxic3p1cWJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMzU0MTksImV4cCI6MjA5MzcxMTQxOX0.dYuzBgVM5etLAl-8fN2DWMOl35fRlMB3foL5_evK_bM"
  );

  // All tables use the same schema: { id text PK, data jsonb, created_at timestamptz }
  // The full JS object is stored in `data` so no column mapping is needed.

  const getAll = async (table) => {
    const { data, error } = await client.from(table).select("data").order("created_at", { ascending: true });
    if (error) { console.error("getAll(" + table + "):", error.message); return []; }
    return (data || []).map(function (r) { return r.data; });
  };

  const getAllDesc = async (table) => {
    const { data, error } = await client.from(table).select("data").order("created_at", { ascending: false });
    if (error) { console.error("getAllDesc(" + table + "):", error.message); return []; }
    return (data || []).map(function (r) { return r.data; });
  };

  const upsertOne = async (table, obj) => {
    const { error } = await client.from(table).upsert({ id: obj.id, data: obj });
    if (error) console.error("upsertOne(" + table + "):", error.message);
  };

  const upsertMany = async (table, arr) => {
    if (!arr || !arr.length) return;
    const rows = arr.map(function (obj) { return { id: obj.id, data: obj }; });
    const { error } = await client.from(table).upsert(rows);
    if (error) console.error("upsertMany(" + table + "):", error.message);
  };

  const deleteOne = async (table, id) => {
    const { error } = await client.from(table).delete().eq("id", id);
    if (error) console.error("deleteOne(" + table + "):", error.message);
  };

  const uploadFile = async (path, file) => {
    const { error } = await client.storage.from("portal-docs").upload(path, file, { cacheControl: "3600", upsert: false });
    if (error) { console.error("uploadFile:", error.message); return null; }
    const { data } = client.storage.from("portal-docs").getPublicUrl(path);
    return data.publicUrl;
  };

  const deleteFile = async (path) => {
    const { error } = await client.storage.from("portal-docs").remove([path]);
    if (error) console.error("deleteFile:", error.message);
  };

  const signIn = (email, password) => client.auth.signInWithPassword({ email, password });
  const signUp = (email, password) => client.auth.signUp({ email, password });
  const signOut = () => client.auth.signOut();
  const getSession = () => client.auth.getSession();
  const onAuthStateChange = (cb) => client.auth.onAuthStateChange(cb);

  const getProfile = async (userId) => {
    const { data } = await client.from("profiles").select("*").eq("id", userId).single();
    return data;
  };
  const upsertProfile = async (profile) => {
    const { error } = await client.from("profiles").upsert({ ...profile, updated_at: new Date().toISOString() });
    if (error) console.error("upsertProfile:", error.message);
  };

  // ---- Realtime subscriptions ----
  const subscribeToTable = (table, callback) => {
    const channel = client.channel("rt-" + table + "-" + Date.now())
      .on("postgres_changes", { event: "*", schema: "public", table: table }, callback)
      .subscribe();
    return channel;
  };

  const unsubscribe = (channel) => {
    if (channel) client.removeChannel(channel).catch(function () {});
  };

  // ---- Comments ----
  const getComments = async (docId) => {
    const { data, error } = await client.from("comments").select("data").order("created_at", { ascending: true });
    if (error) { console.error("getComments:", error.message); return []; }
    return (data || []).map(function (r) { return r.data; }).filter(function (c) { return c.docId === docId; });
  };

  const addComment = async (comment) => {
    const { error } = await client.from("comments").upsert({ id: comment.id, data: comment });
    if (error) console.error("addComment:", error.message);
  };

  const deleteComment = async (id) => {
    const { error } = await client.from("comments").delete().eq("id", id);
    if (error) console.error("deleteComment:", error.message);
  };

  window.DLL_DB = { getAll, getAllDesc, upsertOne, upsertMany, deleteOne, uploadFile, deleteFile, signIn, signUp, signOut, getSession, onAuthStateChange, getProfile, upsertProfile, subscribeToTable, unsubscribe, getComments, addComment, deleteComment };
})();
