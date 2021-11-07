// Global types
type RootState = ReturnType<typeof import("./app/store").default["getState"]>;
type AppDispatch = typeof import("./app/store").default["dispatch"];
