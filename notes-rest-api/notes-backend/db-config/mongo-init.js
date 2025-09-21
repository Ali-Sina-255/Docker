const noteDbUser = process.env.NOTES_DB_USER;
const noteDbPassword = process.env.NOTES_DB_PASSWORD;
const noteDbName = process.env.NOTES_DB_NAME;

print("Initializing NOTES Db User");
db = db.getSiblingDB(noteDbName);
db.createUser({
  user: noteDbUser,
  pwd: noteDbPassword,
  roles: [
    {
      role: "readWrite",
      db: noteDbName,
    },
  ],
});
