import React from 'react';

export default function EmbedRenderer({ url }) {
  if (!url) return null;
  try {
    const u = new URL(url);
    const host = u.hostname.replace('www.', '');
    if (/youtube\.com|youtu\.be/.test(host)) {
      const id = u.searchParams.get('v') || u.pathname.split('/').pop();
      return <div className="aspect-w-16 aspect-h-9"><iframe src={`https://www.youtube.com/embed/${id}`} allowFullScreen className="w-full h-full rounded-lg"/></div>;
    }
    if (/vimeo\.com/.test(host)) {
      const id = u.pathname.split('/').pop();
      return <div className="aspect-w-16 aspect-h-9"><iframe src={`https://player.vimeo.com/video/${id}`} allowFullScreen className="w-full h-full rounded-lg"/></div>;
    }
    if (/drive\.google\.com/.test(host)) {
      const m = url.match(/file\/d\/([\w-]+)/) || url.match(/[?&]id=([\w-]+)/);
      const id = m ? m[1] : null;
      if (id) return <div className="aspect-w-16 aspect-h-9"><iframe src={`https://drive.google.com/file/d/${id}/preview`} className="w-full h-full rounded-lg"/></div>;
    }
  } catch (e) {
    // ignore
  }
  return (
    <div className="p-4 border rounded-lg">
      <a href={url} target="_blank" rel="noreferrer" className="text-blue-600 underline break-all">{url}</a>
    </div>
  );
}
