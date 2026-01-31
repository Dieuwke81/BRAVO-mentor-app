'use client';

import { useState, useEffect } from 'react';
import { Bus, CheckCircle2, Map, ShieldAlert, Users, Radio, FileText, MapPin } from 'lucide-react';

/* 
   BELANGRIJK:
   - Vul bij 'pdf' de naam van je bestand in (bijv '/routes/2.pdf')
   - Vul bij 'map' de Google Maps link in (bijv 'https://goo.gl/...')
*/
const initialCategories = [
  {
    id: 'systeem',
    title: 'Systemen & Apparatuur',
    icon: <Radio size={22} />,
    items: [
      { id: 's1', text: 'Inloggen boordcomputer (IVU/Albatros)' },
      { id: 's2', text: 'Gebruik mobilofoon & codes' },
      { id: 's3', text: 'Kaartverkoop & PIN procedures' },
      { id: 's4', text: 'Spiegels & stoel instellen' },
      { id: 's5', text: 'Bestemmingsfilm instellen' }
    ]
  },
  {
    id: 'veiligheid',
    title: 'Veiligheid',
    icon: <ShieldAlert size={22} />,
    items: [
      { id: 'v1', text: 'Procedure bij ongeval/schade' },
      { id: 'v2', text: 'Omgaan met agressie' },
      { id: 'v3', text: 'Locatie EHBO & brandblusser' },
      { id: 'v4', text: 'Waarschuwingslichten gebruik' },
      { id: 'v5', text: 'Veiligheidsvest gebruik' }
    ]
  },
  {
    id: 'dienst',
    title: 'Tijdens de dienst',
    icon: <Users size={22} />,
    items: [
      { id: 'd1', text: 'Klantvriendelijkheid & houding' },
      { id: 'd2', text: 'Omgaan met rolstoelers/rollators' },
      { id: 'd3', text: 'Pauze locaties & regels' },
      { id: 'd4', text: 'Rijstijl (Het Nieuwe Rijden)' }
    ]
  },
  {
    id: 'routes',
    title: 'Routekennis & Kaarten',
    icon: <Map size={22} />,
    items: [
      /* HIERONDER MOET JE DE LINKS TOEVOEGEN BIJ 'map' */
      { id: 'r2', text: '2 Blixembosch Oost', pdf: '/routes/2.pdf', map: 'https://goo.gl/maps/XLAb4E1GnEB1hbRf7' },
      { id: 'r3', text: '3 Blixembosch West', pdf: '/routes/3.pdf', map: 'https://goo.gl/maps/6KgygAyk6dKcLe9c9' },
      { id: 'r4', text: '4 Heesterakker', pdf: '/routes/4.pdf', map: '' },
      { id: 'r5', text: "5 't Hofke", pdf: '/routes/5.pdf', map: '' },
      { id: 'r6', text: '6 Nuenen', pdf: '/routes/6.pdf', map: '' },
      { id: 'r7', text: '7 Veldhoven MMC via Aalst/Waalre', pdf: '/routes/7.pdf', map: '' },
      { id: 'r8', text: '8 Acht', pdf: '/routes/8.pdf', map: '' },
      { id: 'r10', text: '10 Oirschot Kazerne', pdf: '/routes/10.pdf', map: '' },
      { id: 'r12', text: '12 Gijzenrooi', pdf: '/routes/12.pdf', map: '' },
      { id: 'r14', text: '14 Veldhoven Zilverackers', pdf: '/routes/14.pdf', map: '' },
      { id: 'r15', text: '15 Veldhoven Abdijlaan', pdf: '/routes/15.pdf', map: '' },
      { id: 'r16', text: '16 Veldhoven MMC', pdf: '/routes/16.pdf', map: '' },
      { id: 'r17', text: '17 Roosten', pdf: '/routes/17.pdf', map: '' },
      { id: 'r114', text: '114 De Hurk', pdf: '/routes/114.pdf', map: '' },
      { id: 'r119', text: '119 ASML', pdf: '/routes/119.pdf', map: '' },
      { id: 'r324', text: '324 Geldrop Coevering', pdf: '/routes/324.pdf', map: '' },
      { id: 'r400', text: '400 Airport Shuttle', pdf: '/routes/400.pdf', map: '' },
      { id: 'r401', text: '401 Airport', pdf: '/routes/401.pdf', map: '' },
      { id: 'r402', text: '402 Veldhoven Zonderwijk', pdf: '/routes/402.pdf', map: '' },
      { id: 'r403', text: '403 Veldhoven De Dom/Berg', pdf: '/routes/403.pdf', map: '' },
      { id: 'r404', text: '404 Nuenen Centrum', pdf: '/routes/404.pdf', map: '' },
      { id: 'r405', text: '405 Achtse Barrier', pdf: '/routes/405.pdf', map: '' },
      { id: 'r406', text: '406 Ekkersrijt', pdf: '/routes/406.pdf', map: '' },
      { id: 'r407', text: '407 High Tech Campus', pdf: '/routes/407.pdf', map: '' },
      { id: 'r408', text: '408 High Tech Campus', pdf: '/routes/408.pdf', map: '' }
    ]
  }
];

export default function Home() {
  const [completed, setCompleted] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('bravoMentorProgress_v1');
    if (saved) {
      setCompleted(JSON.parse(saved));
    }
    setMounted(true);
  }, []);

  const toggleItem = (id) => {
    let newCompleted;
    if (completed.includes(id)) {
      newCompleted = completed.filter(item => item !== id);
    } else {
      newCompleted = [...completed, id];
    }
    setCompleted(newCompleted);
    localStorage.setItem('bravoMentorProgress_v1', JSON.stringify(newCompleted));
  };

  const totalItems = initialCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  const progress = Math.round((completed.length / totalItems) * 100) || 0;

  if (!mounted) return null;

  return (
    <div>
      <div className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <div style={{ 
                background: 'white', 
                padding: '8px', 
                borderRadius: '10px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                minWidth: '50px',
                minHeight: '50px'
            }}>
                <img 
                  src="/logo.png" 
                  alt="Logo" 
                  style={{ height: '35px', objectFit: 'contain' }} 
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div style={{ display: 'none', color: 'var(--bravo-purple)' }}>
                   <Bus size={32} />
                </div>
            </div>
            
            <div>
              <h1 style={{ fontSize: '1.5rem', lineHeight: '1.2' }}>BRAVO Mentor</h1>
              <span style={{ fontSize: '0.8rem', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '1px' }}>Opleidingskaart</span>
            </div>
        </div>
        
        <div className="progress-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '5px' }}>
            <span>VOORTGANG</span>
            <span>{progress}% VOLTOOID</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      <div className="container">
        {initialCategories.map((category) => (
          <div key={category.id} className="card">
            <div className="category-header">
              {category.icon}
              <span className="category-title">{category.title}</span>
            </div>
            
            <div>
              {category.items.map((item) => (
                <div key={item.id} className="checkbox-item">
                  {/* Klikgedeelte voor afvinken */}
                  <div className="checkbox-content" onClick={() => toggleItem(item.id)}>
                    <div style={{ 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '6px', 
                      border: completed.includes(item.id) ? 'none' : '2px solid #d1d5db',
                      background: completed.includes(item.id) ? 'var(--success)' : 'transparent',
                      marginRight: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      flexShrink: 0,
                      transition: 'all 0.2s'
                    }}>
                      {completed.includes(item.id) && <CheckCircle2 size={16} />}
                    </div>
                    
                    <span style={{ 
                      textDecoration: completed.includes(item.id) ? 'line-through' : 'none',
                      color: completed.includes(item.id) ? '#9ca3af' : 'inherit',
                      fontSize: '0.95rem',
                      lineHeight: '1.4'
                    }}>
                      {item.text}
                    </span>
                  </div>

                  {/* Knoppen rechts */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {/* Google Maps Knop */}
                    {item.map && (
                      <a href={item.map} target="_blank" className="pdf-btn" onClick={(e) => e.stopPropagation()}>
                        <MapPin size={14} />
                        Nav
                      </a>
                    )}

                    {/* PDF Knop */}
                    {item.pdf && (
                      <a href={item.pdf} target="_blank" className="pdf-btn" onClick={(e) => e.stopPropagation()}>
                        <FileText size={14} />
                        Info
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: '0.75rem', marginTop: '30px' }}>
            <p>Gegevens worden lokaal opgeslagen</p>
            <p>© BRAVO Mentor App</p>
        </div>
      </div>
    </div>
  );
}
