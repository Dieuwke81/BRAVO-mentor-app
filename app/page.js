'use client';

import { useState, useEffect } from 'react';
import { busRoutes, initialCategories, contactData, importantDocuments, busTypes, vehicleChecklist, usefulLinks } from './data';
import { 
  Bus, CheckCircle2, Map, ShieldAlert, Users, Radio, FileText, MapPin, Clock, 
  Zap, Plus, Minus, Trash2, Youtube, X, Navigation, Eye, ClipboardCheck, 
  Phone, Mail, Info, MessageSquare, Download, Upload, Printer, UserCheck, 
  Files, Sun, Moon, ExternalLink 
} from 'lucide-react';

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
  const [mainTab, setMainTab] = useState('routes');
  const [routeSubTab, setRouteSubTab] = useState('ehv-stad');
  const [activeBus, setActiveBus] = useState('iveco');
  const [videoModal, setVideoModal] = useState(null);
  const [pdfModal, setPdfModal] = useState(null);
  const [newStudentName, setNewStudentName] = useState('');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (typeof window !== 'undefined') { 
      setBaseUrl(window.location.origin); 
      const savedTheme = localStorage.getItem('bravo_theme') || 'light';
      setTheme(savedTheme);
      document.body.className = savedTheme === 'dark' ? 'dark-mode' : '';
    }
    const savedMentor = localStorage.getItem('bravo_mentor_name');
    if (savedMentor) setMentorName(savedMentor);
    const savedStudents = localStorage.getItem('bravo_student_list');
    if (savedStudents) {
      const parsed = JSON.parse(savedStudents);
      if (parsed.length > 0) setStudents(parsed);
      setActiveStudent(localStorage.getItem('bravo_active_student') || 'Standaard');
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.body.className = theme === 'dark' ? 'dark-mode' : '';
      localStorage.setItem('bravo_theme', theme);
    }
  }, [theme, mounted]);

  useEffect(() => {
    if (mounted) {
      setCompleted(JSON.parse(localStorage.getItem(`bravo_progress_${activeStudent}`) || '[]'));
      setTallies(JSON.parse(localStorage.getItem(`bravo_tallies_${activeStudent}`) || '{}'));
      setNotes(JSON.parse(localStorage.getItem(`bravo_notes_${activeStudent}`) || '{}'));
      setDates(JSON.parse(localStorage.getItem(`bravo_dates_${activeStudent}`) || '{"start":"","end":""}'));
      localStorage.setItem('bravo_active_student', activeStudent);
    }
  }, [activeStudent, mounted]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
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
        localStorage.setItem(`bravo_progress_${name}`, incoming.progress);
        localStorage.setItem(`bravo_tallies_${name}`, incoming.tallies);
        localStorage.setItem(`bravo_notes_${name}`, incoming.notes);
        if (incoming.dates) localStorage.setItem(`bravo_dates_${name}`, incoming.dates);
        window.location.reload();
      } catch (err) { alert("Fout bij importeren."); }
    };
    reader.readAsText(file);
  };

  const updateTally = (id, type, d) => {
    const next = { ...tallies, [id]: { ...(tallies[id] || { m: 0, z: 0 }), [type]: Math.max(0, (tallies[id]?.[type] || 0) + d) } };
    setTallies(next); localStorage.setItem(`bravo_tallies_${activeStudent}`, JSON.stringify(next));
  };

  const updateNote = (id, val) => {
    const next = { ...notes, [id]: val };
    setNotes(next); localStorage.setItem(`bravo_notes_${activeStudent}`, JSON.stringify(next));
  };

  const toggleItem = (id) => {
    const next = completed.includes(id) ? completed.filter(i => i !== id) : [...completed, id];
    setCompleted(next); localStorage.setItem(`bravo_progress_${activeStudent}`, JSON.stringify(next));
  };

  const addStudent = () => {
    if (newStudentName.trim() && !students.includes(newStudentName.trim())) {
      const newList = [...students, newStudentName.trim()];
      setStudents(newList); localStorage.setItem('bravo_student_list', JSON.stringify(newList));
      setActiveStudent(newStudentName.trim()); setNewStudentName('');
    }
  };

  const deleteStudent = (name) => {
    if (students.length > 1 && confirm(`Verwijder ${name}?`)) {
      const newList = students.filter(s => s !== name);
      setStudents(newList); localStorage.setItem('bravo_student_list', JSON.stringify(newList));
      setActiveStudent(newList[0]);
    }
  };

  // Voortgang
  const baseItems = initialCategories.flatMap(c => c.items);
  const routeTypes = ['ehv-stad', 'ehv-streek', 'reusel-valkenswaard', 'helmond', 'scholieren'];
  const totalProgress = Math.round(Math.max(...routeTypes.map(t => {
    const items = busRoutes.filter(i => i.type === t);
    const doneCount = items.filter(i => completed.includes(i.id)).length;
    const baseDoneCount = baseItems.filter(i => completed.includes(i.id)).length;
    const total = baseItems.length + items.length;
    return total === 0 ? 0 : ((baseDoneCount + doneCount) / total) * 100;
  }))) || 0;

  const currentTabItems = busRoutes.filter(i => i.type === routeSubTab);
  const progressTab = Math.round((currentTabItems.filter(i => completed.includes(i.id)).length / (currentTabItems.length || 1)) * 100);
  const currentBusInfo = busTypes.find(b => b.id === activeBus);

  // Filter unieke lijnen voor het rapport:
  // - Afgevinkt OF geturft (M/Z > 0) OF een opmerking aanwezig
  const reportRoutes = [];
  const seenIds = new Set();
  busRoutes.forEach(r => {
    const hasTally = (tallies[r.id]?.m > 0) || (tallies[r.id]?.z > 0);
    const hasNote = notes[r.id] && notes[r.id].trim() !== "";
    const isDone = completed.includes(r.id);

    if ((isDone || hasTally || hasNote) && !seenIds.has(r.id)) {
      reportRoutes.push(r);
      seenIds.add(r.id);
    }
  });

  return (
    <div className="main-wrapper">
      {/* Modals */}
      {pdfModal && (
        <div className="pdf-overlay">
           <div className="pdf-header"><span>{pdfModal.text || pdfModal.title}</span><button onClick={() => setPdfModal(null)}>SLUITEN</button></div>
           <iframe src={`https://docs.google.com/viewer?url=${encodeURIComponent(baseUrl + pdfModal.pdf)}&embedded=true`} className="pdf-viewer"></iframe>
        </div>
      )}

      {videoModal && (
        <div className="video-overlay" onClick={() => setVideoModal(null)}>
           <div className="video-card" onClick={e => e.stopPropagation()}>
              <div className="video-card-header"><h3>Video's</h3><button onClick={() => setVideoModal(null)}><X size={24} /></button></div>
              <div className="video-list">{videoModal.videos.map((v, i) => (<a key={i} href={v.url} target="_blank" className="video-btn"><Youtube size={20} /> {v.label}</a>))}</div>
           </div>
        </div>
      )}

      {/* HEADER */}
      <div className="header no-print">
        <div className="header-top">
          <div className="brand-box">
            <div className="logo-container"><img src="/logo.png" alt="Logo" /></div>
            <div className="brand-text"><h1>BRAVO Mentor</h1><span>HERMES</span></div>
          </div>
          <button onClick={toggleTheme} className="theme-btn">{theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}</button>
        </div>
        
        <div className="student-box">
          <div className="row">
            <select value={activeStudent} onChange={(e) => setActiveStudent(e.target.value)} className="student-select">{students.map(s => <option key={s} value={s}>{s}</option>)}</select>
            <button onClick={() => deleteStudent(activeStudent)} className="del-btn"><Trash2 size={20} /></button>
          </div>
          <div className="row">
            <input type="text" value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)} placeholder="Naam leerling..." className="student-input" /><button onClick={addStudent} className="add-btn"><Plus size={20} /></button>
          </div>
        </div>

        <div className="total-progress">
          <div className="labels"><span>VOORTGANG: {activeStudent}</span><span>{totalProgress}%</span></div>
          <div className="bar-bg"><div className="bar-fill" style={{ width: `${totalProgress}%` }}></div></div>
        </div>

        <div className="main-tabs no-scrollbar">
          {['routes', 'vehicle', 'checklist', 'docs', 'info'].map(t => (<button key={t} onClick={() => setMainTab(t)} className={mainTab === t ? 'active' : ''}>{t === 'routes' ? 'Lijnen' : t === 'vehicle' ? 'Voertuig' : t === 'checklist' ? 'Checklists' : t === 'docs' ? 'Docs' : 'Info'}</button>))}
        </div>
      </div>

      <div className="container no-print">
        {/* Lijnen Tab */}
        {mainTab === 'routes' && (
          <div className="card">
            <div className="sub-tabs no-scrollbar">
              {routeTypes.map(t => (<button key={t} onClick={() => setRouteSubTab(t)} className={routeSubTab === t ? 'active' : ''}>{t.replace('-', ' ').toUpperCase()}</button>))}
            </div>
            <div className="rayon-progress">
              <div className="labels"><span>VOORTGANG {routeSubTab.toUpperCase()}</span><span>{progressTab}%</span></div>
              <div className="bar-bg"><div className="bar-fill" style={{ width: `${progressTab}%` }}></div></div>
            </div>
            {currentTabItems.map((item) => (
              <div key={item.id} className="item-row">
                <div className="top-line">
                  <div className="check-label" onClick={() => toggleItem(item.id)}>
                    <div className={`check-box ${completed.includes(item.id) ? 'checked' : ''}`}>{completed.includes(item.id) && <CheckCircle2 size={18} />}</div>
                    <span className={completed.includes(item.id) ? 'strikethrough' : ''}>{item.text}</span>
                  </div>
                  <div className="action-btns">
                    {item.map && item.map !== '#' && <a href={item.map} target="_blank" className="act-btn"><MapPin size={20} /></a>}
                    {item.pdf && <button onClick={() => setPdfModal(item)} className="act-btn"><FileText size={20} /></button>}
                    {item.videos && item.videos.length > 0 && <button onClick={() => setVideoModal(item)} className="act-btn vid"><Youtube size={20} /></button>}
                  </div>
                </div>
                <div className="tally-row">
                  <div className="tally-box"><button onClick={() => updateTally(item.id, 'm', -1)}><Minus size={16} /></button><div className="score"><Eye size={16} /> M: {tallies[item.id]?.m || 0}</div><button onClick={() => updateTally(item.id, 'm', 1)}><Plus size={16} /></button></div>
                  <div className="tally-box green"><button onClick={() => updateTally(item.id, 'z', -1)}><Minus size={16} /></button><div className="score"><Navigation size={16} /> Z: {tallies[item.id]?.z || 0}</div><button onClick={() => updateTally(item.id, 'z', 1)}><Plus size={16} /></button></div>
                </div>
                <textarea value={notes[item.id] || ''} onChange={(e) => updateNote(item.id, e.target.value)} onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }} placeholder="Opmerking..." className="note-area" rows={1} />
              </div>
            ))}
          </div>
        )}

        {/* Voertuig Tab */}
        {mainTab === 'vehicle' && (
          <div className="card">
            <div className="cat-title"><Bus size={22} /><span>Voertuiggewenning</span></div>
            <div className="sub-tabs no-scrollbar">{busTypes.map(bus => (<button key={bus.id} onClick={() => setActiveBus(bus.id)} className={activeBus === bus.id ? 'active' : ''}>{bus.label}</button>))}</div>
            {currentBusInfo && <div className="bus-specs"><div className="spec"><span>BUSNR</span><strong>{currentBusInfo.Busnr}</strong></div><div className="divider"></div><div className="spec"><span>LENGTE</span><strong>{currentBusInfo.Lengte}</strong></div><div className="divider"></div><div className="spec"><span>WIELBASIS</span><strong>{currentBusInfo.Wielbasis}</strong></div></div>}
            {vehicleChecklist.map((section, idx) => (
              <div key={idx} className="checklist-section">
                <h3>{section.category}</h3>
                {section.items.map(item => (<div key={item.id} className="check-item" onClick={() => toggleItem(`${activeBus}_${item.id}`)}><div className={`check-box ${completed.includes(`${activeBus}_${item.id}`) ? 'checked' : ''}`}>{completed.includes(`${activeBus}_${item.id}`) && <CheckCircle2 size={16} />}</div><span>{item.text}</span></div>))}
              </div>
            ))}
          </div>
        )}

        {/* Checklist Tab */}
        {mainTab === 'checklist' && (
          <div>{initialCategories.map((cat) => cat && cat.id !== 'routes' && (
            <div key={cat.id} className="card">
              <div className="cat-title">{cat.icon}<span>{cat.title}</span></div>
              {cat.items.map((it) => (<div key={it.id} className="check-item" onClick={() => toggleItem(it.id)}><div className={`check-box ${completed.includes(it.id) ? 'checked' : ''}`}>{completed.includes(it.id) && <CheckCircle2 size={18} />}</div><span className={completed.includes(it.id) ? 'strikethrough' : ''}>{it.text}</span></div>))}
            </div>
          ))}</div>
        )}

        {/* Docs Tab */}
        {mainTab === 'docs' && (
          <div className="card">
            <div className="cat-title"><Files size={22} /><span>Documenten</span></div>
            <div className="doc-list-vertical">{importantDocuments.map((doc) => (<button key={doc.id} onClick={() => setPdfModal(doc)} className="doc-item-vertical"><FileText size={24} /> <span>{doc.title}</span></button>))}</div>
          </div>
        )}

        {/* Info Tab */}
        {mainTab === 'info' && (
          <div style={{ paddingBottom: '40px' }}>
            <div className="card ziekmelden"><div className="alert-head"><ShieldAlert size={20} /> ZIEKMELDEN</div><p>Binnen kantooruren: Bij je leidinggevende</p><p>Buiten kantooruren: Bel ROV (030-2849494)</p></div>
            <div className="card"><h3 className="group-title">Nuttige Links</h3><div className="links-list">{usefulLinks.map((link, i) => (<a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="useful-link-item"><span>{link.name}</span><ExternalLink size={18} /></a>))}</div></div>
            <div className="card rapportage"><h3>Rapportage Gegevens</h3><div className="form-group"><label>Mentor</label><input type="text" value={mentorName} onChange={(e) => { setMentorName(e.target.value); localStorage.setItem('bravo_mentor_name', e.target.value); }} /></div><div className="form-row"><div className="form-group"><label>Start</label><input type="text" value={dates.start} onChange={(e) => { const d = { ...dates, start: e.target.value }; setDates(d); localStorage.setItem(`bravo_dates_${activeStudent}`, JSON.stringify(d)); }} /></div><div className="form-group"><label>Eind</label><input type="text" value={dates.end} onChange={(e) => { const d = { ...dates, end: e.target.value }; setDates(d); localStorage.setItem(`bravo_dates_${activeStudent}`, JSON.stringify(d)); }} /></div></div></div>
            <div className="card center"><button onClick={() => window.print()} className="btn success">Rapport maken</button><button onClick={exportData} className="btn purple">Download data</button><label className="btn outline">Importeer data<input type="file" onChange={importData} style={{ display: 'none' }} /></label></div>
            {contactData.map((group, idx) => (
              <div key={idx} className="card"><h3 className="group-title">{group.category}</h3>{group.contacts.map((c, i) => (<div key={i} className="contact-row"><span className="name">{c.name}</span><div className="links">{c.phone && <a href={`tel:${c.phone}`} className="phone">{c.phone}</a>}{c.email && <a href={`mailto:${c.email}`} className="email">{c.email}</a>}</div></div>))}</div>
            ))}
          </div>
        )}
      </div>

      {/* --- RAPPORT SECTIE (ALLEEN PRINT) --- */}
      <div className="print-only">
        <div style={{ textAlign: 'center', borderBottom: '3px solid var(--bravo-purple)', paddingBottom: '20px', marginBottom: '30px' }}>
          <h1 style={{ color: 'var(--bravo-purple)', fontSize: '26px', margin: '0' }}>LEERLING RAPPORTAGE</h1>
          <h2 style={{ margin: '5px 0' }}>{activeStudent}</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '10px', fontSize: '14px' }}>
            <span><strong>Mentor:</strong> {mentorName}</span><span><strong>Periode:</strong> {dates.start} t/m {dates.end}</span><span><strong>Voortgang:</strong> {totalProgress}%</span>
          </div>
        </div>

        <h3>1. Gereden Lijnen & Resultaten</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
          <thead><tr style={{ background: '#f0f0f0' }}><th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Lijn</th><th style={{ border: '1px solid #ccc', padding: '10px' }}>Status</th><th style={{ border: '1px solid #ccc', padding: '10px' }}>M</th><th style={{ border: '1px solid #ccc', padding: '10px' }}>Z</th><th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Opmerkingen</th></tr></thead>
          <tbody>
            {reportRoutes.map(r => (
              <tr key={r.id}>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{r.text}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>{completed.includes(r.id) ? '✅' : '-'}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>{tallies[r.id]?.m || 0}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>{tallies[r.id]?.z || 0}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{notes[r.id] || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>2. Voertuigbeheersing (Afgevinkt)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          {busTypes.map(bus => {
            const checkedItems = vehicleChecklist.flatMap(s => s?.items || []).filter(i => completed.includes(`${bus.id}_${i.id}`));
            if (checkedItems.length === 0) return null;
            return (
              <div key={bus.id} style={{ border: '1px solid #ccc', padding: '12px', borderRadius: '10px' }}>
                <strong style={{ color: 'var(--bravo-purple)' }}>{bus.label}</strong><br/><span style={{ fontSize: '12px' }}>{checkedItems.length} items afgerond</span>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        :root { --bravo-purple: #542e91; --bravo-blue: #009fe3; --bravo-red: #e3004f; --bg: #f3f4f6; --card: #ffffff; --text: #1f2937; --sub: #6b7280; --border: #e5e7eb; --success: #10b981; }
        body.dark-mode { --bg: #0f172a; --card: #1e293b; --text: #f1f5f9; --sub: #94a3b8; --border: #334155; }
        body { background-color: var(--bg) !important; color: var(--text); margin: 0; font-family: -apple-system, system-ui, sans-serif; overflow-x: hidden; }
        .header { background: linear-gradient(135deg, var(--bravo-purple) 0%, var(--bravo-blue) 100%); padding: 25px 20px 20px; border-bottom-left-radius: 24px; border-bottom-right-radius: 24px; }
        .logo-container { background: white; padding: 6px; border-radius: 12px; width: 55px; height: 55px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .logo-container img { max-width: 100%; max-height: 100%; object-fit: contain; }
        .brand-box { display: flex; align-items: center; gap: 15px; }
        .header-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .brand-text h1 { color: white; margin: 0; font-size: 1.4rem; }
        .brand-text span { color: rgba(255,255,255,0.8); font-size: 0.8rem; }
        .theme-btn { background: rgba(255,255,255,0.2); border: none; color: white; padding: 10px; border-radius: 50%; cursor: pointer; }
        .student-box { background: rgba(255,255,255,0.1); padding: 12px; border-radius: 14px; margin-bottom: 15px; }
        .student-box .row { display: flex; gap: 8px; margin-bottom: 8px; }
        .student-select, .student-input { flex: 1; padding: 10px; border-radius: 8px; border: none; outline: none; font-size: 0.9rem; }
        .del-btn { background: var(--bravo-red); color: white; border: none; width: 42px; border-radius: 8px; cursor: pointer; }
        .add-btn { background: var(--success); color: white; border: none; width: 42px; border-radius: 8px; cursor: pointer; }
        .bar-bg { background: rgba(255,255,255,0.3); height: 10px; border-radius: 5px; overflow: hidden; }
        .bar-fill { height: 100%; background: white; transition: width 0.5s ease; }
        .total-progress .labels { display: flex; justify-content: space-between; color: white; font-weight: bold; font-size: 0.8rem; margin-bottom: 5px; }
        .main-tabs { display: flex; gap: 4px; background: rgba(255,255,255,0.2); padding: 4px; border-radius: 12px; overflow-x: auto; }
        .main-tabs button { flex: 1; padding: 10px; border-radius: 8px; background: transparent; color: white; border: none; font-weight: bold; font-size: 0.75rem; cursor: pointer; white-space: nowrap; }
        .main-tabs button.active { background: white; color: var(--bravo-purple); }
        .container { padding: 15px; max-width: 600px; margin: 0 auto; box-sizing: border-box; }
        .card { background: var(--card); border: 1px solid var(--border); border-radius: 18px; padding: 15px; margin-bottom: 15px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .sub-tabs { display: flex; gap: 5px; margin-bottom: 15px; overflow-x: auto; touch-action: pan-x; scrollbar-width: none; }
        .sub-tabs button { padding: 8px 15px; border-radius: 8px; border: none; background: var(--bg); color: var(--sub); font-weight: bold; font-size: 0.7rem; white-space: nowrap; cursor: pointer; }
        .sub-tabs button.active { background: white; color: var(--bravo-purple); box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        .item-row { padding: 15px 0; border-bottom: 1px solid var(--border); }
        .top-line { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; gap: 10px; }
        .check-label { display: flex; align-items: center; cursor: pointer; flex: 1; }
        .check-box { width: 26px; height: 26px; border: 2px solid var(--border); border-radius: 8px; margin-right: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: white; transition: 0.2s; }
        .check-box.checked { background: var(--success); border-color: var(--success); }
        .action-btns { display: flex; gap: 6px; flex-shrink: 0; }
        .act-btn { width: 40px; height: 40px; background: var(--bg); border: 1px solid var(--border); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--bravo-purple); cursor: pointer; }
        .act-btn.vid { background: #fee2e2; color: var(--bravo-red); border-color: #fecaca; }
        .note-area { margin-left: 38px; width: calc(100% - 38px); border: 1px solid var(--border); border-radius: 10px; padding: 10px; font-size: 0.85rem; background: var(--bg); color: var(--text); outline: none; resize: none; overflow: hidden; box-sizing: border-box; }
        .doc-list-vertical { display: flex; flex-direction: column; gap: 10px; width: 100%; }
        .doc-item-vertical { display: flex; align-items: center; gap: 15px; padding: 15px; background: var(--bg); border: 1px solid var(--border); border-radius: 12px; text-align: left; color: var(--text); cursor: pointer; width: 100%; box-sizing: border-box; }
        .useful-link-item { display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--bg); border-radius: 10px; text-decoration: none; color: var(--text); border: 1px solid var(--border); }
        .bus-specs { display: flex; justify-content: space-around; background: var(--bg); padding: 12px; border-radius: 12px; margin-bottom: 20px; border: 1px solid var(--border); }
        .spec { text-align: center; flex: 1; }
        .divider { width: 1px; background: var(--border); margin: 0 5px; }
        .ziekmelden { background: #fff1f2; border-color: #fecaca; color: var(--bravo-red); }
        .btn { width: 100%; padding: 14px; border-radius: 12px; border: none; font-weight: bold; margin-bottom: 10px; cursor: pointer; font-size: 0.9rem; }
        .btn.success { background: var(--success); color: white; }
        .btn.purple { background: var(--bravo-purple); color: white; }
        .btn.outline { background: var(--card); border: 2px solid var(--bravo-purple); color: var(--bravo-purple); text-align: center; display: block; box-sizing: border-box; }
        .contact-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; gap: 5px; flex-wrap: wrap; }
        .contact-row .links { display: flex; gap: 4px; }
        .contact-row a { padding: 6px 10px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 0.75rem; border: 1px solid; }
        .contact-row .phone { color: var(--bravo-purple); border-color: var(--bravo-purple); background: rgba(84,46,145,0.05); }
        .contact-row .email { color: var(--bravo-blue); border-color: var(--bravo-blue); background: white; }
        .tally-row { display: flex; gap: 10px; margin-left: 38px; margin-bottom: 8px; flex-wrap: wrap; }
        .tally-box { display: flex; align-items: center; border: 1px solid var(--border); border-radius: 8px; background: var(--bg); height: 34px; }
        .tally-box button { background: transparent; border: none; padding: 0 8px; color: var(--bravo-purple); cursor: pointer; }
        .tally-box .score { padding: 0 5px; font-weight: bold; font-size: 0.8rem; display: flex; align-items: center; gap: 4px; }
        .pdf-overlay { position: fixed; inset: 0; background: var(--card); z-index: 2000; display: flex; flexDirection: column; }
        .pdf-header { padding: 15px; background: var(--bravo-purple); color: white; display: flex; justify-content: space-between; align-items: center; font-weight: bold; }
        .pdf-header button { background: white; color: var(--bravo-purple); border: none; padding: 8px 15px; border-radius: 8px; font-weight: bold; cursor: pointer; }
        .pdf-viewer { flex: 1; border: none; width: 100%; height: 100%; }
        .no-scrollbar::-webkit-scrollbar { display: none; }

        .print-only { display: none; }
        @media print { 
          .no-print { display: none !important; } 
          .print-only { display: block !important; padding: 20px; color: black; background: white; } 
          body { background: white !important; }
        }
      `}</style>
    </div>
  );
}
