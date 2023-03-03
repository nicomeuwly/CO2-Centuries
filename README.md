# CO-Centuries
## Contexte
Le Global Carbon Project (GCP) est une organisation qui se consacre à l'étude et à l'intégration des connaissances sur les gaz à effet de serre émis par les activités humaines et le système terrestre. Depuis 2001, le GCP publie des estimations des émissions mondiales et nationales de CO2 fossile, qui sont disponibles sur Zenodo. Les données sont incluses dans un format absolu standard et per capita, accompagnées de fichiers de métadonnées au format JSON, ainsi qu'un fichier indiquant la source de chaque point de données. Les auteurs de l'article sur la méthodologie utilisée dans la version 2022 du jeu de données sur les émissions de CO2 fossile sont Andrew, Robbie M. et Peters, Glen P.

Les projets du GCP incluent la création de budgets mondiaux pour les trois principaux gaz à effet de serre - le dioxyde de carbone, le méthane et l'oxyde nitreux - ainsi que des efforts complémentaires pour étudier les émissions urbaines, régionales, cumulatives et négatives. Le site Web de l'organisation est accessible à l'adresse suivante : https://www.globalcarbonproject.org/.
## Données
Les données sont structurées en format JSON (JavaScript Object Notation), qui est un format de données léger et facile à lire et écrire pour les humains. Le fichier contient plusieurs objets représentant les pays, avec chaque objet contenant une liste de données pour ce pays, triées par année.

Chaque objet de données pour un pays contient plusieurs attributs décrivant diverses mesures d'émissions de CO2, de population et d'utilisation du sol. Les attributs incluent l'année, la population, les émissions cumulatives de CO2 pour diverses sources telles que le charbon, le gaz et le pétrole, ainsi que les émissions dues à l'utilisation des terres.

Les types de données sont principalement des nombres décimaux pour les mesures d'émissions et de population, et des chaînes de caractères pour les noms de pays et les codes ISO à deux lettres. Les données couvrent une période allant de 1750 à 2021 pour certains pays.

Il est important de souligner que, dans le fichier, on retrouve aussi les chiffres par continent.