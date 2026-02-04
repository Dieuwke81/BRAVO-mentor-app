'use client';

import { useState, useEffect } from 'react';
import { busRoutes, initialCategories, contactData } from './data';
import { Bus, CheckCircle2, Map, ShieldAlert, Users, Radio, FileText, MapPin, Clock, Zap, Plus, Minus, Trash2, Youtube, X, Navigation, Eye, ClipboardCheck, Phone, Mail, Info, MessageSquare, Download, Upload, Printer } from 'lucide-react';

export default function Home() {
  const [students, setStudents] = useState(['Standaard']);
  const [activeStudent, setActiveStudent] = useState('Standaard');
  const [completed, setCompleted] = useState([]);
  const [tallies, setTallies] = useState({});
  const [notes, setNotes] = useState({});
  const [mounted, setMounted] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [mainTab, setMainTab] = useState('routes');
  const [routeSubTab, setRouteSubTab] = useState('ehv-stad');
  const [videoModal, setVideoModal] = useState(null);
  const [pdfModal, setPdfModal] = useState(null);

  useEffect(() => {
    const savedStudents = localStorage.getItem('bravo_student_list');
    if (savedStudents) {
      const parsed = JSON.parse(savedStudents);
      if (parsed.length > 0) {
        setStudents(parsed);
        const lastActive = localStorage.getItem('bravo_active_student');
        if (lastActive && parsed.includes(lastActive)) setActiveStudent(lastActive);
        else setActiveStudent(parsed[0]);
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const savedProgress = localStorage.getItem(`bravo_progress_${activeStudent}`);
      setCompleted(savedProgress ? JSON.parse(savedProgress) : []);
      const savedTallies = localStorage.getItem(`bravo_tallies_${activeStudent}`);
      setTallies(savedTallies ? JSON.parse(savedTallies) : {});
      const savedNotes = localStorage.getItem(`bravo_notes_${activeStudent}`);
      setNotes(savedNotes ? JSON.parse(savedNotes) : {});
      localStorage.setItem('bravo_active_student', activeStudent);
    }
  }, [activeStudent, mounted]);

  if (!mounted) return null;

  const exportData = () => {
    const data = {
      studentName: activeStudent,
      progress: localStorage.getItem(`bravo_progress_${activeStudent}`),
      tallies: localStorage.getItem(`bravo_tallies_${activeStudent}`),
      notes: localStorage.getItem(`bravo_notes_${activeStudent}`)
    };
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
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
        let currentList = JSON.parse(localStorage.getItem('bravo_student_list') || '["Standaard"]');
        if (!currentList.includes(name)) {
          currentList.push(name);
          localStorage.setItem('bravo_student_list', JSON.stringify(currentList));
        }
        if (incoming.progress) localStorage.setItem(`bravo_progress_${name}`, incoming.progress);
        if (incoming.tallies) localStorage.setItem(`bravo_tallies_${name}`, incoming.tallies);
        if (incoming.notes) localStorage.setItem(`bravo_notes_${name}`, incoming.notes);
        window.location.reload();
      } catch (err) { alert("Fout bij importeren."); }
    };
    reader.readAsText(file);
  };

  const addStudent = () => {
    if (newStudentName.trim() && !students.includes(newStudentName.trim())) {
      const newList = [...students, newStudentName.trim()];
      setStudents(newList);
      localStorage.setItem('bravo_student_list', JSON.stringify(newList));
      setActiveStudent(newStudentName.trim());
      setNewStudentName('');
    }
  };

  const deleteStudent = (name) => {
    if (students.length > 1 && confirm(`Verwijder ${name}?`)) {
      const newList = students.filter(s => s !== name);
      setStudents(newList);
      localStorage.setItem('bravo_student_list', JSON.stringify(newList));
      localStorage.removeItem(`bravo_progress_${name}`);
      localStorage.removeItem(`bravo_tallies_${name}`);
      localStorage.removeItem(`bravo_notes_${name}`);
      setActiveStudent(newList[0]);
    }
  };

  const toggleItem = (id) => {
    const newCompleted = completed.includes(id) ? completed.filter(i => i !== id) : [...completed, id];
    setCompleted(newCompleted);
    localStorage.setItem(`bravo_progress_${activeStudent}`, JSON.stringify(newCompleted));
  };

  const updateTally = (routeId, type, delta) => {
    const currentTally = tallies[routeId] || { m: 0, z: 0 };
    const newValue = Math.max(0, currentTally[type] + delta);
    const newTallies = { ...tallies, [routeId]: { ...currentTally, [type]: newValue } };
    setTallies(newTallies);
    localStorage.setItem(`bravo_tallies_${activeStudent}`, JSON.stringify(newTallies));
  };

  const updateNote = (routeId, value) => {
    const newNotes = { ...notes, [routeId]: value };
    setNotes(newNotes);
    localStorage.setItem(`bravo_notes_${activeStudent}`, JSON.stringify(newNotes));
  };

  const baseItems = initialCategories.flatMap(c => c.items);
  const baseDone = baseItems.filter(i => completed.includes(i.id)).length;
  const routeTypes = ['ehv-stad', 'ehv-streek', 'reusel-valkenswaard', 'helmond', 'scholieren'];
  
  const pathPercentages = routeTypes.map(t => {
    const typeItems = busRoutes.filter(i => i.type === t);
    const typeDone = typeItems.filter(i => completed.includes(i.id)).length;
    const totalCount = baseItems.length + typeItems.length;
    return totalCount === 0 ? 0 : ((baseDone + typeDone) / totalCount) * 100;
  });

  const totalProgress = Math.round(Math.max(...pathPercentages)) || 0;
  const currentTabItems = busRoutes.filter(i => i.type === routeSubTab);
  const currentTabDone = currentTabItems.filter(i => completed.includes(i.id)).length;
  const progressCurrentTab = Math.round((currentTabDone / (currentTabItems.length || 1)) * 100) || 0;

  return (
    <div>
      {/* PRINT VIEW (Alleen zichtbaar tijdens afdrukken) */}
      <div className="print-only" style={{ display: 'none' }}>
        <div style={{ padding: '40px', color: 'black', background: 'white' }}>
          <div style={{ borderBottom: '2px solid #6d28d9', paddingBottom: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '24px', margin: 0 }}>Opleidingsrapport BRAVO</h1>
              <p style={{ fontSize: '14px', margin: '5px 0' }}>Rayon Eindhoven - Hermes</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p><b>Leerling:</b> {activeStudent}</p>
              <p><b>Datum:</b> {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <h2 style={{ fontSize: '18px', borderBottom: '1px solid #eee' }}>1. Checklists & Vaardigheden</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '30px' }}>
            {baseItems.map(item => (
              <div key={item.id} style={{ fontSize: '12px', padding: '4px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {completed.includes(item.id) ? 'X' : ''}
                </div>
                {item.text}
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: '18px', borderBottom: '1px solid #eee' }}>2. Lijnverkenning (Lijnvoering)</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
            <thead>
              <tr style={{ background: '#f3f4f6' }}>
                <th style={{ textAlign: 'left', padding: '8px', border: '1px solid #ddd' }}>Lijn</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Status</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>M</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Z</th>
                <th style={{ textAlign: 'left', padding: '8px', border: '1px solid #ddd' }}>Opmerkingen</th>
              </tr>
            </thead>
            <tbody>
              {busRoutes.filter(r => completed.includes(r.id) || (tallies[r.id]?.m > 0 || tallies[r.id]?.z > 0) || notes[r.id]).map(r => (
                <tr key={r.id}>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{r.text}</td>
                  <td style={{ textAlign: 'center', padding: '8px', border: '1px solid #ddd' }}>{completed.includes(r.id) ? 'VOLTOOID' : '-'}</td>
                  <td style={{ textAlign: 'center', padding: '8px', border: '1px solid #ddd' }}>{tallies[r.id]?.m || 0}</td>
                  <td style={{ textAlign: 'center', padding: '8px', border: '1px solid #ddd' }}>{tallies[r.id]?.z || 0}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{notes[r.id] || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ marginTop: '40px', fontSize: '12px', fontStyle: 'italic', borderTop: '1px solid #eee', paddingTop: '10px' }}>Opgesteld door de mentor via de BRAVO Mentor App.</p>
        </div>
      </div>

      {/* PDF MODAL IPHONE FIX */}
      {pdfModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'white', zIndex: 2000, display: 'flex', flexDirection: 'column' }}>
           <div style={{ padding: '15px', background: 'var(--bravo-purple)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{pdfModal.text}</span>
              <button onClick={() => setPdfModal(null)} style={{ background: 'white', color: 'var(--bravo-purple)', border: 'none', padding: '8px 15px', borderRadius: '8px', fontWeight: 'bold' }}>SLUITEN</button>
           </div>
           <div style={{ flex: 1 }}>
              <iframe src={`https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + pdfModal.pdf)}&embedded=true`} style={{ width: '100%', height: '100%', border: 'none' }}></iframe>
           </div>
        </div>
      )}

      {/* VIDEO MODAL */}
      {videoModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
           <div style={{ background: 'white', width: '100%', maxWidth: '500px', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ margin: 0, color: 'black' }}>Video's: {videoModal.text}</h3>
                <button onClick={() => setVideoModal(null)} style={{ background: '#f3f4f6', border: 'none', padding: '5px', borderRadius: '50%' }}><X size={20} color="black" /></button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {videoModal.videos.map((vid, i) => (
                  <a key={i} href={vid.url} target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '15px', background: '#fee2e2', color: '#dc2626', textDecoration: 'none', borderRadius: '10px', fontWeight: 'bold' }}>
                    <Youtube size={20} /> {vid.label}
                  </a>
                ))}
              </div>
           </div>
        </div>
      )}

      {/* HEADER */}
      <div className="header no-print">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <div style={{ background: 'white', padding: '8px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
                <img src="/logo.png" alt="Logo" style={{ height: '35px' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem' }}>BRAVO Mentor</h1>
              <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>HERMES</span>
            </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '10px', marginBottom: '15px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
            <select value={activeStudent} onChange={(e) => setActiveStudent(e.target.value)} style={{ flex: 1, padding: '8px', borderRadius: '6px', color: 'black', fontWeight: 'bold' }}>
              {students.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button onClick={() => deleteStudent(activeStudent)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px', borderRadius: '6px' }}><Trash2 size={18} /></button>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="text" value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)} placeholder="Nieuwe leerling..." style={{ flex: 1, padding: '8px', borderRadius: '6px' }} />
            <button onClick={addStudent} style={{ background: 'var(--success)', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px' }}><Plus size={18} /></button>
          </div>
        </div>
        
        <div className="progress-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 'bold' }}>
            <span>VOORTGANG: {activeStudent}</span>
            <span>{totalProgress}%</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${totalProgress}%` }}></div></div>
        </div>

        {/* TAB NAVIGATIE */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', marginTop: '20px', padding: '4px', gap: '4px' }}>
          <button onClick={() => setMainTab('routes')} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '8px', background: mainTab === 'routes' ? 'white' : 'transparent', color: mainTab === 'routes' ? 'var(--bravo-purple)' : 'white', fontWeight: 'bold', fontSize: '0.75rem' }}>
            <Map size={18} /> Lijnen
          </button>
          <button onClick={() => setMainTab('checklist')} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '8px', background: mainTab === 'checklist' ? 'white' : 'transparent', color: mainTab === 'checklist' ? 'var(--bravo-purple)' : 'white', fontWeight: 'bold', fontSize: '0.75rem' }}>
            <ClipboardCheck size={18} /> Checklists
          </button>
          <button onClick={() => setMainTab('info')} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '8px', background: mainTab === 'info' ? 'white' : 'transparent', color: mainTab === 'info' ? 'var(--bravo-purple)' : 'white', fontWeight: 'bold', fontSize: '0.75rem' }}>
            <Phone size={18} /> Info
          </button>
        </div>
      </div>

      <div className="container no-print">
        {mainTab === 'routes' && (
          <div className="card">
            <div className="category-header"><Map size={22} /><span className="category-title">Lijnverkenning</span></div>
            
            <div style={{ display: 'flex', overflowX: 'auto', background: '#f3f4f6', padding: '4px', borderRadius: '8px', marginBottom: '10px', gap: '4px', whiteSpace: 'nowrap' }} className="no-scrollbar">
              {routeTypes.map(t => (
                <button key={t} onClick={() => setRouteSubTab(t)} style={{ padding: '8px 15px', borderRadius: '6px', border: 'none', fontSize: '0.8rem', fontWeight: 'bold', background: routeSubTab === t ? 'white' : 'transparent', color: routeSubTab === t ? 'var(--bravo-purple)' : '#6b7280' }}>
                  {t.replace('-', ' ').toUpperCase()}
                </button>
              ))}
            </div>

            <div style={{ marginBottom: '20px', padding: '0 5px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '4px', color: '#6b7280' }}>
                  <span>VOORTGANG {routeSubTab.replace('-', ' ').toUpperCase()}</span>
                  <span>{progressCurrentTab}%</span>
               </div>
               <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: 'var(--bravo-purple)', width: `${progressCurrentTab}%`, transition: 'width 0.5s ease' }}></div>
               </div>
            </div>

            <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '10px' }}>
              {currentTabItems.map((item) => (
                <div key={item.id + item.type} className="checkbox-item" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
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
                  
                  <div style={{ display: 'flex', gap: '20px', marginLeft: '39px', padding: '10px 0 5px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <button onClick={() => updateTally(item.id, 'm', -1)} style={{ border: '1px solid #bae6fd', background: 'white', borderRadius: '6px', padding: '4px' }}><Minus size={14} /></button>
                      <div style={{ background: '#f0f9ff', color: '#0369a1', padding: '4px 10px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold' }}><Eye size={14} /> M: {tallies[item.id]?.m || 0}</div>
                      <button onClick={() => updateTally(item.id, 'm', 1)} style={{ border: '1px solid #bae6fd', background: 'white', borderRadius: '6px', padding: '4px' }}><Plus size={14} /></button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <button onClick={() => updateTally(item.id, 'z', -1)} style={{ border: '1px solid #bbf7d0', background: 'white', borderRadius: '6px', padding: '4px' }}><Minus size={14} /></button>
                      <div style={{ background: '#f0fdf4', color: '#15803d', padding: '4px 10px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold' }}><Navigation size={14} /> Z: {tallies[item.id]?.z || 0}</div>
                      <button onClick={() => updateTally(item.id, 'z', 1)} style={{ border: '1px solid #bbf7d0', background: 'white', borderRadius: '6px', padding: '4px' }}><Plus size={14} /></button>
                    </div>
                  </div>

                  <div style={{ marginLeft: '39px', marginTop: '5px' }}>
                    <input 
                      type="text" 
                      value={notes[item.id] || ''} 
                      onChange={(e) => updateNote(item.id, e.target.value)}
                      placeholder="Voeg opmerking toe..."
                      style={{ border: '1px solid #e5e7eb', background: '#f9fafb', fontSize: '0.85rem', width: '100%', borderRadius: '8px', padding: '4px 10px' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {mainTab === 'checklist' && (
          <div>
            {initialCategories.map((category) => (
              <div key={category.id} className="card">
                <div className="category-header">{category.icon}<span className="category-title">{category.title}</span></div>
                {category.items.map((item) => (
                  <div key={item.id} className="checkbox-item" onClick={() => toggleItem(item.id)}>
                    <div className="checkbox-content">
                      <div style={{ width: '24px', height: '24px', borderRadius: '6px', border: completed.includes(item.id) ? 'none' : '2px solid #d1d5db', background: completed.includes(item.id) ? 'var(--success)' : 'transparent', marginRight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>{completed.includes(item.id) && <CheckCircle2 size={16} />}</div>
                      <span style={{ textDecoration: completed.includes(item.id) ? 'line-through' : 'none', color: completed.includes(item.id) ? '#9ca3af' : 'inherit', fontSize: '0.95rem' }}>{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {mainTab === 'info' && (
          <div>
            <div className="card" style={{ background: '#f8fafc', padding: '20px', border: '2px solid #e2e8f0', textAlign: 'center' }}>
               <h3 style={{ fontSize: '1rem', color: 'var(--bravo-purple)', marginBottom: '15px', fontWeight: 'bold' }}>Dossier Beheer</h3>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button onClick={() => window.print()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: '#10b981', color: 'white', padding: '12px', borderRadius: '10px', border: 'none', fontWeight: 'bold' }}>
                    <Printer size={18} /> Genereer Rapport (PDF)
                  </button>
                  <button onClick={exportData} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'var(--bravo-purple)', color: 'white', padding: '12px', borderRadius: '10px', border: 'none', fontWeight: 'bold' }}>
                    <Download size={18} /> Exporteer data
                  </button>
                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'white', color: 'var(--bravo-purple)', padding: '12px', borderRadius: '10px', border: '2px solid var(--bravo-purple)', fontWeight: 'bold', cursor: 'pointer' }}>
                    <Upload size={18} /> Importeer data
                    <input type="file" onChange={importData} style={{ display: 'none' }} accept=".json" />
                  </label>
               </div>
            </div>

            <div className="card" style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '15px', marginTop: '20px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#dc2626', fontWeight: 'bold', marginBottom: '8px' }}><ShieldAlert size={20} /> ZIEKMELDEN</div>
              <p style={{ margin: '4px 0', fontSize: '0.9rem' }}><b>Binnen kantooruren:</b> Bij je leidinggevende</p>
              <p style={{ margin: '4px 0', fontSize: '0.9rem' }}><b>Buiten kantooruren:</b> Bel ROV (030-2849494)</p>
            </div>
            {contactData.map((group, idx) => (
              <div key={idx} className="card">
                <h3 style={{ fontSize: '0.9rem', color: 'var(--bravo-purple)', borderBottom: '2px solid #f3f4f6', paddingBottom: '8px', marginBottom: '10px' }}>{group.category}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {group.contacts.map((c, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{c.name}</span>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        {c.phone && <a href={`tel:${c.phone}`} className="pdf-btn" style={{ padding: '6px 12px' }}><Phone size={14} /> {c.phone}</a>}
                        {c.email && <a href={`mailto:${c.email}`} className="pdf-btn" style={{ padding: '6px 12px' }}><Mail size={14} /> Mail</a>}
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
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white !important; }
          .container { margin: 0 !important; padding: 0 !important; width: 100% !important; max-width: 100% !important; }
        }
      `}</style>
    </div>
  );
}
