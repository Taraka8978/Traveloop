'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Star, MapPin, TrendingUp, Plus, DollarSign, Filter } from 'lucide-react';
import styles from './cities.module.css';

interface City {
  id: string;
  name: string;
  country: string;
  costIndex: number;
  popularity: number;
  image: string | null;
}

export default function ExploreCitiesClient({ initialCities }: { initialCities: City[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCost, setSelectedCost] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'popularity' | 'costIndex' | 'name'>('popularity');

  const filteredCities = initialCities
    .filter((city) => {
      const matchesSearch =
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.country.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCost = selectedCost === null || city.costIndex === selectedCost;

      return matchesSearch && matchesCost;
    })
    .sort((a, b) => {
      if (sortBy === 'popularity') return b.popularity - a.popularity;
      if (sortBy === 'costIndex') return a.costIndex - b.costIndex;
      return a.name.localeCompare(b.name);
    });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={14}
        fill={index < rating ? 'currentColor' : 'transparent'}
        className={styles.starIcon}
      />
    ));
  };

  const renderCost = (cost: number) => {
    return '$'.repeat(cost);
  };

  const getCostEstimate = (cost: number) => {
    switch (cost) {
      case 1: return '$30 - $60 / day';
      case 2: return '$60 - $120 / day';
      case 3: return '$120 - $200 / day';
      case 4: return '$200 - $350 / day';
      case 5: return '$350+ / day';
      default: return '$120 - $200 / day';
    }
  };

  return (
    <div className={`${styles.container} animate-fade-in`}>
      <header className={styles.header}>
        <h1 className={styles.title}>Explore Destinations</h1>
        <p className={styles.subtitle}>Find your next adventure and start planning your perfect itinerary</p>
      </header>

      {/* Filters Card */}
      <div className={`glass ${styles.filterCard}`}>
        <div className={styles.searchRow}>
          <div className={styles.searchWrapper}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by city or country..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className={styles.filterGroup}>
            <div className={styles.filterLabel}>
              <Filter size={16} style={{ display: 'inline', marginRight: '0.25rem', verticalAlign: 'text-bottom' }} />
              Sort By
            </div>
            <select
              className={styles.selectInput}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="popularity">Most Popular</option>
              <option value="costIndex">Budget Friendly</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Budget Tier</span>
          <div className={styles.budgetOptions}>
            <button
              onClick={() => setSelectedCost(null)}
              className={`${styles.budgetBtn} ${selectedCost === null ? styles.budgetBtnActive : ''}`}
            >
              All Tiers
            </button>
            {[1, 2, 3, 4, 5].map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedCost(tier)}
                className={`${styles.budgetBtn} ${selectedCost === tier ? styles.budgetBtnActive : ''}`}
                title={`Cost Index ${tier} of 5`}
              >
                {renderCost(tier)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cities Grid */}
      {filteredCities.length > 0 ? (
        <div className={styles.grid}>
          {filteredCities.map((city) => (
            <div key={city.id} className={styles.card}>
              <div
                className={styles.imageArea}
                style={{
                  backgroundImage: `url("${
                    city.image ||
                    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80'
                  }")`,
                }}
              >
                <div className={styles.costBadge}>{renderCost(city.costIndex)}</div>
              </div>

              <div className={styles.content}>
                <h3 className={styles.cityName}>{city.name}</h3>
                <div className={styles.countryName}>
                  <MapPin size={14} /> {city.country}
                </div>

                <div className={styles.metrics}>
                  <div className={styles.metricItem}>
                    <TrendingUp size={14} />
                    <span>Popularity:</span>
                  </div>
                  <div className={styles.stars}>{renderStars(city.popularity)}</div>
                </div>

                <div className={styles.metrics} style={{ marginTop: '-0.5rem', marginBottom: '1.5rem' }}>
                  <div className={styles.metricItem}>
                    <DollarSign size={14} style={{ color: 'var(--accent-success)' }} />
                    <span>Est. Cost:</span>
                  </div>
                  <div className={styles.metricValue} style={{ color: 'var(--accent-success)', fontWeight: 600 }}>
                    {getCostEstimate(city.costIndex)}
                  </div>
                </div>

                <Link
                  href={`/trips/create?cityId=${city.id}`}
                  className={`btn-primary ${styles.actionBtn}`}
                >
                  <Plus size={16} /> Plan a Trip Here
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`glass ${styles.empty}`}>
          <Search size={48} className={styles.emptyIcon} style={{ color: 'var(--text-muted)' }} />
          <h3 className={styles.emptyTitle}>No Destinations Found</h3>
          <p className={styles.emptyText}>
            We couldn't find any destinations matching your search. Try adjusting your filters or query!
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCost(null);
            }}
            className="btn-secondary"
            style={{ marginTop: '0.5rem' }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
