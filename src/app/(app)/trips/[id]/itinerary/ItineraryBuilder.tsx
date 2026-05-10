'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Plus, Clock, DollarSign, Activity } from 'lucide-react';
import styles from './itinerary.module.css';

export default function ItineraryBuilder({ initialStops, tripId, allCities }: { initialStops: any[], tripId: string, allCities: any[] }) {
  const [stops, setStops] = useState(initialStops);
  const [isAddingStop, setIsAddingStop] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const router = useRouter();

  const handleAddStop = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/trips/${tripId}/stops`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cityId: selectedCity,
          startDate,
          endDate,
          order: stops.length + 1
        })
      });
      if (res.ok) {
        setIsAddingStop(false);
        router.refresh(); // Refresh server component
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Your Journey</h2>
        <button className="btn-primary" onClick={() => setIsAddingStop(true)}>
          <Plus size={18} /> Add Destination
        </button>
      </div>

      {isAddingStop && (
        <div className={`glass ${styles.addStopForm}`}>
          <h3>Add New Destination</h3>
          <form onSubmit={handleAddStop} className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>City</label>
              <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)} required>
                <option value="">Select a city</option>
                {allCities.map(city => (
                  <option key={city.id} value={city.id}>{city.name}, {city.country}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Start Date</label>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label>End Date</label>
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
            </div>
            <div className={styles.formActions}>
              <button type="button" className="btn-secondary" onClick={() => setIsAddingStop(false)}>Cancel</button>
              <button type="submit" className="btn-primary">Add Stop</button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.timeline}>
        {stops.map((stop, index) => (
          <div key={stop.id} className={styles.timelineItem}>
            <div className={styles.timelineMarker}>
              <div className={styles.markerDot} />
              {index < stops.length - 1 && <div className={styles.markerLine} />}
            </div>
            
            <div className={`glass ${styles.stopCard}`}>
              <div className={styles.stopHeader}>
                <div className={styles.stopInfo}>
                  <MapPin className={styles.stopIcon} />
                  <h3>{stop.city.name}</h3>
                  <span className={styles.stopDates}>
                    {new Date(stop.startDate).toLocaleDateString()} - {new Date(stop.endDate).toLocaleDateString()}
                  </span>
                </div>
                <button className="btn-secondary btn-sm">Add Activity</button>
              </div>

              {stop.activities && stop.activities.length > 0 ? (
                <div className={styles.activitiesList}>
                  {stop.activities.map((activity: any) => (
                    <div key={activity.id} className={styles.activityItem}>
                      <div className={styles.activityMain}>
                        <Activity size={16} className={styles.activityIcon} />
                        <div>
                          <h4>{activity.name}</h4>
                          <p>{activity.description}</p>
                        </div>
                      </div>
                      <div className={styles.activityMeta}>
                        <span><Clock size={14} /> {activity.duration}m</span>
                        <span><DollarSign size={14} /> ${activity.cost}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.noActivities}>No activities planned yet.</p>
              )}
            </div>
          </div>
        ))}

        {stops.length === 0 && !isAddingStop && (
          <div className={styles.emptyState}>
            <p>Your itinerary is empty. Add a destination to start planning!</p>
          </div>
        )}
      </div>
    </div>
  );
}
