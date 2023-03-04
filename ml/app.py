from flask import Flask, redirect, url_for, request,jsonify
import numpy as np
from sklearn.decomposition import NMF
import pandas as pd
import json
from flask import Flask
from flask_cors import CORS
def key_function(item):
  return -item[0]
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
@app.route("/", methods = ['GET'])

def home():
    new_user_features = np.array(json.loads(request.args.get('userfeatures')))
    df_matrix = pd.read_csv('user_item_matrix.csv', header = None)
    df_user = pd.read_csv('user_vector.csv', header = None)
    df_problems = pd.read_csv('problems.csv', header = None)
    problems_original = df_problems
    problems_original = df_problems
    df_user = df_user.drop(df_user.columns[0], axis=1)
    # new_user_features = np.array(df_user.iloc[95].values)
    df_problems = df_problems.drop(df_problems.columns[0], axis = 1)
    user_feature_weights = np.ones((66,))
    user_feature_weights[0] = 5
    item_feature_weights = np.ones((65,))
    for i in range(0, 30):
        item_feature_weights[i] = 5
    item_feature_weights[13] = 1
    df_user = df_user * user_feature_weights
    df_problems = df_problems * item_feature_weights
    nmf_model = NMF(n_components=5, max_iter=200)
    user_latent_matrix = nmf_model.fit_transform(df_matrix, W = df_user, H = df_problems)
    item_latent_matrix = nmf_model.components_
    new_user_features = new_user_features.reshape(1, 66)
    new_user_latent = np.array(np.dot(new_user_features,df_user.T))
    new_user_latent = np.dot(new_user_latent,user_latent_matrix)
    predicted_ratings = np.dot(new_user_latent, item_latent_matrix)
    problems_ranked = []
    df_tags = pd.read_csv('taglist.csv', header = None)
    arr = df_tags.iloc[0].values
    tags = []
    for tag in arr:
        tags.append(str(tag))
    for row in predicted_ratings:
        i = 0
        for value in row:
            rating = "800"
            for j in range(30):
                if item_feature_weights[j] > 2 and df_problems.iloc[i].values[j] > 0.5:
                    rating = tags[j]
            problems_ranked.append([value, 
            problems_original.iloc[i].values[0],rating])
            i = i + 1
    problems_ranked.sort(key=key_function)
    ret = []

    for problem in problems_ranked:
       ret.append([str(problem[1]), str(problem[2])])
    return ret