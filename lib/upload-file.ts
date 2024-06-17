import { createClient } from "./supabase/client";

const tus = require("tus-js-client");

const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID;

const supabase = createClient();

const uploadFile = async (
  bucketName: string,
  fileName: string,
  file: File,
  setProgress?: (progress: number) => void
) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return new Promise<string | undefined>((resolve, reject) => {
    const upload = new tus.Upload(file, {
      endpoint: `https://${projectId}.supabase.co/storage/v1/upload/resumable`,
      retryDelays: [0, 3000, 5000, 10000, 20000],
      headers: {
        authorization: `Bearer ${session?.access_token}`,
        "x-upsert": "true",
      },
      uploadDataDuringCreation: true,
      removeFingerprintOnSuccess: true,
      metadata: {
        bucketName,
        objectName: fileName,
        contentType: "image/*",
        cacheControl: 3600,
      },
      chunkSize: 6 * 1024 * 1024, // NOTE: it must be set to 6MBs do not change
      onError: function (error: string) {
        console.log("Failed because: " + error);
        reject(error);
      },
      onProgress: function (bytesUploaded: number, bytesTotal: number) {
        const percentage = (bytesUploaded / bytesTotal) * 100;
        if (setProgress) setProgress(percentage);
      },
      onSuccess: function () {
        console.log("Download %s from %s", upload.file.name, upload.url);
        resolve(upload.url);
      },
    });

    return upload.findPreviousUploads().then(function (previousUploads: any) {
      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0]);
      }

      upload.start();
    });
  });
};

export default uploadFile;
