import { useEffect, useState } from 'react';
import { auth, googleProvider, db } from '../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import EmbedRenderer from '../components/EmbedRenderer';
import { useRouter } from 'next/router';

const ADMIN_EMAILS = ['wwebitme@gmail.com'];

export default function Home(){
  const [user,setUser] = useState(null);
  const [paste, setPaste] = useState('');
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(()=>{
    const unsub = auth.onAuthStateChanged(u=>setUser(u));
    fetchPosts();
    return ()=>unsub();
  },[]);

  async function fetchPosts(){
    const q = query(collection(db,'posts'), orderBy('createdAt','desc'));
    const snap = await getDocs(q);
    setPosts(snap.docs.map(d=>({id:d.id, ...d.data()})));
  }

  async function handlePublish(){
    if(!user || !ADMIN_EMAILS.includes(user.email)) return alert('Only admin can post');
    const lines = paste.split('\n').map(l=>l.trim()).filter(Boolean);
    if(!lines.length) return alert('Paste at least one link');
    for(const url of lines){
      await addDoc(collection(db,'posts'),{url, createdAt: serverTimestamp(), author: user.email});
    }
    setPaste(''); fetchPosts(); alert(`${lines.length} posts published`);
  }

  async function handleDelete(id){ if(!confirm('Delete?')) return; await deleteDoc(doc(db,'posts',id)); fetchPosts(); }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">linksharepro</h1>
        <div>
          {user ? (
            <div className="flex items-center gap-3">
              <img src={user.photoURL} className="w-8 h-8 rounded-full" alt="avatar"/>
              <button className="btn" onClick={()=>signOut(auth)}>Sign out</button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={()=>signInWithPopup(auth, googleProvider)}>Sign in with Google</button>
          )}
        </div>
      </header>

      {user && ADMIN_EMAILS.includes(user.email) && (
        <section className="card mb-6">
          <h3 className="font-semibold mb-2">Bulk paste links (one per line)</h3>
          <textarea rows={6} value={paste} onChange={e=>setPaste(e.target.value)} className="w-full p-3 rounded-lg border" placeholder="https://..." />
          <div className="mt-3 flex gap-2">
            <button className="btn btn-primary" onClick={handlePublish}>Publish</button>
            <button className="btn" onClick={()=>setPaste('')}>Clear</button>
          </div>
        </section>
      )}

      <section>
        <h3 className="mb-3 font-semibold">Recent posts</h3>
        <div className="grid gap-4">
          {posts.map(p=> (
            <div key={p.id} className="card">
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <div className="text-sm text-slate-500">{p.createdAt?.toDate?.().toLocaleString?.() || '—'}</div>
                  <div className="font-medium break-words">{p.url}</div>
                  <div className="mt-3"><EmbedRenderer url={p.url} /></div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="btn" onClick={()=>router.push(`/post/${p.id}`)}>Open</button>
                  <button className="btn" onClick={()=>navigator.clipboard?.writeText(location.origin+`/post/${p.id}`)}>Copy link</button>
                  {user && ADMIN_EMAILS.includes(user.email) && <button className="btn" onClick={()=>handleDelete(p.id)}>Delete</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
