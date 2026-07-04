interface TranslationSectionProps {}

export const TranslationSection = ({}: TranslationSectionProps) => {
  return (
    <section id="translate" className="light" data-spine="Speak">
      <div className="sec-head">
        <div className="eyebrow">Speak the place</div>
        <h2>AI translation, right where you need it</h2>
        <p className="muted">Type or speak in your language, get the local phrase back instantly — with an offline pack for when signal doesn't reach.</p>
      </div>

      <div className="translate-wrap">
        <div className="chat-mock">
          <div className="bubble you">Where can I find a good vegetarian breakfast nearby?</div>
          <div className="bubble local">
            അടുത്തുള്ള നല്ല സസ്യാഹാര പ്രാതൽ എവിടെ കിട്ടും? <br />
            <span className="translation-hint">Malayalam · tap to hear it spoken</span>
          </div>
          <div className="bubble you">Thank you, that's very helpful</div>
          <div className="bubble local">നന്ദി, അത് വളരെ സഹായകരമാണ്</div>
        </div>

        <div>
          <p className="muted">Roamwise translates text and voice across 40+ languages, tuned for travel — menus, directions, small talk with your driver, all handled the same way.</p>
          <div className="lang-pills">
            <div className="lang-pill">Malayalam</div>
            <div className="lang-pill">Hindi</div>
            <div className="lang-pill">Tamil</div>
            <div className="lang-pill">Bengali</div>
            <div className="lang-pill">Japanese</div>
            <div className="lang-pill">Spanish</div>
            <div className="lang-pill">French</div>
            <div className="lang-pill">+ 33 more</div>
          </div>
        </div>
      </div>
    </section>
  )
}