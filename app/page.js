'use client';

import { useState, useEffect } from 'react';
import { busRoutes, initialCategories, contactData } from './data';
import { Bus, CheckCircle2, Map, ShieldAlert, Users, Radio, FileText, MapPin, Clock, Zap, Plus, Minus, Trash2, Youtube, X, Navigation, Eye, ClipboardCheck, Phone, Mail, Info, MessageSquare } from 'lucide-react';

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
    const currentRouteTally = tallies[routeId] || { m: 0, z: 0 };
    const newValue = Math.max(0, currentRouteTally[type] + delta);
    const newTallies = { ...tallies, [routeId]: { ...currentRouteTally, [type]: newValue } };
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
      {/* PDF MODAL IPHONE FIX */}
      {pdfModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'white', zIndex: 2000, display: 'flex', flexDirection: 'column' }}>
           <div style={{ padding: '15px', background: 'var(--bravo-purple)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold' }}>{pdfModal.text}</span>
              <button onClick={() => setPdfModal(null)} style={{ background: 'white', color: 'var(--bravo-purple)', border: 'none', padding: '8px 15px', borderRadius: '8px', fontWeight: 'bold' }}>SLUITEN</button>
           </div>
           <div style={{ flex: 1 }}>
              <iframe 
                src={`https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + pdfModal.pdf)}&embedded=true`}
                style={{ width: '100%', height: '100%', border: 'none' }}
              ></iframe>
           </div>
           <div style={{ padding: '10px', textAlign: 'center', background: '#f3f4f6' }}>
              <a href={pdfModal.pdf} target="_blank" style={{ fontSize: '0.8rem', color: 'var(--bravo-purple)', fontWeight: 'bold' }}>Laden mislukt? Open extern</a>
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
      <div className="header">
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
            <select value={activeStudent} onChange={(e) => setActiveStudent(e.target.value)} style={{ flex: 1, padding: '8px', borderRadius: '6px', color: 'black' }}>
              {students.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button onClick={() => deleteStudent(activeStudent)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px', borderRadius: '6px' }}><Trash2 size={18} /></button>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="text" value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)} placeholder="Naam leerling..." style={{ flex: 1, padding: '8px', borderRadius: '6px' }} />
            <button onClick={addStudent} style={{ background: 'var(--success)', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px' }}><Plus size={18} /></button>
          </div>
        </div>
        
        <div className="progress-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 'bold' }}>
            <span>TOTALE VOORTGANG</span>
            <span>{totalProgress}%</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${totalProgress}%` }}></div></div>
        </div>

        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', marginTop: '20px', padding: '4px', gap: '4px' }}>
          <button onClick={() => setMainTab('routes')} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '8px', background: mainTab === 'routes' ? 'white' : 'transparent', color: mainTab === 'routes' ? 'var(--bravo-purple)' : 'white', fontSize: '0.75rem' }}>
            <Map size={18} /> Lijnen
          </button>
          <button onClick={() => setMainTab('checklist')} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '8px', background: mainTab === 'checklist' ? 'white' : 'transparent', color: mainTab === 'checklist' ? 'var(--bravo-purple)' : 'white', fontSize: '0.75rem' }}>
            <ClipboardCheck size={18} /> Checklists
          </button>
          <button onClick={() => setMainTab('info')} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '8px', background: mainTab === 'info' ? 'white' : 'transparent', color: mainTab === 'info' ? 'var(--bravo-purple)' : 'white', fontSize: '0.75rem' }}>
            <Phone size={18} /> Info
          </button>
        </div>
      </div>

      <div className="container">
        {mainTab === 'routes' && (
          <div className="card">
            <div className="category-header"><Map size={22} /><span className="category-title">Lijnverkenning</span></div>
            <div style={{ display: 'flex', overflowX: 'auto', background: '#f3f4f6', padding: '4px', borderRadius: '8px', marginBottom: '10px', gap: '4px', whiteSpace: 'nowrap' }} className="no-scrollbar">
              {routeTypes.map(t => (
                <button key={t} onClick={() => setRouteSubTab(t)} style={{ padding: '8px 15px', borderRadius: '6px', border: 'none', fontWeight: 'bold', background: routeSubTab === t ? 'white' : 'transparent', color: routeSubTab === t ? 'var(--bravo-purple)' : '#6b7280' }}>
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
            {contactData.map((group, idx) => (
              <div key={idx} className="card">
                <h3 style={{ fontSize: '0.9rem', color: 'var(--bravo-purple)', borderBottom: '2px solid #f3f4f6', paddingBottom: '8px', marginBottom: '10px' }}>{group.category}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {group.contacts.map((c, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.9rem' }}>{c.name}</span>
                      {c.phone && <a href={`tel:${c.phone}`} className="pdf-btn" style={{ padding: '6px 12px' }}><Phone size={14} /> {c.phone}</a>}
                      {c.email && <a href={`mailto:${c.email}`} className="pdf-btn" style={{ padding: '6px 12px' }}><Mail size={14} /> Mail</a>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
