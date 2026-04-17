import fs from "fs-extra";
import path from "path";
import archiver from "archiver";
import { Storage } from "megajs";

// =========================
// CONFIG
// =========================
const ROOT_DIR = process.cwd(); // current project root
const BACKUP_DIR = path.join(ROOT_DIR, "backups");

fs.ensureDirSync(BACKUP_DIR);

// Get project folder name
const projectName = path.basename(ROOT_DIR);

// Date function
const getDate = () => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}_${d.getHours()}-${d.getMinutes()}`;
};

// Final file name
const name = `${projectName}-${getDate()}`;
const zipPath = path.join(BACKUP_DIR, `${name}.zip`);

// =========================
// 1. CREATE ZIP
// =========================
const createZip = () => {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      console.log("✅ ZIP created:", zipPath);
      resolve();
    });

    archive.on("error", reject);

    archive.pipe(output);

    // Include all files except ignored ones
    archive.glob("**/*", {
      cwd: ROOT_DIR,
      ignore: [
        "node_modules/**",
        ".next/**",
        ".git/**",
        "backups/**",
      ],
      dot: true,
    });

    archive.finalize();
  });
};

// =========================
// 2. UPLOAD TO MEGA
// =========================
const uploadToMega = () => {
  return new Promise((resolve, reject) => {
    const storage = new Storage({
      email: "zendley.sites@gmail.com",
      password: "zendley.sites@786",

    });

    storage.once("ready", () => {
      const fileStream = fs.createReadStream(zipPath);

      const upload = storage.upload({
        name: `${name}.zip`,
        size: fs.statSync(zipPath).size,
      });

      fileStream.pipe(upload);

      upload.on("complete", () => {
        console.log("✅ Uploaded to MEGA:", `${name}.zip`);
        resolve();
      });

      upload.on("error", reject);
    });

    storage.on("error", reject);
  });
};

// =========================
// 3. CLEANUP
// =========================
const cleanup = async () => {
  await fs.remove(zipPath);
  console.log("🧹 Local zip deleted");
};

// =========================
// MAIN RUN
// =========================
const run = async () => {
  try {
    console.log(`🚀 Backup started for: ${projectName}`);

    await createZip();
    await uploadToMega();
    await cleanup();

    console.log("🎉 BACKUP COMPLETED SUCCESSFULLY");
  } catch (err) {
    console.error("❌ ERROR:", err.message);
  }
};

run();