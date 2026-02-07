import { Map, Clock, Bus, Radio } from 'lucide-react';

export const busRoutes = [
  /* EINDHOVEN STAD */
  { id: 'r2', type: 'ehv-stad', text: '2 Blixembosch Oost', pdf: '/routes/2.pdf', map: 'https://goo.gl/maps/XLAb4E1GnEB1hbRf7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/-lxwwVMe5Bc' }, { label: 'Terugrit', url: 'https://youtu.be/JgIIPRHSRpw' }] },
  { id: 'r3', type: 'ehv-stad', text: '3 Blixembosch West', pdf: '/routes/3.pdf', map: 'https://goo.gl/maps/6KgygAyk6dKcLe9c9', videos: [{ label: 'Heenrit', url: 'https://youtu.be/FOveDAGeTOQ' }, { label: 'Terugrit', url: 'https://youtu.be/C13yjlCQHSI' }] },
  { id: 'r4', type: 'ehv-stad', text: '4 Heesterakker', pdf: '/routes/4.pdf', map: 'https://goo.gl/maps/VC6H4upjx4VWJkLa9', videos: [{ label: 'Heenrit', url: 'https://youtu.be/XrY2w3J-110' }, { label: 'Terugrit', url: 'https://youtu.be/W2d4MJ8NUNs' }] },
  { id: 'r5', type: 'ehv-stad', text: "5 't Hofke", pdf: '/routes/5.pdf', map: 'https://goo.gl/maps/ZVRxNdkkF84TTFcr9', videos: [{ label: 'Heenrit', url: 'https://youtu.be/RMFC7Lkl93g' }, { label: 'Terugrit', url: 'https://youtu.be/CzLnjtHiXvM' }] },
  { id: 'r6', type: 'ehv-stad', text: '6 Nuenen', pdf: '/routes/6.pdf', map: 'https://goo.gl/maps/rinLtqdqrpNdFrHu6', videos: [{ label: 'Heenrit', url: 'https://youtu.be/cUZ1WVWMaPk' }, { label: 'Terugrit', url: 'https://youtu.be/F6GKdJr-yZk' }] },
  { id: 'r7', type: 'ehv-stad', text: '7 Veldhoven MMC via Aalst', pdf: '/routes/7.pdf', map: 'https://goo.gl/maps/2wn2ri42YPjDRTkc7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/5ag9cERVlEo' }, { label: 'Terugrit', url: 'https://youtu.be/iyiD4q_xTTU' }] },
  { id: 'r8', type: 'ehv-stad', text: '8 Acht/Kapelbeemd', pdf: '/routes/8.pdf', map: 'https://goo.gl/maps/KDJdAMPYmtCU793o6', videos: [{ label: 'Heenrit Acht', url: 'https://youtu.be/rhj1kWFMGs8' }, { label: 'Terugrit Acht', url: 'https://youtu.be/r35PmIQS6mM' }, { label: 'Heenrit Kapelbeemd', url: 'https://youtu.be/RACYUSmZn9A' }, { label: 'Terugrit Kapelbeemd', url: 'https://youtu.be/rG9rXCCf3q0' }] },
  { id: 'r10', type: 'ehv-stad', text: '10 Oirschot Kazerne', pdf: '/routes/10.pdf', map: 'https://goo.gl/maps/u1VCM98XLR4gibQy6' },
  { id: 'r12', type: 'ehv-stad', text: '12 Gijzenrooi', pdf: '/routes/12.pdf', map: 'https://goo.gl/maps/pvcsGEmrZuyuidX3A', videos: [{ label: 'Heenrit', url: 'https://youtu.be/_sam4opdeS8' }, { label: 'Terugrit', url: 'https://youtu.be/rL4oMyl0eSU' }] },
  { id: 'r14', type: 'ehv-stad', text: '14 Veldhoven Zilverackers', pdf: '/routes/14.pdf', map: 'https://goo.gl/maps/b3rHcKpHwrB7sqR18', videos: [{ label: 'Heenrit', url: 'https://youtu.be/jFs0mg9fgNA' }, { label: 'Terugrit', url: 'https://youtu.be/67ecioM8dgM' }] },
  { id: 'r15', type: 'ehv-stad', text: '15 Veldhoven Abdijlaan', pdf: '/routes/15.pdf', map: 'https://goo.gl/maps/zT7RyaGGEfFwBFNA8', videos: [{ label: 'Heenrit', url: 'https://youtu.be/YYJxYVIlESE' }, { label: 'Terugrit', url: 'https://youtu.be/TXFJItf8eyA' }] },
  { id: 'r16', type: 'ehv-stad', text: '16 Veldhoven MMC', pdf: '/routes/16.pdf', map: 'https://goo.gl/maps/NB9B2serhaqnsz6b8', videos: [{ label: 'Heenrit', url: 'https://youtu.be/Vlj9ucKrZZQ' }, { label: 'Terugrit', url: 'https://youtu.be/OsRDvAVLXj8' }] },
  { id: 'r17', type: 'ehv-stad', text: '17 Roosten', pdf: '/routes/17.pdf', map: 'https://goo.gl/maps/ypypjG6zZmFaBKmA8', videos: [{ label: 'Heenrit', url: 'https://youtu.be/2MmyuC6nFow' }, { label: 'Terugrit', url: 'https://youtu.be/GIeFM5LY1T8' }] },
  { id: 'r114', type: 'ehv-stad', text: '114 De Hurk', pdf: '/routes/114.pdf', map: 'https://goo.gl/maps/wNVDqY412Jo6KyMk7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/hBhwXIudYsA' }, { label: 'Terugrit', url: 'https://youtu.be/pe3djrT9mFk' }] },
  { id: 'r119', type: 'ehv-stad', text: '119 ASML', pdf: '/routes/119.pdf', map: 'https://goo.gl/maps/BzQ61zRScuEGTxda7' },
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
  { id: 'r614', type: 'ehv-stad', text: '614 Jozef Eliasweg', pdf: '/routes/614.pdf', map: 'https://goo.gl/maps/P63ayoVBncr6E1XV9?g_st=ac' },

  /* EINDHOVEN STREEK */
  { id: 'r2', type: 'ehv-streek', text: '2 Blixembosch Oost', pdf: '/routes/2.pdf', map: 'https://goo.gl/maps/XLAb4E1GnEB1hbRf7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/-lxwwVMe5Bc' }, { label: 'Terugrit', url: 'https://youtu.be/JgIIPRHSRpw' }] },
  { id: 'r3', type: 'ehv-streek', text: '3 Blixembosch West', pdf: '/routes/3.pdf', map: 'https://goo.gl/maps/6KgygAyk6dKcLe9c9', videos: [{ label: 'Heenrit', url: 'https://youtu.be/FOveDAGeTOQ' }, { label: 'Terugrit', url: 'https://youtu.be/C13yjlCQHSI' }] },
  { id: 'r4', type: 'ehv-streek', text: '4 Heesterakker', pdf: '/routes/4.pdf', map: 'https://goo.gl/maps/VC6H4upjx4VWJkLa9', videos: [{ label: 'Heenrit', url: 'https://youtu.be/XrY2w3J-110' }, { label: 'Terugrit', url: 'https://youtu.be/W2d4MJ8NUNs' }] },
  { id: 'r5', type: 'ehv-streek', text: "5 't Hofke", pdf: '/routes/5.pdf', map: 'https://goo.gl/maps/ZVRxNdkkF84TTFcr9', videos: [{ label: 'Heenrit', url: 'https://youtu.be/RMFC7Lkl93g' }, { label: 'Terugrit', url: 'https://youtu.be/CzLnjtHiXvM' }] },
  { id: 'r6', type: 'ehv-streek', text: '6 Nuenen', pdf: '/routes/6.pdf', map: 'https://goo.gl/maps/rinLtqdqrpNdFrHu6', videos: [{ label: 'Heenrit', url: 'https://youtu.be/cUZ1WVWMaPk' }, { label: 'Terugrit', url: 'https://youtu.be/F6GKdJr-yZk' }] },
  { id: 'r7', type: 'ehv-streek', text: '7 Veldhoven MMC via Aalst', pdf: '/routes/7.pdf', map: 'https://goo.gl/maps/2wn2ri42YPjDRTkc7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/5ag9cERVlEo' }, { label: 'Terugrit', url: 'https://youtu.be/iyiD4q_xTTU' }] },
  { id: 'r8', type: 'ehv-streek', text: '8 Acht/Kapelbeemd', pdf: '/routes/8.pdf', map: 'https://goo.gl/maps/KDJdAMPYmtCU793o6', videos: [{ label: 'Heenrit Acht', url: 'https://youtu.be/rhj1kWFMGs8' }, { label: 'Terugrit Acht', url: 'https://youtu.be/r35PmIQS6mM' }, { label: 'Heenrit Kapelbeemd', url: 'https://youtu.be/RACYUSmZn9A' }, { label: 'Terugrit Kapelbeemd', url: 'https://youtu.be/rG9rXCCf3q0' }] },
  { id: 'r9', type: 'ehv-streek', text: '9 Eindhoven - Best', pdf: '/routes/9.pdf', map: 'https://goo.gl/maps/a5P1qJycoE39Jhnc8?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/5kbwv--LCu8' }, { label: 'Terugrit', url: 'https://youtu.be/QrLTNx41JWU' }] },
  { id: 'r10', type: 'ehv-streek', text: '10 Oirschot Kazerne', pdf: '/routes/10.pdf', map: 'https://goo.gl/maps/u1VCM98XLR4gibQy6' },
  { id: 'r11', type: 'ehv-streek', text: '11 Eindhoven - Weert NS', pdf: '/routes/11.pdf', map: 'https://goo.gl/maps/44XVLgFnh5fH7Dvc8?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/5qiDFBfGH0o' }, { label: 'Terugrit', url: 'https://youtu.be/qb78B89VKbg' }] },
  { id: 'r12', type: 'ehv-streek', text: '12 Gijzenrooi', pdf: '/routes/12.pdf', map: 'https://goo.gl/maps/pvcsGEmrZuyuidX3A', videos: [{ label: 'Heenrit', url: 'https://youtu.be/_sam4opdeS8' }, { label: 'Terugrit', url: 'https://youtu.be/rL4oMyl0eSU' }] },
  { id: 'r14', type: 'ehv-streek', text: '14 Veldhoven Zilverackers', pdf: '/routes/14.pdf', map: 'https://goo.gl/maps/b3rHcKpHwrB7sqR18', videos: [{ label: 'Heenrit', url: 'https://youtu.be/jFs0mg9fgNA' }, { label: 'Terugrit', url: 'https://youtu.be/67ecioM8dgM' }] },
  { id: 'r15', type: 'ehv-streek', text: '15 Veldhoven Abdijlaan', pdf: '/routes/15.pdf', map: 'https://goo.gl/maps/zT7RyaGGEfFwBFNA8', videos: [{ label: 'Heenrit', url: 'https://youtu.be/YYJxYVIlESE' }, { label: 'Terugrit', url: 'https://youtu.be/TXFJItf8eyA' }] },
  { id: 'r16', type: 'ehv-streek', text: '16 Veldhoven MMC', pdf: '/routes/16.pdf', map: 'https://goo.gl/maps/NB9B2serhaqnsz6b8', videos: [{ label: 'Heenrit', url: 'https://youtu.be/Vlj9ucKrZZQ' }, { label: 'Terugrit', url: 'https://youtu.be/OsRDvAVLXj8' }] },
  { id: 'r17', type: 'ehv-streek', text: '17 Roosten', pdf: '/routes/17.pdf', map: 'https://goo.gl/maps/ypypjG6zZmFaBKmA8', videos: [{ label: 'Heenrit', url: 'https://youtu.be/2MmyuC6nFow' }, { label: 'Terugrit', url: 'https://youtu.be/GIeFM5LY1T8' }] },
  { id: 'r18', type: 'ehv-streek', text: '18 Eindhoven - Bergeijk Loo', pdf: '/routes/18.pdf', map: 'https://goo.gl/maps/jFNJHZ7X1p4a8np69?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/aoglS4lPltI?si=Dkt8aN353u0i6yaj' }, { label: 'Terugrit', url: 'https://youtu.be/kHnBKXtgUGw?si=ErPzS9dXF1-skWQV' }] },
  { id: 'r19', type: 'ehv-streek', text: '19 Eindhoven - Bladel', pdf: '/routes/19.pdf', map: 'https://goo.gl/maps/5JPt3zvstws5gBzf6?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/OQifY9s0Pt0?si=0v8_5X8g8efCQ1cM' }, { label: 'Terugrit', url: 'https://youtu.be/4kkXDZ_ulcc?si=4lhEwwuBWrOrGiGb' }] },
  { id: 'r20', type: 'ehv-streek', text: '20 Best NS - HTC', pdf: '/routes/20 (1).pdf', map: 'https://goo.gl/maps/DzPyz1xXHau3Y2XQ9?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/iWQEefFNk8g?si=arzFRD97U8iKxVSA' }, { label: 'Terugrit', url: 'https://youtu.be/LhZsVb5IIPg?si=98CJVW-YTIsNIfnY' }] },
    { id: 'r24', type: 'ehv-streek', text: '24 Eindhoven - Helmond via Geldrop', pdf: '/routes/24.pdf', map: 'https://goo.gl/maps/x8JAUt1SAJZcLfem7?g_st=ac', videos: [{ label: 'Terugrit', url: 'https://youtu.be/zbocSyi5x2s?si=CELx50dE77tmp9J2' }] },
  /*  { id: 'r28', type: 'ehv-streek', text: '28 Deurne - Meijel', pdf: '/routes/28.pdf', map: 'https://goo.gl/maps/TqL7tE7qQh8vbjcT7?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] }, */
  /*  { id: 'r52', type: 'ehv-streek', text: '52 Helmond Rijpelberg', pdf: '/routes/52.pdf', map: 'https://goo.gl/maps/7hPPB8ZNq6PHcM6b9?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
  { id: 'r53', type: 'ehv-streek', text: '53 Helmond Straakven', pdf: '/routes/53.pdf', map: 'https://goo.gl/maps/sLirkmvixTATiw7V7?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
  { id: 'r54', type: 'ehv-streek', text: '54 Helmond Brouwhuis', pdf: '/routes/54.pdf', map: 'https://goo.gl/maps/fRwZ4hcpxHcMbpHv6?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
  { id: 'r55', type: 'ehv-streek', text: '55 Helmond Stiphout', pdf: '/routes/55.pdf', map: 'https://goo.gl/maps/NVuA2oQhG16v88669?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] }, */
  { id: 'r114', type: 'ehv-streek', text: '114 De Hurk', pdf: '/routes/114.pdf', map: 'https://goo.gl/maps/wNVDqY412Jo6KyMk7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/hBhwXIudYsA' }, { label: 'Terugrit', url: 'https://youtu.be/pe3djrT9mFk' }] },
  { id: 'r119', type: 'ehv-streek', text: '119 ASML', pdf: '/routes/119.pdf', map: 'https://goo.gl/maps/BzQ61zRScuEGTxda7' },
/*  { id: 'r120', type: 'ehv-streek', text: '120 Best NS - ASML gebouw 4', pdf: '/routes/120.pdf', map: 'https://goo.gl/maps/TxpRYt8Jxkhh2Fk17?g_st=ac' },
  { id: 'r123', type: 'ehv-streek', text: '123 Gemert Pelgrimsrust - Boxmeer', pdf: '/routes/123.pdf', map: 'https://goo.gl/maps/qWGwUtdUUNRXB5MD8?g_st=ac' }, */
    { id: 'r317', type: 'ehv-streek', text: '317 Dommelen', pdf: '/routes/317.pdf', map: 'https://goo.gl/maps/6VGZqioQwPVqZta57?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/iyI5uj9_R9M?si=iwsG_kjfSXUunydR' }, { label: 'Terugrit', url: 'https://youtu.be/Yl1OZD39BWQ?si=2uXO6OUo5we1s3gU' }] },
  { id: 'r318', type: 'ehv-streek', text: '318 Luyksgestel', pdf: '/routes/318.pdf', map: 'https://goo.gl/maps/vC9yVfv6rtfeETKy5?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/yqc3t49LpWo?si=1mP4GfAnr-X6Gp81' }, { label: 'Terugrit', url: 'https://youtu.be/T16tAvmXSJw?si=bL55voJUotEHu0bw' }] },
  { id: 'r319', type: 'ehv-streek', text: '319 Reusel', pdf: '/routes/319.pdf', map: 'https://goo.gl/maps/4JJ1icwuqNwCeUrh7?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/pRHmMy5ipkI?si=ywt0GIoY16-NNQ8U' }, { label: 'Terugrit', url: 'https://youtu.be/ajvQb14Ssa8?si=q8YomI9McmmJUyAG' }] },
  { id: 'r320', type: 'ehv-streek', text: '320 Eindhoven - Helmond via Asten', pdf: '/routes/320.pdf', map: 'https://goo.gl/maps/WSyXUrgdBGnSfnHk9?g_st=ac', videos: [{ label: 'Heenrit Asten-Helmond', url: 'https://youtu.be/Ifl9JJUVvow?si=W_o_l8sdL95VtbeJ' }, { label: 'Terugrit Helmond-Asten', url: 'https://youtu.be/C6cXBV4MFvY?si=viLau8jB4GFOQ1uc' }, { label: 'Heenrit Eindhoven-Asten', url: 'https://youtu.be/RP2wzq9Yers?si=hPBciCOXvICXr46Y' }, { label: 'Terugrit Asten-Eindhoven', url: 'https://youtu.be/FsVcMhQtjyk?si=BeG5eGpvln29DhuG'}] },
  { id: 'r321', type: 'ehv-streek', text: '321 Eindhoven - Gemert Pelgrimsrust', pdf: '/routes/321.pdf', map: 'https://goo.gl/maps/di715Und6vygLtiQ7?g_st=ac' },
  { id: 'r322', type: 'ehv-streek', text: '322 Eindhoven - Uden', pdf: '/routes/322.pdf', map: 'https://goo.gl/maps/NNFGPAnn8Ai451H5A?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/7RYVAJtCo1U?si=rToz5-11iHuEa0-t' }, { label: 'Terugrit', url: 'https://youtu.be/tp2DxKrxD7Y?si=O3pHZt39U-u9CvlM' }] },
  { id: 'r323', type: 'ehv-streek', text: '323 Eindhoven - Gemert Groenesteeg', pdf: '/routes/323.pdf', map: 'https://goo.gl/maps/fsejfuTWoqRGbKe97?g_st=ac', },
  { id: 'r324', type: 'ehv-streek', text: '324 Geldrop Coevering', pdf: '/routes/324.pdf', map: 'https://goo.gl/maps/qH9iWy8QDboPPUyk7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/bqwSqdBEpqU' }, { label: 'Terugrit', url: 'https://youtu.be/UUhg-zk6wkc' }] },
  { id: 'r614', type: 'ehv-streek', text: '614 Jozef Eliasweg', pdf: '/routes/614.pdf', map: 'https://goo.gl/maps/P63ayoVBncr6E1XV9?g_st=ac' },

  /* OVERIGE RAYONS 
  { id: 'placeholder-rv', type: 'reusel-valkenswaard', text: 'Lijnen Reusel hier invullen...', map: '#' },
*/{ id: 'r9', type: 'reusel-valkenswaard', text: '9 Eindhoven - Best', pdf: '/routes/9.pdf', map: 'https://goo.gl/maps/a5P1qJycoE39Jhnc8?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/5kbwv--LCu8' }, { label: 'Terugrit', url: 'https://youtu.be/QrLTNx41JWU' }] },
    { id: 'r10', type: 'reusel-valkenswaard', text: '10 Oirschot Kazerne', pdf: '/routes/10.pdf', map: 'https://goo.gl/maps/u1VCM98XLR4gibQy6' },
  
  { id: 'r11', type: 'reusel-valkenswaard', text: '11 Eindhoven - Weert NS', pdf: '/routes/11.pdf', map: 'https://goo.gl/maps/44XVLgFnh5fH7Dvc8?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/5qiDFBfGH0o' }, { label: 'Terugrit', url: 'https://youtu.be/qb78B89VKbg' }] },
  { id: 'r18', type: 'reusel-valkenswaard', text: '18 Eindhoven - Bergeijk Loo', pdf: '/routes/18.pdf', map: 'https://goo.gl/maps/jFNJHZ7X1p4a8np69?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/aoglS4lPltI?si=Dkt8aN353u0i6yaj' }, { label: 'Terugrit', url: 'https://youtu.be/kHnBKXtgUGw?si=ErPzS9dXF1-skWQV' }] },
  { id: 'r19', type: 'reusel-valkenswaard', text: '19 Eindhoven - Bladel', pdf: '/routes/19.pdf', map: 'https://goo.gl/maps/5JPt3zvstws5gBzf6?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/OQifY9s0Pt0?si=0v8_5X8g8efCQ1cM' }, { label: 'Terugrit', url: 'https://youtu.be/4kkXDZ_ulcc?si=4lhEwwuBWrOrGiGb' }] },
  { id: 'r20', type: 'reusel-valkenswaard', text: '20 Best NS - HTC', pdf: '/routes/20 (1).pdf', map: 'https://goo.gl/maps/DzPyz1xXHau3Y2XQ9?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/iWQEefFNk8g?si=arzFRD97U8iKxVSA' }, { label: 'Terugrit', url: 'https://youtu.be/LhZsVb5IIPg?si=98CJVW-YTIsNIfnY' }] },
    { id: 'r24', type: 'reusel-valkenswaard', text: '24 Eindhoven - Helmond via Geldrop', pdf: '/routes/24.pdf', map: 'https://goo.gl/maps/x8JAUt1SAJZcLfem7?g_st=ac', videos: [{ label: 'Terugrit', url: 'https://youtu.be/zbocSyi5x2s?si=CELx50dE77tmp9J2' }] },
   { id: 'r317', type: 'reusel-valkenswaard', text: '317 Dommelen', pdf: '/routes/317.pdf', map: 'https://goo.gl/maps/6VGZqioQwPVqZta57?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/iyI5uj9_R9M?si=iwsG_kjfSXUunydR' }, { label: 'Terugrit', url: 'https://youtu.be/Yl1OZD39BWQ?si=2uXO6OUo5we1s3gU' }] },
  { id: 'r318', type: 'reusel-valkenswaard', text: '318 Luyksgestel', pdf: '/routes/318.pdf', map: 'https://goo.gl/maps/vC9yVfv6rtfeETKy5?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/yqc3t49LpWo?si=1mP4GfAnr-X6Gp81' }, { label: 'Terugrit', url: 'https://youtu.be/T16tAvmXSJw?si=bL55voJUotEHu0bw' }] },
  { id: 'r319', type: 'reusel-valkenswaard', text: '319 Reusel', pdf: '/routes/319.pdf', map: 'https://goo.gl/maps/4JJ1icwuqNwCeUrh7?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/pRHmMy5ipkI?si=ywt0GIoY16-NNQ8U' }, { label: 'Terugrit', url: 'https://youtu.be/ajvQb14Ssa8?si=q8YomI9McmmJUyAG' }] },
  { id: 'r320', type: 'reusel-valkenswaard', text: '320 Eindhoven - Helmond via Asten', pdf: '/routes/320.pdf', map: 'https://goo.gl/maps/WSyXUrgdBGnSfnHk9?g_st=ac', videos: [{ label: 'Heenrit Asten-Helmond', url: 'https://youtu.be/Ifl9JJUVvow?si=W_o_l8sdL95VtbeJ' }, { label: 'Terugrit Helmond-Asten', url: 'https://youtu.be/C6cXBV4MFvY?si=viLau8jB4GFOQ1uc' }, { label: 'Heenrit Eindhoven-Asten', url: 'https://youtu.be/RP2wzq9Yers?si=hPBciCOXvICXr46Y' }, { label: 'Terugrit Asten-Eindhoven', url: 'https://youtu.be/FsVcMhQtjyk?si=BeG5eGpvln29DhuG'}] },
  { id: 'r321', type: 'reusel-valkenswaard', text: '321 Eindhoven - Gemert Pelgrimsrust', pdf: '/routes/321.pdf', map: 'https://goo.gl/maps/di715Und6vygLtiQ7?g_st=ac' },
  { id: 'r322', type: 'reusel-valkenswaard', text: '322 Eindhoven - Uden', pdf: '/routes/322.pdf', map: 'https://goo.gl/maps/NNFGPAnn8Ai451H5A?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/7RYVAJtCo1U?si=rToz5-11iHuEa0-t' }, { label: 'Terugrit', url: 'https://youtu.be/tp2DxKrxD7Y?si=O3pHZt39U-u9CvlM' }] },
  { id: 'r323', type: 'reusel-valkenswaard', text: '323 Eindhoven - Gemert Groenesteeg', pdf: '/routes/323.pdf', map: 'https://goo.gl/maps/fsejfuTWoqRGbKe97?g_st=ac', },
  { id: 'r324', type: 'reusel-valkenswaard', text: '324 Geldrop Coevering', pdf: '/routes/324.pdf', map: 'https://goo.gl/maps/qH9iWy8QDboPPUyk7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/bqwSqdBEpqU' }, { label: 'Terugrit', url: 'https://youtu.be/UUhg-zk6wkc' }] },
 { id: 'r9', type: 'helmond', text: '9 Eindhoven - Best', pdf: '/routes/9.pdf', map: 'https://goo.gl/maps/a5P1qJycoE39Jhnc8?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/5kbwv--LCu8' }, { label: 'Terugrit', url: 'https://youtu.be/QrLTNx41JWU' }] },

  { id: 'r10', type: 'helmond', text: '10 Oirschot Kazerne', pdf: '/routes/10.pdf', map: 'https://goo.gl/maps/u1VCM98XLR4gibQy6' },

  { id: 'r11', type: 'helmond', text: '11 Eindhoven - Weert NS', pdf: '/routes/11.pdf', map: 'https://goo.gl/maps/44XVLgFnh5fH7Dvc8?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/5qiDFBfGH0o' }, { label: 'Terugrit', url: 'https://youtu.be/qb78B89VKbg' }] },
  { id: 'r18', type: 'helmond', text: '18 Eindhoven - Bergeijk Loo', pdf: '/routes/18.pdf', map: 'https://goo.gl/maps/jFNJHZ7X1p4a8np69?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/aoglS4lPltI?si=Dkt8aN353u0i6yaj' }, { label: 'Terugrit', url: 'https://youtu.be/kHnBKXtgUGw?si=ErPzS9dXF1-skWQV' }] },
  { id: 'r19', type: 'helmond', text: '19 Eindhoven - Bladel', pdf: '/routes/19.pdf', map: 'https://goo.gl/maps/5JPt3zvstws5gBzf6?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/OQifY9s0Pt0?si=0v8_5X8g8efCQ1cM' }, { label: 'Terugrit', url: 'https://youtu.be/4kkXDZ_ulcc?si=4lhEwwuBWrOrGiGb' }] },
  { id: 'r20', type: 'helmond', text: '20 Best NS - HTC', pdf: '/routes/20 (1).pdf', map: 'https://goo.gl/maps/DzPyz1xXHau3Y2XQ9?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/iWQEefFNk8g?si=arzFRD97U8iKxVSA' }, { label: 'Terugrit', url: 'https://youtu.be/LhZsVb5IIPg?si=98CJVW-YTIsNIfnY' }] },

 { id: 'r23', type: 'helmond', text: '23 Boxmeer', pdf: '/routes/23.pdf', map: 'https://goo.gl/maps/pBPPvrjBJjB3d4N89?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
{ id: 'r24', type: 'helmond', text: '24 Eindhoven - Helmond via Geldrop', pdf: '/routes/24.pdf', map: 'https://goo.gl/maps/x8JAUt1SAJZcLfem7?g_st=ac', videos: [{ label: 'Terugrit', url: 'https://youtu.be/zbocSyi5x2s?si=CELx50dE77tmp9J2' }] },
  
  { id: 'r25', type: 'helmond', text: '25 Helmond - Gemert Pelgrimsrust', pdf: '/routes/25.pdf', map: 'https://goo.gl/maps/D5RWqdKkpQLaceaA8?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/whpyiLIN43A?si=2y40M1n7RBDHuIpA' }, { label: 'Terugrit', url: 'https://youtu.be/PJmDfBdkRds?si=6927MdIt_Z1Pk_AP' }] },
  { id: 'r26', type: 'helmond', text: '26 Helmond - Gemert', pdf: '/routes/26.pdf', map: 'https://goo.gl/maps/33oHJptjDKoyeTV27?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
{ id: 'r51', type: 'helmond', text: '51 Helmond Eeuwsels', pdf: '/routes/51.pdf', map: 'https://goo.gl/maps/3NKXvMCmV92f4Bev8?g_st=ac', videos: [{ label: 'Heenrit', url: '' }, { label: 'Terugrit', url: '' }] },
    /*  { id: 'r123', type: 'ehv-streek', text: '123 Gemert Pelgrimsrust - Boxmeer', pdf: '/routes/123.pdf', map: 'https://goo.gl/maps/qWGwUtdUUNRXB5MD8?g_st=ac' }, */
  { id: 'r150', type: 'helmond', text: '150 Helmond - Helmond \'t Hout', pdf: '/routes/150.pdf', map: 'https://goo.gl/maps/PpE8g8jfWTkNSWwS6?g_st=ac' },
  
  { id: 'r317', type: 'helmond', text: '317 Dommelen', pdf: '/routes/317.pdf', map: 'https://goo.gl/maps/6VGZqioQwPVqZta57?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/iyI5uj9_R9M?si=iwsG_kjfSXUunydR' }, { label: 'Terugrit', url: 'https://youtu.be/Yl1OZD39BWQ?si=2uXO6OUo5we1s3gU' }] },
  { id: 'r318', type: 'helmond', text: '318 Luyksgestel', pdf: '/routes/318.pdf', map: 'https://goo.gl/maps/vC9yVfv6rtfeETKy5?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/yqc3t49LpWo?si=1mP4GfAnr-X6Gp81' }, { label: 'Terugrit', url: 'https://youtu.be/T16tAvmXSJw?si=bL55voJUotEHu0bw' }] },
  { id: 'r319', type: 'helmond', text: '319 Reusel', pdf: '/routes/319.pdf', map: 'https://goo.gl/maps/4JJ1icwuqNwCeUrh7?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/pRHmMy5ipkI?si=ywt0GIoY16-NNQ8U' }, { label: 'Terugrit', url: 'https://youtu.be/ajvQb14Ssa8?si=q8YomI9McmmJUyAG' }] },
  { id: 'r320', type: 'helmond', text: '320 Eindhoven - Helmond via Asten', pdf: '/routes/320.pdf', map: 'https://goo.gl/maps/WSyXUrgdBGnSfnHk9?g_st=ac', videos: [{ label: 'Heenrit Asten-Helmond', url: 'https://youtu.be/Ifl9JJUVvow?si=W_o_l8sdL95VtbeJ' }, { label: 'Terugrit Helmond-Asten', url: 'https://youtu.be/C6cXBV4MFvY?si=viLau8jB4GFOQ1uc' }, { label: 'Heenrit Eindhoven-Asten', url: 'https://youtu.be/RP2wzq9Yers?si=hPBciCOXvICXr46Y' }, { label: 'Terugrit Asten-Eindhoven', url: 'https://youtu.be/FsVcMhQtjyk?si=BeG5eGpvln29DhuG'}] },
  { id: 'r321', type: 'helmond', text: '321 Eindhoven - Gemert Pelgrimsrust', pdf: '/routes/321.pdf', map: 'https://goo.gl/maps/di715Und6vygLtiQ7?g_st=ac' },
  { id: 'r322', type: 'helmond', text: '322 Eindhoven - Uden', pdf: '/routes/322.pdf', map: 'https://goo.gl/maps/NNFGPAnn8Ai451H5A?g_st=ac', videos: [{ label: 'Heenrit', url: 'https://youtu.be/7RYVAJtCo1U?si=rToz5-11iHuEa0-t' }, { label: 'Terugrit', url: 'https://youtu.be/tp2DxKrxD7Y?si=O3pHZt39U-u9CvlM' }] },
  { id: 'r323', type: 'helmond', text: '323 Eindhoven - Gemert Groenesteeg', pdf: '/routes/323.pdf', map: 'https://goo.gl/maps/fsejfuTWoqRGbKe97?g_st=ac', },
{ id: 'r324', type: 'helmond', text: '324 Geldrop Coevering', pdf: '/routes/324.pdf', map: 'https://goo.gl/maps/qH9iWy8QDboPPUyk7', videos: [{ label: 'Heenrit', url: 'https://youtu.be/bqwSqdBEpqU' }, { label: 'Terugrit', url: 'https://youtu.be/UUhg-zk6wkc' }] },

  { id: 'r610', type: 'scholieren', text: '610 Internationale school', pdf: '/routes/610.pdf', map: 'https://goo.gl/maps/S9FFTyas1NZxVzq78?g_st=ac' },
  
  { id: 'r614', type: 'scholieren', text: '614 Jozef Eliasweg', pdf: '/routes/614.pdf', map: 'https://goo.gl/maps/P63ayoVBncr6E1XV9?g_st=ac' },
{ id: 'r619', type: 'scholieren', text: '619 Bladel', pdf: '/routes/619.pdf', map: 'https://goo.gl/maps/DuUyFiJDA3Quf3p58?g_st=ac' },

 /* { id: 'placeholder-sch', type: 'scholieren', text: 'Lijnen Scholieren hier invullen...', map: '#' } */
];

export const initialCategories = [
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

export const contactData = [
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
export const importantDocuments = [
  { id: 'doc-stoel', title: 'Stoelafstelling', pdf: '/docs/stoelafstelling.pdf' },
  { id: 'doc-atw', title: 'Arbeidstijdenwet (ATW)', pdf: '/docs/atw.pdf' },
  { id: 'doc-werkafspraken', title: 'Rayon Eindhoven - Werkafspraken', pdf: '/docs/afspraken.pdf' }
];
