import pandas as pd
from pandas.api.types import CategoricalDtype

import plotly_express as px
import plotly.graph_objects as go

import random

import haversine as hs
from haversine import Unit

pd.options.mode.chained_assignment = None

url = 'https://raw.githubusercontent.com/skovakina/jingle-bells-jam/main/scripts/country_data.csv'
locations = pd.read_csv(url)

countries = ['United States', 'Greenland', 'Bolivia', 'Central African Republic', 'Antarctica',
             'France', 'Russia', 'Australia', 'Afghanistan']

locations_9 = locations.query('name in @countries')

total_distance = 0
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

    total_distance += hs.haversine((locations_9.loc[old_city_idx, 'latitude'], locations_9.loc[old_city_idx, 'longitude']), (locations_9.loc[new_city_idx, 'latitude'], locations_9.loc[new_city_idx, 'longitude']), unit=Unit.MILES)

    visited_cities.append(new_city)
    
    old_city = new_city

country_order = CategoricalDtype(visited_cities, ordered=True)

locations_9['name'] = locations_9['name'].astype(country_order)

locations_9.sort_values(by='name', inplace=True)

map = px.line_geo(data_frame=locations_9, lat='latitude', lon='longitude', hover_data='name',
                  color_discrete_sequence=[px.colors.qualitative.D3[3]])

map.update_geos(landcolor='LightGreen')

map.show()

print(f'Total Distance: {total_distance:.2f} miles')