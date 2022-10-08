import { update } from "firebase/database";
import { collection, doc, DocumentData, onSnapshot, QueryDocumentSnapshot, setDoc, SnapshotOptions, Timestamp, WithFieldValue } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { db } from "./firebasesetup";

import { Header } from './Header';

class Post {
   constructor(readonly title: string, readonly content: string, readonly likes: number = 0, readonly date: Timestamp) { }
}

export const Home = () => {

   const [posts, setPosts] = useState<Post[]>([]);
   const [postCount, setPostCount] = useState<number>();

   const isMountedRef = useRef(false);

   const postConverter = {
      toFirestore(post: WithFieldValue<Post>): DocumentData {
         return { title: post.title, content: post.content, date: post.date };
      },
      fromFirestore(
         snapshot: QueryDocumentSnapshot,
         options: SnapshotOptions
      ): Post {
         const data = snapshot.data(options)!;
         return new Post(data.title, data.content, data.likes, data?.date);
      }
   };

   const postsDbRef = collection(db, 'posts');

   useEffect(() => {
      if (isMountedRef.current) return; else isMountedRef.current = true;

      const citiesRef = collection(db, "cities");

      onSnapshot(postsDbRef.withConverter(postConverter), (snapshot) => {
         let _posts: Post[] = [];
         snapshot.docs.forEach(doc => _posts.push(doc.data()));
         console.log(_posts);
         setPosts(_posts);
      });
   }, []);

   const navigate = useNavigate();
   return (
      <React.Fragment>
         <Header />
         <main>
            <h1>Our blog</h1>
            <div className="postFeed">
               {
                  posts?.length > 0 && <div style={{ marginBottom: '10px' }}> {posts.length} Posts</div>
               }
               {
                  posts?.map((p, index) => {
                     return (
                        <div className="postFeedItem" key={(Math.random().toString())}>
                           <h2>{p.title}</h2>
                           <p>{p.content}</p>
                           <hr />
                           <div className="badge">{p.likes} 👍</div>
                           <div style={{ fontSize: '13px' }}>Posted at {p.date.toDate().toLocaleDateString() + ' . ' + p.date.toDate().toLocaleTimeString().slice(0, 5)}</div>
                        </div>
                     )
                  })
               }
               {!isMountedRef.current && <div>Loading posts...</div>}
               {isMountedRef.current && posts.length == 0 && <div>No posts... <br/><br/><button onClick={() => navigate('/add-post')}>Write one?</button></div>}
            </div>
         </main>
      </React.Fragment>
   );
}