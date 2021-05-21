#Imports
import pandas as pd
from sqlalchemy import create_engine
import numpy as np
import os

#Create reference to csv file with data
strokedb = "DataG/healthcare-dataset-stroke-data.csv"

#Read csv file with data
stroke_df = pd.read_csv(strokedb)

#Convert NaN to 0 in the bmi column
stroke_df['bmi'] = stroke_df['bmi'].fillna(0)

#Filter to remove rows for lines with the age < 16
stroke_df = stroke_df.loc[stroke_df['age'] > 16,:]
stroke_df.head(10)

#Sort rows by in ascending order by age to determine if filter worked properly
stroke_df.sort_values(by="age", ascending=True)

#Export file as csv, without Panda's index, but with the header
stroke_df.to_csv("DataG/etl_stroke_dataset.csv", index=False, header=True)

engine = create_engine(os.environ.get('SQLALCHEMY_DATABASE_URI'))
conn = engine.connect()

stroke_df.to_sql('stroke',con=engine, index=False, if_exists='replace')

with engine.connect() as con:
    con.execute('ALTER TABLE stroke ADD PRIMARY KEY (id);')