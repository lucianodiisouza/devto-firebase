import { ChangeEvent, FormEvent, useState } from "react";

import { Loader } from "components";
import { storage, auth, STATE_CHANGED } from "lib/firebase";

const ImageUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    const fileToUpload: File = Array.from(e.target.files)[0];
    const extension = file[0].type.split("/")[1];

    const ref = storage.ref(
      `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
    );

    setUploading(true);

    const task = ref.put(fileToUpload);

    task.on(STATE_CHANGED, (snapshot) => {
      const pct = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(0);

      setProgress(Number(pct));

      task
        .then(() => ref.getDownloadURL())
        .then((url) => {
          setDownloadURL(url);
          setUploading(false);
        });
    });
  };

  return (
    <div className="box">
      <Loader show={uploading} />
      {uploading && <h3>{progress}%</h3>}

      {!uploading && (
        <>
          <label className="btn">
            📸 Upload Image
            <input
              type="file"
              onChange={uploadImage}
              accept="image/x-png,image/gif,image/jpeg"
            />
          </label>
        </>
      )}

      {downloadURL && (
        <code className="upload-snippet">{`![alt](${downloadURL})`}</code>
      )}
    </div>
  );
};

export default ImageUploader;
