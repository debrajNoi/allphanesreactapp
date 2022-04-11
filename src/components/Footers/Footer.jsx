import React from 'react'
import { Link } from 'react-router-dom'
import main_logo from '../../assets/web_img/main_logo.png'
import social from '../../assets/web_img/social_for_now1.png'

function Footer() {
  return (
    <>
      <section id="footer">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <h2>Follow us on :</h2>
            <div className='mt-3'>
              <img src={social} alt="social"  className='social-img'/>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <h2>Company</h2>
            <ul className='mt-4'>
              <li><Link to="/about" className='f-links'>About</Link></li>
              <li><Link to="/team" className='f-links'>Team</Link></li>
              <li><Link to="/contact" className='f-links'>Contact</Link></li>
              <li><Link to="/getstarted" className='f-links'>Get started</Link></li>
              <li><Link to="/faq" className='f-links'>FAQ</Link></li>
            </ul>
          </div>
        </div>
      </section>

      <div className='footer-end'>
        <div>© 2022 Smule, Inc. All Rights Reserved.</div>
        <div>
            <img src={main_logo} alt="footer" className='f-logo' />
        </div>
        <div className='f-end'>
            <Link to="/terms" className='f-links'>Terms</Link>
            <Link to="/privacy" className='f-links'>Privacy</Link>
            <Link to="/Acknowledgments" className='f-links'>Acknowledgments</Link>
            
        </div>
      </div>
    </>
  )
}

export default Footer