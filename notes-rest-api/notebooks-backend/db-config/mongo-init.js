// mongo-init.js
const noteBookDbUser = "nb_user";
const noteBookDbPassword = "nb_pwd";
const noteBookDbName = "notebook_db";

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
