'use client';

import { useState, useEffect } from 'react';
import { Bus, CheckCircle2, Map, ShieldAlert, Users, Radio } from 'lucide-react';

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
    title: 'Routekennis',
    icon: <Map size={22} />,
    items: [
      { id: 'r1', text: 'Stadslijnen: route & haltes' },
      { id: 'r2', text: 'Streeklijnen: bijzonderheden' },
      { id: 'r3', text: 'Omleidingen (Markt/Evenementen)' },
      { id: 'r4', text: 'Knooppunten & aansluitingen' }
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
      {/* HEADER MET LOGO */}
      <div className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            {/* Hier wordt het logo geladen */}
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
                {/* Zorg dat je logo.png in de 'public' map zet! */}
                <img 
                  src="/logo.png" 
                  alt="Logo" 
                  style={{ height: '35px', objectFit: 'contain' }} 
                  onError={(e) => {
                    e.target.style.display = 'none'; // Verbergt img als hij niet bestaat
                    e.target.nextSibling.style.display = 'block'; // Toont icoon als fallback
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
                <div key={item.id} className="checkbox-item" onClick={() => toggleItem(item.id)}>
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
