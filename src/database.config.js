import Dexie from "dexie";

const database = new Dexie("cv-storageDB");
database.version(1).stores({
  cvpdfs: '++id, name',
});

export const cvTable = database.table('cvpdfs');

export default database;