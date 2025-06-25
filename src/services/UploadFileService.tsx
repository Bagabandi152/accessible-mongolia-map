import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../configs/FirebaseConfig";

// Initialize storage instance
export const storage = getStorage(app);

// ---------- Types ----------
interface UploadFileProps {
  file: File;
  path?: string;
  onProgress?: (progress: number) => void;
  onFinish?: (url: string) => void;
  type?: string;
}

export const uploadFile = async ({
  file,
  path = "other/",
  onProgress = () => {},
  onFinish = () => {},
  type = "image/jpeg",
}: UploadFileProps): Promise<void> => {
  const metadata = {
    contentType: type,
  };

  const storageRef = ref(storage, `${path}${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onProgress(progress);
    },
    (error) => {
      console.error(error);
      switch (error.code) {
        case "storage/unauthorized":
        case "storage/canceled":
        case "storage/unknown":
        default:
          break;
      }
    },
    async () => {
      try {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        onFinish(downloadURL);
      } catch (error) {
        console.error("Failed to get download URL:", error);
      }
    }
  );
};

// ---------- Final Upload Handler ----------
interface FinalUploadFileProps {
  fileType?: string;
  path?: string;
  onFinish?: (url: string) => void;
  onProgress?: (progress: number) => void;
}

export const finalUploadFile = ({
  fileType = "*",
  path = "other/",
  onFinish = (url) => console.info(url),
  onProgress = (progress) => console.info(progress),
}: FinalUploadFileProps): void => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = fileType;
  input.onchange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      uploadFile({ file, path, onFinish, onProgress, type: file.type });
    }
  };

  input.click();
};

// ---------- Get File and Local Preview ----------
interface GetFileAndURLProps {
  fileType?: string;
  onFinish: (result: { file: File; url: string | ArrayBuffer | null }) => void;
}

export const getFileAndURL = ({
  fileType = "*",
  onFinish,
}: GetFileAndURLProps): void => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = fileType;

  input.onchange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onFinish({ file, url: event.target?.result ?? null });
      };
      reader.readAsDataURL(file);
    }
  };

  input.click();
};
