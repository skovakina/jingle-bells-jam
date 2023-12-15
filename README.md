# Merry Mailers

### Meat our team

- [Kelly Shreeve - Data Scientist](https://github.com/kellyshreeve)
- [Anthony Barrios - Software Engineer](https://github.com/IxAntho)
- [Svetlana Kovakina - Software Engineer](https://github.com/skovakina)

### Description

Ever wondered how Santa gets all those gifts around the globe in one night? Well, we've borrowed a page from his book! Welcome to Merry Mailers, the most efficient (and let’s be honest, the most fun) delivery service in the world.

### Design

- [Link to the project on Figma](https://www.figma.com/file/SpY6DFB6h4iw6Zu3EgVn7Z/Merry-Codemas?type=design&node-id=0%3A1&mode=design&t=GhuLCnpvvt5qYUBL-1)

### Run locally

To get started with this project, clone the repository from GitHub:

```bash
git clone https://github.com/skovakina/jingle-bells-jam.git
cd jingle-bells-jam
npm install
npm start
```

### Route Optimization

To help Santa get where he needs to go, our resident Data Scientist optimized his route around the globe. From a random model taking over 36 hours to a speedy 23 hour trip, here's how data helped Santa.

#### Run Model Locally

To run .py and .ipynb files locally, install requirments.txt

```pip install -r requirements.txt```

#### Data Set

A data set of longitude and latitudes for each country around the world was found open-source on Kaggle and can be accessed [here](https://www.kaggle.com/datasets/alexkaechele/country-geo). 

country.csv

* *country*: country abbreviation
* *latitude*: country latitude
* *longitude*: country longitude
* *name*: country name

The dataset contains information on country abbreviation, latitude, and longitude for 245 countries around the world. The data were explored for missing values, duplicates, and incorrect values. Only one missing value was found, and it was dropped from the data. Data were otherwise in good condition and ready for analysis.

#### Approach

This problem is a take on the 'Traveling Sales Man' problem to optimize the route between multiple locations.  

Rather than brute-force solve the permutation problem, Concorde library in Python optimizes the route between many locations, with quick and efficient calculations.  

*Haversine* distance to calculates 'as the bird flies' while taking into account the curvature of the earth.

#### Random Model

First, a random model was fit as a baseline to find distance and time it would take Santa without data. This model chooses the next city randomly (if santa chose off vibes), and calculates the Haversine distance to go along the random route:

![Alt text](<Screenshot 2023-12-14 at 3.12.00 PM.png>)

**Random Route Results**: 

Random Start city: Antarctica

Random Route Order: 'Antarctica', 'France', 'Australia', 'Bolivia', 'United States', 'Greenland', 'Afghanistan', 'Russia', 'Central African Republic'

Random Route Distance: 46977.53 miles

Random Route Time: 36.14 Hours

#### Optimized Model

With Concorde library, Santa's route was optimized to the shortest distance possible. This library was developed specifically to solve the Traveling Sales Man problem and can quickly and efficiently solve the best route between locations. A matrix of Haversine distances was fed into the model, and this was the result:

![Alt text](<Screenshot 2023-12-14 at 3.26.25 PM.png>)

**Optimized Route Results**:

Optimal Start city: Afghanistan

Optimized Route Order: 'Afghanistan', 'Russia', 'Australia', 'Antarctica', 'Bolivia', 'United States', 'Greenland', 'France', 'Central African Republic'

Optimal Distance: 31087 miles

Optimized Time: 23.91 hours

Time to Calculate Solution: 0.03 seconds

#### Conclusions  

Santa has a big night ahead of him, delivering presents around the globe. Merry Mailers wants to help him optimize his trip! To create a model of his trip, nine locations were chosen from around the world: United States, Bolivia, Greenland, Antarctica, France, Central African Republic, Afhanistan, Russia, and Australia.  

First, a random route was chosen as a baseline (if santa chose his next location off vibes). In his sub-optimal route, santa had to travel 50,000 miles and needed 35 hours to make it around the world. He wouldn't have made it in time!  

With Merry Mailer's specialized route optimization algorithm, we were able to take santa's trip down to 31,000 miles and just under 24 hours. This algorithm used state-of the art Concorde library and Haversine distance to minimize santa's distance delivering from one house to another and speedily found an optimal solution in 0.03 seconds! We're taking the pressure off santa by telling him to travel in this order: Afghanistan, Russia, Australia, Antarctica, Bolivia, United States, Greenland, France, Central African Republic. With our modeling sofware, santa can feel good about making it everywhere he needs to go.  

What's next for Merry Mailers? We're committed to follow up with each of our clients. We'll measure santa's success this season, and maybe add some more locations into our optimizer for next year. And it looks like we'll be staying busy through the year - the Easter Bunny, St. Nicholas, and Tooth Fairy have been knocking at our door.
