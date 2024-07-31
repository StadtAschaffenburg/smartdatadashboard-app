# Update LIVE Websites
- Connect via SSH with `dashboard.aschaffenburg.de`
- Go to project folder: `/opt/smartdatadashboard`
- Pull new update
- Restart service if needed: `systemctl restart smartdatadashboard.service`

# Update PUBLIC Repository
- Add public repository as remote: `git remote add public https://github.com/StadtAschaffenburg/smartdatadashboard-app.git`
- Update after updating live app: `git push public main`