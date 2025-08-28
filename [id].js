import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import EmbedRenderer from '../../components/EmbedRenderer';
import { useRouter } from 'next/router';

export default function PostPage(){
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);

  useEffect(()=>{
    if(!id) return;
    async function load(){
      const d = await getDoc(doc(db,'posts',id));
      if(!d.exists()) { setPost(null); return; }
      setPost({ id: d.id, ...d.data() });
    }
    load();
  },[id]);

  if(post === null) return <div className="p-6">Post not found</div>;
  if(!post) return <div className="p-6">Loading…</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="card">
        <div className="mb-3 text-sm text-slate-500">{post.createdAt?.toDate?.().toLocaleString?.() || '—'}</div>
        <div className="font-semibold break-words mb-4">{post.url}</div>
        <EmbedRenderer url={post.url} />
        <div className="mt-4 flex gap-2">
          <button className="btn btn-primary" onClick={()=>navigator.clipboard?.writeText(location.href)}>Copy link</button>
          <a className="btn" href="/">Back</a>
        </div>
      </div>
    </div>
  );
}
