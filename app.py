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

from flask import Flask, jsonify, render_template

from flask_cors import CORS

import os

# view dataframe
# stroke_df = pd.read_sql_table('stroke', engine)               
# print (stroke_df)       

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
# CORS(app)
db_url = os.environ['DATABASE_URL'] or "postgresql://postgres:postgres@localhost:5432/stroke2_db"
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)


#################################################
# Database Setup
#################################################
engine = create_engine(db_url)   
# engine = create_engine("postgresql://postgres:postgres@localhost:5432/stroke2_db")          
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

stroke = Base.classes.stroke 

#################################################
# Flask Routes
#################################################
@app.route("/")
def home():
    """List all available api routes."""
    return render_template('index.html')

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
    {"Age":["<25", "25-34", "35-44", "45-54", "55-64", "65-74" , "75-85"],
    "nstroke":[440, 608, 681, 771, 699, 452, 416],
    "stroke":[0, 1, 7, 27,53,57,102]
    }
)

@app.route("/api/v1.0/age")
def age_route():   
    
    return jsonify({col:list(age_df[col]) for col in age_df.columns})

bmi_df = pd.DataFrame(
    {"bmi":["<18.5", "18.5-25.0", "25.1-30.0", ">30.0"],
    "nstroke":[39, 854, 1256, 1774],
    "stroke":[1, 35, 75, 97]
    }
)

@app.route("/api/v1.0/bmi")
def bmi_route():   
    
    return jsonify({col:list(bmi_df[col]) for col in bmi_df.columns})

glucose_df = pd.DataFrame(
    {"glucose":["<100", "100-149", "150-199", "200-249", "250-300"],
    "nstroke":[2498, 962, 236, 351, 20],
    "stroke":[110, 47, 34, 51, 5]
    }
)

@app.route("/api/v1.0/glucose")
def glucose_route():   
    
    return jsonify({col:list(glucose_df[col]) for col in glucose_df.columns})


#################################################
# Flask Routes to render remaining pages
#################################################

@app.route("/about")
def about():
    return render_template('about.html')

@app.route("/ML")
def ml():
    return render_template('ML.html')

@app.route("/donutCharts")
def donutCharts():
    return render_template('donutCharts.html')

@app.route("/dataset")
def dataset():
    return render_template('dataset.html')

@app.route("/strokeInfo")
def strokeInfo():
    return render_template('strokeInfo.html')

@app.route("/PP")
def PP():
    return render_template('PP.html')

@app.route("/contact")
def contact():
    return render_template('contact.html')

@app.route("/heartDonut")
def heartDonut():
    return render_template('heartDonut.html')

@app.route("/homeDonut")
def homeDonut():
    return render_template('homeDonut.html')

@app.route("/hypertensionDonut")
def hypertensionDonut():
    return render_template('hypertensionDonut.html')

@app.route("/marryDonut")
def marryDonut():
    return render_template('marryDonut.html')

@app.route("/sexDonut")
def sexDonut():
    return render_template('sexDonut.html')

@app.route("/smokeDonut")
def smokeDonut():
    return render_template('smokeDonut.html')

@app.route("/workDonut")
def workDonut():
    return render_template('workDonut.html')

@app.route("/descriptive")
def descriptive():
    return render_template('descriptive.html')

@app.route("/ageBar")
def ageBar():
    return render_template('ageBar.html')

@app.route("/bmiBar")
def ageBar():
    return render_template('bmiBar.html')

@app.route("/glucoseBar")
def ageBar():
    return render_template('glucoseBar.html')

if __name__ == '__main__':
    app.run(debug=True)
