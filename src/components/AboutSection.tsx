interface AboutSectionProps {}

export const AboutSection = ({}: AboutSectionProps) => {
  return (
    <section id="about" className="light" data-spine="About">
      <div className="about-wrap">
        <div>
          <div className="eyebrow">About Roamwise</div>
          <h2>Built by people who over-planned one trip too many</h2>
          <p className="muted">Roamwise started as a shared spreadsheet between three friends who kept re-doing the same work before every trip — comparing budgets, checking safety advisories, hunting for translations at 1am. We turned that spreadsheet into a platform: tell it your budget, your people and your interests, and it does the planning, the number-crunching and the safety-watching for you.</p>
          <p className="muted">We're a small team based between Kolkata and Kochi, working directly with local guides, homestays and tourism boards so every recommendation is one we'd actually send a friend to.</p>
        </div>

        <div>
          <div className="about-stats">
            <div className="about-stat">
              <div className="num">2022</div>
              <div className="lbl">Founded</div>
            </div>
            <div className="about-stat">
              <div className="num">120+</div>
              <div className="lbl">Local partners</div>
            </div>
            <div className="about-stat">
              <div className="num">18k</div>
              <div className="lbl">Trips planned</div>
            </div>
            <div className="about-stat">
              <div className="num">4.8★</div>
              <div className="lbl">Average trip rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}