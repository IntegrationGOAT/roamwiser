import type { BudgetData } from '../services/openrouter.ts'

interface BudgetSectionProps {
  budgetData: BudgetData | null
  isGenerating: boolean
  formData: {
    travelers: string
    startDate: string
    endDate: string
    destination: string
  }
  getBudgetPercent: (value: unknown, fallback?: number) => number
}

export const BudgetSection = ({
  budgetData,
  isGenerating,
  formData,
  getBudgetPercent
}: BudgetSectionProps) => {
  const tripDays = formData.startDate && formData.endDate 
    ? Math.max(1, Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24)))
    : 0

  return (
    <section id="budget" className="dark" data-spine="Budget">
      <div className="sec-head">
        <div className="eyebrow">Budget optimiser</div>
        <h2>Spend it where the trip needs it</h2>
        <p className="muted">Set one number for the whole trip. Roamwise splits it across stay, food, transport and activities — then finds where a small shift saves real money.</p>
      </div>

      {isGenerating ? (
        <div className="budget-wrap">
          <div className="bars">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="skeleton-budget-row">
                <div className="skeleton-line short"></div>
                <div className="skeleton-line long"></div>
                <div className="skeleton-line short"></div>
              </div>
            ))}
          </div>
          <div className="budget-card skeleton-card">
            <div className="skeleton-line medium"></div>
            <div className="skeleton-line short"></div>
            <div className="skeleton-line long"></div>
            <div className="skeleton-line long"></div>
          </div>
        </div>
      ) : budgetData ? (
        <div className="budget-wrap">
          <div className="bars">
            <div className="bar-row">
              <div className="b-label">Stay</div>
              <div className="bar-track">
                <div className="bar-fill" style={{width: `${getBudgetPercent((budgetData.breakdown as unknown as Record<string, unknown>).stay, 35)}%`}}></div>
              </div>
              <div className="b-pct">{getBudgetPercent((budgetData.breakdown as unknown as Record<string, unknown>).stay, 35)}%</div>
            </div>
            <div className="bar-row">
              <div className="b-label">Food</div>
              <div className="bar-track">
                <div className="bar-fill" style={{width: `${getBudgetPercent((budgetData.breakdown as unknown as Record<string, unknown>).food, 20)}%`}}></div>
              </div>
              <div className="b-pct">{getBudgetPercent((budgetData.breakdown as unknown as Record<string, unknown>).food, 20)}%</div>
            </div>
            <div className="bar-row">
              <div className="b-label">Transport</div>
              <div className="bar-track">
                <div className="bar-fill" style={{width: `${getBudgetPercent((budgetData.breakdown as unknown as Record<string, unknown>).transport, 15)}%`}}></div>
              </div>
              <div className="b-pct">{getBudgetPercent((budgetData.breakdown as unknown as Record<string, unknown>).transport, 15)}%</div>
            </div>
            <div className="bar-row">
              <div className="b-label">Activities</div>
              <div className="bar-track">
                <div className="bar-fill" style={{width: `${getBudgetPercent((budgetData.breakdown as unknown as Record<string, unknown>).activities, 20)}%`}}></div>
              </div>
              <div className="b-pct">{getBudgetPercent((budgetData.breakdown as unknown as Record<string, unknown>).activities, 20)}%</div>
            </div>
            <div className="bar-row">
              <div className="b-label">Buffer</div>
              <div className="bar-track">
                <div className="bar-fill" style={{width: `${getBudgetPercent((budgetData.breakdown as unknown as Record<string, unknown>).buffer, 10)}%`}}></div>
              </div>
              <div className="b-pct">{getBudgetPercent((budgetData.breakdown as unknown as Record<string, unknown>).buffer, 10)}%</div>
            </div>
          </div>

          <div className="budget-card">
            <div className="eyebrow">Total trip budget</div>
            <div className="budget-total">₹{budgetData.total.toLocaleString('en-IN')}</div>
            <div className="budget-meta">
              {formData.travelers} traveller{formData.travelers !== '1' ? 's' : ''} · {tripDays > 0 ? `${tripDays} days` : '—'} · {formData.destination || 'Kerala, India'}
            </div>
            <div className="save-callout">
              💡 Budget optimized: Stay {getBudgetPercent((budgetData.breakdown as unknown as Record<string, unknown>).stay, 35)}%, Food {getBudgetPercent((budgetData.breakdown as unknown as Record<string, unknown>).food, 20)}%, Transport {getBudgetPercent((budgetData.breakdown as unknown as Record<string, unknown>).transport, 15)}%, Activities {getBudgetPercent((budgetData.breakdown as unknown as Record<string, unknown>).activities, 20)}%, Buffer {getBudgetPercent((budgetData.breakdown as unknown as Record<string, unknown>).buffer, 10)}%
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <p className="empty-state-title">No budget generated yet</p>
          <p className="empty-state-text">Generate your itinerary first to see the optimised budget breakdown</p>
        </div>
      )}
    </section>
  )
}