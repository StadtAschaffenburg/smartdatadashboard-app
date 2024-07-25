'use client'

import CookieConsent from 'react-cookie-consent'

export default function Cookies() {
  const handleAccept = () => {
    if (typeof window === 'undefined') {
      return
    }

    const win = window as any
    win._paq = []
    win._paq.push(['trackPageView'])
    win._paq.push(['enableLinkTracking'])
    ;(function () {
      var u = '//matomo.aschaffenburg.de/'
      win._paq.push(['setTrackerUrl', u + 'matomo.php'])
      win._paq.push(['setSiteId', '5'])
      var d = document,
        g = d.createElement('script'),
        s = d.getElementsByTagName('script')[0]
      g.async = true
      g.src = u + 'matomo.js'
      if (s.parentNode) {
        s.parentNode.insertBefore(g, s)
      }
    })()
  }

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
      onAccept={handleAccept}
      style={{
        background: '#005096',
      }}
    >
      Einwilligung zu Cookies (Analytics, Tracking)
    </CookieConsent>
  )
}
