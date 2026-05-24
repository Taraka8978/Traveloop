'use client';

import { useState } from 'react';
import { Plus, Wallet, PieChart, X, Calendar, DollarSign, Tag, Clock } from 'lucide-react';
import styles from './budget.module.css';

interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: Date | string;
}

interface BudgetClientProps {
  initialExpenses: Expense[];
  tripId: string;
}

export default function BudgetClient({ initialExpenses, tripId }: BudgetClientProps) {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Transport',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = ['Transport', 'Stay', 'Activity', 'Meal', 'Other'];

  const totalSpent = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  const categoryTotals = categories.map((cat) => ({
    name: cat,
    amount: expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + Number(e.amount), 0)
  })).sort((a, b) => b.amount - a.amount);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.description || !formData.amount || !formData.date) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/trips/${tripId}/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to add expense');
      } else {
        setExpenses((prev) => [data, ...prev]);
        setIsModalOpen(false);
        setFormData({
          description: '',
          amount: '',
          category: 'Transport',
          date: new Date().toISOString().split('T')[0]
        });
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Budget & Expenses</h2>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
          <Plus size={18} /> Add Expense
        </button>
      </div>

      <div className={styles.grid}>
        <div className={styles.mainCol}>
          <div className={`glass ${styles.summaryCard}`}>
            <div className={styles.summaryIcon}>
              <Wallet size={32} />
            </div>
            <div className={styles.summaryDetails}>
              <h3>Total Spent</h3>
              <p className={styles.totalAmount}>
                ${totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className={`glass ${styles.card}`}>
            <h3>Recent Expenses</h3>
            {expenses.length > 0 ? (
              <div className={styles.expenseList}>
                {expenses.map((expense) => (
                  <div key={expense.id} className={styles.expenseItem}>
                    <div className={styles.expenseInfo}>
                      <div className={styles.expenseCategory}>{expense.category}</div>
                      <div>
                        <h4>{expense.description}</h4>
                        <span className={styles.expenseDate}>
                          {new Date(expense.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className={styles.expenseAmount}>
                      ${Number(expense.amount).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.emptyText}>No expenses logged yet.</p>
            )}
          </div>
        </div>

        <div className={styles.sideCol}>
          <div className={`glass ${styles.card}`}>
            <h3 className={styles.chartTitle}>
              <PieChart size={20} /> Breakdown
            </h3>
            <div className={styles.breakdownList}>
              {categoryTotals.map((cat, i) => (
                <div key={cat.name} className={styles.breakdownItem}>
                  <div className={styles.breakdownInfo}>
                    <div
                      className={styles.colorDot}
                      style={{ backgroundColor: `hsl(${i * 60 + 200}, 70%, 50%)` }}
                    />
                    <span>{cat.name}</span>
                  </div>
                  <span className={styles.breakdownAmount}>
                    ${cat.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide-out/Pop-up Glassmorphic Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={`glass ${styles.modalCard} animate-fade-in`} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Log New Expense</h3>
              <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {error && <div className={styles.errorAlert}>{error}</div>}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="description">Description *</label>
                <div className={styles.inputWrapper}>
                  <Clock size={16} className={styles.inputIcon} />
                  <input
                    id="description"
                    name="description"
                    type="text"
                    required
                    placeholder="e.g., Dinner at Le Bistro"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="amount">Amount ($) *</label>
                <div className={styles.inputWrapper}>
                  <DollarSign size={16} className={styles.inputIcon} />
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    required
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="category">Category *</label>
                <div className={styles.inputWrapper}>
                  <Tag size={16} className={styles.inputIcon} />
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="date">Date *</label>
                <div className={styles.inputWrapper}>
                  <Calendar size={16} className={styles.inputIcon} />
                  <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Adding...' : 'Add Expense'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
