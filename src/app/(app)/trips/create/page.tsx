'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import styles from './create.module.css';

export default function CreateTrip() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    isPublic: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create trip');
      } else {
        router.push(`/trips/${data.id}/itinerary`);
        router.refresh();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <header className={styles.header}>
        <Link href="/trips" className={styles.backButton}>
          <ArrowLeft size={20} />
          Back to Trips
        </Link>
        <h1 className={styles.title}>Plan a New Trip</h1>
        <p className={styles.subtitle}>Where are you off to next?</p>
      </header>

      <div className={`glass ${styles.formCard}`}>
        {error && <div className={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Trip Name *</label>
            <input 
              id="name"
              name="name"
              type="text" 
              required
              placeholder="e.g., Summer in Japan"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="startDate">Start Date *</label>
              <input 
                id="startDate"
                name="startDate"
                type="date" 
                required
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="endDate">End Date *</label>
              <input 
                id="endDate"
                name="endDate"
                type="date" 
                required
                value={formData.endDate}
                onChange={handleChange}
                min={formData.startDate}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea 
              id="description"
              name="description"
              rows={4}
              placeholder="What's the vibe of this trip?"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className={styles.checkboxGroup}>
            <input 
              id="isPublic"
              name="isPublic"
              type="checkbox" 
              checked={formData.isPublic}
              onChange={handleChange}
            />
            <label htmlFor="isPublic">Make this trip public</label>
          </div>
          <p className={styles.helperText}>
            Public trips can be viewed by anyone with the link.
          </p>

          <div className={styles.actions}>
            <Link href="/trips" className="btn-secondary">Cancel</Link>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Trip'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
