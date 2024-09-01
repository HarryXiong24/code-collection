import { useState } from 'react';
import './index.scss';

interface Pokemon {
  name: string;
  abilities: string;
}

interface ValidationRule {
  required?: boolean;
  maxLength?: number;
  custom?: (value: string) => string | null;
}

interface FormValidation {
  [key: string]: ValidationRule;
}

const TodoList = () => {
  const [data, setData] = useState<Pokemon[]>([]);
  const [formData, setFormData] = useState<Pokemon>({} as Pokemon);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateRules: FormValidation = {
    name: {
      required: true,
      maxLength: 50,
    },
    abilities: {
      required: false,
      maxLength: 200,
      custom: (value) => {
        // Add custom validation logic here if needed
        if (value && value.includes('forbidden')) {
          return 'Abilities cannot include the word "forbidden"';
        }
        return null;
      },
    },
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    for (const field in validateRules) {
      const value = formData[field as keyof Pokemon] as string;
      const rules = validateRules[field];

      if (rules.required && (!value || value.trim() === '')) {
        newErrors[field] = `${field} is required`;
      } else if (rules.required && rules.maxLength && value.length > rules.maxLength) {
        newErrors[field] = `${field} should be less than ${rules.maxLength} characters`;
      } else if (rules.custom) {
        const customError = rules.custom(value);
        if (customError) {
          newErrors[field] = customError;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the specific field error when user starts typing
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (validate()) {
      setData([formData, ...data]);
      setFormData({
        name: '',
        abilities: '',
      });
    }
  };

  const handleClear = () => {
    setFormData({ name: '', abilities: '' });
    setErrors({});
  };

  return (
    <div style={{ padding: 8 }}>
      <h2>Todo List</h2>

      <div className='todo-list'>
        <form onSubmit={handleSubmit} className='input-wrap'>
          <div className='input-item'>
            Name:
            <input
              placeholder='Enter name'
              style={{ marginLeft: 8, minWidth: 300 }}
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
            ></input>
            {errors.name && <span style={{ color: 'red', marginLeft: 8 }}>{errors.name}</span>}
          </div>
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
            {errors.abilities && <span style={{ color: 'red', marginLeft: 8 }}>{errors.abilities}</span>}
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
