# CO-Centuries
## Contexte
*Contexte : d'où viennent les données, qui les a créées et dans quel contexte.*

Nous avons trouvé les données regoupées sur [GitHub](https://github.com/owid/co2-data).

Les données sur les émissions de CO2 et de gaz à effet de serre proviennent de la base de données Our World in Data. Cette base de données est mise à jour régulièrement et comprend des données sur les émissions de CO2 (annuelles, par habitant, cumulatives et basées sur la consommation), d'autres gaz à effet de serre, le mix énergétique et d'autres métriques pertinentes. 

Ces données sont basées sur plusieurs sources, telles que la revue statistique de l'énergie mondiale de BP, les [données internationales sur l'énergie de l'EIA](https://www.eia.gov/opendata/bulkfiles.php), le [Global Carbon Project](https://www.globalcarbonproject.org/), [CAIT Climate Data Explorer](https://www.climatewatchdata.org/data-explorer/historical-emissions), la [base de données de l'Université de Groningen GGDC Maddison Project](https://www.rug.nl/ggdc/historicaldevelopment/maddison/releases/maddison-project-database-2020), Bolt et van Zanden, etc. Le code d'ingestion, de traitement et d'exportation est également fourni.

Enfin, un changelog est fourni pour suivre les mises à jour apportées aux données.
## Description
*Description : Comment sont structurées les données ? Parler du format, des attributs et du type de données.*

Sur [GitHub](https://github.com/owid/co2-data), les donnlées sont disponibles au format CSV et XLSX sous la forme d'une ligne par localisation et année. De plus, elles sont disponbiles en version JSON structurées par pays avec un tableau de données annuelles.

Nous utiliserons probablement les données structurées en format JSON, qui est un format de données léger et facile à lire et écrire pour les humains. Le fichier contient plusieurs objets représentant les pays, avec chaque objet contenant une liste de données pour ce pays, triées par année.

Chaque objet de données pour un pays contient plusieurs attributs décrivant diverses mesures d'émissions de CO2, de population et d'utilisation du sol. Les attributs incluent l'année, la population, les émissions cumulatives de CO2 pour diverses sources telles que le charbon, le gaz et le pétrole, ainsi que les émissions dues à l'utilisation des terres.

Les types de données sont principalement des nombres décimaux pour les mesures d'émissions et de population, et des chaînes de caractères pour les noms de pays et les codes ISO à deux lettres. Les données couvrent une période allant de 1750 à 2021 pour certains pays.

Il est important de souligner que, dans le fichier, on retrouve aussi les chiffres par continent.
## But
*But : qu'est-ce que vous voulez découvrir ? Des tendances ? Vous voulez explorer ou expliquer ?*

Notre projet est de créer une carte interactive du monde qui permettra aux utilisateurs de découvrir l'évolution des émissions de CO2 au fil du temps. La carte sera conçue de manière à ce qu'en scrollant à travers les années, les utilisateurs pourront voir comment les émissions ont changé dans différents pays et régions du monde.

Nous voulons également ajouter des notifications pour les années clés qui signalent des événements importants liés à la pollution et à l'écologie. Ces notifications seront accompagnées d'un marqueur sur la carte pour indiquer l'emplacement géographique de l'événement. Les utilisateurs pourront cliquer sur le marqueur pour avoir plus d'informations (lieu, date, explications).

À la fin de l'exploration, nous avons prévu d'ajouter un bouton qui permettra aux utilisateurs de visualiser les données d'émission en prenant en compte les émissions par habitant. Cela permettra de changer la perspective de visualisation et d'observer si les tendances varient en fonction de la population d'un pays. Nous souhaitons intégrer cette interaction de manière à susciter la réflexion chez l'utilisateur. Nous envisageons d'ajouter une phrase d'accroche telle que "Et si on changeait de perspective ?" ou "Et si on arrêtait d'être hypocrites ?". L'idée est d'encourager les utilisateurs à considérer les émissions de CO2 non seulement en termes absolus, mais aussi en fonction de la population. Cette nouvelle perspective pourrait conduire à une prise de conscience plus profonde de l'impact environnemental des modes de vie et de la consommation, ainsi que les inciter à des changements de comportement plus durables.

Le but du projet est d'aider les utilisateurs à mieux comprendre comment les émissions de CO2 ont évolué au fil du temps et dans différentes parties du monde. Cela peut aider à sensibiliser les gens à l'importance de la réduction des émissions et de la protection de l'environnement.
## Références
*Références : Qui d'autre dans le web ou dans la recherche a utilisé ces données ? Dans quel but ?*

Nous avons trouvé plusieurs sites utilisant ces données pour faire divers représentations dont voici une liste :
- Le [Global Carbon Atlas](http://www.globalcarbonatlas.org/en/CO2-emissions) utilise ces données pour représenter graphiquement l'évolution de la quantité d'émission de CO2 produit par pays au fil des années de 1960 à 2021. Ils les présentent sous forme de carte, de diagramme ou encore de bulles. 
- Le [Global Carbon Budet](https://essd.copernicus.org/articles/14/4811/2022/), repris ici dans la revue scientifique "Earth System Science Data" (ESSD) publiée par Copernicus Publications, s'appuie sur le Global Carbon Project pour la redaction du rapport annuel.
- [Our World in Data](https://ourworldindata.org/explorers/co2) est un site mettant à disposition de nombreaux jeux de données sur notre monde. On y retrouvera alors nos données sur la quantité de CO2 émis par pays au fil des années de 1750 à 2021. 