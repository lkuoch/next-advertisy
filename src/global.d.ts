// Global types
type RootState = ReturnType<typeof import("index").store["getState"]>;
type AppDispatch = typeof import("index").store["dispatch"];

// Make CONFIG variable global
declare var CONFIG: ReturnType<typeof import("config").default>;
