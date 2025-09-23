const keyValueDb = process.env.KEY_VALUE_DB;
const keyValueUser = process.env.KEY_VALUE_USER;
const keyValuePassword = process.env.KEY_VALUE_PASSWORD;
console.log(

);

db = db.getSiblingDB(keyValueDb);
db.createUser({
  user: keyValueUser,
  pwd: KEY_VALUE_PASSWORD,
  roles: [
    {
      role: "readWrite",
      db: keyValueDb,
    },
  ],
});
