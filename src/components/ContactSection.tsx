import { EmailIcon, PhoneIcon } from './Icons'

interface ContactSectionProps {}

export const ContactSection = ({}: ContactSectionProps) => {
  return (
    <section id="contact" className="dark" data-spine="Contact">
      <div className="sec-head">
        <div className="eyebrow">Contact</div>
        <h2>Planning something tricky? Talk to us</h2>
        <p className="muted">Group trips, custom safety briefings, corporate off-sites — write in and a real person replies within a day.</p>
      </div>

      <div className="contact-wrap">
        <div>
          <div className="cinfo-row">
            <EmailIcon />
            <div>
              <div className="l">Email</div>
              <div className="v">hello@roamwise.travel</div>
            </div>
          </div>

          <div className="cinfo-row">
            <PhoneIcon />
            <div>
              <div className="l">Phone</div>
              <div className="v">+91 98300 00000</div>
            </div>
          </div>

          <div className="socials">
            <a href="#">ig</a>
            <a href="#">x</a>
            <a href="#">in</a>
          </div>
        </div>

        <form className="cform" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Full name"/>
          <input type="email" placeholder="Email address"/>
          <textarea placeholder="Tell us about your trip..."></textarea>
          <button type="submit" className="btn btn-gold">
            Send message →
          </button>
        </form>
      </div>
    </section>
  )
}