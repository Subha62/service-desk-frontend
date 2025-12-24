import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useParams } from 'react-router-dom';

export default function TicketDetails() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    (async ()=> {
      try {
        const { data } = await api.get(`/tickets/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setTicket(data);
      } catch (err) { console.error(err); }
    })();
  }, [id]);

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/tickets/${id}/comments`, { text }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTicket(data);
      setText('');
    } catch (err) { alert('Failed to add comment'); }
  };

  if(!ticket) return <div>Loading...</div>;
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{ticket.title}</h2>
      <div className="text-sm text-gray-600 mb-4">{ticket.priority} • {ticket.status}</div>
      <p className="mb-4">{ticket.description}</p>

      <h3 className="font-semibold mb-2">Comments</h3>
      <div className="space-y-2 mb-4">
        {ticket.comments.map(c => (
          <div key={c._id} className="p-2 border rounded">
            <div className="text-sm font-medium">{c.name} <span className="text-xs text-gray-500">• {new Date(c.createdAt).toLocaleString()}</span></div>
            <div>{c.text}</div>
          </div>
        ))}
      </div>

      <form onSubmit={addComment} className="space-y-2">
        <textarea className="w-full p-2 border rounded" value={text} onChange={e=>setText(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Comment</button>
      </form>
    </div>
  );
}
