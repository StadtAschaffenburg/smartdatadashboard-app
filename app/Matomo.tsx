'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

const COOKIE_CONSENT_NAME = 'CookieConsent'

export default function Matomo() {
  const [isAllowed, setIsAllowed] = useState(false)

  useEffect(() => {
    function getCookie(cname: string) {
      const name = cname + '='
      const decodedCookie = decodeURIComponent(document.cookie)
      const ca = decodedCookie.split(';')
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) == ' ') {
          c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length)
        }
      }
      return ''
    }

    // check cookie value each second
    const id = setInterval(() => {
      setIsAllowed(getCookie(COOKIE_CONSENT_NAME) == 'true')
    }, 1000)

    return () => clearInterval(id)
  }, [])

  if (isAllowed) {
    return (
      <Script id="matomo">
        {`
    var _paq = window._paq = window._paq || [];
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    (function() {
      var u="https://internet-webanalyse.stadt-muenster.de/";
      _paq.push(['setTrackerUrl', u+'matomo.php']);
      _paq.push(['setSiteId', '8022']);
      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
      g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
    })();
  `}
      </Script>
    )
  }
}
