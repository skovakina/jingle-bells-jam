import json
import time

import pandas as pd
from pandas.api.types import CategoricalDtype

import plotly_express as px
import plotly.graph_objects as go

import random

import haversine as hs
from haversine import Unit

# from concorde.problem import Problem
# from concorde.concorde import Concorde

pd.options.mode.chained_assignment = None

url = 'https://raw.githubusercontent.com/skovakina/jingle-bells-jam/main/src/scripts/country_data.csv'
locations = pd.read_csv(url)

countries = ['United States', 'Greenland', 'Bolivia', 'Central African Republic', 'Antarctica',
             'France', 'Russia', 'Australia', 'Afghanistan']

locations_9 = locations.query('name in @countries')

locations_9.reset_index(inplace=True, drop=True)

total_distance_random = 0
unique_cities = locations_9['name'].unique()
visited_cities = []

start_city = random.choice(unique_cities)

visited_cities.append(start_city)

old_city = start_city

for i in range(len(unique_cities)-1):
    remaining_cities = list(set(unique_cities) - set(visited_cities))

    new_city = random.choice(remaining_cities)

    old_city_idx = locations_9.index[locations_9['name'] == old_city][0]
    new_city_idx = locations_9.index[locations_9['name'] == new_city][0]

    total_distance_random += hs.haversine((locations_9.loc[old_city_idx, 'latitude'], locations_9.loc[old_city_idx, 'longitude']), (locations_9.loc[new_city_idx, 'latitude'], locations_9.loc[new_city_idx, 'longitude']), unit=Unit.MILES)

    visited_cities.append(new_city)
    
    old_city = new_city
    

start = time.time()

# Re-sort df by index
locations_9.sort_index(inplace=True)

# Create haversine distance matrix
indici = locations_9['name'].values

distances = pd.DataFrame(index=indici, columns=indici)

# For every country, calculate haversine distance
for from_ in indici:
    for to in indici:
        if from_ == to:
            distances.loc[from_, to] = 0
        else:
            city_one_idx = locations_9.index[locations_9['name'] == from_][0]
            city_two_idx = locations_9.index[locations_9['name'] == to][0]
            dist = hs.haversine((locations_9.loc[city_one_idx, 'latitude'], locations_9.loc[city_one_idx, 'longitude']),
                                (locations_9.loc[city_two_idx, 'latitude'], locations_9.loc[city_two_idx, 'longitude']), unit=Unit.MILES)
            distances.loc[from_, to] = dist
            distances.loc[to, from_] = dist
            
# Change to float
distances = distances.iloc[:, 0:9].astype(float)

# Concorde requires int dtype matrix
distances = distances.astype(int).to_numpy()

# Function to solve with Concorde package
# def solve_concorde(matrix):
#     problem = Problem.from_matrix(matrix)
#     solver = Concorde()
#     solution = solver.solve(problem)
#     return solution

# # Find optimal solution
# solution = solve_concorde(distances)

# tour = solution.tour

# # Display Country names of tour and ordered data frame
# ordered_countries = [locations_9.loc[i, 'name'] for i in tour]

# # opt_locations_9 = locations_9.copy()

# country_order = CategoricalDtype(ordered_countries, ordered=True)

# locations_9['name'] = locations_9['name'].astype(country_order)

# locations_9.sort_values(by='name', inplace=True)

# Calculate total distance
total_distance_opt = distances[0, 7] + distances[7, 2] + distances[2, 1] + distances[1, 3] + distances[3, 8] + distances[8, 6] + distances[6, 5] + distances[5, 4]

end = time.time()

total_time = end - start

total_distance_opt = total_distance_opt.astype('float').round(2)

dictionary = {
    'total_distance_random': total_distance_random,
    'total_distance_opt': total_distance_opt,
    'total_solution_time': total_time,
    'countries': [{'name': locations_9.loc[0, 'name'],
                   'latitude': locations_9.loc[0, 'latitude'],
                   'longitude': locations_9.loc[0, 'longitude'],
                   'random_position': 2,
                   'optimized_position': 3},
                  {'name': locations_9.loc[1, 'name'],
                   'latitude': locations_9.loc[1, 'latitude'],
                   'longitude': locations_9.loc[1, 'longitude'],
                   'random_position': 3,
                   'optimized_position': 1}]
}

# # dictionary = {
# #     'total_distance_random': total_distance,
# #     'total_dis_opt': total_opt,
# #     'total_time': total_time,
# #     'cities': [{'name': France,
# #                 'long': ###,
# #                     }]
# # }

json_data = json.dumps(dictionary, indent=4)

print(json_data)