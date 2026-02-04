'use client';

import { useState, useEffect } from 'react';
import { Bus, CheckCircle2, Map, ShieldAlert, Users, Radio, FileText, MapPin, Clock, Zap, Plus, Minus, Trash2, Youtube, X, Navigation, Eye, ClipboardCheck, Phone, Mail, Info, MessageSquare, ExternalLink } from 'lucide-react';

const initialCategories = [
  {
    id: 'routes',
    title: '1. Routekennis & Lijnverkenning',
    icon: <Map size={22} />,
    isRouteCategory: true,
    items: [
      /* EINDHOVEN STAD */
      { id: 'r2', type: 'ehv-stad', text: '2 Blixembosch Oost', pdf: '/routes/2.pdf', map: 'https://goo.gl/maps/XLAb4E1GnEB1hbRf7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/-lxwwVMe5Bc' }, { label: 'Terugrit', url: 'https://youtu.be/JgIIPRHSRpw' }] },
      { id: 'r3', type: 'ehv-stad', text: '3 Blixembosch West', pdf: '/routes/3.pdf', map: 'https://goo.gl/maps/6KgygAyk6dKcLe9c9', videos: [{ label: 'Heenrit', url: 'https://youtu.be/FOveDAGeTOQ' }, { label: 'Terugrit', url: 'https://youtu.be/C13yjlCQHSI' }] },
      { id: 'r4', type: 'ehv-stad', text: '4 Heesterakker', pdf: '/routes/4.pdf', map: 'https://goo.gl/maps/VC6H4upjx4VWJkLa9', videos: [{ label: 'Heenrit', url: 'https://youtu.be/XrY2w3J-110' }, { label: 'Terugrit', url: 'https://youtu.be/W2d4MJ8NUNs' }] },
      { id: 'r5', type: 'ehv-stad', text: "5 't Hofke", pdf: '/routes/5.pdf', map: 'https://goo.gl/maps/ZVRxNdkkF84TTFcr9', videos: [{ label: 'Heenrit', url: 'https://youtu.be/RMFC7Lkl93g' }, { label: 'Terugrit', url: 'https://youtu.be/CzLnjtHiXvM' }] },
      { id: 'r6', type: 'ehv-stad', text: '6 Nuenen', pdf: '/routes/6.pdf', map: 'https://goo.gl/maps/rinLtqdqrpNdFrHu6', videos: [{ label: 'Heenrit', url: 'https://youtu.be/cUZ1WVWMaPk' }, { label: 'Terugrit', url: 'https://youtu.be/F6GKdJr-yZk' }] },
      { id: 'r7', type: 'ehv-stad', text: '7 Veldhoven MMC via Aalst', pdf: '/routes/7.pdf', map: 'https://goo.gl/maps/2wn2ri42YPjDRTkc7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/5ag9cERVlEo' }, { label: 'Terugrit', url: 'https://youtu.be/iyiD4q_xTTU' }] },
      { id: 'r8', type: 'ehv-stad', text: '8 Acht/Kapelbeemd', pdf: '/routes/8.pdf', map: 'https://goo.gl/maps/KDJdAMPYmtCU793o6', videos: [{ label: 'Heenrit Acht', url: 'https://youtu.be/rhj1kWFMGs8' }, { label: 'Terugrit Acht', url: 'https://youtu.be/r35PmIQS6mM' }, { label: 'Heenrit Kapelbeemd', url: 'https://youtu.be/RACYUSmZn9A' }, { label: 'Terugrit Kapelbeemd', url: 'https://youtu.be/rG9rXCCf3q0' }] },
      { id: 'r10', type: 'ehv-stad', text: '10 Oirschot Kazerne', pdf: '/routes/10.pdf', map: 'https://goo.gl/maps/u1VCM98XLR4gibQy6', videos: [] },
      { id: 'r12', type: 'ehv-stad', text: '12 Gijzenrooi', pdf: '/routes/12.pdf', map: 'https://goo.gl/maps/pvcsGEmrZuyuidX3A', videos: [{ label: 'Heenrit', url: 'https://youtu.be/_sam4opdeS8' }, { label: 'Terugrit', url: 'https://youtu.be/rL4oMyl0eSU' }] },
      { id: 'r14', type: 'ehv-stad', text: '14 Veldhoven Zilverackers', pdf: '/routes/14.pdf', map: 'https://goo.gl/maps/b3rHcKpHwrB7sqR18', videos: [{ label: 'Heenrit', url: 'https://youtu.be/jFs0mg9fgNA' }, { label: 'Terugrit', url: 'https://youtu.be/67ecioM8dgM' }] },
      { id: 'r15', type: 'ehv-stad', text: '15 Veldhoven Abdijlaan', pdf: '/routes/15.pdf', map: 'https://goo.gl/maps/zT7RyaGGEfFwBFNA8', videos: [{ label: 'Heenrit', url: 'https://youtu.be/YYJxYVIlESE' }, { label: 'Terugrit', url: 'https://youtu.be/TXFJItf8eyA' }] },
      { id: 'r16', type: 'ehv-stad', text: '16 Veldhoven MMC', pdf: '/routes/16.pdf', map: 'https://goo.gl/maps/NB9B2serhaqnsz6b8', videos: [{ label: 'Heenrit', url: 'https://youtu.be/Vlj9ucKrZZQ' }, { label: 'Terugrit', url: 'https://youtu.be/OsRDvAVLXj8' }] },
      { id: 'r17', type: 'ehv-stad', text: '17 Roosten', pdf: '/routes/17.pdf', map: 'https://goo.gl/maps/ypypjG6zZmFaBKmA8', videos: [{ label: 'Heenrit', url: 'https://youtu.be/2MmyuC6nFow' }, { label: 'Terugrit', url: 'https://youtu.be/GIeFM5LY1T8' }] },
      { id: 'r114', type: 'ehv-stad', text: '114 De Hurk', pdf: '/routes/114.pdf', map: 'https://goo.gl/maps/wNVDqY412Jo6KyMk7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/hBhwXIudYsA' }, { label: 'Terugrit', url: 'https://youtu.be/pe3djrT9mFk' }] },
      { id: 'r119', type: 'ehv-stad', text: '119 ASML', pdf: '/routes/119.pdf', map: 'https://goo.gl/maps/BzQ61zRScuEGTxda7', videos: [] },
      { id: 'r324', type: 'ehv-stad', text: '324 Geldrop Coevering', pdf: '/routes/324.pdf', map: 'https://goo.gl/maps/qH9iWy8QDboPPUyk7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/bqwSqdBEpqU' }, { label: 'Terugrit', url: 'https://youtu.be/UUhg-zk6wkc' }] },
      { id: 'r400', type: 'ehv-stad', text: '400 Airport Shuttle', pdf: '/routes/400.pdf', map: 'https://goo.gl/maps/ukBjWkZWs8BAfP2c9', videos: [{ label: 'Heenrit', url: 'https://youtu.be/UodaTz-F8g8' }, { label: 'Terugrit', url: 'https://youtu.be/35rQzFIwjdA' }] },
      { id: 'r401', type: 'ehv-stad', text: '401 Airport', pdf: '/routes/401.pdf', map: 'https://goo.gl/maps/wZXxBwX7d1jpmdfQ6', videos: [{ label: 'Heenrit', url: 'https://youtu.be/S4wa7yT9BcY' }, { label: 'Terugrit', url: 'https://youtu.be/UYfUHZnInT0' }] },
      { id: 'r402', type: 'ehv-stad', text: '402 Veldhoven Zonderwijk', pdf: '/routes/402.pdf', map: 'https://goo.gl/maps/AzkdnKNpGggagMym6', videos: [{ label: 'Heenrit', url: 'https://youtu.be/0db7B2OBmAk' }, { label: 'Terugrit', url: 'https://youtu.be/3_sUF1g4BFk' }] },
      { id: 'r403', type: 'ehv-stad', text: '403 Veldhoven De Dom/Berg', pdf: '/routes/403.pdf', map: 'https://goo.gl/maps/t2tt2P7CTcL61hKa7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/f6mmCG03w8w' }, { label: 'Terugrit', url: 'https://youtu.be/Z1_s1DaR9_M' }] },
      { id: 'r404', type: 'ehv-stad', text: '404 Nuenen Centrum', pdf: '/routes/404.pdf', map: 'https://goo.gl/maps/BnVdowtnS5JXrogm7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/xRBWLs0bssE' }, { label: 'Terugrit', url: 'https://youtu.be/awResSEsx3g' }] },
      { id: 'r405', type: 'ehv-stad', text: '405 Achtse Barrier', pdf: '/routes/405.pdf', map: 'https://goo.gl/maps/MYakec5RN3dmyHKA9', videos: [{ label: 'Heenrit', url: 'https://youtu.be/qCH0vxpLReg' }, { label: 'Terugrit', url: 'https://youtu.be/C7po5lSwkWs' }] },
      { id: 'r406', type: 'ehv-stad', text: '406 Ekkersrijt', pdf: '/routes/406.pdf', map: 'https://goo.gl/maps/8ZBA4gaG6xzNEcck7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/YZ_OvPiRWiM' }, { label: 'Terugrit', url: 'https://youtu.be/o3MqkdyIYQw' }] },
      { id: 'r407', type: 'ehv-stad', text: '407 HTC', pdf: '/routes/407.pdf', map: 'https://goo.gl/maps/kF7NkrEyib22hX8E7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/5t3EnIp3lgQ' }, { label: 'Terugrit', url: 'https://youtu.be/t6lf-XjaI3s' }] },
      { id: 'r408', type: 'ehv-stad', text: '408 HTC', pdf: '/routes/408.pdf', map: 'https://goo.gl/maps/WDsWBvYGW1KhW8Rh9', videos: [{ label: 'Heenrit', url: 'https://youtu.be/dIR14bagsC4' }, { label: 'Terugrit', url: 'https://youtu.be/GS-lHE_R0WY' }] },
      { id: 'r614', type: 'ehv-stad', text: '614 Jozef Eliasweg', map: '#' },

      /* EINDHOVEN STREEK */
      { id: 'r2', type: 'ehv-streek', text: '2 Blixembosch Oost', pdf: '/routes/2.pdf', map: 'https://goo.gl/maps/XLAb4E1GnEB1hbRf7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/-lxwwVMe5Bc' }, { label: 'Terugrit', url: 'https://youtu.be/JgIIPRHSRpw' }] },
      { id: 'r3', type: 'ehv-streek', text: '3 Blixembosch West', pdf: '/routes/3.pdf', map: 'https://goo.gl/maps/6KgygAyk6dKcLe9c9', videos: [{ label: 'Heenrit', url: 'https://youtu.be/FOveDAGeTOQ' }, { label: 'Terugrit', url: 'https://youtu.be/C13yjlCQHSI' }] },
      { id: 'r4', type: 'ehv-streek', text: '4 Heesterakker', pdf: '/routes/4.pdf', map: 'https://goo.gl/maps/VC6H4upjx4VWJkLa9', videos: [{ label: 'Heenrit', url: 'https://youtu.be/XrY2w3J-110' }, { label: 'Terugrit', url: 'https://youtu.be/W2d4MJ8NUNs' }] },
      { id: 'r5', type: 'ehv-streek', text: "5 't Hofke", pdf: '/routes/5.pdf', map: 'https://goo.gl/maps/ZVRxNdkkF84TTFcr9', videos: [{ label: 'Heenrit', url: 'https://youtu.be/RMFC7Lkl93g' }, { label: 'Terugrit', url: 'https://youtu.be/CzLnjtHiXvM' }] },
      { id: 'r6', type: 'ehv-streek', text: '6 Nuenen', pdf: '/routes/6.pdf', map: 'https://goo.gl/maps/rinLtqdqrpNdFrHu6', videos: [{ label: 'Heenrit', url: 'https://youtu.be/cUZ1WVWMaPk' }, { label: 'Terugrit', url: 'https://youtu.be/F6GKdJr-yZk' }] },
      { id: 'r7', type: 'ehv-streek', text: '7 Veldhoven MMC via Aalst', pdf: '/routes/7.pdf', map: 'https://goo.gl/maps/2wn2ri42YPjDRTkc7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/5ag9cERVlEo' }, { label: 'Terugrit', url: 'https://youtu.be/iyiD4q_xTTU' }] },
      { id: 'r8', type: 'ehv-streek', text: '8 Acht/Kapelbeemd', pdf: '/routes/8.pdf', map: 'https://goo.gl/maps/KDJdAMPYmtCU793o6', videos: [{ label: 'Heenrit Acht', url: 'https://youtu.be/rhj1kWFMGs8' }, { label: 'Terugrit Acht', url: 'https://youtu.be/r35PmIQS6mM' }, { label: 'Heenrit Kapelbeemd', url: 'https://youtu.be/RACYUSmZn9A' }, { label: 'Terugrit Kapelbeemd', url: 'https://youtu.be/rG9rXCCf3q0' }] },
      { id: 'r9', type: 'ehv-streek', text: '9 Eindhoven - Best', pdf: '/routes/9.pdf', map: 'https://goo.gl/maps/a5P1qJycoE39Jhnc8?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/5kbwv--LCu8' }, { label: 'Terugrit', url: 'https://youtu.be/QrLTNx41JWU' }] },
      { id: 'r10', type: 'ehv-streek', text: '10 Oirschot Kazerne', pdf: '/routes/10.pdf', map: 'https://goo.gl/maps/u1VCM98XLR4gibQy6', videos: [] },
      { id: 'r11', type: 'ehv-streek', text: '11 Eindhoven - Weert NS', pdf: '/routes/11.pdf', map: 'https://goo.gl/maps/44XVLgFnh5fH7Dvc8?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/5qiDFBfGH0o' }, { label: 'Terugrit', url: 'https://youtu.be/qb78B89VKbg' }] },
      { id: 'r12', type: 'ehv-streek', text: '12 Gijzenrooi', pdf: '/routes/12.pdf', map: 'https://goo.gl/maps/pvcsGEmrZuyuidX3A', videos: [{ label: 'Heenrit', url: 'https://youtu.be/_sam4opdeS8' }, { label: 'Terugrit', url: 'https://youtu.be/rL4oMyl0eSU' }] },
      { id: 'r14', type: 'ehv-streek', text: '14 Veldhoven Zilverackers', pdf: '/routes/14.pdf', map: 'https://goo.gl/maps/b3rHcKpHwrB7sqR18', videos: [{ label: 'Heenrit', url: 'https://youtu.be/jFs0mg9fgNA' }, { label: 'Terugrit', url: 'https://youtu.be/67ecioM8dgM' }] },
      { id: 'r15', type: 'ehv-streek', text: '15 Veldhoven Abdijlaan', pdf: '/routes/15.pdf', map: 'https://goo.gl/maps/zT7RyaGGEfFwBFNA8', videos: [{ label: 'Heenrit', url: 'https://youtu.be/YYJxYVIlESE' }, { label: 'Terugrit', url: 'https://youtu.be/TXFJItf8eyA' }] },
      { id: 'r16', type: 'ehv-streek', text: '16 Veldhoven MMC', pdf: '/routes/16.pdf', map: 'https://goo.gl/maps/NB9B2serhaqnsz6b8', videos: [{ label: 'Heenrit', url: 'https://youtu.be/Vlj9ucKrZZQ' }, { label: 'Terugrit', url: 'https://youtu.be/OsRDvAVLXj8' }] },
      { id: 'r17', type: 'ehv-streek', text: '17 Roosten', pdf: '/routes/17.pdf', map: 'https://goo.gl/maps/ypypjG6zZmFaBKmA8', videos: [{ label: 'Heenrit', url: 'https://youtu.be/2MmyuC6nFow' }, { label: 'Terugrit', url: 'https://youtu.be/GIeFM5LY1T8' }] },
      { id: 'r18', type: 'ehv-streek', text: '18 Eindhoven - Bergeijk Loo', pdf: '/routes/18.pdf', map: 'https://goo.gl/maps/jFNJHZ7X1p4a8np69?g_st=ac', videos: [] },
      { id: 'r19', type: 'ehv-streek', text: '19 Eindhoven - Bladel', pdf: '/routes/19.pdf', map: 'https://goo.gl/maps/5JPt3zvstws5gBzf6?g_st=ac', videos: [] },
      { id: 'r20', type: 'ehv-streek', text: '20 Best NS - HTC', pdf: '/routes/20 (1).pdf', map: 'https://goo.gl/maps/DzPyz1xXHau3Y2XQ9?g_st=ac', videos: [] },
      { id: 'r23', type: 'ehv-streek', text: '23 Boxmeer', pdf: '/routes/23.pdf', map: 'https://goo.gl/maps/pBPPvrjBJjB3d4N89?g_st=ac', videos: [] },
      { id: 'r24', type: 'ehv-streek', text: '24 Eindhoven - Helmond via Geldrop', pdf: '/routes/24.pdf', map: 'https://goo.gl/maps/x8JAUt1SAJZcLfem7?g_st=ac', videos: [] },
      { id: 'r25', type: 'ehv-streek', text: '25 Helmond - Gemert Pelgrimsrust', pdf: '/routes/25.pdf', map: 'https://goo.gl/maps/D5RWqdKkpQLaceaA8?g_st=ac', videos: [] },
      { id: 'r26', type: 'ehv-streek', text: '26 Helmond - Gemert', pdf: '/routes/26.pdf', map: 'https://goo.gl/maps/33oHJptjDKoyeTV27?g_st=ac', videos: [] },
      { id: 'r51', type: 'ehv-streek', text: '51 Helmond Eeuwsels', pdf: '/routes/51.pdf', map: 'https://goo.gl/maps/3NKXvMCmV92f4Bev8?g_st=ac', videos: [] },
      { id: 'r114', type: 'ehv-streek', text: '114 De Hurk', pdf: '/routes/114.pdf', map: 'https://goo.gl/maps/wNVDqY412Jo6KyMk7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/hBhwXIudYsA' }, { label: 'Terugrit', url: 'https://youtu.be/pe3djrT9mFk' }] },
      { id: 'r119', type: 'ehv-streek', text: '119 ASML', pdf: '/routes/119.pdf', map: 'https://goo.gl/maps/BzQ61zRScuEGTxda7', videos: [] },
      { id: 'r120', type: 'ehv-streek', text: '120 Best NS - ASML gebouw 4', pdf: '/routes/120.pdf', map: 'https://goo.gl/maps/TxpRYt8Jxkhh2Fk17?g_st=ac', videos: [] },
      { id: 'r150', type: 'ehv-streek', text: '150 Helmond - Helmond \'t Hout', pdf: '/routes/150.pdf', map: 'https://goo.gl/maps/PpE8g8jfWTkNSWwS6?g_st=ac', videos: [] },
      { id: 'r317', type: 'ehv-streek', text: '317 Dommelen', pdf: '/routes/317.pdf', map: 'https://goo.gl/maps/6VGZqioQwPVqZta57?g_st=ac', videos: [] },
      { id: 'r318', type: 'ehv-streek', text: '318 Luyksgestel', pdf: '/routes/318.pdf', map: 'https://goo.gl/maps/vC9yVfv6rtfeETKy5?g_st=ac', videos: [] },
      { id: 'r319', type: 'ehv-streek', text: '319 Reusel', pdf: '/routes/319.pdf', map: 'https://goo.gl/maps/4JJ1icwuqNwCeUrh7?g_st=ac', videos: [] },
      { id: 'r320', type: 'ehv-streek', text: '320 Eindhoven - Helmond via Asten', pdf: '/routes/320.pdf', map: 'https://goo.gl/maps/WSyXUrgdBGnSfnHk9?g_st=ac', videos: [] },
      { id: 'r321', type: 'ehv-streek', text: '321 Eindhoven - Gemert Pelgrimsrust', pdf: '/routes/321.pdf', map: 'https://goo.gl/maps/di715Und6vygLtiQ7?g_st=ac', videos: [] },
      { id: 'r322', type: 'ehv-streek', text: '322 Eindhoven - Uden', pdf: '/routes/322.pdf', map: 'https://goo.gl/maps/NNFGPAnn8Ai451H5A?g_st=ac', videos: [] },
      { id: 'r323', type: 'ehv-streek', text: '323 Eindhoven - Gemert Groenesteeg', pdf: '/routes/323.pdf', map: 'https://goo.gl/maps/fsejfuTWoqRGbKe97?g_st=ac', videos: [] },
      { id: 'r324', type: 'ehv-streek', text: '324 Geldrop Coevering', pdf: '/routes/324.pdf', map: 'https://goo.gl/maps/qH9iWy8QDboPPUyk7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/bqwSqdBEpqU' }, { label: 'Terugrit', url: 'https://youtu.be/UUhg-zk6wkc' }] },
      { id: 'r614', type: 'ehv-streek', text: '614 Jozef Eliasweg', map: '#', videos: [] },

      /* REUSEL / VALKENSWAARD */
      { id: 'r18-v', type: 'reusel-valkenswaard', text: '18 Bergeijk Loo', pdf: '/routes/18.pdf', map: 'https://goo.gl/maps/jFNJHZ7X1p4a8np69?g_st=ac' },
      { id: 'r19-v', type: 'reusel-valkenswaard', text: '19 Bladel', pdf: '/routes/19.pdf', map: 'https://goo.gl/maps/5JPt3zvstws5gBzf6?g_st=ac' },
      { id: 'r317-v', type: 'reusel-valkenswaard', text: '317 Dommelen', pdf: '/routes/317.pdf', map: 'https://goo.gl/maps/6VGZqioQwPVqZta57?g_st=ac' },
      { id: 'r318-v', type: 'reusel-valkenswaard', text: '318 Luyksgestel', pdf: '/routes/318.pdf', map: 'https://goo.gl/maps/vC9yVfv6rtfeETKy5?g_st=ac' },
      { id: 'r319-v', type: 'reusel-valkenswaard', text: '319 Reusel', pdf: '/routes/319.pdf', map: 'https://goo.gl/maps/4JJ1icwuqNwCeUrh7?g_st=ac' },

      /* HELMOND */
      { id: 'r23-h', type: 'helmond', text: '23 Boxmeer', pdf: '/routes/23.pdf', map: 'https://goo.gl/maps/pBPPvrjBJjB3d4N89?g_st=ac' },
      { id: 'r24-h', type: 'helmond', text: '24 Helmond via Geldrop/Mierlo', pdf: '/routes/24.pdf', map: 'https://goo.gl/maps/x8JAUt1SAJZcLfem7?g_st=ac' },
      { id: 'r25-h', type: 'helmond', text: '25 Helmond - Gemert Pelgrimsrust', pdf: '/routes/25.pdf', map: 'https://goo.gl/maps/D5RWqdKkpQLaceaA8?g_st=ac' },
      { id: 'r26-h', type: 'helmond', text: '26 Helmond - Gemert', pdf: '/routes/26.pdf', map: 'https://goo.gl/maps/33oHJptjDKoyeTV27?g_st=ac' },
      { id: 'r28-h', type: 'helmond', text: '28 Deurne - Meijel', pdf: '/routes/28.pdf', map: 'https://goo.gl/maps/TqL7tE7qQh8vbjcT7?g_st=ac' },
      { id: 'r51-h', type: 'helmond', text: '51 Helmond Eeuwsels', pdf: '/routes/51.pdf', map: 'https://goo.gl/maps/3NKXvMCmV92f4Bev8?g_st=ac' },
      { id: 'r52-h', type: 'helmond', text: '52 Helmond Rijpelberg', pdf: '/routes/52.pdf', map: 'https://goo.gl/maps/7hPPB8ZNq6PHcM6b9?g_st=ac' },
      { id: 'r53-h', type: 'helmond', text: '53 Helmond Straakven', pdf: '/routes/53.pdf', map: 'https://goo.gl/maps/sLirkmvixTATiw7V7?g_st=ac' },
      { id: 'r54-h', type: 'helmond', text: '54 Helmond Brouwhuis', pdf: '/routes/54.pdf', map: 'https://goo.gl/maps/fRwZ4hcpxHcMbpHv6?g_st=ac' },
      { id: 'r55-h', type: 'helmond', text: '55 Helmond Stiphout', pdf: '/routes/55.pdf', map: 'https://goo.gl/maps/NVuA2oQhG16v88669?g_st=ac' },
      { id: 'r123-h', type: 'helmond', text: '123 Gemert Pelgrimsrust - Boxmeer', pdf: '/routes/123.pdf', map: 'https://goo.gl/maps/qWGwUtdUUNRXB5MD8?g_st=ac' },
      { id: 'r150-h', type: 'helmond', text: '150 Helmond - Helmond \'t Hout', pdf: '/routes/150.pdf', map: 'https://goo.gl/maps/PpE8g8jfWTkNSWwS6?g_st=ac' },

      /* SCHOLIEREN */
      { id: 'r610', type: 'scholieren', text: '610 Internationale school', map: '#' },
      { id: 'r614', type: 'scholieren', text: '614 Jozef Eliasweg', map: '#' }
    ]
  },
  {
    id: 'aanvang',
    title: '2. Aanvang Dienst & Voorbereiding',
    icon: <Clock size={22} />,
    items: [
      { id: 'a1', text: 'Kledingvoorschrift & schoenen in orde' },
      { id: 'a2', text: 'Zich aanmelden via computer' },
      { id: 'a3', text: 'Mededelingen en aanschrijvingen lezen' },
      { id: 'a4', text: 'Controleren van stallingsplan' },
      { id: 'a5', text: 'Juiste voertuigtype pakken' }
    ]
  },
  {
    id: 'voertuig',
    title: '3. Voertuig & Bediening',
    icon: <Bus size={22} />,
    items: [
      { id: 'v1', text: 'Stoelinstelling (A t/m L)' },
      { id: 'v2', text: 'Instellen stuurwiel & spiegels' },
      { id: 'v3', text: 'Controle op schade' },
      { id: 'v4', text: 'Bediening verlichting' },
      { id: 'v5', text: 'Klimaatbediening & ontwaseming' }
    ]
  },
  {
    id: 'systemen',
    title: '4. Boordcomputer & Systemen',
    icon: <Radio size={22} />,
    items: [
      { id: 's1', text: 'Inloggen Viribus (pincode via ROV)' },
      { id: 's2', text: 'Juiste omloop invoeren' },
      { id: 's3', text: 'Gebruik KAR/VETAG' },
      { id: 's4', text: 'Kaartverkoop & Ticketbox' }
    ]
  }
];

const contactData = [
  {
    category: 'ALGEMEEN',
    contacts: [
      { name: 'ROV UTRECHT', phone: '030-2849494' },
      { name: 'Neckerspoel', phone: '088-6255737' },
      { name: 'Opkomstlokaal Dorgelolaan 50', phone: '040-2466373' },
      { name: 'Kantoor MER Neckerspoel', phone: '088-6255736' },
      { name: 'Planning Dorgelolaan 50', phone: '040-2358630' },
      { name: 'Hermes Verloftelefoon', phone: '040-2358639' }
    ]
  },
  {
    category: 'OMLEIDINGEN & SCHADE',
    contacts: [
      { name: 'E-mail omleidingen', email: 'omleidingen@hermesgroep.nl' },
      { name: 'Michel van Bakel', phone: '088-6255735' },
      { name: 'Schadetelefoon', phone: '06-38076828' },
      { name: 'E-mail schades', email: 'Schade_eindhoven@connexxion.nl' },
      { name: 'Klantenservice (tegenpartij)', phone: '0800-0222277' }
    ]
  },
  {
    category: 'GPD (Management)',
    contacts: [
      { name: 'Twan Smid', phone: '06-21600876' },
      { name: 'Thirza van Diepen', phone: '040-2358628' },
      { name: 'Erik Feijen', phone: '040-2358638' },
      { name: 'John Gijsbers', phone: '040-2358657' }
    ]
  },
  {
    category: 'RAYONTEAMS',
    contacts: [
      { name: 'Michiel Bles', phone: '088-6255731' },
      { name: 'Johan Cuijpers', phone: '088-6255740' },
      { name: 'Mark Zwijnenburg', phone: '088-6255733' },
      { name: 'Patrick Houthooft', phone: '088-6255734' }
    ]
  }
];

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

  const baseCategories = initialCategories.filter(c => !c.isRouteCategory);
  const baseItems = baseCategories.flatMap(c => c.items);
  const baseDone = baseItems.filter(i => completed.includes(i.id)).length;
  const routeCategory = initialCategories.find(c => c.id === 'routes');
  const routeTypes = ['ehv-stad', 'ehv-streek', 'reusel-valkenswaard', 'helmond', 'scholieren'];
  
  const pathPercentages = routeTypes.map(t => {
    const typeItems = routeCategory.items.filter(i => i.type === t);
    const typeDone = typeItems.filter(i => completed.includes(i.id)).length;
    const totalCount = baseItems.length + typeItems.length;
    return totalCount === 0 ? 0 : ((baseDone + typeDone) / totalCount) * 100;
  });

  const totalProgress = Math.round(Math.max(...pathPercentages)) || 0;
  const currentTabItems = routeCategory.items.filter(i => i.type === routeSubTab);
  const currentTabDone = currentTabItems.filter(i => completed.includes(i.id)).length;
  const progressCurrentTab = Math.round((currentTabDone / (currentTabItems.length || 1)) * 100) || 0;

  return (
    <div>
      {/* PDF MODAL MET IPHONE FIX */}
      {pdfModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'white', zIndex: 2000, display: 'flex', flexDirection: 'column' }}>
           <div style={{ padding: '15px', background: 'var(--bravo-purple)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{pdfModal.text}</span>
              <button onClick={() => setPdfModal(null)} style={{ background: 'white', color: 'var(--bravo-purple)', border: 'none', padding: '8px 15px', borderRadius: '8px', fontWeight: 'bold' }}>SLUITEN</button>
           </div>
           <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
              <iframe 
                src={`https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + pdfModal.pdf)}&embedded=true`}
                style={{ width: '100%', height: '100%', border: 'none' }}
              ></iframe>
           </div>
           <div style={{ padding: '10px', textAlign: 'center', background: '#f3f4f6' }}>
              <a href={pdfModal.pdf} target="_blank" style={{ fontSize: '0.8rem', color: 'var(--bravo-purple)', fontWeight: 'bold', textDecoration: 'none' }}>Laden mislukt? Open PDF direct</a>
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
        {mainTab === 'routes' && (
          <div className="card">
            <div className="category-header"><Map size={22} /><span className="category-title">Lijnverkenning</span></div>
            
            <div style={{ display: 'flex', overflowX: 'auto', background: '#f3f4f6', padding: '4px', borderRadius: '8px', marginBottom: '10px', gap: '4px', whiteSpace: 'nowrap' }} className="no-scrollbar">
              <button onClick={() => setRouteSubTab('ehv-stad')} style={{ padding: '8px 15px', borderRadius: '6px', border: 'none', fontSize: '0.8rem', fontWeight: 'bold', background: routeSubTab === 'ehv-stad' ? 'white' : 'transparent', color: routeSubTab === 'ehv-stad' ? 'var(--bravo-purple)' : '#6b7280' }}>Eindhoven STAD</button>
              <button onClick={() => setRouteSubTab('ehv-streek')} style={{ padding: '8px 15px', borderRadius: '6px', border: 'none', fontSize: '0.8rem', fontWeight: 'bold', background: routeSubTab === 'ehv-streek' ? 'white' : 'transparent', color: routeSubTab === 'ehv-streek' ? 'var(--bravo-purple)' : '#6b7280' }}>Eindhoven STREEK</button>
              <button onClick={() => setRouteSubTab('reusel-valkenswaard')} style={{ padding: '8px 15px', borderRadius: '6px', border: 'none', fontSize: '0.8rem', fontWeight: 'bold', background: routeSubTab === 'reusel-valkenswaard' ? 'white' : 'transparent', color: routeSubTab === 'reusel-valkenswaard' ? 'var(--bravo-purple)' : '#6b7280' }}>Reusel/Valkenswaard</button>
              <button onClick={() => setRouteSubTab('helmond')} style={{ padding: '8px 15px', borderRadius: '6px', border: 'none', fontSize: '0.8rem', fontWeight: 'bold', background: routeSubTab === 'helmond' ? 'white' : 'transparent', color: routeSubTab === 'helmond' ? 'var(--bravo-purple)' : '#6b7280' }}>Helmond</button>
              <button onClick={() => setRouteSubTab('scholieren')} style={{ padding: '8px 15px', borderRadius: '6px', border: 'none', fontSize: '0.8rem', fontWeight: 'bold', background: routeSubTab === 'scholieren' ? 'white' : 'transparent', color: routeSubTab === 'scholieren' ? 'var(--bravo-purple)' : '#6b7280' }}>Scholieren</button>
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
                      {item.videos && item.videos.length > 0 && <button onClick={() => setVideoModal(item)} className="pdf-btn" style={{ background: '#fee2e2', color: '#dc2626', borderColor: '#fecaca' }}><Youtube size={16} /></button>}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '20px', marginLeft: '39px', padding: '10px 0 5px 0' }}>
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

                  <div style={{ marginLeft: '39px', marginTop: '5px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '4px 10px' }}>
                      <MessageSquare size={14} color="#9ca3af" />
                      <input 
                        type="text" 
                        value={notes[item.id] || ''} 
                        onChange={(e) => updateNote(item.id, e.target.value)}
                        placeholder="Voeg opmerking toe..."
                        style={{ border: 'none', background: 'transparent', fontSize: '0.85rem', width: '100%', outline: 'none', color: '#4b5563' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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

        {mainTab === 'info' && (
          <div>
            <div className="card" style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '15px' }}>
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
                      {c.phone && <a href={`tel:${c.phone}`} className="pdf-btn" style={{ background: 'white', color: 'var(--bravo-purple)', borderColor: 'var(--bravo-purple)', padding: '6px 12px' }}><Phone size={14} /> {c.phone}</a>}
                      {c.email && <a href={`mailto:${c.email}`} className="pdf-btn" style={{ background: '#f0f9ff', color: '#0369a1', borderColor: '#bae6fd', padding: '6px 12px' }}><Mail size={14} /> E-mail</a>}
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
      `}</style>
    </div>
  );
}
