'use client'

import CookieConsent from 'react-cookie-consent'

export default function Cookies() {
  return (
    <CookieConsent
      buttonStyle={{
        background: '#aab315',
        color: '#fff',
        borderRadius: '4px',
      }}
      buttonText="Akzeptieren"
      declineButtonStyle={{
        borderRadius: '4px',
      }}
      declineButtonText="Ablehnen"
      enableDeclineButton
      style={{
        background: '#005b79',
      }}
    >
      Einwilligung zu Cookies (Analytics, Tracking)
    </CookieConsent>
  )
}
