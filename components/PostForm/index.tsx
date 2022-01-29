import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

import { serverTimeStamp } from "lib/firebase";
import { ImageUploader } from "components";

import styles from "styles/Admin.module.css";

const PostForm = ({ defaultValues, postRef, preview }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const updatePost = async ({ content, published }) => {
    await postRef.update({
      content,
      published,
      updatedAt: serverTimeStamp(),
    });

    reset({ content, published });

    toast.success("Post updated successfully!");
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div className="card">
          <ReactMarkdown>{watch("content")}</ReactMarkdown>
        </div>
      )}

      <div className={preview ? styles.hidden : styles.controls}>
        <ImageUploader />
        <textarea
          name="content"
          {...register("content", {
            maxLength: { value: 20000, message: "Content is too long" },
            minLength: { value: 10, message: "Content is too short" },
            required: { value: true, message: "Content is required" },
          })}
        ></textarea>

        {errors.content && (
          <p className="text-danger"> ❌ {errors.content.message}</p>
        )}

        <fieldset>
          <input
            className={styles.checkbox}
            type="checkbox"
            name="published"
            id="published"
            {...register("published")}
          />
          <label htmlFor="published">Published</label>
        </fieldset>

        <button
          type="submit"
          className="btn-green"
          disabled={!isDirty || !isValid}
        >
          Save changes
        </button>
      </div>
    </form>
  );
};

export default PostForm;
