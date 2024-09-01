import { useState } from 'react';
import './index.scss';

interface Pokemon {
  name: string;
  abilities: string;
}

const TodoList = () => {
  const [data, setData] = useState<Pokemon[]>([]);
  const [formData, setFormData] = useState<Pokemon>({} as Pokemon);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!formData.name || formData.name === '') {
      return;
    }

    if (formData.name.length > 50) {
      return;
    }

    setData([formData, ...data]);
    setFormData({
      name: '',
      abilities: '',
    });
  };

  const handleClear = () => {
    setFormData({ name: '', abilities: '' });
  };

  return (
    <div style={{ padding: 8 }}>
      <h2>Todo List</h2>

      <div className='todo-list'>
        <form onSubmit={handleSubmit} className='input-wrap'>
          <p className='input-item'>
            Name:
            <input
              placeholder='Enter name'
              style={{ marginLeft: 8 }}
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
            ></input>
          </p>
          <p className='input-item'>
            Abilities:
            <textarea
              placeholder='Enter Abilities'
              rows={4}
              id='abilities'
              name='abilities'
              value={formData.abilities}
              onChange={handleChange}
              style={{ resize: 'vertical', marginLeft: 8 }}
            ></textarea>
          </p>
          <p>
            <button type='submit'>Submit</button>
            <button type='reset' onClick={handleClear} style={{ marginLeft: 8 }}>
              Clear
            </button>
          </p>
        </form>
        <div className='display'>
          <h4>Pokemon List</h4>
          {data?.map((item, index) => (
            <div key={index} className='display-item'>
              <p>Name: {item.name}</p>
              <p>Abilities: {item.abilities}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
