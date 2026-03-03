'use client';

import { useState, useEffect, useRef } from 'react';
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
  const [reportNote, setReportNote] = useState('');
  const [mounted, setMounted] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');
  const [mainTab, setMainTab] = useState('routes');
  const [routeSubTab, setRouteSubTab] = useState('ehv-stad');
  const [activeBus, setActiveBus] = useState('iveco');
  const [videoModal, setVideoModal] = useState(null);
  const [pdfModal, setPdfModal] = useState(null);
  const [newStudentName, setNewStudentName] = useState('');
  const [theme, setTheme] = useState('light');

  const textareaRefs = useRef({});
  const reportNoteRef = useRef(null);

  const cleanTitle = (str) => str.replace(/^\d+\.\s*/, '');

  const safeParse = (key, fallback) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) { return fallback; }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') { 
      setBaseUrl(window.location.origin); 
      const savedTheme = localStorage.getItem('bravo_theme') || 'light';
      setTheme(savedTheme);
      document.body.className = savedTheme === 'dark' ? 'dark-mode' : '';
    }
    const savedMentor = localStorage.getItem('bravo_mentor_name');
    if (savedMentor) setMentorName(savedMentor);
    const savedStudents = safeParse('bravo_student_list', ['Standaard']);
    setStudents(savedStudents);
    const lastActive = localStorage.getItem('bravo_active_student');
    if (lastActive && savedStudents.includes(lastActive)) setActiveStudent(lastActive);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.body.className = theme === 'dark' ? 'dark-mode' : '';
      localStorage.setItem('bravo_theme', theme);
    }
  }, [theme, mounted]);

  useEffect(() => {
    if (mounted && activeStudent) {
      setCompleted(safeParse(`bravo_progress_${activeStudent}`, []));
      setTallies(safeParse(`bravo_tallies_${activeStudent}`, {}));
      setNotes(safeParse(`bravo_notes_${activeStudent}`, {}));
      setDates(safeParse(`bravo_dates_${activeStudent}`, { start: '', end: '' }));
      setReportNote(localStorage.getItem(`bravo_report_note_${activeStudent}`) || '');
      localStorage.setItem('bravo_active_student', activeStudent);
    }
  }, [activeStudent, mounted]);

  useEffect(() => {
    Object.keys(textareaRefs.current).forEach(id => {
      const el = textareaRefs.current[id];
      if (el) {
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
      }
    });
    if (reportNoteRef.current) {
      reportNoteRef.current.style.height = 'auto';
      reportNoteRef.current.style.height = reportNoteRef.current.scrollHeight + 'px';
    }
  }, [notes, reportNote, mainTab, routeSubTab]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  if (!mounted) return null;

  const exportData = () => {
    const data = { studentName: activeStudent, progress: JSON.stringify(completed), tallies: JSON.stringify(tallies), notes: JSON.stringify(notes), dates: JSON.stringify(dates), reportNote: reportNote };
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
        let list = safeParse('bravo_student_list', ['Standaard']);
        if (!list.includes(name)) { list.push(name); localStorage.setItem('bravo_student_list', JSON.stringify(list)); }
        const ensureString = (val) => typeof val === 'string' ? val : JSON.stringify(val);
        localStorage.setItem(`bravo_progress_${name}`, ensureString(incoming.progress));
        localStorage.setItem(`bravo_tallies_${name}`, ensureString(incoming.tallies));
        localStorage.setItem(`bravo_notes_${name}`, ensureString(incoming.notes));
        if (incoming.dates) localStorage.setItem(`bravo_dates_${name}`, ensureString(incoming.dates));
        if (incoming.reportNote) localStorage.setItem(`bravo_report_note_${name}`, incoming.reportNote);
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

  const routeTypes = ['ehv-stad', 'ehv-streek', 'reusel-valkenswaard', 'helmond', 'scholieren'];
  const totalProgress = Math.round(Math.max(...routeTypes.map(t => {
    const items = busRoutes.filter(i => i.type === t);
    const doneCount = items.filter(i => completed.includes(i.id)).length;
    const baseItemsArr = initialCategories.flatMap(c => c.items);
    const baseDoneCount = baseItemsArr.filter(i => completed.includes(i.id)).length;
    const total = baseItemsArr.length + items.length;
    return total === 0 ? 0 : ((baseDoneCount + doneCount) / total) * 100;
  }))) || 0;

  const currentTabItems = busRoutes.filter(i => i.type === routeSubTab);
  const progressTab = Math.round((currentTabItems.filter(i => completed.includes(i.id)).length / (currentTabItems.length || 1)) * 100);
  const currentBusInfo = busTypes.find(b => b.id === activeBus);

  const reportRoutes = [];
  const seenIds = new Set();
  busRoutes.forEach(r => {
    const hasTally = (tallies[r.id]?.m > 0) || (tallies[r.id]?.z > 0);
    const hasNote = notes[r.id] && notes[r.id].trim() !== "";
    if ((completed.includes(r.id) || hasTally || hasNote) && !seenIds.has(r.id)) {
      reportRoutes.push(r);
      seenIds.add(r.id);
    }
  });

  const reportChecklists = initialCategories
    .filter(cat => cat.id !== 'routes')
    .map(cat => ({
      ...cat,
      checkedItems: cat.items.filter(item => completed.includes(item.id))
    }))
    .filter(cat => cat.checkedItems.length > 0);

  return (
    <div className="main-wrapper">
      {/* PDF Modal */}
      {pdfModal && (
        <div className="pdf-overlay">
           <div className="pdf-header"><span>{pdfModal.text || pdfModal.title}</span><button onClick={() => setPdfModal(null)}>SLUITEN</button></div>
           <div className="pdf-body">
              <iframe src={`https://docs.google.com/viewer?url=${encodeURIComponent(baseUrl + pdfModal.pdf)}&embedded=true`} className="pdf-viewer"></iframe>
           </div>
        </div>
      )}

      {/* Video Modal */}
      {videoModal && (
        <div className="video-overlay" onClick={() => setVideoModal(null)}>
           <div className="video-card" onClick={e => e.stopPropagation()}>
              <div className="video-card-header">
                <h3>Video's</h3>
                <button className="video-close-icon" onClick={() => setVideoModal(null)}><X size={24} /></button>
              </div>
              <div className="video-list">
                {videoModal.videos.map((v, i) => (
                  <a key={i} href={v.url} target="_blank" className="video-btn-link">
                    <Youtube size={20} /> <span>{v.label}</span>
                  </a>
                ))}
              </div>
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
          {['routes', 'vehicle', 'checklist', 'docs', 'info'].map(t => (
            <button key={t} onClick={() => setMainTab(t)} className={mainTab === t ? 'active' : ''}>
              {t === 'routes' ? 'Lijnen' : t === 'vehicle' ? 'Voertuig' : t === 'checklist' ? 'Checklists' : t === 'docs' ? 'Docs & Links' : 'Info'}
            </button>
          ))}
        </div>
      </div>

      <div className="container no-print">
        {/* Lijnen Tab */}
        {mainTab === 'routes' && (
          <div className="card">
            <div className="sub-tabs no-scrollbar">
              {routeTypes.map(t => (<button key={t} onClick={() => setRouteSubTab(t)} className={routeSubTab === t ? 'active' : ''}>{t.replace('-', ' ').toUpperCase()}</button>))}
            </div>
            {/* ... PDF knoppen rayons ... */}
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
                <textarea ref={el => textareaRefs.current[item.id] = el} value={notes[item.id] || ''} onChange={(e) => updateNote(item.id, e.target.value)} placeholder="Opmerking..." className="note-area" rows={1} />
              </div>
            ))}
          </div>
        )}

        {/* Voertuig Tab */}
        {mainTab === 'vehicle' && (
          <div className="card">
            <div className="cat-title"><Bus size={22} /><span>Voertuiggewenning</span></div>
            <div className="sub-tabs no-scrollbar">{busTypes.map(bus => (<button key={bus.id} onClick={() => setActiveBus(bus.id)} className={activeBus === bus.id ? 'active' : ''}>{bus.label}</button>))}</div>
            {currentBusInfo && (
              <div className="bus-specs">
                <div className="spec full-width"><span>TYPE</span><strong>{currentBusInfo.type}</strong></div>
                <div className="divider-h"></div>
                <div className="row-specs">
                  <div className="spec"><span>BUSNR</span><strong>{currentBusInfo.Busnr}</strong></div>
                  <div className="divider"></div>
                  <div className="spec"><span>LENGTE</span><strong>{currentBusInfo.Lengte}</strong></div>
                  <div className="divider"></div>
                  <div className="spec"><span>WIELBASIS</span><strong>{currentBusInfo.Wielbasis}</strong></div>
                </div>
              </div>
            )}
            {/* ... Handleiding knoppen ... */}
            {vehicleChecklist.map((section, idx) => (
              <div key={idx} className="checklist-section">
                <h3>{cleanTitle(section.category)}</h3>
                {section.items.map(item => (
                  <div key={item.id} className="check-item" onClick={() => toggleItem(`${activeBus}_${item.id}`)}>
                    <div className={`check-box ${completed.includes(`${activeBus}_${item.id}`) ? 'checked' : ''}`}>{completed.includes(`${activeBus}_${item.id}`) && <CheckCircle2 size={16} />}</div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Checklist Tab */}
        {mainTab === 'checklist' && (
          <div>{initialCategories.map((cat) => cat && cat.id !== 'routes' && (
            <div key={cat.id} className="card">
              <div className="cat-title">{cat.icon}<span>{cleanTitle(cat.title)}</span></div>
              {cat.items.map((it) => (
                <div key={it.id} className="check-item" onClick={() => toggleItem(it.id)}>
                  <div className={`check-box ${completed.includes(it.id) ? 'checked' : ''}`}>{completed.includes(it.id) && <CheckCircle2 size={18} />}</div>
                  <span className={completed.includes(it.id) ? 'strikethrough' : ''}>{it.text}</span>
                </div>
              ))}
            </div>
          ))}</div>
        )}

        {/* Docs & Links Tab (HIER GEWIJZIGD) */}
        {mainTab === 'docs' && (
          <div>
            <div className="card">
              <div className="cat-title"><Files size={22} /><span>Documenten</span></div>
              <div className="docs-info-box">
                <Info size={18} />
                <p>Soms duurt het openen van het bestand even.<br/>Het kan soms helpen om het bestand opnieuw te openen.</p>
              </div>
              <div className="doc-list-vertical">
                {importantDocuments.map((doc) => (
                  <button key={doc.id} onClick={() => setPdfModal(doc)} className="doc-item-vertical">
                    <FileText size={24} /> <span>{doc.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="cat-title"><ExternalLink size={22} /><span>Nuttige Links</span></div>
              <div className="links-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {usefulLinks.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="useful-link-item">
                    <span>{link.name}</span><ExternalLink size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Info Tab (HIER LINKS VERWIJDERD) */}
        {mainTab === 'info' && (
          <div style={{ paddingBottom: '40px' }}>
            <div className="card ziekmelden">
              <div className="alert-head" style={{ fontWeight: 'bold', marginBottom: '10px' }}><ShieldAlert size={20} /> ZIEKMELDEN</div>
              <p>Binnen kantooruren: Bij je leidinggevende</p>
              <p>Buiten kantooruren: Bel ROV (030-2849494)</p>
            </div>
            
            <div className="card rapportage">
               <h3>Rapportage Gegevens</h3>
               <div className="form-group"><label>Mentor</label><input type="text" value={mentorName} onChange={(e) => { setMentorName(e.target.value); localStorage.setItem('bravo_mentor_name', e.target.value); }} /></div>
               <div className="form-row"><div className="form-group"><label>Start</label><input type="text" value={dates.start} onChange={(e) => { const d = { ...dates, start: e.target.value }; setDates(d); localStorage.setItem(`bravo_dates_${activeStudent}`, JSON.stringify(d)); }} /></div><div className="form-group"><label>Eind</label><input type="text" value={dates.end} onChange={(e) => { const d = { ...dates, end: e.target.value }; setDates(d); localStorage.setItem(`bravo_dates_${activeStudent}`, JSON.stringify(d)); }} /></div></div>
               <div className="form-group" style={{ marginTop: '10px' }}><label>Algemene Opmerking Rapport</label><textarea ref={reportNoteRef} value={reportNote} onChange={(e) => { setReportNote(e.target.value); localStorage.setItem(`bravo_report_note_${activeStudent}`, e.target.value); }} placeholder="Typ hier een toelichting voor het rapport..." className="note-area" style={{ marginLeft: 0, width: '100%' }} rows={2} /></div>
            </div>

            <div className="card center" style={{ textAlign: 'center' }}>
              <button onClick={() => window.print()} className="btn success">Rapport maken</button>
              <button onClick={exportData} className="btn purple">Download data</button>
              <label className="btn outline">Importeer data<input type="file" onChange={importData} style={{ display: 'none' }} /></label>
            </div>

            {contactData.map((group, idx) => (
              <div key={idx} className="card"><h3 className="group-title">{group.category}</h3>{group.contacts.map((c, i) => (<div key={i} className="contact-row"><span className="name">{c.name}</span><div className="links">{c.phone && <a href={`tel:${c.phone}`} className="phone">{c.phone}</a>}{c.email && <a href={`mailto:${c.email}`} className="email">{c.email}</a>}</div></div>))}</div>
            ))}
          </div>
        )}
      </div>

      {/* RAPPORT (PRINT) */}
      {/* ... (ongewijzigd) ... */}

      <style jsx global>{`
        /* ... (je bestaande CSS) ... */
      `}</style>
    </div>
  );
}
