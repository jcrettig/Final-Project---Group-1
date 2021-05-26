#################################################
# Imports
#################################################
import numpy as np
import pandas as pd
import datetime as dt
from dateutil.relativedelta import relativedelta

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine("postgresql://postgres:postgres@localhost:5432/stroke2_db")             
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# view dataframe
# stroke_df = pd.read_sql_table('stroke', engine)               
# print (stroke_df)       

stroke = Base.classes.stroke   

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def home():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"                                       
        f"/api/v1.0/stroke_1<br/>"  
        f"/api/v1.0/stroke_2<br/>"
        f"/api/v1.0/age<br/>"      
        f"/api/v1.0/bmi<br/>"
        f"/api/v1.0/glucose<br/>"
    )

@app.route("/api/v1.0/stroke_1")
def stroke1_route():   
    session = Session(engine)
    stroke_q = session.query(stroke.id,stroke.gender,stroke.age,stroke.hypertension,stroke.heart_disease,stroke.ever_married,stroke.work_type,stroke.Residence_type,stroke.avg_glucose_level,stroke.bmi,stroke.smoking_status,stroke.stroke).all()
    session.close()

    rows = [(id,gender, age, hypertension, heart_disease, ever_married, work_type, Residence_type, avg_glucose_level, bmi, smoking_status, stroke) for id,gender, age, hypertension, heart_disease, ever_married, work_type, Residence_type, avg_glucose_level, bmi, smoking_status, stroke in stroke_q]
    cols = list(zip(*rows))
    stroke_results = {'id':cols[0], 'gender':cols[1], 'age':cols[2], 'hypertension':cols[3], 'heart_disease':cols[4], 'ever_married':cols[5], 'work_type':cols[6], 'Residence_type':cols[7], 'avg_glucose_level':list(map(float,cols[8])), 'bmi':list(map(float,cols[9])), 'smoking_status':cols[10], 'stroke':cols[11]}

    return jsonify(stroke_results)

@app.route("/api/v1.0/stroke_2")
def stroke2_route():   
    session = Session(engine)
    stroke_q = session.query(stroke.id,stroke.gender,stroke.age,stroke.hypertension,stroke.heart_disease,stroke.ever_married,stroke.work_type,stroke.Residence_type,stroke.avg_glucose_level,stroke.bmi,stroke.smoking_status,stroke.stroke).all()
    session.close()

    stroke_results = []
    for id,gender, age, hypertension, heart_disease, ever_married, work_type, Residence_type, avg_glucose_level, bmi, smoking_status, _stroke in stroke_q:
        stroke_dict = {}
        stroke_dict["id"] = id
        stroke_dict["gender"] = gender
        stroke_dict["age"] = age
        stroke_dict["hypertension"] = hypertension
        stroke_dict["heart_disease"] = heart_disease
        stroke_dict["ever_married"] = ever_married
        stroke_dict["work_type"] = work_type
        stroke_dict["Residence_type"] = Residence_type
        stroke_dict["avg_glucose_level"] = float(avg_glucose_level)
        stroke_dict["bmi"] = float(bmi)
        stroke_dict["smoking_status"] = smoking_status
        stroke_dict["stroke"] = _stroke
        stroke_results.append(stroke_dict)

    return jsonify(stroke_results)  

age_df = pd.DataFrame(
    {"Age":[25, 35, 45, 55, 65, 75,85],
    "nstroke":[440, 608, 681, 771, 699, 452, 416],
    "stroke":[0, 1, 7, 27,53,57,102]
    }
)

@app.route("/api/v1.0/age")
def age_route():   
    
    return jsonify({col:list(age_df[col]) for col in age_df.columns})

bmi_df = pd.DataFrame(
    {"bmi":[18.5, 25.0, 30.0, 100.0],
    "nstroke":[39, 854, 1256, 1774],
    "stroke":[1, 35, 75, 97]
    }
)

@app.route("/api/v1.0/bmi")
def bmi_route():   
    
    return jsonify({col:list(bmi_df[col]) for col in bmi_df.columns})

glucose_df = pd.DataFrame(
    {"glucose":[100, 150, 200, 250, 300],
    "nstroke":[2498, 962, 236, 351, 20],
    "stroke":[110, 47, 34, 51, 5]
    }
)

@app.route("/api/v1.0/glucose")
def glucose_route():   
    
    return jsonify({col:list(glucose_df[col]) for col in glucose_df.columns})


if __name__ == '__main__':
    app.run(debug=True)
