'use client';

import { useState, useEffect } from 'react';
import { Bus, CheckCircle2, Map, ShieldAlert, Users, Radio, FileText, MapPin, Clock, Zap, Plus, Minus, Trash2, Youtube, X, Navigation, Eye, ClipboardCheck, Phone, Mail, Info } from 'lucide-react';

const initialCategories = [
  {
    id: 'routes',
    title: 'Routekennis & Lijnverkenning',
    icon: <Map size={22} />,
    isRouteCategory: true,
    items: [
      { id: 'r2', type: 'stad', text: '2 Blixembosch Oost', pdf: '/routes/2.pdf', map: 'https://goo.gl/maps/XLAb4E1GnEB1hbRf7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/-lxwwVMe5Bc?si=E4AHjMBHDAGT9-ck' }, { label: 'Terugrit', url: 'https://youtu.be/JgIIPRHSRpw?si=_g8pPDQFN_lHuth7' }] },
      { id: 'r3', type: 'stad', text: '3 Blixembosch West', pdf: '/routes/3.pdf', map: 'https://goo.gl/maps/6KgygAyk6dKcLe9c9', videos: [{ label: 'Heenrit', url: 'https://youtu.be/FOveDAGeTOQ?si=mg8G8yNPqY4qVCec' }, { label: 'Terugrit', url: 'https://youtu.be/C13yjlCQHSI?si=WFe0n_wwwBjp2iz2' }] },
      { id: 'r4', type: 'stad', text: '4 Heesterakker', pdf: '/routes/4.pdf', map: 'https://goo.gl/maps/VC6H4upjx4VWJkLa9', videos: [{ label: 'Heenrit', url: 'https://youtu.be/XrY2w3J-110?si=sQZQzLdYmIoC7HS_' }, { label: 'Terugrit', url: 'https://youtu.be/W2d4MJ8NUNs?si=YkCNiDFrjHJ1L_Se' }] },
      { id: 'r5', type: 'stad', text: "5 't Hofke", pdf: '/routes/5.pdf', map: 'https://goo.gl/maps/ZVRxNdkkF84TTFcr9', videos: [{ label: 'Heenrit', url: 'https://youtu.be/RMFC7Lkl93g?si=efmmynvV2NCM4fAe' }, { label: 'Terugrit', url: 'https://youtu.be/CzLnjtHiXvM?si=0M4hDRFMjLFAYMMi' }] },
      { id: 'r6', type: 'stad', text: '6 Nuenen', pdf: '/routes/6.pdf', map: 'https://goo.gl/maps/rinLtqdqrpNdFrHu6', videos: [{ label: 'Heenrit', url: 'https://youtu.be/cUZ1WVWMaPk?si=tsR3E1OOwB-IfD_I' }, { label: 'Terugrit', url: 'https://youtu.be/F6GKdJr-yZk?si=20PbyTjgQwSlD8Eo' }] },
      { id: 'r7', type: 'stad', text: '7 Veldhoven MMC via Aalst', pdf: '/routes/7.pdf', map: 'https://goo.gl/maps/2wn2ri42YPjDRTkc7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/5ag9cERVlEo?si=nEKdnK67H3MBZ7d4' }, { label: 'Terugrit', url: 'https://youtu.be/iyiD4q_xTTU?si=Y3wNs8k9_ksHCZJH' }] },
      { id: 'r8', type: 'stad', text: '8 Acht/Kapelbeemd', pdf: '/routes/8.pdf', map: 'https://goo.gl/maps/KDJdAMPYmtCU793o6', videos: [{ label: 'Heenrit Acht', url: 'https://youtu.be/rhj1kWFMGs8?si=l1a4uhc0fTQG8tWS' }, { label: 'Terugrit Acht', url: 'https://youtu.be/r35PmIQS6mM?si=ghNfA7z8J5xn-kvs' }, { label: 'Heenrit Kapelbeemd', url: 'https://youtu.be/RACYUSmZn9A?si=OUJ665MNA3fz3GUX' }, { label: 'Terugrit Kapelbeemd', url: 'https://youtu.be/rG9rXCCf3q0?si=QyJU6CjscioB6ve2' }] },
      { id: 'r10', type: 'stad', text: '10 Oirschot Kazerne', pdf: '/routes/10.pdf', map: 'https://goo.gl/maps/u1VCM98XLR4gibQy6', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
      { id: 'r12', type: 'stad', text: '12 Gijzenrooi', pdf: '/routes/12.pdf', map: 'https://goo.gl/maps/pvcsGEmrZuyuidX3A', videos: [{ label: 'Heenrit', url: 'https://youtu.be/_sam4opdeS8?si=ibC56NnPAJONhDO7' }, { label: 'Terugrit', url: 'https://youtu.be/rL4oMyl0eSU?si=uTa9GgHKy_btknRG' }] },
      { id: 'r14', type: 'stad', text: '14 Veldhoven Zilverackers', pdf: '/routes/14.pdf', map: 'https://goo.gl/maps/b3rHcKpHwrB7sqR18', videos: [{ label: 'Heenrit', url: 'https://youtu.be/jFs0mg9fgNA?si=KpvJ5CUdwen-CH5q' }, { label: 'Terugrit', url: 'https://youtu.be/67ecioM8dgM?si=6i3LwhMA58zV-DLE' }] },
      { id: 'r15', type: 'stad', text: '15 Veldhoven Abdijlaan', pdf: '/routes/15.pdf', map: 'https://goo.gl/maps/zT7RyaGGEfFwBFNA8', videos: [{ label: 'Heenrit', url: 'https://youtu.be/YYJxYVIlESE?si=coLPGur5rsW5x4UA' }, { label: 'Terugrit', url: 'https://youtu.be/TXFJItf8eyA?si=8LlRUVAnmbqYN2Yq' }] },
      { id: 'r16', type: 'stad', text: '16 Veldhoven MMC', pdf: '/routes/16.pdf', map: 'https://goo.gl/maps/NB9B2serhaqnsz6b8', videos: [{ label: 'Heenrit', url: 'https://youtu.be/Vlj9ucKrZZQ?si=c1GYuT5kydWyoZw2' }, { label: 'Terugrit', url: 'https://youtu.be/OsRDvAVLXj8?si=RdBkL8FzBk4XYCXZ' }] },
      { id: 'r17', type: 'stad', text: '17 Roosten', pdf: '/routes/17.pdf', map: 'https://goo.gl/maps/ypypjG6zZmFaBKmA8', videos: [{ label: 'Heenrit', url: 'https://youtu.be/2MmyuC6nFow?si=4GHOafc-y-1nJcFy' }, { label: 'Terugrit', url: 'https://youtu.be/GIeFM5LY1T8?si=TspS6pR394_1kqYU' }] },
      { id: 'r114', type: 'stad', text: '114 De Hurk', pdf: '/routes/114.pdf', map: 'https://goo.gl/maps/wNVDqY412Jo6KyMk7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/hBhwXIudYsA?si=hHzgxknUy1wotwhN' }, { label: 'Terugrit', url: 'https://youtu.be/pe3djrT9mFk?si=1nc8xlOyZ6ySgK4x' }] },
      { id: 'r119', type: 'stad', text: '119 ASML', pdf: '/routes/119.pdf', map: 'https://goo.gl/maps/BzQ61zRScuEGTxda7', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
      { id: 'r324', type: 'stad', text: '324 Geldrop Coevering', pdf: '/routes/324.pdf', map: 'https://goo.gl/maps/qH9iWy8QDboPPUyk7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/bqwSqdBEpqU?si=G5Obe7dZrY81mYPU' }, { label: 'Terugrit', url: 'https://youtu.be/UUhg-zk6wkc?si=keDhRk8vfo88d4fB' }] },
      { id: 'r400', type: 'stad', text: '400 Airport Shuttle', pdf: '/routes/400.pdf', map: 'https://goo.gl/maps/ukBjWkZWs8BAfP2c9', videos: [{ label: 'Heenrit', url: 'https://youtu.be/UodaTz-F8g8' }, { label: 'Terugrit', url: 'https://youtu.be/35rQzFIwjdA?si=QXmMqUgulXJo5_M4' }] },
      { id: 'r401', type: 'stad', text: '401 Airport', pdf: '/routes/401.pdf', map: 'https://goo.gl/maps/wZXxBwX7d1jpmdfQ6', videos: [{ label: 'Heenrit', url: 'https://youtu.be/S4wa7yT9BcY?si=31Z1l4u1fx_jA2JW' }, { label: 'Terugrit', url: 'https://youtu.be/UYfUHZnInT0?si=dU9R4r4l9VlZliV5' }] },
      { id: 'r402', type: 'stad', text: '402 Veldhoven Zonderwijk', pdf: '/routes/402.pdf', map: 'https://goo.gl/maps/AzkdnKNpGggagMym6', videos: [{ label: 'Heenrit', url: 'https://youtu.be/0db7B2OBmAk?si=d6SOdiqSATE1PCzf' }, { label: 'Terugrit', url: 'https://youtu.be/3_sUF1g4BFk?si=AgtTimXKv43ZVPZZ' }] },
      { id: 'r403', type: 'stad', text: '403 Veldhoven De Dom/Berg', pdf: '/routes/403.pdf', map: 'https://goo.gl/maps/t2tt2P7CTcL61hKa7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/f6mmCG03w8w?si=soBee8YSkJixRYFA' }, { label: 'Terugrit', url: 'https://youtu.be/Z1_s1DaR9_M?si=y5e2edJVzzTYcLZy' }] },
      { id: 'r404', type: 'stad', text: '404 Nuenen Centrum', pdf: '/routes/404.pdf', map: 'https://goo.gl/maps/BnVdowtnS5JXrogm7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/xRBWLs0bssE?si=g4LxP3cQhfY-sNfq' }, { label: 'Terugrit', url: 'https://youtu.be/awResSEsx3g?si=Zw8QiOwGPx9YYAvY' }] },
      { id: 'r405', type: 'stad', text: '405 Achtse Barrier', pdf: '/routes/405.pdf', map: 'https://goo.gl/maps/MYakec5RN3dmyHKA9', videos: [{ label: 'Heenrit', url: 'https://youtu.be/qCH0vxpLReg?si=wg0a-oAv_la2Q_bf' }, { label: 'Terugrit', url: 'https://youtu.be/C7po5lSwkWs?si=IQq_OvVHj5w1xZEY' }] },
      { id: 'r406', type: 'stad', text: '406 Ekkersrijt', pdf: '/routes/406.pdf', map: 'https://goo.gl/maps/8ZBA4gaG6xzNEcck7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/YZ_OvPiRWiM?si=6daw8ohC20sLFsNI' }, { label: 'Terugrit', url: 'https://youtu.be/o3MqkdyIYQw?si=2bG7x1g2U7RbT0ZA' }] },
      { id: 'r407', type: 'stad', text: '407 HTC', pdf: '/routes/407.pdf', map: 'https://goo.gl/maps/kF7NkrEyib22hX8E7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/5t3EnIp3lgQ?si=NYRO4ExNU8WaB2Wd' }, { label: 'Terugrit', url: 'https://youtu.be/t6lf-XjaI3s?si=5sBB2mIdU7j__FXF' }] },
      { id: 'r408', type: 'stad', text: '408 HTC', pdf: '/routes/408.pdf', map: 'https://goo.gl/maps/WDsWBvYGW1KhW8Rh9', videos: [{ label: 'Heenrit', url: 'https://youtu.be/dIR14bagsC4?si=2khCMgNruzfqggtE' }, { label: 'Terugrit', url: 'https://youtu.be/GS-lHE_R0WY?si=tfCm0KqJxGPsYOX0' }] },

      /* STREEKLIJNEN */
      { id: 'r9', type: 'streek', text: '9 Eindhoven - Best', pdf: '/routes/9.pdf', map: 'https://goo.gl/maps/a5P1qJycoE39Jhnc8?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
      { id: 'r11', type: 'streek', text: '11 Eindhoven - Weert NS', pdf: '/routes/11.pdf', map: 'https://goo.gl/maps/44XVLgFnh5fH7Dvc8?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
      { id: 'r18', type: 'streek', text: '18 Eindhoven - Bergeijk Loo', pdf: '/routes/18.pdf', map: 'https://goo.gl/maps/jFNJHZ7X1p4a8np69?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
      { id: 'r19', type: 'streek', text: '19 Eindhoven - Bladel', pdf: '/routes/19.pdf', map: 'https://goo.gl/maps/5JPt3zvstws5gBzf6?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
      { id: 'r20', type: 'streek', text: '20 Best NS - HTC', pdf: '/routes/20 (1).pdf', map: 'https://goo.gl/maps/DzPyz1xXHau3Y2XQ9?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
      { id: 'r23', type: 'streek', text: '23 Helmond - Boxmeer', pdf: '/routes/23.pdf', map: 'https://goo.gl/maps/pBPPvrjBJjB3d4N89?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
      { id: 'r24', type: 'streek', text: '24 Eindhoven - Helmond via Geldrop', pdf: '/routes/24.pdf', map: 'https://goo.gl/maps/x8JAUt1SAJZcLfem7?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
      { id: 'r25', type: 'streek', text: '25 Helmond - Gemert Pelgrimsrust', pdf: '/routes/25.pdf', map: 'https://goo.gl/maps/D5RWqdKkpQLaceaA8?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
      { id: 'r26', type: 'streek', text: '26 Helmond - Gemert', pdf: '/routes/26.pdf', map: 'https://goo.gl/maps/33oHJptjDKoyeTV27?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
      { id: 'r28', type: 'streek', text: '28 Deurne - Meijel', pdf: '/routes/28.pdf', map: 'https://goo.gl/maps/TqL7tE7qQh8vbjcT7?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
      { id: 'r51', type: 'streek', text: '51 Helmond Eeuwsels', pdf: '/routes/51.pdf', map: 'https://goo.gl/maps/3NKXvMCmV92f4Bev8?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
      { id: 'r52', type: 'streek', text: '52 Helmond Rijpelberg', pdf: '/routes/52.pdf', map: 'https://goo.gl/maps/7hPPB8ZNq6PHcM6b9?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
      { id: 'r53', type: 'streek', text: '53 Helmond Straakven', pdf: '/routes/53.pdf', map: 'https://goo.gl/maps/sLirkmvixTATiw7V7?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
      { id: 'r54', type: 'streek', text: '54 Helmond Brouwhuis', pdf: '/routes/54.pdf', map: 'https://goo.gl/maps/fRwZ4hcpxHcMbpHv6?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
      { id: 'r55', type: 'streek', text: '55 Helmond Stiphout', pdf: '/routes/55.pdf', map: 'https://goo.gl/maps/NVuA2oQhG16v88669?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
      { id: 'r120', type: 'streek', text: '120 Best NS - ASML gebouw 4', pdf: '/routes/120.pdf', map: 'https://goo.gl/maps/TxpRYt8Jxkhh2Fk17?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
      { id: 'r123', type: 'streek', text: '123 Gemert Pelgrimsrust - Boxmeer', pdf: '/routes/123.pdf', map: 'https://goo.gl/maps/qWGwUtdUUNRXB5MD8?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
      { id: 'r150', type: 'streek', text: '150 Helmond - Helmond \'t Hout', pdf: '/routes/150.pdf', map: 'https://goo.gl/maps/PpE8g8jfWTkNSWwS6?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
      { id: 'r317', type: 'streek', text: '317 Eindhoven - Dommelen', pdf: '/routes/317.pdf', map: 'https://goo.gl/maps/6VGZqioQwPVqZta57?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
      { id: 'r318', type: 'streek', text: '318 Eindhoven - Luyksgestel', pdf: '/routes/318.pdf', map: 'https://goo.gl/maps/vC9yVfv6rtfeETKy5?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
      { id: 'r319', type: 'streek', text: '319 Eindhoven - Reusel', pdf: '/routes/319.pdf', map: 'https://goo.gl/maps/4JJ1icwuqNwCeUrh7?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
      { id: 'r320', type: 'streek', text: '320 Eindhoven - Helmond via Asten', pdf: '/routes/320.pdf', map: 'https://goo.gl/maps/WSyXUrgdBGnSfnHk9?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
      { id: 'r321', type: 'streek', text: '321 Eindhoven - Gemert Pelgrimsrust', pdf: '/routes/321.pdf', map: 'https://goo.gl/maps/di715Und6vygLtiQ7?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
      { id: 'r322', type: 'streek', text: '322 Eindhoven - Uden', pdf: '/routes/322.pdf', map: 'https://goo.gl/maps/NNFGPAnn8Ai451H5A?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
      { id: 'r323', type: 'streek', text: '323 Eindhoven - Gemert Groenesteeg', pdf: '/routes/323.pdf', map: 'https://goo.gl/maps/fsejfuTWoqRGbKe97?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] }
    ]
  },
  {
    id: 'aanvang',
    title: 'Aanvang Dienst & Voorbereiding',
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
    title: 'Voertuig & Bediening',
    icon: <Bus size={22} />,
    items: [
      { id: 'v1', text: 'Stoelinstelling (A t/m L: hoogte, demping, lende, etc.)' },
      { id: 'v2', text: 'Instellen stuurwiel & spiegels' },
      { id: 'v3', text: 'Controle op schade (exterieur & interieur)' },
      { id: 'v4', text: 'Bediening verlichting (cabine & interieur)' },
      { id: 'v5', text: 'Klimaatbediening & ontwaseming' },
      { id: 'v6', text: 'Werking diverse bussen (Iveco, Citea SLFA/LF)' },
      { id: 'v7', text: 'Controle banden, lekkage en vloeistoffen' }
    ]
  },
  {
    id: 'systemen',
    title: 'Boordcomputer & Systemen',
    icon: <Radio size={22} />,
    items: [
      { id: 's1', text: 'Inloggen Viribus (pincode via ROV)' },
      { id: 's2', text: 'Juiste omloop invoeren & rit selecteren' },
      { id: 's3', text: 'Gebruik KAR/VETAG verkeerslicht' },
      { id: 's4', text: 'Kaartverkoop & Ticketbox procedures' },
      { id: 's5', text: 'Tekst- en spraakoproep / Noodoproep' },
      { id: 's6', text: 'Sycada/Rijwijzer: rijstijl opvolgen' },
      { id: 's7', text: 'Gebruik omroepberichten' }
    ]
  }
];

// DATA VOOR CONTACT TABBLAD
const contactData = [
  {
    category: 'ALGEMEEN',
    contacts: [
      { name: 'ROV UTRECHT', phone: '030-2849494' },
      { name: 'Chauffeursverblijf Neckerspoel', phone: '088-6255737' },
      { name: 'Opkomstlokaal Dorgelolaan 50', phone: '040-2466373' },
      { name: 'Kantoor MER en ARM', phone: '088-6255736' },
      { name: 'Planning Dorgelolaan 50', phone: '040-2358630' },
      { name: 'Hermes Verlofelofon', phone: '040-2358639' }
    ]
  },
  {
    category: 'LOGISTIEK & SCHADE',
    contacts: [
      { name: 'Michel van Bakel', phone: '088-6255735' },
      { name: 'Schadetelefoon', phone: '06-38076828' },
      { name: 'E-mail schades', email: 'Schade_eindhoven@connexxion.nl' }, 
      { name: 'Klantenservice (tegenpartij)', phone: '0800-0222277' }
    ]
  },
  {
    category: 'GPD (Management)',
    contacts: [
      { name: 'Thirza van Diepen', phone: '040-2358628' },
      { name: 'Erik Feijen', phone: '040-2358638' },
      { name: 'John Gijsbers', phone: '040-2358657' }
    ]
  },
  {
    category: 'STREEK',
    contacts: [
      { name: 'Michiel Bles', phone: '088-6255731' },
      { name: 'Johan Cuijpers', phone: '088-6255740' },
      { name: 'Debbie Flower', phone: '088-6255730' }
    ]
  },
  {
    category: 'STAD',
    contacts: [
      { name: 'Twan Smid', phone: '088-6522732' },
      { name: 'Mathieu Verberkt', phone: '088-6255733' },
      { name: 'Patrick Houthooft', phone: '088-6255734' }
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
  const [routeSubTab, setRouteSubTab] = useState('stad');
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

  // delta is 1 of -1
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
  const stadRoutes = routeCategory.items.filter(i => i.type === 'stad');
  const streekRoutes = routeCategory.items.filter(i => i.type === 'streek');
  const stadDone = stadRoutes.filter(i => completed.includes(i.id)).length;
  const streekDone = streekRoutes.filter(i => completed.includes(i.id)).length;
  const pathStad = ((baseDone + stadDone) / (baseItems.length + stadRoutes.length)) * 100;
  const pathStreek = ((baseDone + streekDone) / (baseItems.length + streekRoutes.length)) * 100;
  const totalProgress = Math.round(Math.max(pathStad, pathStreek)) || 0;

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
            <div style={{ display: 'flex', background: '#f3f4f6', padding: '4px', borderRadius: '8px', marginBottom: '10px', gap: '4px' }}>
              <button onClick={() => setRouteSubTab('stad')} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: 'none', fontSize: '0.9rem', fontWeight: 'bold', background: routeSubTab === 'stad' ? 'white' : 'transparent', color: routeSubTab === 'stad' ? 'var(--bravo-purple)' : '#6b7280' }}>Stadslijnen</button>
              <button onClick={() => setRouteSubTab('streek')} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: 'none', fontSize: '0.9rem', fontWeight: 'bold', background: routeSubTab === 'streek' ? 'white' : 'transparent', color: routeSubTab === 'streek' ? 'var(--bravo-purple)' : '#6b7280' }}>Streeklijnen</button>
            </div>
            <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '10px' }}>
              {routeCategory.items.filter(item => item.type === routeSubTab).map((item) => (
                <div key={item.id} className="checkbox-item" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div className="checkbox-content" onClick={() => toggleItem(item.id)} style={{ flex: 1 }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '6px', border: completed.includes(item.id) ? 'none' : '2px solid #d1d5db', background: completed.includes(item.id) ? 'var(--success)' : 'transparent', marginRight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>{completed.includes(item.id) && <CheckCircle2 size={16} />}</div>
                      <span style={{ textDecoration: completed.includes(item.id) ? 'line-through' : 'none', color: completed.includes(item.id) ? '#9ca3af' : 'inherit', fontSize: '1rem', fontWeight: '500' }}>{item.text}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {item.map && item.map !== '#' && <a href={item.map} target="_blank" className="pdf-btn"><MapPin size={16} /></a>}
                      {item.pdf && <a href={item.pdf} target="_blank" className="pdf-btn"><FileText size={16} /></a>}
                      {item.videos && <button onClick={() => setVideoModal(item)} className="pdf-btn" style={{ background: '#fee2e2', color: '#dc2626', borderColor: '#fecaca' }}><Youtube size={16} /></button>}
                    </div>
                  </div>
                  
                  {/* TURF SECTIE: [-] Icoon [+] */}
                  <div style={{ display: 'flex', gap: '20px', marginLeft: '39px', padding: '10px 0 5px 0' }}>
                    
                    {/* Meegereden (M) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <button 
                        onClick={() => updateTally(item.id, 'm', -1)} 
                        style={{ border: '1px solid #bae6fd', background: 'white', color: '#0369a1', borderRadius: '6px', padding: '4px', cursor: 'pointer' }}
                      >
                        <Minus size={14} />
                      </button>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f0f9ff', color: '#0369a1', padding: '4px 10px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold', border: '1px solid #bae6fd' }}>
                        <Eye size={14} /> M: {tallies[item.id]?.m || 0}
                      </div>
                      <button 
                        onClick={() => updateTally(item.id, 'm', 1)} 
                        style={{ border: '1px solid #bae6fd', background: 'white', color: '#0369a1', borderRadius: '6px', padding: '4px', cursor: 'pointer' }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Zelf gereden (Z) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <button 
                        onClick={() => updateTally(item.id, 'z', -1)} 
                        style={{ border: '1px solid #bbf7d0', background: 'white', color: '#15803d', borderRadius: '6px', padding: '4px', cursor: 'pointer' }}
                      >
                        <Minus size={14} />
                      </button>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f0fdf4', color: '#15803d', padding: '4px 10px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold', border: '1px solid #bbf7d0' }}>
                        <Navigation size={14} /> Z: {tallies[item.id]?.z || 0}
                      </div>
                      <button 
                        onClick={() => updateTally(item.id, 'z', 1)} 
                        style={{ border: '1px solid #bbf7d0', background: 'white', color: '#15803d', borderRadius: '6px', padding: '4px', cursor: 'pointer' }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHECKLIST TAB */}
        {mainTab === 'checklist' && (
          <div>
            {baseCategories.map((category) => (
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

        {/* INFO TAB */}
        {mainTab === 'info' && (
          <div>
            <div className="card" style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '15px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#dc2626', fontWeight: 'bold', marginBottom: '8px' }}>
                <ShieldAlert size={20} /> ZIEKMELDEN
              </div>
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
                      {c.phone && (
                        <a href={`tel:${c.phone}`} className="pdf-btn" style={{ background: 'white', color: 'var(--bravo-purple)', borderColor: 'var(--bravo-purple)', padding: '6px 12px' }}>
                          <Phone size={14} /> {c.phone}
                        </a>
                      )}
                      {c.email && (
                        <a href={`mailto:${c.email}`} className="pdf-btn" style={{ background: '#f0f9ff', color: '#0369a1', borderColor: '#bae6fd', padding: '6px 12px' }}>
                          <Mail size={14} /> E-mail
                        </a>
                      )}
                      {!c.phone && !c.email && <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>{c.info}</span>}
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
