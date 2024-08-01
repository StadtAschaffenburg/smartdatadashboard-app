# Update LIVE Websites
- Connect via SSH: `ssh [user]@dashboard.aschaffenburg.de`
- Go to project folder: `cd /opt/smartdatadashboard/smartdatadashboard-ab`
- Pull new update: `git fetch && git pull`
- Stop service: `systemctl stop smartdatadashboard.service`
- Update application: `npm update && npm run build`
- Restart service: `systemctl start smartdatadashboard.service`

# Update PUBLIC Repository
- Add public repository as remote: `git remote add public https://github.com/StadtAschaffenburg/smartdatadashboard-app.git`
- Update after updating live app: `git push public main`