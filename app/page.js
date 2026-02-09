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

  return (
    <div className="main-wrapper">
      {/* Modals */}
      {pdfModal && (
        <div className="pdf-modal-overlay">
           <div className="pdf-modal-header">
              <span style={{ fontWeight: 'bold' }}>{pdfModal.text || pdfModal.title}</span>
              <button onClick={() => setPdfModal(null)} className="pdf-close-btn">SLUITEN</button>
           </div>
           <div style={{ flex: 1 }}><iframe src={`https://docs.google.com/viewer?url=${encodeURIComponent(baseUrl + pdfModal.pdf)}&embedded=true`} style={{ width: '100%', height: '100%', border: 'none' }}></iframe></div>
        </div>
      )}

      {videoModal && (
        <div className="video-modal-overlay">
           <div className="video-modal-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}><h3 style={{ color: 'var(--text-main)' }}>Video's</h3><button onClick={() => setVideoModal(null)} className="modal-close-icon"><X size={20} /></button></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>{videoModal.videos.map((v, i) => (<a key={i} href={v.url} target="_blank" className="video-link-item"><Youtube size={20} /> {v.label}</a>))}</div>
           </div>
        </div>
      )}

      {/* Header Section */}
      <div className="header no-print">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div className="logo-box"><img src="/logo.png" alt="Logo" style={{ height: '35px' }} /></div>
            <div><h1 style={{ fontSize: '1.5rem', color: 'white', margin: 0 }}>BRAVO Mentor</h1><span style={{ fontSize: '0.8rem', opacity: 0.9, color: 'white' }}>HERMES</span></div>
          </div>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
          </button>
        </div>
        
        <div className="student-selector-box">
          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
            <select value={activeStudent} onChange={(e) => setActiveStudent(e.target.value)} className="main-select">{students.map(s => <option key={s} value={s}>{s}</option>)}</select>
            <button onClick={() => deleteStudent(activeStudent)} className="delete-btn"><Trash2 size={18} /></button>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="text" value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)} placeholder="Naam leerling..." className="student-input" /><button onClick={addStudent} className="add-btn"><Plus size={18} /></button>
          </div>
        </div>

        <div className="progress-container">
          <div className="progress-text-row">
            <span>VOORTGANG: {activeStudent}</span><span>{totalProgress}%</span>
          </div>
          <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: `${totalProgress}%` }}></div></div>
        </div>

        <div className="tab-navigation no-scrollbar">
          {['routes', 'vehicle', 'checklist', 'docs', 'info'].map((tab) => (
            <button key={tab} onClick={() => setMainTab(tab)} className={`tab-btn ${mainTab === tab ? 'active' : ''}`}>
              {tab === 'routes' ? 'Lijnen' : tab === 'vehicle' ? 'Voertuig' : tab === 'checklist' ? 'Checklists' : tab === 'docs' ? 'Docs' : 'Info'}
            </button>
          ))}
        </div>
      </div>

      <div className="container no-print">
        {/* Lijnen Tab */}
        {mainTab === 'routes' && (
          <div className="card">
            <div className="subtab-navigation no-scrollbar">
              {routeTypes.map(t => (<button key={t} onClick={() => setRouteSubTab(t)} className={`subtab-btn ${routeSubTab === t ? 'active' : ''}`}>{t.replace('-', ' ').toUpperCase()}</button>))}
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <div className="rayon-progress-text">
                <span>VOORTGANG {routeSubTab.replace('-', ' ').toUpperCase()}</span>
                <span>{progressTab}%</span>
              </div>
              <div className="rayon-progress-bar-bg">
                <div className="rayon-progress-bar-fill" style={{ width: `${progressTab}%` }}></div>
              </div>
            </div>

            {currentTabItems.map((item) => (
              <div key={item.id} className="checkbox-item-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="checkbox-content" onClick={() => toggleItem(item.id)} style={{ flex: 1 }}>
                    <div className="checkbox-box" style={{ background: completed.includes(item.id) ? 'var(--success)' : 'transparent', borderColor: completed.includes(item.id) ? 'transparent' : 'var(--border-color)' }}>
                      {completed.includes(item.id) && <CheckCircle2 size={16} />}
                    </div>
                    <span className={`line-text ${completed.includes(item.id) ? 'completed' : ''}`}>{item.text}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {item.map && item.map !== '#' && <a href={item.map} target="_blank" className="line-action-btn"><MapPin size={20} /></a>}
                    {item.pdf && <button onClick={() => setPdfModal(item)} className="line-action-btn"><FileText size={20} /></button>}
                    {item.videos && item.videos.length > 0 && <button onClick={() => setVideoModal(item)} className="line-action-btn video-btn-style"><Youtube size={20} /></button>}
                  </div>
                </div>
                
                <div className="tally-container">
                  <div className="tally-group">
                    <button onClick={() => updateTally(item.id, 'm', -1)} className="tally-ctrl-btn"><Minus size={14} /></button>
                    <div className="tally-display"><Eye size={14} /> M: {tallies[item.id]?.m || 0}</div>
                    <button onClick={() => updateTally(item.id, 'm', 1)} className="tally-ctrl-btn"><Plus size={14} /></button>
                  </div>
                  <div className="tally-group">
                    <button onClick={() => updateTally(item.id, 'z', -1)} className="tally-ctrl-btn"><Minus size={14} /></button>
                    <div className="tally-display z-style"><Navigation size={14} /> Z: {tallies[item.id]?.z || 0}</div>
                    <button onClick={() => updateTally(item.id, 'z', 1)} className="tally-ctrl-btn"><Plus size={14} /></button>
                  </div>
                </div>
                
                <div style={{ marginLeft: '39px' }}>
                  <textarea 
                    value={notes[item.id] || ''} 
                    onChange={(e) => updateNote(item.id, e.target.value)} 
                    onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
                    placeholder="Opmerking..." 
                    rows={1} 
                    className="note-textarea"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Voertuig Tab */}
        {mainTab === 'vehicle' && (
          <div className="card">
            <div className="category-header"><Bus size={22} /><span className="category-title">Voertuiggewenning</span></div>
            <div className="subtab-navigation no-scrollbar">
              {busTypes.map(bus => (<button key={bus.id} onClick={() => setActiveBus(bus.id)} className={`subtab-btn ${activeBus === bus.id ? 'active' : ''}`}>{bus.label}</button>))}
            </div>

            {currentBusInfo && (
              <div className="bus-spec-card">
                <div className="spec-item">
                  <span className="spec-label">BUSNR</span>
                  <span className="spec-value">{currentBusInfo.Busnr || '-'}</span>
                </div>
                <div className="spec-divider"></div>
                <div className="spec-item">
                  <span className="spec-label">LENGTE</span>
                  <span className="spec-value">{currentBusInfo.Lengte || '-'}</span>
                </div>
                <div className="spec-divider"></div>
                <div className="spec-item">
                  <span className="spec-label">WIELBASIS</span>
                  <span className="spec-value">{currentBusInfo.Wielbasis || '-'}</span>
                </div>
              </div>
            )}

            {vehicleChecklist.map((section, idx) => section && (
              <div key={idx} style={{ marginBottom: '20px' }}>
                <h3 className="section-title">{section.category}</h3>
                {section.items.map(item => (
                  <div key={item.id} className="checkbox-item-container" onClick={() => toggleItem(`${activeBus}_${item.id}`)}>
                    <div className="checkbox-content">
                      <div className="checkbox-box" style={{ background: completed.includes(`${activeBus}_${item.id}`) ? 'var(--success)' : 'transparent', borderColor: completed.includes(`${activeBus}_${item.id}`) ? 'transparent' : 'var(--border-color)' }}>
                        {completed.includes(`${activeBus}_${item.id}`) && <CheckCircle2 size={14} />}
                      </div>
                      <span className="checklist-text">{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Info Tab met Contacten */}
        {mainTab === 'info' && (
          <div style={{ paddingBottom: '40px' }}>
            <div className="card danger-card">
               <div style={{ display: 'flex', gap: '10px', color: 'var(--bravo-red)', fontWeight: 'bold' }}><ShieldAlert size={20} /> ZIEKMELDEN</div>
               <p style={{ margin: '4px 0', fontSize: '0.9rem' }}>Binnen kantooruren: Bij je leidinggevende</p>
               <p style={{ margin: '4px 0', fontSize: '0.9rem' }}>Buiten kantooruren: Bel ROV (030-2849494)</p>
            </div>

            <div className="card">
               <h3 className="section-title">Rapportage Gegevens</h3>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div><label className="input-label">Mentor</label><input type="text" value={mentorName} onChange={(e) => { setMentorName(e.target.value); localStorage.setItem('bravo_mentor_name', e.target.value); }} className="form-input" /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                     <div><label className="input-label">Start</label><input type="text" value={dates.start} onChange={(e) => { const d = { ...dates, start: e.target.value }; setDates(d); localStorage.setItem(`bravo_dates_${activeStudent}`, JSON.stringify(d)); }} className="form-input" /></div>
                     <div><label className="input-label">Eind</label><input type="text" value={dates.end} onChange={(e) => { const d = { ...dates, end: e.target.value }; setDates(d); localStorage.setItem(`bravo_dates_${activeStudent}`, JSON.stringify(d)); }} className="form-input" /></div>
                  </div>
               </div>
            </div>

            <div className="card">
               <button onClick={() => window.print()} className="action-btn-full success-btn-bg">Rapport maken</button>
               <button onClick={exportData} className="action-btn-full purple-btn-bg">Download data</button>
               <label className="action-btn-full outline-btn-style">Importeer data<input type="file" onChange={importData} style={{ display: 'none' }} /></label>
            </div>

            {contactData.map((group, idx) => (
              <div key={idx} className="card">
                <h3 className="brand-group-title">{group.category}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {group.contacts.map((c, i) => (
                    <div key={i} className="contact-row-layout">
                      <span className="contact-name-label">{c.name}</span>
                      <div className="contact-btn-group">
                        {c.phone && <a href={`tel:${c.phone}`} className="contact-action-btn phone-btn-style">{c.phone}</a>}
                        {c.email && <a href={`mailto:${c.email}`} className="contact-action-btn email-btn-style">{c.email}</a>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx global>{`
        :root { 
          --bravo-purple: #542e91; --bravo-blue: #009fe3; --bravo-red: #e3004f;
          --bg-color: #f3f4f6; --card-bg: #ffffff; --text-main: #1f2937; 
          --text-sub: #6b7280; --border-color: #e5e7eb; --bg-secondary: #f9fafb; --success: #10b981; 
        }
        body.dark-mode { --bg-color: #0f172a; --card-bg: #1e293b; --text-main: #f1f5f9; --text-sub: #94a3b8; --border-color: #334155; --bg-secondary: #0f172a; }
        body { background-color: var(--bg-color) !important; color: var(--text-main); margin: 0; font-family: -apple-system, system-ui, sans-serif; }
        
        .header { background: linear-gradient(135deg, var(--bravo-purple) 0%, var(--bravo-blue) 100%); padding: 25px 20px 20px; border-bottom-left-radius: 24px; border-bottom-right-radius: 24px; }
        .container { padding: 15px; max-width: 600px; margin: 0 auto; }
        .card { background: var(--card-bg); border: 1px solid var(--border-color); color: var(--text-main); margin-bottom: 15px; padding: 15px; border-radius: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        .danger-card { background: #fff1f2; border-color: #fecaca; color: var(--bravo-red); }

        /* CHECKBOX EN TEKST FIX */
        .checkbox-content { display: flex; align-items: center; cursor: pointer; }
        .checkbox-box { width: 24px; height: 24px; flex-shrink: 0; border-radius: 6px; border: 2px solid var(--border-color); margin-right: 15px; display: flex; align-items: center; justify-content: center; color: white; transition: all 0.2s; }
        .checkbox-item-container { padding: 12px 0; border-bottom: 1px solid var(--border-color); }
        .line-text { font-size: 1rem; font-weight: 500; color: var(--text-main); }
        .line-text.completed { text-decoration: line-through; color: var(--text-sub); }

        /* DE BELANGRIJKE FIX VOOR DE KNOOPJES */
        .line-action-btn { 
          width: 38px; height: 38px; flex-shrink: 0; 
          display: flex; align-items: center; justify-content: center; 
          background: var(--bg-secondary); border: 1px solid var(--border-color); 
          border-radius: 8px; color: var(--bravo-purple); cursor: pointer; 
        }
        .video-btn-style { background: #fee2e2; color: var(--bravo-red); border-color: #fecaca; }

        /* OPGEKNAPT TEXTAREA VAK */
        .note-textarea { 
          border: 1px solid var(--border-color); background: var(--bg-secondary); 
          font-size: 0.85rem; width: 100%; border-radius: 8px; padding: 8px 12px; 
          outline: none; color: var(--text-main); margin-top: 8px; 
          resize: none; overflow: hidden; min-height: 38px;
        }

        /* VOORTGANG BALKEN */
        .progress-container { margin-top: 15px; }
        .progress-text-row { display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: bold; color: white; margin-bottom: 4px; }
        .progress-bar-bg { height: 8px; background: rgba(255,255,255,0.3); border-radius: 4px; overflow: hidden; }
        .progress-bar-fill { height: 100%; background: white; transition: width 0.5s ease; }

        .rayon-progress-text { display: flex; justify-content: space-between; font-size: 0.7rem; font-weight: bold; color: var(--text-sub); margin-bottom: 5px; }
        .rayon-progress-bar-bg { height: 6px; background: var(--border-color); border-radius: 3px; overflow: hidden; }
        .rayon-progress-bar-fill { height: 100%; background: var(--bravo-purple); transition: width 0.3s; }

        /* TABS */
        .tab-navigation { display: flex; gap: 4px; overflow-X: auto; background: rgba(255,255,255,0.2); border-radius: 12px; padding: 4px; margin-top: 20px; }
        .tab-btn { flex: 1; padding: 10px; border-radius: 8px; background: transparent; color: white; font-weight: bold; border: none; font-size: 0.75rem; white-space: nowrap; cursor: pointer; }
        .tab-btn.active { background: white; color: var(--bravo-purple); }

        .subtab-navigation { display: flex; gap: 4px; overflow-X: auto; background: var(--bg-secondary); padding: 4px; border-radius: 8px; margin-bottom: 15px; }
        .subtab-btn { padding: 8px 15px; border-radius: 6px; border: none; font-size: 0.75rem; font-weight: bold; background: transparent; color: var(--text-sub); white-space: nowrap; cursor: pointer; }
        .subtab-btn.active { background: var(--card-bg); color: var(--bravo-purple); box-shadow: 0 2px 4px rgba(0,0,0,0.05); }

        /* BUS SPECIFICATIES */
        .bus-spec-card { background: var(--bg-secondary); padding: 12px; border-radius: 10px; margin-bottom: 20px; border: 1px solid var(--border-color); display: flex; justify-content: space-around; text-align: center; }
        .spec-item { flex: 1; }
        .spec-label { font-size: 0.65rem; color: var(--text-sub); font-weight: bold; display: block; margin-bottom: 4px; }
        .spec-value { font-size: 0.95rem; color: var(--text-main); font-weight: 800; }
        .spec-divider { width: 1px; background: var(--border-color); margin: 0 5px; }

        /* CONTACTEN */
        .brand-group-title { font-size: 0.85rem; color: var(--bravo-purple); text-transform: uppercase; font-weight: bold; margin-bottom: 15px; }
        .contact-row-layout { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 5px; }
        .contact-name-label { font-size: 0.85rem; font-weight: 600; }
        .contact-action-btn { padding: 6px 12px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 0.8rem; border: 1px solid transparent; }
        .phone-btn-style { background: rgba(84, 46, 145, 0.1); color: var(--bravo-purple); border-color: var(--bravo-purple); }
        .email-btn-style { background: white; color: var(--bravo-blue); border-color: var(--bravo-blue); }

        /* FORMULIER */
        .form-input { width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); color: var(--text-main); background: var(--card-bg); outline: none; }
        .input-label { font-size: 0.8rem; color: var(--text-sub); display: block; margin-bottom: 4px; }
        .action-btn-full { display: block; width: 100%; padding: 12px; border-radius: 10px; border: none; font-weight: bold; margin-bottom: 10px; cursor: pointer; }
        .success-btn-bg { background: var(--success); color: white; }
        .purple-btn-bg { background: var(--bravo-purple); color: white; }
        .outline-btn-style { background: var(--card-bg); color: var(--bravo-purple); border: 2px solid var(--bravo-purple); text-align: center; }

        /* TALLY CONTROLS */
        .tally-container { display: flex; gap: 15px; marginLeft: 39px; padding: 10px 0; }
        .tally-group { display: flex; align-items: center; gap: 4px; }
        .tally-ctrl-btn { border: 1px solid var(--border-color); background: var(--card-bg); color: var(--bravo-purple); border-radius: 6px; padding: 4px; cursor: pointer; }
        .tally-display { display: flex; align-items: center; gap: 6px; background: var(--bg-secondary); color: var(--text-main); padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; font-weight: bold; border: 1px solid var(--border-color); }
        .tally-display.z-style { background: #f0fdf4; color: #15803d; border-color: #bbf7d0; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        @media print { .no-print { display: none !important; } }
      `}</style>
    </div>
  );
}
