'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckSquare, Square, Plus, Trash2 } from 'lucide-react';
import styles from './checklist.module.css';

export default function ChecklistClient({ initialItems, tripId }: { initialItems: any[], tripId: string }) {
  const [items, setItems] = useState(initialItems);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Clothing');
  const router = useRouter();

  const toggleItem = async (id: string, isPacked: boolean) => {
    // Optimistic update
    setItems(items.map(item => item.id === id ? { ...item, isPacked: !isPacked } : item));
    // Here we would typically make an API call to update the DB
  };

  const deleteItem = async (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem = {
      id: Math.random().toString(), // fake ID for prototype
      name: newItemName,
      category: newItemCategory,
      isPacked: false,
      tripId
    };

    setItems([...items, newItem]);
    setNewItemName('');
  };

  const categories = Array.from(new Set(items.map(i => i.category)));
  if (!categories.includes('Clothing')) categories.push('Clothing');
  if (!categories.includes('Documents')) categories.push('Documents');
  if (!categories.includes('Electronics')) categories.push('Electronics');

  const progress = items.length === 0 ? 0 : Math.round((items.filter(i => i.isPacked).length / items.length) * 100);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Packing Checklist</h2>
        <div className={styles.progressContainer}>
          <div className={styles.progressText}>{progress}% Packed</div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <form onSubmit={handleAddItem} className={`glass ${styles.addForm}`}>
        <input 
          type="text" 
          value={newItemName} 
          onChange={(e) => setNewItemName(e.target.value)} 
          placeholder="Add an item (e.g. Passport, Swimsuit)" 
          className={styles.input}
        />
        <select 
          value={newItemCategory} 
          onChange={(e) => setNewItemCategory(e.target.value)}
          className={styles.select}
        >
          <option value="Documents">Documents</option>
          <option value="Clothing">Clothing</option>
          <option value="Electronics">Electronics</option>
          <option value="Misc">Misc</option>
        </select>
        <button type="submit" className="btn-primary">Add</button>
      </form>

      <div className={styles.categories}>
        {categories.map(category => {
          const categoryItems = items.filter(i => i.category === category);
          if (categoryItems.length === 0) return null;

          return (
            <div key={category} className={`glass ${styles.categoryCard}`}>
              <h3>{category}</h3>
              <div className={styles.itemList}>
                {categoryItems.map(item => (
                  <div key={item.id} className={`${styles.item} ${item.isPacked ? styles.packed : ''}`}>
                    <button 
                      className={styles.checkBtn}
                      onClick={() => toggleItem(item.id, item.isPacked)}
                    >
                      {item.isPacked ? <CheckSquare size={20} className={styles.checkedIcon} /> : <Square size={20} className={styles.uncheckedIcon} />}
                      <span className={styles.itemName}>{item.name}</span>
                    </button>
                    <button className={styles.deleteBtn} onClick={() => deleteItem(item.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
