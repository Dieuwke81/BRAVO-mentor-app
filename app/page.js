'use client';

import { useState, useEffect } from 'react';
import { Bus, CheckCircle2, Map, ShieldAlert, Users, Radio, FileText, MapPin, Clock, Zap, SteeringWheel } from 'lucide-react';

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
    title: 'Routekennis & Kaarten STAD',
    icon: <Map size={22} />,
    items: [
      { id: 'r2', text: '2 Blixembosch Oost', pdf: '/routes/2.pdf', map: 'https://goo.gl/maps/XLAb4E1GnEB1hbRf7' },
      { id: 'r3', text: '3 Blixembosch West', pdf: '/routes/3.pdf', map: 'https://goo.gl/maps/6KgygAyk6dKcLe9c9' },
      { id: 'r4', text: '4 Heesterakker', pdf: '/routes/4.pdf', map: 'https://goo.gl/maps/VC6H4upjx4VWJkLa9?g_st=ac' },
      { id: 'r5', text: "5 't Hofke", pdf: '/routes/5.pdf', map: 'https://goo.gl/maps/ZVRxNdkkF84TTFcr9?g_st=ac' },
      { id: 'r6', text: '6 Nuenen', pdf: '/routes/6.pdf', map: 'https://goo.gl/maps/rinLtqdqrpNdFrHu6?g_st=ac' },
      { id: 'r7', text: '7 Veldhoven MMC via Aalst/Waalre', pdf: '/routes/7.pdf', map: 'https://goo.gl/maps/2wn2ri42YPjDRTkc7?g_st=ac' },
      { id: 'r8', text: '8 Acht', pdf: '/routes/8.pdf', map: 'https://goo.gl/maps/KDJdAMPYmtCU793o6?g_st=ac' },
      { id: 'r10', text: '10 Oirschot Kazerne', pdf: '/routes/10.pdf', map: 'https://goo.gl/maps/u1VCM98XLR4gibQy6?g_st=ac' },
      { id: 'r12', text: '12 Gijzenrooi', pdf: '/routes/12.pdf', map: 'https://goo.gl/maps/pvcsGEmrZuyuidX3A?g_st=ac' },
      { id: 'r14', text: '14 Veldhoven Zilverackers', pdf: '/routes/14.pdf', map: 'https://goo.gl/maps/b3rHcKpHwrB7sqR18?g_st=ac' },
      { id: 'r15', text: '15 Veldhoven Abdijlaan', pdf: '/routes/15.pdf', map: 'https://goo.gl/maps/zT7RyaGGEfFwBFNA8?g_st=ac' },
      { id: 'r16', text: '16 Veldhoven MMC', pdf: '/routes/16.pdf', map: 'https://goo.gl/maps/NB9B2serhaqnsz6b8?g_st=ac' },
      { id: 'r17', text: '17 Roosten', pdf: '/routes/17.pdf', map: 'https://goo.gl/maps/ypypjG6zZmFaBKmA8?g_st=ac' },
      { id: 'r114', text: '114 De Hurk', pdf: '/routes/114.pdf', map: 'https://goo.gl/maps/wNVDqY412Jo6KyMk7?g_st=ac' },
      { id: 'r119', text: '119 ASML', pdf: '/routes/119.pdf', map: 'https://goo.gl/maps/BzQ61zRScuEGTxda7?g_st=ac' },
      { id: 'r324', text: '324 Geldrop Coevering', pdf: '/routes/324.pdf', map: 'https://goo.gl/maps/qH9iWy8QDboPPUyk7?g_st=ac' },
      { id: 'r400', text: '400 Airport Shuttle', pdf: '/routes/400.pdf', map: 'https://goo.gl/maps/ukBjWkZWs8BAfP2c9?g_st=ac' },
      { id: 'r401', text: '401 Airport', pdf: '/routes/401.pdf', map: 'https://goo.gl/maps/wZXxBwX7d1jpmdfQ6?g_st=ac' },
      { id: 'r402', text: '402 Veldhoven Zonderwijk', pdf: '/routes/402.pdf', map: 'https://goo.gl/maps/AzkdnKNpGggagMym6?g_st=ac' },
      { id: 'r403', text: '403 Veldhoven De Dom/Berg', pdf: '/routes/403.pdf', map: 'https://goo.gl/maps/t2tt2P7CTcL61hKa7?g_st=ac' },
      { id: 'r404', text: '404 Nuenen Centrum', pdf: '/routes/404.pdf', map: 'https://goo.gl/maps/BnVdowtnS5JXrogm7?g_st=ac' },
      { id: 'r405', text: '405 Achtse Barrier', pdf: '/routes/405.pdf', map: 'https://goo.gl/maps/MYakec5RN3dmyHKA9?g_st=ac' },
      { id: 'r406', text: '406 Ekkersrijt', pdf: '/routes/406.pdf', map: 'https://goo.gl/maps/8ZBA4gaG6xzNEcck7?g_st=ac' },
      { id: 'r407', text: '407 High Tech Campus', pdf: '/routes/407.pdf', map: 'https://goo.gl/maps/kF7NkrEyib22hX8E7?g_st=ac' },
      { id: 'r408', text: '408 High Tech Campus', pdf: '/routes/408.pdf', map: 'https://goo.gl/maps/WDsWBvYGW1KhW8Rh9?g_st=ac' }
    ]
  }
];

export default function Home() {
  const [completed, setCompleted] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('bravoMentorProgress_v2'); // Versie v2 voor de nieuwe structuur
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
    localStorage.setItem('bravoMentorProgress_v2', JSON.stringify(newCompleted));
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

                  <div style={{ display: 'flex', gap: '8px' }}>
                    {item.map && (
                      <a href={item.map} target="_blank" className="pdf-btn" onClick={(e) => e.stopPropagation()}>
                        <MapPin size={14} />
                        Maps
                      </a>
                    )}
                    {item.pdf && (
                      <a href={item.pdf} target="_blank" className="pdf-btn" onClick={(e) => e.stopPropagation()}>
                        <FileText size={14} />
                        PDF
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: '0.75rem', marginTop: '30px' }}>
            <p>Gegevens worden lokaal opgeslagen op dit apparaat</p>
            <p>© BRAVO Mentor App - Rayon Eindhoven</p>
        </div>
      </div>
    </div>
  );
}
