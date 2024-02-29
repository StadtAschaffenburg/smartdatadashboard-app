# Working with opencode.de

### 0. Prerequisites:

- Access to opencode.de

opencode.de is a gitlab instance for the öffentliche Verwaltung. Our Repository is running at https://gitlab.opencode.de/smart-city-muenster/klimadashboard-muenster/klimadashboard-muenster

### 1. Pushing changes

After pushing changes to the `main` branch, there are two GitLab CI pipelines running:

- Vercel Deployment: The latest changes will be deployed on vercel: https://klimadashboard-ms.vercel.app/
- Docker Image: The CI will build a docker image with the latest changes and publish it to the GitLab Container Registry: https://gitlab.opencode.de/smart-city-muenster/klimadashboard-muenster/klimadashboard-muenster/container_registry

### 2. Scheduled CI

In order to keep the data up to date, there are several CI Pipelines that will run each month:

- [climate-history-parser](https://gitlab.opencode.de/smart-city-muenster/klimadashboard-muenster/climate-history-parser): Reads historic climate data from the DWD and pushes the dataset to the repository
- [climate-indices-parser](https://gitlab.opencode.de/smart-city-muenster/klimadashboard-muenster/climate-indices-parser): Reads historic climate indices (hot days, cold nights etc.) from the DWD and pushes the dataset to the repository
- [ms-buildings-parser](https://gitlab.opencode.de/smart-city-muenster/klimadashboard-muenster/ms-buildings-parser): Reads energy consumption data for buildings of the city of Münster and pushes the dataset to the repository
- [ms-open-data-parser](https://gitlab.opencode.de/smart-city-muenster/klimadashboard-muenster/ms-open-data-parser): Parses the large open data CSV file and splits it into seperate files which can be used by the tiles
