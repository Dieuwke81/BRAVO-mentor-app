'use client';

import { useState, useEffect } from 'react';
import { busRoutes, initialCategories, contactData, importantDocuments } from './data';
import { Bus, CheckCircle2, Map, ShieldAlert, Users, Radio, FileText, MapPin, Clock, Zap, Plus, Minus, Trash2, Youtube, X, Navigation, Eye, ClipboardCheck, Phone, Mail, Info, MessageSquare, Download, Upload, Printer, Calendar, UserCheck, Files } from 'lucide-react';

export default function Home() {
  const [students, setStudents] = useState(['Standaard']);
  const [activeStudent, setActiveStudent] = useState('Standaard');
  const [completed, setCompleted] = useState([]);
  const [tallies, setTallies] = useState({});
  const [notes, setNotes] = useState({});
  const [mentorName, setMentorName] = useState('');
  const [dates, setDates] = useState({ start: '', end: '' });
  const [mounted, setMounted] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [mainTab, setMainTab] = useState('routes');
  const [routeSubTab, setRouteSubTab] = useState('ehv-stad');
  const [videoModal, setVideoModal] = useState(null);
  const [pdfModal, setPdfModal] = useState(null);

  useEffect(() => {
    setBaseUrl(window.location.origin);
    const savedStudents = localStorage.getItem('bravo_student_list');
    const savedMentor = localStorage.getItem('bravo_mentor_name');
    if (savedMentor) setMentorName(savedMentor);
    if (savedStudents) {
      const parsed = JSON.parse(savedStudents);
      if (parsed.length > 0) setStudents(parsed);
      const lastActive = localStorage.getItem('bravo_active_student') || parsed[0];
      setActiveStudent(lastActive);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setCompleted(JSON.parse(localStorage.getItem(`bravo_progress_${activeStudent}`) || '[]'));
      setTallies(JSON.parse(localStorage.getItem(`bravo_tallies_${activeStudent}`) || '{}'));
      setNotes(JSON.parse(localStorage.getItem(`bravo_notes_${activeStudent}`) || '{}'));
      setDates(JSON.parse(localStorage.getItem(`bravo_dates_${activeStudent}`) || '{"start":"","end":""}'));
      localStorage.setItem('bravo_active_student', activeStudent);
    }
  }, [activeStudent, mounted]);

  if (!mounted) return null;

  const exportData = () => {
    const data = { studentName: activeStudent, progress: localStorage.getItem(`bravo_progress_${activeStudent}`), tallies: localStorage.getItem(`bravo_tallies_${activeStudent}`), notes: localStorage.getItem(`bravo_notes_${activeStudent}`), dates: localStorage.getItem(`bravo_dates_${activeStudent}`) };
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `MentorApp_${activeStudent}.json`;
    a.click();
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const incoming = JSON.parse(event.target.result);
        const name = incoming.studentName;
        let list = JSON.parse(localStorage.getItem('bravo_student_list') || '["Standaard"]');
        if (!list.includes(name)) { list.push(name); localStorage.setItem('bravo_student_list', JSON.stringify(list)); }
        if (incoming.progress) localStorage.setItem(`bravo_progress_${name}`, incoming.progress);
        if (incoming.tallies) localStorage.setItem(`bravo_tallies_${name}`, incoming.tallies);
        if (incoming.notes) localStorage.setItem(`bravo_notes_${name}`, incoming.notes);
        if (incoming.dates) localStorage.setItem(`bravo_dates_${name}`, incoming.dates);
        window.location.reload();
      } catch (err) { alert("Fout bij importeren."); }
    };
    reader.readAsText(file);
  };

  const updateTally = (id, type, d) => {
    const curr = tallies[id] || { m: 0, z: 0 };
    const next = { ...tallies, [id]: { ...curr, [type]: Math.max(0, curr[type] + d) } };
    setTallies(next);
    localStorage.setItem(`bravo_tallies_${activeStudent}`, JSON.stringify(next));
  };

  const updateNote = (id, val) => {
    const next = { ...notes, [id]: val };
    setNotes(next);
    localStorage.setItem(`bravo_notes_${activeStudent}`, JSON.stringify(next));
  };

  const toggleItem = (id) => {
    const next = completed.includes(id) ? completed.filter(i => i !== id) : [...completed, id];
    setCompleted(next);
    localStorage.setItem(`bravo_progress_${activeStudent}`, JSON.stringify(next));
  };

  const baseItems = initialCategories.flatMap(c => c.items);
  const routeTypes = ['ehv-stad', 'ehv-streek', 'reusel-valkenswaard', 'helmond', 'scholieren'];
  const pathPercentages = routeTypes.map(t => {
    const items = busRoutes.filter(i => i.type === t);
    const done = items.filter(i => completed.includes(i.id)).length;
    const baseDone = baseItems.filter(i => completed.includes(i.id)).length;
    return items.length === 0 ? 0 : ((baseDone + done) / (baseItems.length + items.length)) * 100;
  });

  const totalProgress = Math.round(Math.max(...pathPercentages)) || 0;
  const currentTabItems = busRoutes.filter(i => i.type === routeSubTab);
  const progressTab = Math.round((currentTabItems.filter(i => completed.includes(i.id)).length / (currentTabItems.length || 1)) * 100);

  const uniqueReportRoutes = [];
  const seenIds = new Set();
  busRoutes.forEach(r => { if ((completed.includes(r.id) || tallies[r.id]?.m > 0 || tallies[r.id]?.z > 0 || notes[r.id]) && !seenIds.has(r.id)) { uniqueReportRoutes.push(r); seenIds.add(r.id); } });

  return (
    <div>
      {/* PRINT VIEW */}
      <div className="print-only" style={{ display: 'none' }}>
        <div style={{ padding: '40px', color: 'black' }}>
          <h1 style={{ fontSize: '24px', borderBottom: '2px solid #6d28d9' }}>Rapport BRAVO - {activeStudent}</h1>
          <p>Periode: {dates.start} t/m {dates.end} | Mentor: {mentorName}</p>
          <h2 style={{ fontSize: '18px' }}>Lijnverkenning</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
            <thead><tr style={{ background: '#eee' }}><th>Lijn</th><th>OK</th><th>M</th><th>Z</th><th>Opmerking</th></tr></thead>
            <tbody>
              {uniqueReportRoutes.map(r => (
                <tr key={r.id}><td style={{ border: '1px solid #ccc' }}>{r.text}</td><td style={{ border: '1px solid #ccc' }}>{completed.includes(r.id) ? 'X' : ''}</td><td style={{ border: '1px solid #ccc' }}>{tallies[r.id]?.m || 0}</td><td style={{ border: '1px solid #ccc' }}>{tallies[r.id]?.z || 0}</td><td style={{ border: '1px solid #ccc' }}>{notes[r.id] || ''}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {pdfModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'white', zIndex: 2000, display: 'flex', flexDirection: 'column' }}>
           <div style={{ padding: '15px', background: 'var(--bravo-purple)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold' }}>{pdfModal.text || pdfModal.title}</span>
              <button onClick={() => setPdfModal(null)} style={{ background: 'white', color: 'var(--bravo-purple)', border: 'none', padding: '8px 15px', borderRadius: '8px', fontWeight: 'bold' }}>SLUITEN</button>
           </div>
           <div style={{ flex: 1 }}>
              <iframe src={`https://docs.google.com/viewer?url=${encodeURIComponent(baseUrl + pdfModal.pdf)}&embedded=true`} style={{ width: '100%', height: '100%', border: 'none' }}></iframe>
           </div>
        </div>
      )}

      {videoModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
           <div style={{ background: 'white', width: '100%', maxWidth: '500px', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}><h3>Video's</h3><button onClick={() => setVideoModal(null)} style={{ border: 'none', background: '#eee', borderRadius: '50%', padding: '5px' }}><X size={20} /></button></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {videoModal.videos.map((v, i) => (<a key={i} href={v.url} target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '15px', background: '#fee2e2', color: '#dc2626', textDecoration: 'none', borderRadius: '10px', fontWeight: 'bold' }}><Youtube size={20} /> {v.label}</a>))}
              </div>
           </div>
        </div>
      )}

      <div className="header no-print">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <div style={{ background: 'white', padding: '8px', borderRadius: '10px', minWidth: '50px', height: '50px', display: 'flex', alignItems: 'center' }}><img src="/logo.png" alt="Logo" style={{ height: '35px' }} /></div>
            <div><h1 style={{ fontSize: '1.5rem' }}>BRAVO Mentor</h1><span style={{ fontSize: '0.8rem', opacity: 0.9 }}>HERMES</span></div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '10px', marginBottom: '15px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
            <select value={activeStudent} onChange={(e) => setActiveStudent(e.target.value)} style={{ flex: 1, padding: '8px', borderRadius: '6px', color: 'black' }}>{students.map(s => <option key={s} value={s}>{s}</option>)}</select>
            <button onClick={() => deleteStudent(activeStudent)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px', borderRadius: '6px' }}><Trash2 size={18} /></button>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="text" value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)} placeholder="Naam leerling..." style={{ flex: 1, padding: '8px', borderRadius: '6px' }} /><button onClick={() => { if(newStudentName) { addStudent(); setNewStudentName(''); } }} style={{ background: 'var(--success)', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px' }}><Plus size={18} /></button>
          </div>
        </div>
        <div className="progress-container"><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 'bold' }}><span>VOORTGANG: {activeStudent}</span><span>{totalProgress}%</span></div><div className="progress-bar"><div className="progress-fill" style={{ width: `${totalProgress}%` }}></div></div></div>
        <div style={{ display: 'flex', overflowX: 'auto', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', marginTop: '20px', padding: '4px', gap: '4px' }} className="no-scrollbar">
          <button onClick={() => setMainTab('routes')} style={{ flex: 1, padding: '10px', borderRadius: '8px', background: mainTab === 'routes' ? 'white' : 'transparent', color: mainTab === 'routes' ? 'var(--bravo-purple)' : 'white', fontWeight: 'bold', fontSize: '0.75rem' }}>Lijnen</button>
          <button onClick={() => setMainTab('checklist')} style={{ flex: 1, padding: '10px', borderRadius: '8px', background: mainTab === 'checklist' ? 'white' : 'transparent', color: mainTab === 'checklist' ? 'var(--bravo-purple)' : 'white', fontWeight: 'bold', fontSize: '0.75rem' }}>Checklists</button>
          <button onClick={() => setMainTab('docs')} style={{ flex: 1, padding: '10px', borderRadius: '8px', background: mainTab === 'docs' ? 'white' : 'transparent', color: mainTab === 'docs' ? 'var(--bravo-purple)' : 'white', fontWeight: 'bold', fontSize: '0.75rem' }}>Docs</button>
          <button onClick={() => setMainTab('info')} style={{ flex: 1, padding: '10px', borderRadius: '8px', background: mainTab === 'info' ? 'white' : 'transparent', color: mainTab === 'info' ? 'var(--bravo-purple)' : 'white', fontWeight: 'bold', fontSize: '0.75rem' }}>Info</button>
        </div>
      </div>

      <div className="container no-print">
        {mainTab === 'routes' && (
          <div className="card">
            <div style={{ display: 'flex', overflowX: 'auto', background: '#f3f4f6', padding: '4px', borderRadius: '8px', marginBottom: '15px', gap: '4px' }} className="no-scrollbar">
              {routeTypes.map(t => (<button key={t} onClick={() => setRouteSubTab(t)} style={{ padding: '8px 15px', borderRadius: '6px', border: 'none', fontSize: '0.75rem', fontWeight: 'bold', background: routeSubTab === t ? 'white' : 'transparent', color: routeSubTab === t ? 'var(--bravo-purple)' : '#6b7280', whiteSpace: 'nowrap' }}>{t.replace('-', ' ').toUpperCase()}</button>))}
            </div>
            <div style={{ marginBottom: '15px' }}><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 'bold', color: '#6b7280' }}><span>VOORTGANG {routeSubTab.toUpperCase()}</span><span>{progressTab}%</span></div><div style={{ height: '6px', background: '#e5e7eb', borderRadius: '3px' }}><div style={{ height: '100%', background: 'var(--bravo-purple)', width: `${progressTab}%`, transition: 'width 0.3s' }}></div></div></div>
            {currentTabItems.map((item) => (
              <div key={item.id + item.type} className="checkbox-item" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div className="checkbox-content" onClick={() => toggleItem(item.id)} style={{ flex: 1 }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '6px', border: completed.includes(item.id) ? 'none' : '2px solid #d1d5db', background: completed.includes(item.id) ? 'var(--success)' : 'transparent', marginRight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>{completed.includes(item.id) && <CheckCircle2 size={16} />}</div>
                    <span style={{ textDecoration: completed.includes(item.id) ? 'line-through' : 'none', color: completed.includes(item.id) ? '#9ca3af' : 'inherit', fontSize: '1rem', fontWeight: '500' }}>{item.text}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {item.map && item.map !== '#' && <a href={item.map} target="_blank" className="pdf-btn"><MapPin size={16} /></a>}
                    {item.pdf && <button onClick={() => setPdfModal(item)} className="pdf-btn"><FileText size={16} /></button>}
                    {item.videos && item.videos.length > 0 && <button onClick={() => setVideoModal(item)} className="pdf-btn" style={{ background: '#fee2e2', color: '#dc2626' }}><Youtube size={16} /></button>}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '20px', marginLeft: '39px', padding: '10px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><button onClick={() => updateTally(item.id, 'm', -1)} className="tally-btn"><Minus size={14} /></button><div className="tally-score"><Eye size={14} /> M: {tallies[item.id]?.m || 0}</div><button onClick={() => updateTally(item.id, 'm', 1)} className="tally-btn"><Plus size={14} /></button></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><button onClick={() => updateTally(item.id, 'z', -1)} className="tally-btn"><Minus size={14} /></button><div className="tally-score" style={{ background: '#f0fdf4', color: '#15803d', borderColor: '#bbf7d0' }}><Navigation size={14} /> Z: {tallies[item.id]?.z || 0}</div><button onClick={() => updateTally(item.id, 'z', 1)} className="tally-btn"><Plus size={14} /></button></div>
                </div>
                <div style={{ marginLeft: '39px' }}><input type="text" value={notes[item.id] || ''} onChange={(e) => updateNote(item.id, e.target.value)} placeholder="Opmerking..." className="note-input" /></div>
              </div>
            ))}
          </div>
        )}

        {mainTab === 'checklist' && (
          <div>{initialCategories.map((cat) => (<div key={cat.id} className="card"><div className="category-header">{cat.icon}<span className="category-title">{cat.title}</span></div>{cat.items.map((it) => (<div key={it.id} className="checkbox-item" onClick={() => toggleItem(it.id)}><div className="checkbox-content"><div style={{ width: '24px', height: '24px', borderRadius: '6px', border: completed.includes(it.id) ? 'none' : '2px solid #d1d5db', background: completed.includes(it.id) ? 'var(--success)' : 'transparent', marginRight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>{completed.includes(it.id) && <CheckCircle2 size={16} />}</div><span style={{ textDecoration: completed.includes(it.id) ? 'line-through' : 'none', color: completed.includes(it.id) ? '#9ca3af' : 'inherit' }}>{it.text}</span></div></div>))}</div>))}</div>
        )}

        {mainTab === 'docs' && (
          <div className="card">
            <div className="category-header"><Files size={22} /><span className="category-title">Documenten</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
              {importantDocuments.map((doc) => (<button key={doc.id} onClick={() => setPdfModal(doc)} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '10px', textAlign: 'left' }}><FileText size={24} color="var(--bravo-purple)" /><span style={{ fontWeight: '600' }}>{doc.title}</span></button>))}
            </div>
          </div>
        )}

        {mainTab === 'info' && (
          <div>
            <div className="card" style={{ padding: '20px' }}><h3 style={{ fontSize: '1rem', color: 'var(--bravo-purple)', marginBottom: '15px', fontWeight: 'bold' }}>Rapportage Gegevens</h3><div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}><div><label style={{ fontSize: '0.8rem', color: '#666' }}>Mentor</label><input type="text" value={mentorName} onChange={(e) => { setMentorName(e.target.value); localStorage.setItem('bravo_mentor_name', e.target.value); }} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} /></div><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}><div><label style={{ fontSize: '0.8rem' }}>Start</label><input type="text" value={dates.start} onChange={(e) => { const d = { ...dates, start: e.target.value }; setDates(d); localStorage.setItem(`bravo_dates_${activeStudent}`, JSON.stringify(d)); }} style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }} /></div><div><label style={{ fontSize: '0.8rem' }}>Eind</label><input type="text" value={dates.end} onChange={(e) => { const d = { ...dates, end: e.target.value }; setDates(d); localStorage.setItem(`bravo_dates_${activeStudent}`, JSON.stringify(d)); }} style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }} /></div></div></div></div>
            <div className="card" style={{ textAlign: 'center' }}><button onClick={() => window.print()} style={{ background: '#10b981', color: 'white', padding: '12px', borderRadius: '10px', border: 'none', fontWeight: 'bold', width: '100%' }}>Rapport maken</button><button onClick={exportData} style={{ marginTop: '10px', background: 'var(--bravo-purple)', color: 'white', padding: '12px', borderRadius: '10px', border: 'none', width: '100%' }}>Download data</button><label style={{ marginTop: '10px', display: 'block', background: 'white', color: 'var(--bravo-purple)', padding: '12px', borderRadius: '10px', border: '2px solid var(--bravo-purple)' }}>Importeer data<input type="file" onChange={importData} style={{ display: 'none' }} /></label></div>
            {contactData.map((group, idx) => (<div key={idx} className="card"><h3 style={{ fontSize: '0.9rem', color: 'var(--bravo-purple)' }}>{group.category}</h3>{group.contacts.map((c, i) => (<div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}><span>{c.name}</span><div>{c.phone && <a href={`tel:${c.phone}`} className="pdf-btn"><Phone size={14} /></a>}{c.email && <a href={`mailto:${c.email}`} className="pdf-btn"><Mail size={14} /></a>}</div></div>))}</div>))}
          </div>
        )}
      </div>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .tally-btn { border: 1px solid #bae6fd; background: white; color: #0369a1; border-radius: 6px; padding: 4px; cursor: pointer; }
        .tally-score { display: flex; align-items: center; gap: 6px; background: #f0f9ff; color: #0369a1; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; font-weight: bold; border: 1px solid #bae6fd; }
        .note-input { border: 1px solid #e5e7eb; background: #f9fafb; font-size: 0.85rem; width: 100%; border-radius: 8px; padding: 4px 10px; outline: none; }
        @media print { .no-print { display: none !important; } .print-only { display: block !important; } body { background: white !important; } }
      `}</style>
    </div>
  );
}
