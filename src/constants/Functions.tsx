import { db } from "../configs/FirebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  doc,
  query,
  collectionGroup,
  where,
  DocumentData,
  WhereFilterOp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  deleteObject,
  ListResult,
} from "firebase/storage";

/** Generic function to list all documents in a collection */
const index = async (
  docname: string
): Promise<(DocumentData & { id: string })[]> => {
  const res = await getDocs(collection(db, docname));
  return res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

/** Query using collectionGroup and where */
const indexQuery = async (
  docname: string,
  field: string,
  operator: WhereFilterOp,
  value: string
): Promise<(DocumentData & { id: string })[]> => {
  const qr = query(collectionGroup(db, docname), where(field, operator, value));
  const res = await getDocs(qr);
  return res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

/** Get single document */
const show = async (
  docname: string,
  id: string
): Promise<DocumentData | undefined> => {
  const dataDoc = doc(db, docname, id);
  const snapshot = await getDoc(dataDoc);
  return snapshot.exists()
    ? { ...snapshot.data(), id: snapshot.id }
    : undefined;
};

/** Add new document */
const store = async (docname: string, data: DocumentData): Promise<void> => {
  await addDoc(collection(db, docname), data);
};

/** Update document by ID */
const update = async (
  docname: string,
  id: string,
  data: Partial<DocumentData>
): Promise<void> => {
  const dataDoc = doc(db, docname, id);
  await updateDoc(dataDoc, data);
};

/** Delete document by ID */
const destroy = async (docname: string, id: string): Promise<void> => {
  const dataDoc = doc(db, docname, id);
  await deleteDoc(dataDoc);
};

/** List all files in a Firebase Storage path */
const fileList = async (path: string): Promise<ListResult> => {
  const storage = getStorage();
  const listRef = ref(storage, path);
  return await listAll(listRef);
};

/** Get file URL by path */
const getFileUrl = async (path: string): Promise<string> => {
  const storage = getStorage();
  const fileRef = ref(storage, path);
  return await getDownloadURL(fileRef);
};

/** Delete a file by path */
const deleteFile = async (path: string): Promise<void> => {
  const storage = getStorage();
  const fileRef = ref(storage, path);
  await deleteObject(fileRef);
};

/**To convert a timestamp (ISO 8601 or Date object) to the format 'YYYY-MM-DD HH:MM:SS' */
function formatTimestamp(timestamp: string | Date): string {
  const date = new Date(timestamp);

  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months start from 0
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const Functions = {
  index,
  indexQuery,
  show,
  store,
  update,
  destroy,
  fileList,
  getFileUrl,
  deleteFile,
  formatTimestamp
};

export default Functions;
