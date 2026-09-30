import { useState } from 'react';
import styled from '@emotion/styled';

type Note = {
  id: number;
  text: string;
};

const Wrapper = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  height: 100vh;
  box-sizing: border-box;
  font-family: sans-serif;
`;

const Sidebar = styled.div`
  width: 260px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
`;

const Item = styled.li<{ active: boolean }>`
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  background: ${(props) => (props.active ? '#cfe3ff' : 'transparent')};

  &:hover {
    background: ${(props) => (props.active ? '#cfe3ff' : '#eee')};
  }
`;

const Editor = styled.textarea`
  flex: 1;
  padding: 12px;
  font-size: 16px;
  resize: none;
`;

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const activeNote = notes.find((note) => note.id === activeId);

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(search.toLowerCase())
  );

  function addNote() {
    const note: Note = { id: Date.now(), text: '' };
    setNotes([note, ...notes]);
    setActiveId(note.id);
  }

  function changeText(text: string) {
    setNotes(
      notes.map((note) => (note.id === activeId ? { ...note, text } : note))
    );
  }

  function removeNote() {
    setNotes(notes.filter((note) => note.id !== activeId));
    setActiveId(null);
  }

  return (
    <Wrapper>
      <Sidebar>
        <button onClick={addNote}>+ Новая запись</button>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск"
        />
        <List>
          {filteredNotes.map((note) => (
            <Item
              key={note.id}
              active={note.id === activeId}
              onClick={() => setActiveId(note.id)}
            >
              {note.text.slice(0, 25) || 'Пустая запись'}
            </Item>
          ))}
        </List>
      </Sidebar>

      {activeNote ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button onClick={removeNote}>Удалить запись</button>
          <Editor
            value={activeNote.text}
            onChange={(e) => changeText(e.target.value)}
          />
        </div>
      ) : (
        <p>Выберите запись или создайте новую</p>
      )}
    </Wrapper>
  );
}