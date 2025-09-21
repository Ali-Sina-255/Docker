// mongo-init.js
const noteBookDbUser = process.env.NOTEBOOK_DB_USER;
const noteBookDbPassword = process.env.NOTEBOOK_DB_PASSWORD;
const noteBookDbName = process.env.NOTEBOOK_DB_NAME;

print("Initializing NoteBookDb User");
db = db.getSiblingDB(noteBookDbName);
db.createUser({
  user: noteBookDbUser,
  pwd: noteBookDbPassword,
  roles: [
    {
      role: "readWrite",
      db: noteBookDbName,
    },
  ],
});
