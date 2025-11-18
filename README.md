(1) Create a github repo containing the files for a basic HTML/CSS site (the content isn't important)
(2) Create a Deployment running nginx with a PersistentVolumeClaim to store the website contents
(3) Create a CronJob running 'alpine/git' with the same PersistentVolumeClaim attached to it and have it sync with the github repo every hour or so





4:31
It's a basic example of a version-controlled containerized website
4:32
That way when you edit the HTML on the git repo, it will automatically sync with the contents being served by nginx
