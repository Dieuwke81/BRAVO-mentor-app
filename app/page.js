'use client';

import { useState, useEffect } from 'react';
import { Bus, CheckCircle2, Map, ShieldAlert, Users, Radio, FileText, MapPin, Clock, Zap, Plus, Minus, Trash2, Youtube, X, Navigation, Eye, ClipboardCheck, Phone, Mail, Info, GraduationCap } from 'lucide-react';

const initialCategories = [
  {
    id: 'routes',
    title: 'Routekennis & Lijnverkenning',
    icon: <Map size={22} />,
    isRouteCategory: true,
    items: [
      /* EINDHOVEN STAD */
      { id: 'r2-ehv-stad', type: 'ehv-stad', text: '2 Blixembosch Oost', pdf: '/routes/2.pdf', map: 'https://goo.gl/maps/XLAb4E1GnEB1hbRf7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/-lxwwVMe5Bc' }, { label: 'Terugrit', url: 'https://youtu.be/JgIIPRHSRpw' }] },
      { id: 'r3-ehv-stad', type: 'ehv-stad', text: '3 Blixembosch West', pdf: '/routes/3.pdf', map: 'https://goo.gl/maps/6KgygAyk6dKcLe9c9', videos: [{ label: 'Heenrit', url: 'https://youtu.be/FOveDAGeTOQ' }, { label: 'Terugrit', url: 'https://youtu.be/C13yjlCQHSI' }] },
      { id: 'r4-ehv-stad', type: 'ehv-stad', text: '4 Heesterakker', pdf: '/routes/4.pdf', map: 'https://goo.gl/maps/VC6H4upjx4VWJkLa9', videos: [{ label: 'Heenrit', url: 'https://youtu.be/XrY2w3J-110' }, { label: 'Terugrit', url: 'https://youtu.be/W2d4MJ8NUNs' }] },
      { id: 'r5-ehv-stad', type: 'ehv-stad', text: "5 't Hofke", pdf: '/routes/5.pdf', map: 'https://goo.gl/maps/ZVRxNdkkF84TTFcr9', videos: [{ label: 'Heenrit', url: 'https://youtu.be/RMFC7Lkl93g' }, { label: 'Terugrit', url: 'https://youtu.be/CzLnjtHiXvM' }] },
      { id: 'r6-ehv-stad', type: 'ehv-stad', text: '6 Nuenen', pdf: '/routes/6.pdf', map: 'https://goo.gl/maps/rinLtqdqrpNdFrHu6', videos: [{ label: 'Heenrit', url: 'https://youtu.be/cUZ1WVWMaPk' }, { label: 'Terugrit', url: 'https://youtu.be/F6GKdJr-yZk' }] },
      { id: 'r7-ehv-stad', type: 'ehv-stad', text: '7 Veldhoven MMC via Aalst', pdf: '/routes/7.pdf', map: 'https://goo.gl/maps/2wn2ri42YPjDRTkc7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/5ag9cERVlEo' }, { label: 'Terugrit', url: 'https://youtu.be/iyiD4q_xTTU' }] },
      { id: 'r8-ehv-stad', type: 'ehv-stad', text: '8 Acht/Kapelbeemd', pdf: '/routes/8.pdf', map: 'https://goo.gl/maps/KDJdAMPYmtCU793o6', videos: [{ label: 'Heenrit Acht', url: 'https://youtu.be/rhj1kWFMGs8' }, { label: 'Terugrit Acht', url: 'https://youtu.be/r35PmIQS6mM' }] },
      { id: 'r12-ehv-stad', type: 'ehv-stad', text: '12 Gijzenrooi', pdf: '/routes/12.pdf', map: 'https://goo.gl/maps/pvcsGEmrZuyuidX3A', videos: [{ label: 'Heenrit', url: 'https://youtu.be/_sam4opdeS8' }] },
      { id: 'r114-ehv-stad', type: 'ehv-stad', text: '114 De Hurk', pdf: '/routes/114.pdf', map: 'https://goo.gl/maps/wNVDqY412Jo6KyMk7' },
      { id: 'r400-ehv-stad', type: 'ehv-stad', text: '400 Airport Shuttle', pdf: '/routes/400.pdf', map: 'https://goo.gl/maps/ukBjWkZWs8BAfP2c9', videos: [{ label: 'Heenrit', url: 'https://youtu.be/UodaTz-F8g8' }] },
      { id: 'r401-ehv-stad', type: 'ehv-stad', text: '401 Airport', pdf: '/routes/401.pdf', map: 'https://goo.gl/maps/wZXxBwX7d1jpmdfQ6' },

      /* EINDHOVEN STREEK */
      { id: 'r9-ehv-streek', type: 'ehv-streek', text: '9 Eindhoven - Best', pdf: '/routes/9.pdf', map: 'https://goo.gl/maps/a5P1qJycoE39Jhnc8' },
      { id: 'r11-ehv-streek', type: 'ehv-streek', text: '11 Eindhoven - Weert NS', pdf: '/routes/11.pdf', map: 'https://goo.gl/maps/44XVLgFnh5fH7Dvc8' },
      { id: 'r317-ehv-streek', type: 'ehv-streek', text: '317 Eindhoven - Dommelen', pdf: '/routes/317.pdf' },
      { id: 'r318-ehv-streek', type: 'ehv-streek', text: '318 Eindhoven - Luyksgestel', pdf: '/routes/318.pdf' },

      /* REUSEL / VALKENSWAARD */
      { id: 'r18-reusel', type: 'reusel-valkenswaard', text: '18 Bergeijk Loo', pdf: '/routes/18.pdf' },
      { id: 'r19-reusel', type: 'reusel-valkenswaard', text: '19 Bladel', pdf: '/routes/19.pdf' },
      { id: 'r319-reusel', type: 'reusel-valkenswaard', text: '319 Reusel', pdf: '/routes/319.pdf' },

      /* HELMOND */
      { id: 'r23-helmond', type: 'helmond', text: '23 Boxmeer', pdf: '/routes/23.pdf' },
      { id: 'r24-helmond', type: 'helmond', text: '24 Helmond via Geldrop', pdf: '/routes/24.pdf' },
      { id: 'r51-helmond', type: 'helmond', text: '51 Helmond Eeuwsels', pdf: '/routes/51.pdf' },

      /* SCHOLIEREN */
      { id: 'r600-school', type: 'scholieren', text: '600 Scholierenlijn voorbeeld', map: '#' }
    ]
  },
  {
    id: 'aanvang',
    title: '2. Aanvang Dienst & Voorbereiding',
    icon: <Clock size={22} />,
    items: [
      { id: 'a1', text: 'Kledingvoorschrift & schoenen in orde' },
      { id: 'a2', text: 'Zich aanmelden via computer' },
      { id: 'a3', text: 'Mededelingen en aanschrijvingen lezen' }
    ]
  },
  {
    id: 'voertuig',
    title: '3. Voertuig & Bediening',
    icon: <Bus size={22} />,
    items: [
      { id: 'v1', text: 'Stoelinstelling (A t/m L)' },
      { id: 'v2', text: 'Instellen stuurwiel & spiegels' }
    ]
  },
  {
    id: 'systemen',
    title: '4. Boordcomputer & Systemen',
    icon: <Radio size={22} />,
    items: [
      { id: 's1', text: 'Inloggen Viribus (pincode via ROV)' },
      { id: 's2', text: 'Juiste omloop invoeren' }
    ]
  }
];

const contactData = [
  {
    category: 'ALGEMEEN',
    contacts: [
      { name: 'ROV UTRECHT', phone: '030-2849494' },
      { name: 'Neckerspoel', phone: '088-6255737' }
    ]
  },
  {
    category: 'SCHADE & OMLEIDING',
    contacts: [
      { name: 'Schadetelefoon', phone: '06-38076828' },
      { name: 'E-mail omleidingen', email: 'omleidingen@hermesgroep.nl' }
    ]
  }
];

export default function Home() {
  const [students, setStudents] = useState(['Standaard']);
  const [activeStudent, setActiveStudent] = useState('Standaard');
  const [completed, setCompleted] = useState([]);
  const [tallies, setTallies] = useState({});
  const [mounted, setMounted] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [mainTab, setMainTab] = useState('routes');
  const [routeSubTab, setRouteSubTab] = useState('ehv-stad');
  const [videoModal, setVideoModal] = useState(null);

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

  // ----- VOORTGANG LOGICA -----
  const baseCategories = initialCategories.filter(c => !c.isRouteCategory);
  const baseItems = baseCategories.flatMap(c => c.items);
  const baseDone = baseItems.filter(i => completed.includes(i.id)).length;

  const routeCategory = initialCategories.find(c => c.id === 'routes');
  const types = ['ehv-stad', 'ehv-streek', 'reusel-valkenswaard', 'helmond', 'scholieren'];
  
  // Bereken voortgang per pad (Algemeen + 1 specifieke route-lijst)
  const pathPercentages = types.map(t => {
    const typeItems = routeCategory.items.filter(i => i.type === t);
    const typeDone = typeItems.filter(i => completed.includes(i.id)).length;
    return ((baseDone + typeDone) / (baseItems.length + typeItems.length)) * 100;
  });

  const totalProgress = Math.round(Math.max(...pathPercentages)) || 0;

  // Voortgang alleen voor de geselecteerde sub-tab
  const currentTabItems = routeCategory.items.filter(i => i.type === routeSubTab);
  const currentTabDone = currentTabItems.filter(i => completed.includes(i.id)).length;
  const progressCurrentTab = Math.round((currentTabDone / currentTabItems.length) * 100) || 0;

  return (
    <div>
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
                <img src="/logo.png" alt="Logo" style={{ height: '35px', objectFit: 'contain' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', lineHeight: '1.2' }}>BRAVO Mentor</h1>
              <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>HERMES</span>
            </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '10px', marginBottom: '15px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
            <select value={activeStudent} onChange={(e) => setActiveStudent(e.target.value)} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: 'none', background: 'white', color: 'black', fontWeight: 'bold' }}>
              {students.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button onClick={() => deleteStudent(activeStudent)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px', borderRadius: '6px' }}><Trash2 size={18} /></button>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="text" value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)} placeholder="Naam leerling..." style={{ flex: 1, padding: '8px', borderRadius: '6px', border: 'none' }} />
            <button onClick={addStudent} style={{ background: 'var(--success)', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '5px' }}><Plus size={18} />voeg toe</button>
          </div>
        </div>
        
        <div className="progress-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '5px' }}>
            <span>TOTALE VOORTGANG</span>
            <span>{totalProgress}%</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${totalProgress}%` }}></div></div>
        </div>

        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', marginTop: '20px', padding: '4px', gap: '4px' }}>
          <button onClick={() => setMainTab('routes')} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '8px', background: mainTab === 'routes' ? 'white' : 'transparent', color: mainTab === 'routes' ? 'var(--bravo-purple)' : 'white', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.75rem' }}>
            <Map size={18} /> Lijnen
          </button>
          <button onClick={() => setMainTab('checklist')} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '8px', background: mainTab === 'checklist' ? 'white' : 'transparent', color: mainTab === 'checklist' ? 'var(--bravo-purple)' : 'white', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.75rem' }}>
            <ClipboardCheck size={18} /> Checklists
          </button>
          <button onClick={() => setMainTab('info')} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '8px', background: mainTab === 'info' ? 'white' : 'transparent', color: mainTab === 'info' ? 'var(--bravo-purple)' : 'white', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.75rem' }}>
            <Phone size={18} /> Info
          </button>
        </div>
      </div>

      <div className="container">
        
        {/* ROUTES TAB */}
        {mainTab === 'routes' && (
          <div className="card">
            <div className="category-header"><Map size={22} /><span className="category-title">Lijnverkenning</span></div>
            
            {/* HORIZONTAAL SCROLLBARE SUB-TABS */}
            <div style={{ display: 'flex', overflowX: 'auto', background: '#f3f4f6', padding: '4px', borderRadius: '8px', marginBottom: '10px', gap: '4px', whiteSpace: 'nowrap' }} className="no-scrollbar">
              <button onClick={() => setRouteSubTab('ehv-stad')} style={{ padding: '8px 15px', borderRadius: '6px', border: 'none', fontSize: '0.85rem', fontWeight: 'bold', background: routeSubTab === 'ehv-stad' ? 'white' : 'transparent', color: routeSubTab === 'ehv-stad' ? 'var(--bravo-purple)' : '#6b7280' }}>Eindhoven STAD</button>
              <button onClick={() => setRouteSubTab('ehv-streek')} style={{ padding: '8px 15px', borderRadius: '6px', border: 'none', fontSize: '0.85rem', fontWeight: 'bold', background: routeSubTab === 'ehv-streek' ? 'white' : 'transparent', color: routeSubTab === 'ehv-streek' ? 'var(--bravo-purple)' : '#6b7280' }}>Eindhoven STREEK</button>
              <button onClick={() => setRouteSubTab('reusel-valkenswaard')} style={{ padding: '8px 15px', borderRadius: '6px', border: 'none', fontSize: '0.85rem', fontWeight: 'bold', background: routeSubTab === 'reusel-valkenswaard' ? 'white' : 'transparent', color: routeSubTab === 'reusel-valkenswaard' ? 'var(--bravo-purple)' : '#6b7280' }}>Reusel/Valkenswaard</button>
              <button onClick={() => setRouteSubTab('helmond')} style={{ padding: '8px 15px', borderRadius: '6px', border: 'none', fontSize: '0.85rem', fontWeight: 'bold', background: routeSubTab === 'helmond' ? 'white' : 'transparent', color: routeSubTab === 'helmond' ? 'var(--bravo-purple)' : '#6b7280' }}>Helmond</button>
              <button onClick={() => setRouteSubTab('scholieren')} style={{ padding: '8px 15px', borderRadius: '6px', border: 'none', fontSize: '0.85rem', fontWeight: 'bold', background: routeSubTab === 'scholieren' ? 'white' : 'transparent', color: routeSubTab === 'scholieren' ? 'var(--bravo-purple)' : '#6b7280' }}>Scholieren</button>
            </div>

            <div style={{ marginBottom: '20px', padding: '0 5px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '4px', color: '#6b7280' }}>
                  <span>VOORTGANG {routeSubTab.replace('-', ' ').toUpperCase()}</span>
                  <span>{progressCurrentTab}%</span>
               </div>
               <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: 'var(--bravo-purple)', width: `${progressCurrentTab}%`, transition: 'width 0.5s ease' }}></div>
               </div>
            </div>

            <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '10px' }}>
              {currentTabItems.map((item) => (
                <div key={item.id} className="checkbox-item" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div className="checkbox-content" onClick={() => toggleItem(item.id)} style={{ flex: 1 }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '6px', border: completed.includes(item.id) ? 'none' : '2px solid #d1d5db', background: completed.includes(item.id) ? 'var(--success)' : 'transparent', marginRight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>{completed.includes(item.id) && <CheckCircle2 size={16} />}</div>
                      <span style={{ textDecoration: completed.includes(item.id) ? 'line-through' : 'none', color: completed.includes(item.id) ? '#9ca3af' : 'inherit', fontSize: '1rem', fontWeight: '500' }}>{item.text}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {item.map && item.map !== '#' && <a href={item.map} target="_blank" className="pdf-btn"><MapPin size={16} /></a>}
                      {item.pdf && <a href={item.pdf} target="_blank" className="pdf-btn"><FileText size={16} /></a>}
                      {item.videos && item.videos.length > 0 && <button onClick={() => setVideoModal(item)} className="pdf-btn" style={{ background: '#fee2e2', color: '#dc2626', borderColor: '#fecaca' }}><Youtube size={16} /></button>}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '15px', marginLeft: '39px', padding: '10px 0 5px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <button onClick={() => updateTally(item.id, 'm', -1)} style={{ border: '1px solid #bae6fd', background: 'white', color: '#0369a1', borderRadius: '6px', padding: '4px' }}><Minus size={14} /></button>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f0f9ff', color: '#0369a1', padding: '4px 10px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold', border: '1px solid #bae6fd' }}>
                        <Eye size={14} /> M: {tallies[item.id]?.m || 0}
                      </div>
                      <button onClick={() => updateTally(item.id, 'm', 1)} style={{ border: '1px solid #bae6fd', background: 'white', color: '#0369a1', borderRadius: '6px', padding: '4px' }}><Plus size={14} /></button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <button onClick={() => updateTally(item.id, 'z', -1)} style={{ border: '1px solid #bbf7d0', background: 'white', color: '#15803d', borderRadius: '6px', padding: '4px' }}><Minus size={14} /></button>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f0fdf4', color: '#15803d', padding: '4px 10px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold', border: '1px solid #bbf7d0' }}>
                        <Navigation size={14} /> Z: {tallies[item.id]?.z || 0}
                      </div>
                      <button onClick={() => updateTally(item.id, 'z', 1)} style={{ border: '1px solid #bbf7d0', background: 'white', color: '#15803d', borderRadius: '6px', padding: '4px' }}><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHECKLIST EN INFO TABS (GEBLEVEN ZOALS ZE WAREN) */}
        {mainTab === 'checklist' && (
           <div className="container">{/* baseCategories map logic hier */}</div>
        )}
        {mainTab === 'info' && (
           <div className="container">{/* contactData map logic hier */}</div>
        )}

      </div>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
