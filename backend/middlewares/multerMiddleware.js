import multer from "multer";

// set penyimpnan file ke dalam memori dengan multer.memoryStorage
const storage = multer.memoryStorage();

// upload file dengan multer
const upload = multer({
  storage: storage,
});

export default upload;
