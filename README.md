
# Disability representation in Korean movies visualization project

By Team Magic Conch Shell, as a course project of *Data Visualization and Analysis* at Seoul National University

To see our final product and analysis on the data, please visit our [interactive visualization website](https://disability-in-korean-movies.herokuapp.com/) or watch our [demo video](https://youtu.be/3c733rlrjjw). Any comments or suggestions are welcome.

## 0. About the project
This project's goal is to explore how disabled individuals has been represented in Korean movies for the past 20 years. We first gathered 28 Korean movies which depict characters with disability. Then, using [face++](https://www.faceplusplus.com/) face detection API, we automatically detected and identified each character's face emotions. The project is in progress to convey our analysis of character emotion and motion data via an interactive visualization website.

## 1. About the data
### Data collection
Each character's demographic data (e.g. gender, age, disability type) and film genre were collected through publicly available film information.

Image datasets of movie frames were collected by capturing screenshots by 1FPS (frame per second). Through face++ face detection API, characters appearing in each frame were detected and identified automatically, then labelled with their name, gender, age, and disability type. Then, through face++ emotion detection API, each character's possible facial expressions were detected per frame.

### Final dataset
- datalist.csv: all the 38 characters included in this analysis, labelled by age, gender, disability type
- MCS_all_character.csv: all characters detected in movie screenshots, both disabled or not
	- column [c_count]: calculated number of appearance among the movie screenshots
	- column [av_smile] ~ [most_emotion_expressed]: calculated average emotion expressed throughout the movie
	- emotional diversity: the probability of the detected face expression to fall under one of seven emotion categories (i.e. happiness, neutral, surprise, sadness, disgust, anger, fear). the seven probability scores for each frame add up to 1
- disabled_characters.csv: dataset for only disabled characters
- MCS_all_frame.csv: frame-by-frame data of expected emotion of all the characters detected in the movie screenshots


## 2. Key questions attempted to be answered

 1. How are the disabled characters demographically(age, gender, disability type) distributed?
 2. Are there any suggested patterns in characters' demographic status for certain genres?
 3. How much emotional diversity does the disabled characters show, by disability type?

## 3. API and libraries used in this project
- [Face++](https://www.faceplusplus.com/) face detection, FaceAlbum, emotion recognition API: detecting faces in movie screenshots, grouping face IDs of the same character, detecting face expressions and emotions
- python libraries: data cleaning and processing
- Flask: web application framework
- d3.js, jquery, etc.: interactive visualization

## 4. How to run the codes by yourself
### System requirements
- Python: version 3.6.5 and higher

### Getting started
- Install the python libraries required for running the codes.
```
pip install -r requirements.txt
```
- Run flask server with "vizserver.py".
```
python vizserver.py
```
- Open [http://localhost:8000/](http://localhost:8000/) in your browser (Google Chrome recommended).
