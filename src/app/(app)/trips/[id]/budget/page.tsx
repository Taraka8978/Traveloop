import { prisma } from '@/lib/prisma';
import { PieChart, Wallet, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import styles from './budget.module.css';

export default async function BudgetPage({ params }: { params: { id: string } }) {
  const tripId = params.id;
  
  const expenses = await prisma.expense.findMany({
    where: { tripId },
    orderBy: { date: 'desc' }
  });

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const categories = ['Transport', 'Stay', 'Activity', 'Meal', 'Other'];
  
  const categoryTotals = categories.map(cat => ({
    name: cat,
    amount: expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0)
  })).sort((a, b) => b.amount - a.amount);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Budget & Expenses</h2>
        <button className="btn-primary">
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
              <p className={styles.totalAmount}>${totalSpent.toFixed(2)}</p>
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
                        <span className={styles.expenseDate}>{new Date(expense.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className={styles.expenseAmount}>
                      ${expense.amount.toFixed(2)}
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
            <h3 className={styles.chartTitle}><PieChart size={20} /> Breakdown</h3>
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
                  <span className={styles.breakdownAmount}>${cat.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
