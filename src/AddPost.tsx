import { addDoc, collection, FieldValue, serverTimestamp } from "firebase/firestore";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

import { db } from './firebasesetup';
import { Header } from "./Header";

type FieldErrors = {
   title: boolean;
   content: boolean;
}

type PostDataState = {
   title: string;
   content: string;
}

export const AddPost = () => {

   const navigate = useNavigate();
   
   // states
   const [postData, setPostData] = useState<PostDataState>();
   const [fieldErrors, setFieldErrors] = useState<FieldErrors>({ title: false, content: false });
   const [postPublished, setPostPublished] = useState<boolean>();

   // db add
   function AddPostDB(data: { title: string, content: string, date: FieldValue }) {

      addDoc(collection(db, 'posts'), data)
         .then(doc => {
            setPostPublished(true);
         }).catch(err => {
            setPostPublished(false);
            console.log(err);
         });
   }

   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      // extract values
      const { postTitle, postContent } = e.target as typeof e.target & {
         postTitle: { value: string }
         postContent: { value: string }
      }

      // check if fields are set
      let errors: FieldErrors = { title: false, content: false }

      if (!postTitle.value) errors.title = true;
      if (!postContent.value) errors.content = true;

      if (errors.title || errors.content) {
         setFieldErrors(errors);
         return;
      }

      let newPost = { title: postTitle.value, content: postContent.value };
      setPostData(newPost);
      AddPostDB({ ...newPost, date: serverTimestamp() });
      if (!errors.title && !errors.content) setFieldErrors({ title: false, content: false });
   }

   function handleChange(e: ChangeEvent<HTMLInputElement>) {
   }

   return (
      <React.Fragment>
         <Header />
         <main>
            <div className="add-post-form">
               <form onSubmit={handleSubmit}>
                  <div>
                     <label htmlFor="postTitle">Title* (must be greater than 5 characters)</label>
                     <br />
                     <input type="text" name="postTitle" id="postTitle" value={postData?.title} onChange={handleChange} />
                     {fieldErrors.title && <div className="field-error">Post title is required</div>}
                  </div>
                  <div>
                     <label htmlFor="postContent">Content* (must be greater than 10 characters)</label>
                     <br />
                     <textarea name="postContent" id="postContent" value={postData?.content} />
                     {fieldErrors.content && <div className="field-error">Post content is required</div>}
                  </div>
                  <button type="submit">Submit post</button>
                  <div>
                     {postPublished && <div className="post-published">Your post got published! 
                     <a onClick={() => navigate('/')}>Click here to see it
                     </a>
                     </div>}
                     {postPublished === false && <div className="post-publish-error">Something went wrong, please try again later.</div>}
                  </div>
               </form>
            </div>
         </main >
      </React.Fragment >
   );
}