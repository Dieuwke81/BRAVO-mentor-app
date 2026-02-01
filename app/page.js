'use client';

import { useState, useEffect } from 'react';
import { Bus, CheckCircle2, Map, ShieldAlert, Users, Radio, FileText, MapPin, Clock, Zap, Plus, Trash2, Youtube, X, Navigation, Eye } from 'lucide-react';

const initialCategories = [
  {
    id: 'aanvang',
    title: '1. Aanvang Dienst & Voorbereiding',
    icon: <Clock size={22} />,
    items: [
      { id: 'a1', text: 'Kledingvoorschrift & schoenen (kleur) in orde' },
      { id: 'a2', text: 'Zich aanmelden via computer & dienstblaadje pakken' },
      { id: 'a3', text: 'Mededelingen en aanschrijvingen lezen' },
      { id: 'a4', text: 'Controleren van stallingsplan (Eindhoven/streek)' },
      { id: 'a5', text: 'Juiste voertuigtype & omloopbordje plaatsen' }
    ]
  },
  {
    id: 'voertuig',
    title: '2. Voertuig & Bediening',
    icon: <Bus size={22} />,
    items: [
      { id: 'v1', text: 'Instellen stoel (A t/m L: hoogte, demping, lende, etc.)' },
      { id: 'v2', text: 'Instellen stuurwiel & spiegels' },
      { id: 'v3', text: 'Controle op schade (exterieur & interieur)' },
      { id: 'v4', text: 'Bediening verlichting (chauffeurscabine & interieur)' },
      { id: 'v5', text: 'Klimaatbediening & ontwaseming' },
      { id: 'v6', text: 'Werking diverse bussen (Iveco, Citea SLFA/LF)' },
      { id: 'v7', text: 'Controle banden, lekkage en vloeistoffen' }
    ]
  },
  {
    id: 'systemen',
    title: '3. Boordcomputer & Systemen',
    icon: <Radio size={22} />,
    items: [
      { id: 's1', text: 'Inloggen Viribus (pincode via ROV opvragen)' },
      { id: 's2', text: 'Juiste omloop invoeren & rit selecteren' },
      { id: 's3', text: 'Gebruik handaanmelding verkeerslicht (KAR/VETAG)' },
      { id: 's4', text: 'Kaartverkoop & Ticketbox procedures' },
      { id: 's5', text: 'Tekst- en spraakoproep / Noodoproep' },
      { id: 's6', text: 'Sycada/Rijwijzer: opvolgen rijstijl lampjes' },
      { id: 's7', text: 'Gebruik omroepberichten' }
    ]
  },
  {
    id: 'dienst',
    title: '4. Tijdens de Dienst (Rijstijl)',
    icon: <Users size={22} />,
    items: [
      { id: 'd1', text: 'Vertrek op tijd vanaf beginpunt' },
      { id: 'd2', text: 'Rijstijl: Het Nieuwe Rijden (HNR) & uitrollen' },
      { id: 'd3', text: 'Halteren: juiste deurbediening & afstand tot stoep' },
      { id: 'd4', text: 'Bediening rolstoelplank (automatisch & handmatig)' },
      { id: 'd5', text: 'Aanrijden van halten (overbouw achterkant)' },
      { id: 'd6', text: 'Punctualiteit & omgaan met vertraging' }
    ]
  },
  {
    id: 'elektrisch',
    title: '5. Elektrische Bus & Laden',
    icon: <Zap size={22} />,
    items: [
      { id: 'e1', text: 'Juiste positionering op laadplek' },
      { id: 'e2', text: 'In- en uitschakelen alle verbruikers voor laden' },
      { id: 'e3', text: 'Aan- en afkoppelen pantograaf (indien aanwezig)' },
      { id: 'e4', text: 'Controleren SOC (State of Charge / batterijniveau)' },
      { id: 'e5', text: 'Wachten tot bus aangeeft dat deze laadt' }
    ]
  },
  {
    id: 'veiligheid',
    title: '6. Reizigers & Veiligheid',
    icon: <ShieldAlert size={22} />,
    items: [
      { id: 'v_s1', text: 'Klantvriendelijkheid & omgang met klachten' },
      { id: 'v_s2', text: 'Begeleiding kinderwagens, rolstoelen & blinden' },
      { id: 'v_s3', text: 'Procedure bij ongeval (formulier & foto\'s maken)' },
      { id: 'v_s4', text: 'Contact met ROV bij grote incidenten/storingen' },
      { id: 'v_s5', text: 'Controle vervoerbewijzen (OV-chip/OVpay)' }
    ]
  },
  {
    id: 'routes',
    title: '7. Routekennis & Turven',
    icon: <Map size={22} />,
    isRouteCategory: true,
    items: [
      /* STADS- EN HOOGWAARDIGE LIJNEN */
      { id: 'r2', type: 'stad', text: '2 Blixembosch Oost', pdf: '/routes/2.pdf', map: 'https://goo.gl/maps/XLAb4E1GnEB1hbRf7' },
      { id: 'r3', type: 'stad', text: '3 Blixembosch West', pdf: '/routes/3.pdf', map: 'https://goo.gl/maps/6KgygAyk6dKcLe9c9' },
      { id: 'r4', type: 'stad', text: '4 Heesterakker', pdf: '/routes/4.pdf', map: 'https://goo.gl/maps/VC6H4upjx4VWJkLa9?g_st=ac' },
      { id: 'r5', type: 'stad', text: "5 't Hofke", pdf: '/routes/5.pdf', map: 'https://goo.gl/maps/ZVRxNdkkF84TTFcr9?g_st=ac' },
      { id: 'r6', type: 'stad', text: '6 Nuenen', pdf: '/routes/6.pdf', map: 'https://goo.gl/maps/rinLtqdqrpNdFrHu6?g_st=ac' },
      { id: 'r7', type: 'stad', text: '7 Veldhoven MMC via Aalst', pdf: '/routes/7.pdf', map: 'https://goo.gl/maps/2wn2ri42YPjDRTkc7?g_st=ac' },
      { id: 'r8', type: 'stad', text: '8 Acht', pdf: '/routes/8.pdf', map: 'https://goo.gl/maps/KDJdAMPYmtCU793o6?g_st=ac' },
      { id: 'r10', type: 'stad', text: '10 Oirschot Kazerne', pdf: '/routes/10.pdf', map: 'https://goo.gl/maps/u1VCM98XLR4gibQy6?g_st=ac' },
      { id: 'r12', type: 'stad', text: '12 Gijzenrooi', pdf: '/routes/12.pdf', map: 'https://goo.gl/maps/pvcsGEmrZuyuidX3A?g_st=ac' },
      { id: 'r14', type: 'stad', text: '14 Veldhoven Zilverackers', pdf: '/routes/14.pdf', map: 'https://goo.gl/maps/b3rHcKpHwrB7sqR18?g_st=ac' },
      { id: 'r15', type: 'stad', text: '15 Veldhoven Abdijlaan', pdf: '/routes/15.pdf', map: 'https://goo.gl/maps/zT7RyaGGEfFwBFNA8?g_st=ac' },
      { id: 'r16', type: 'stad', text: '16 Veldhoven MMC', pdf: '/routes/16.pdf', map: 'https://goo.gl/maps/NB9B2serhaqnsz6b8?g_st=ac' },
      { id: 'r17', type: 'stad', text: '17 Roosten', pdf: '/routes/17.pdf', map: 'https://goo.gl/maps/ypypjG6zZmFaBKmA8?g_st=ac' },
      { id: 'r114', type: 'stad', text: '114 De Hurk', pdf: '/routes/114.pdf', map: 'https://goo.gl/maps/wNVDqY412Jo6KyMk7?g_st=ac' },
      { id: 'r119', type: 'stad', text: '119 ASML', pdf: '/routes/119.pdf', map: 'https://goo.gl/maps/BzQ61zRScuEGTxda7?g_st=ac' },
      { id: 'r324', type: 'stad', text: '324 Geldrop Coevering', pdf: '/routes/324.pdf', map: 'https://goo.gl/maps/qH9iWy8QDboPPUyk7?g_st=ac' },
      { id: 'r400', type: 'stad', text: '400 Airport Shuttle', pdf: '/routes/400.pdf', map: 'https://goo.gl/maps/ukBjWkZWs8BAfP2c9?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/UodaTz-F8g8' }] },
      { id: 'r401', type: 'stad', text: '401 Airport', pdf: '/routes/401.pdf', map: 'https://goo.gl/maps/wZXxBwX7d1jpmdfQ6?g_st=ac' },
      { id: 'r402', type: 'stad', text: '402 Veldhoven Zonderwijk', pdf: '/routes/402.pdf', map: 'https://goo.gl/maps/AzkdnKNpGggagMym6?g_st=ac' },
      { id: 'r403', type: 'stad', text: '403 Veldhoven De Dom/Berg', pdf: '/routes/403.pdf', map: 'https://goo.gl/maps/t2tt2P7CTcL61hKa7?g_st=ac' },
      { id: 'r404', type: 'stad', text: '404 Nuenen Centrum', pdf: '/routes/404.pdf', map: 'https://goo.gl/maps/BnVdowtnS5JXrogm7?g_st=ac' },
      { id: 'r405', type: 'stad', text: '405 Achtse Barrier', pdf: '/routes/405.pdf', map: 'https://goo.gl/maps/MYakec5RN3dmyHKA9?g_st=ac' },
      { id: 'r406', type: 'stad', text: '406 Ekkersrijt', pdf: '/routes/406.pdf', map: 'https://goo.gl/maps/8ZBA4gaG6xzNEcck7?g_st=ac' },
      { id: 'r407', type: 'stad', text: '407 HTC (terug als 408)', pdf: '/routes/407.pdf', map: 'https://goo.gl/maps/kF7NkrEyib22hX8E7?g_st=ac' },
      { id: 'r408', type: 'stad', text: '408 HTC (terug als 407)', pdf: '/routes/408.pdf', map: 'https://goo.gl/maps/WDsWBvYGW1KhW8Rh9?g_st=ac' },

      /* STREEKLIJNEN */
      { id: 'r9', type: 'streek', text: '9 Eindhoven - Best', pdf: '/routes/9.pdf', map: '#' },
      { id: 'r11', type: 'streek', text: '11 Eindhoven - Weert NS', pdf: '/routes/11.pdf', map: '#' },
      { id: 'r18', type: 'streek', text: '18 Eindhoven - Bergeijk Loo', pdf: '/routes/18.pdf', map: '#' },
      { id: 'r19', type: 'streek', text: '19 Eindhoven - Bladel', pdf: '/routes/19.pdf', map: '#' },
      { id: 'r20', type: 'streek', text: '20 Best NS - HTC', pdf: '/routes/20.pdf', map: '#' },
      { id: 'r23', type: 'streek', text: '23 Helmond - Boxmeer', pdf: '/routes/23.pdf', map: '#' },
      { id: 'r24', type: 'streek', text: '24 Eindhoven - Helmond via Geldrop', pdf: '/routes/24.pdf', map: '#' },
      { id: 'r25', type: 'streek', text: '25 Helmond - Gemert Pelgrimsrust', pdf: '/routes/25.pdf', map: '#' },
      { id: 'r26', type: 'streek', text: '26 Helmond - Gemert', pdf: '/routes/26.pdf', map: '#' },
      { id: 'r28', type: 'streek', text: '28 Deurne - Meijel', pdf: '/routes/28.pdf', map: '#' },
      { id: 'r51', type: 'streek', text: '51 Helmond Eeuwsels', pdf: '/routes/51.pdf', map: '#' },
      { id: 'r52', type: 'streek', text: '52 Helmond Rijpelberg', pdf: '/routes/52.pdf', map: '#' },
      { id: 'r53', type: 'streek', text: '53 Helmond Straakven', pdf: '/routes/53.pdf', map: '#' },
      { id: 'r54', type: 'streek', text: '54 Helmond Brouwhuis', pdf: '/routes/54.pdf', map: '#' },
      { id: 'r55', type: 'streek', text: '55 Helmond Stiphout', pdf: '/routes/55.pdf', map: '#' },
      { id: 'r120', type: 'streek', text: '120 Best NS - ASML gebouw 4', pdf: '/routes/120.pdf', map: '#' },
      { id: 'r123', type: 'streek', text: '123 Gemert Pelgrimsrust - Boxmeer', pdf: '/routes/123.pdf', map: '#' },
      { id: 'r150', type: 'streek', text: '150 Helmond - Helmond \'t Hout', pdf: '/routes/150.pdf', map: '#' },
      { id: 'r317', type: 'streek', text: '317 Eindhoven - Dommelen', pdf: '/routes/317.pdf', map: '#' },
      { id: 'r318', type: 'streek', text: '318 Eindhoven - Luyksgestel', pdf: '/routes/318.pdf', map: '#' },
      { id: 'r319', type: 'streek', text: '319 Eindhoven - Reusel', pdf: '/routes/319.pdf', map: '#' },
      { id: 'r320', type: 'streek', text: '320 Eindhoven - Helmond via Asten', pdf: '/routes/320.pdf', map: '#' },
      { id: 'r321', type: 'streek', text: '321 Eindhoven - Gemert Pelgrimsrust', pdf: '/routes/321.pdf', map: '#' },
      { id: 'r322', type: 'streek', text: '322 Eindhoven - Uden', pdf: '/routes/322.pdf', map: '#' },
      { id: 'r323', type: 'streek', text: '323 Eindhoven - Gemert Groenesteeg', pdf: '/routes/323.pdf', map: '#' }
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
  const [routeTab, setRouteTab] = useState('stad');
  const [videoModal, setVideoModal] = useState(null);

  useEffect(() => {
    const savedStudents = localStorage.getItem('bravo_student_list');
    if (savedStudents) {
      const parsed = JSON.parse(savedStudents);
      if (parsed.length > 0) {
        setStudents(parsed);
        const lastActive = localStorage.getItem('bravo_active_student');
        if (lastActive && parsed.includes(lastActive)) {
          setActiveStudent(lastActive);
        } else {
          setActiveStudent(parsed[0]);
        }
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
    if (students.length > 1 && confirm(`Weet je zeker dat je ${name} wilt verwijderen?`)) {
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

  const updateTally = (routeId, type) => {
    const currentRouteTally = tallies[routeId] || { m: 0, z: 0 };
    const newTallies = {
      ...tallies,
      [routeId]: { ...currentRouteTally, [type]: currentRouteTally[type] + 1 }
    };
    setTallies(newTallies);
    localStorage.setItem(`bravo_tallies_${activeStudent}`, JSON.stringify(newTallies));
  };

  const totalItems = initialCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  const totalProgress = Math.round((completed.length / totalItems) * 100) || 0;

  // Voortgang berekening voor Routes specifiek
  const routeCategory = initialCategories.find(c => c.id === 'routes');
  const stadRoutes = routeCategory.items.filter(i => i.type === 'stad');
  const streekRoutes = routeCategory.items.filter(i => i.type === 'streek');

  const stadCompleted = stadRoutes.filter(i => completed.includes(i.id)).length;
  const streekCompleted = streekRoutes.filter(i => completed.includes(i.id)).length;

  const progressStad = Math.round((stadCompleted / stadRoutes.length) * 100) || 0;
  const progressStreek = Math.round((streekCompleted / streekRoutes.length) * 100) || 0;

  return (
    <div>
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

      {/* HEADER MET ALGEMENE VOORTGANG */}
      <div className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <div style={{ background: 'white', padding: '8px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
                <img src="/logo.png" alt="Logo" style={{ height: '35px', objectFit: 'contain' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', lineHeight: '1.2' }}>BRAVO Mentor</h1>
              <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>RAYON EINDHOVEN</span>
            </div>
        </div>

        {/* STUDENT SELECTOR */}
        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '10px', marginBottom: '15px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
            <select value={activeStudent} onChange={(e) => setActiveStudent(e.target.value)} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: 'none', background: 'white', color: 'black', fontWeight: 'bold' }}>
              {students.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button onClick={() => deleteStudent(activeStudent)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px', borderRadius: '6px' }}><Trash2 size={18} /></button>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="text" value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)} placeholder="Naam leerling..." style={{ flex: 1, padding: '8px', borderRadius: '6px', border: 'none' }} />
            <button onClick={addStudent} style={{ background: 'var(--success)', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '5px' }}><Plus size={18} /> Voeg</button>
          </div>
        </div>
        
        <div className="progress-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '5px' }}>
            <span>TOTALE VOORTGANG</span>
            <span>{totalProgress}%</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${totalProgress}%` }}></div></div>
        </div>
      </div>

      <div className="container">
        {initialCategories.map((category) => (
          <div key={category.id} className="card">
            <div className="category-header">
              {category.icon}
              <span className="category-title">{category.title}</span>
            </div>
            
            {/* ROUTE TAB KIEZER EN SPECIFIEKE VOORTGANG */}
            {category.isRouteCategory && (
              <div>
                <div style={{ display: 'flex', background: '#f3f4f6', padding: '4px', borderRadius: '8px', marginBottom: '10px', gap: '4px' }}>
                  <button onClick={() => setRouteTab('stad')} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: 'none', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer', background: routeTab === 'stad' ? 'white' : 'transparent', color: routeTab === 'stad' ? 'var(--bravo-purple)' : '#6b7280' }}>Stadslijnen</button>
                  <button onClick={() => setRouteTab('streek')} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: 'none', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer', background: routeTab === 'streek' ? 'white' : 'transparent', color: routeTab === 'streek' ? 'var(--bravo-purple)' : '#6b7280' }}>Streeklijnen</button>
                </div>
                
                {/* Dynamische Voortgangsbalk voor Routes */}
                <div style={{ marginBottom: '15px', padding: '0 5px' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '4px', color: '#6b7280' }}>
                      <span style={{ textTransform: 'uppercase' }}>Voortgang {routeTab}</span>
                      <span>{routeTab === 'stad' ? progressStad : progressStreek}%</span>
                   </div>
                   <div style={{ height: '6px', background: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ 
                        height: '100%', 
                        background: 'var(--bravo-purple)', 
                        width: `${routeTab === 'stad' ? progressStad : progressStreek}%`,
                        transition: 'width 0.3s ease'
                      }}></div>
                   </div>
                </div>
              </div>
            )}

            <div>
              {category.items
                .filter(item => !category.isRouteCategory || item.type === routeTab)
                .map((item) => (
                <div key={item.id} className="checkbox-item" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div className="checkbox-content" onClick={() => toggleItem(item.id)} style={{ flex: 1 }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '6px', border: completed.includes(item.id) ? 'none' : '2px solid #d1d5db', background: completed.includes(item.id) ? 'var(--success)' : 'transparent', marginRight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        {completed.includes(item.id) && <CheckCircle2 size={16} />}
                      </div>
                      <span style={{ textDecoration: completed.includes(item.id) ? 'line-through' : 'none', color: completed.includes(item.id) ? '#9ca3af' : 'inherit', fontSize: '0.95rem', fontWeight: '500' }}>{item.text}</span>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {item.map && item.map !== '#' && <a href={item.map} target="_blank" className="pdf-btn"><MapPin size={14} /></a>}
                      {item.pdf && <a href={item.pdf} target="_blank" className="pdf-btn"><FileText size={14} /></a>}
                      {item.videos && <button onClick={() => setVideoModal(item)} className="pdf-btn" style={{ background: '#fee2e2', color: '#dc2626', borderColor: '#fecaca' }}><Youtube size={14} /></button>}
                    </div>
                  </div>

                  {category.isRouteCategory && (
                    <div style={{ display: 'flex', gap: '10px', marginLeft: '39px', padding: '8px 0 4px 0' }}>
                      <button onClick={() => updateTally(item.id, 'm')} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#f0f9ff', color: '#0369a1', border: '1px solid #bae6fd', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                        <Eye size={12} /> M: {tallies[item.id]?.m || 0}
                      </button>
                      <button onClick={() => updateTally(item.id, 'z')} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                        <Navigation size={12} /> Z: {tallies[item.id]?.z || 0}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
