# uqam_station_website
##Notes
Pour lancer le site avec docker, depuis la racine du projet (uqam_station_website)
lancer docker-compose -f docker/deployment/docker-compose.yml up --build -d
Les routes du site et les fichiers statiques sont entierement géré par les services du docker-compose. 
###Important
configurer lacces aux fichiers media avec nginx de la machine host

###Bugs identifiés: 
collectstatic sortie verbeuse, il va falloir utiliser un autre compilateur de scss.