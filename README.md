# Merry Mailers

### Meat our team

- [Kelly Shreeve - Data Scientist](https://github.com/kellyshreeve)
- [Anthony Barrios - Software Engineer](https://github.com/IxAntho)
- [Svetlana Kovakina - Software Engineer](https://github.com/skovakina)

### Description

Ever wondered how Santa gets all those gifts around the globe in one night? Well, we've borrowed a page from his book! Welcome to Merry Mailers, the most efficient (and let’s be honest, the most fun) delivery service in the world.

### Design

- [Link to the project on Figma](https://www.figma.com/file/SpY6DFB6h4iw6Zu3EgVn7Z/Merry-Codemas?type=design&node-id=0%3A1&mode=design&t=GhuLCnpvvt5qYUBL-1)

### Run localy

To get started with this project, clone the repository from GitHub:

```bash
git clone https://github.com/skovakina/jingle-bells-jam.git
cd jingle-bells-jam
npm install
npm start
```

### Route Optimization

To help Santa get where he needs to go, our resident Data Scientist optimized his route around the globe. From a random model taking over 36 hours to a speedy 23 hour trip, here's how data helped Santa.

#### Data Set

A data set of longitude and latitudes for each country around the world was found open-source on Kaggle and can be accessed [here](https://www.kaggle.com/datasets/alexkaechele/country-geo).

country.csv

* *country*: country abbreviation
* *latitude*: country latitude
* *longitude*: country longitude
* *name*: country name

#### Approach

This problem is a take on the 'Traveling Sales Man' problem to optimize the route between multiple locations.  

Rather than brute-force solve the permutation problem, Concorde library in Python optimizes the route between many locations, with quick and efficient calculations.  

*Haversine* distance to calculates 'as the bird flies' while taking into account the curvature of the earth.

#### Random Model

First, a random model was fit as a baseline to find distance and time it would take Santa without data:

![Alt text](<Screenshot 2023-12-14 at 3.12.00 PM.png>)

Random Start city: Antarctica

Random Route Order: 'Antarctica', 'France', 'Australia', 'Bolivia', 'United States', 'Greenland', 'Afghanistan', 'Russia', 'Central African Republic'

Random Route Distance: 46977.53 miles

Random Route Time: 36.14 Hours

#### Optimized Model

With Concorde library, Santa's route was optimized to the shortest distance possible.

![Alt text](<Screenshot 2023-12-14 at 3.26.25 PM.png>)

Optimal Start city: Afghanistan

Optimized Route Order: 'Afghanistan', 'Russia', 'Australia', 'Antarctica', 'Bolivia', 'United States', 'Greenland', 'France', 'Central African Republic'

Optimal Distance: 31087 miles

Optimized Time: 23.91 hours

#### 

