# Connect the Dashboard with a CMS

Compared to [https://klimadashboard.ms/](Klimadashboard Münster), this setup uses a CMS for nearly all of its content. The goal is to minimize the need for frontend updates and allow users to create new tiles without a web developer’s assistance.

All data from the CMS is downloaded and stored locally in the `assets/cache` folder. Only live data (e.g., weather or traffic) is requested on page load. If you anticipate high traffic, consider using a more robust caching solution.

## 1. Reuse Our CMS

It is possible to adopt our CMS (Statamic). It is not open source, but is provided on demand. If you are interested, please contact the City of Aschaffenburg: [mailto:digital@aschaffenburg.de](digital@aschaffenburg.de).

## 2. Bring Your Own CMS

You can also supply the data from a different CMS. However, the dashboard heavily relies on various API endpoints, so you will need to recreate or rewrite these to maintain functionality. A good starting point is the `lib/cms.ts` file.
