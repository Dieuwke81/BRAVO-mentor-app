'use client';

import { useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';

export default function NotepadTab({
  activeStudent,
  isLocked
}) {

  const defaultTabs = [
    { title: 'Tab 1', text: '' },
    { title: 'Tab 2', text: '' },
    { title: 'Tab 3', text: '' },
    { title: 'Tab 4', text: '' },
    { title: 'Tab 5', text: '' }
  ];

  const [tabs, setTabs] = useState(defaultTabs);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {

    const saved = localStorage.getItem(
      `bravo_notepad_${activeStudent}`
    );

    if (saved) {
      setTabs(JSON.parse(saved));
    } else {
      setTabs(defaultTabs);
    }

  }, [activeStudent]);

  const saveTabs = (newTabs) => {
    setTabs(newTabs);

    localStorage.setItem(
      `bravo_notepad_${activeStudent}`,
      JSON.stringify(newTabs)
    );
  };

  const changeTitle = (index) => {

    if (isLocked) return;

    const result = prompt(
      'Naam van dit tabblad:',
      tabs[index].title
    );

    if (!result) return;

    const copy = [...tabs];
    copy[index].title = result;

    saveTabs(copy);
  };

  const changeText = (value) => {

    if (isLocked) return;

    const copy = [...tabs];
    copy[activeTab].text = value;

    saveTabs(copy);
  };

  return (

    <div className="card">

      <h2
        style={{
          marginBottom:20,
          color:'var(--bravo-purple)'
        }}
      >
        Persoonlijk kladblok
      </h2>

      <div className="sub-tabs no-scrollbar">

        {tabs.map((tab,index)=>(

          <button
            key={index}
            onClick={()=>setActiveTab(index)}
            className={
              activeTab===index
              ?'active'
              :''
            }
          >

            {tab.title}

          </button>

        ))}

      </div>

      <button
        className="btn outline"
        disabled={isLocked}
        onClick={()=>changeTitle(activeTab)}
        style={{
          marginBottom:15
        }}
      >

        <Pencil size={18} />

        &nbsp;

        Naam tabblad wijzigen

      </button>

      <textarea

        rows={20}

        className="note-area"

        style={{
          width:'100%',
          marginLeft:0,
          minHeight:'420px'
        }}

        value={tabs[activeTab].text}

        readOnly={isLocked}

        onChange={(e)=>changeText(e.target.value)}

        placeholder={
          isLocked
          ?''
          :'Schrijf hier je eigen notities...'
        }

      />

    </div>

  );

}
