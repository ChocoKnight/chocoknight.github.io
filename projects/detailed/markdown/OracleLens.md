## Oracle Lens - League of Legends Match Predictor

Janurary 2025 - June 2025 

GitHub Repo - [Oracle Lens](https://github.com/ChocoKnight/OracleLens)

Relevant Skills: Python ([PyTorch](https://pytorch.org/), [Pandas](https://pandas.pydata.org/), [NumPy](https://numpy.org/)), SQL ([MySQL](https://www.mysql.com/)), TypeScript ([React](https://react.dev/), [Node.js](https://nodejs.org/en), [Vite](https://vite.dev/)), Machine Learning, Deep Learning

### Context

The focus of my senior project was to develop a prediction algorithm for the professional esports scene of [League of Legends](https://www.leagueoflegends.com/en-us/). League of Legends is a multiplayer online battle arena video game where two teams of five players compete to take over the other's base. In the [official competitive scene](https://lolesports.com/en-US/leagues/first_stand,lck,msi,worlds), teams are separated by region into different leagues around the globe. The purpose of this project is to compile data across competitive play from 2014 to 2025 to help develop and train a machine learning algorithm to predict the likelihood of one team winning over another based on their recent performance, regardless of which region the teams hail from.

### Data

The first step in this project was to gather the relevant data related to the competitive scene for League of Legends. Most of the data for this project comes from [Oracle’s Elixir](https://oracleselixir.com/tools/downloads), a website dedicated to League of Legends and Valorant esports analytics. Oracle’s Elixir provides comma-separated value (CSV) files for matches between 2014 and 2025, and these files were parsed and formatted to be inserted into a MySQL database. The champion names and IDs were obtained from Riot Games’ official data dragon API and inserted into the database. The database was modeled to store relevant information about every tournament, match, game, player, team, and champion. All of the scripts to clean, parse, and store data were done using Jupyter notebooks.

### Front End

After gathering the data and storing it in the database, the next phase of the project was to build a web application to display all the data being stored, so that users can search for specific matches, players, or champions. The website was made using the React and Node.js framework in TypeScript and initialized using the npm init command to create the mono repo. In the mono repo, there are two main directories, server, for everything related to the backend, and app, for everything related to the front end. The backend of the website was designed to be a RESTful API that connected to the MySQL database to serve information about the different aspects and details of competitive play. It connects to the database using the MySQL2 library and uses the express library to process and handle any requests going toward the server. Every time a call is made to the API, a SQL query is sent to the MySQL database to execute the purpose behind that call, with most calls being used to get data from the database, but the other RESTful features like post, put, and delete was also implemented but rarely used. The frontend framework was designed using the React Bootstrap library to handle the component design. Every time a page is loaded, it makes a call to the API on the backend to serve that data to be displayed.

<div style="text-align: center">
     <img src="/projects/detailed/markdown/OracleLens/Oracle_Lens_LCK_Summer_2024_Matches.png" 
          alt="Oracle Lens LCK Summer 2024 Matches" 
          style="width:75%; height:auto;">
     <img src="/projects/detailed/markdown/OracleLens/Oracle_Lens_LCK_Summer_2024_Teams.png" 
          alt="Oracle Lens LCK Summer 2024 Teams" 
          style="width:75%; height:auto;">
</div>

Oracle Lens was able to display information related to specific tournaments. Here, we can see information about the League of Legends Champions Korea (LCK) 2024 Summer split, in this instance the match history and team overall performance. 

<div style="text-align: center">
     <img src="/projects/detailed/markdown/OracleLens/Oracle_Lens_T1_2024.png" 
          alt="Oracle Lens T1 2024 Page" 
          style="width:75%; height:auto;">
</div>

In this image, we can see detailed statistics about T1'2 2024 team. This information can help provide information and insights into the teams, letting users know how they perform and what they prioritize. 

### Machine Learning Training

The machine learning pipeline has two distinct parts, an LSTM RNN and a neural network. The LSTM RNN took as input the last ten games a team has played and predicted their performance in the next game. This was done as a team’s performance fluctuates depending on who, when, and where they are playing and this helped capture that variable context. For the training and validation data, a sliding window was played over matches ranging from 2014 to 2024 to get matches where the teams had already played ten matches. This resulted in 46665 valid matches to be used for training. The data used an 80/20 split for training and validation. This model used PyTorch’s mean squared error loss function and the AdamW optimizer when training. After hyperparameter fine-tuning, the LSTM model consists of 7 layers, each with 128 nodes, a learning rate of 1e-4, and a weight decay of 1e-3. It was trained for only 10 epochs to avoid overfitting on the match data. The final mean squared error loss of the model was 0.5092. While this is a higher loss than preferred, this was still within reasonable bounds for model performance.

```
import torch.nn as nn

class LSTMForecaster(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers, output_size):
        super(LSTMForecaster, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, output_size)

    def forward(self, x):
        lstm_out, _ = self.lstm(x)  # x: [batch, seq_len, input_size]
        out = self.fc(lstm_out[:, -1, :])  # last time step
        return out
```

<!-- ![Team Performance LSTM NN Model](/projects/detailed/markdown/OracleLens/Team_Performance_Predictor_LSTM_RNN_Architecture.png) -->

The neural network model of the pipeline focused on taking the performance of two teams and predicting which of the two would win if they played in a match against each other. For training and validation, this model took on input 54448 matches played between 2014 and 2024. Despite various aspects of the game-changing as the game got older, the core fundamentals of what features helped push a team toward victory stayed constant. This model also used an 80/20 split for the training and validation split of the training data. The neural network model consisted of five layers, taking in a vector of size 236 and reducing until only an output of one remained. After fine-tuning, the model used a learning rate of 1e-5, a weight decay of 1e-3, and training from 20 epochs. At the end of training, this model had a validation testing accuracy of 98.67% and an F1 score of 98.76%.

```
nn_model = torch.nn.Sequential(
    torch.nn.Linear(236, 128),
    torch.nn.ReLU(),
    torch.nn.Linear(128, 128),
    torch.nn.ReLU(),
    torch.nn.Linear(128, 64),
    torch.nn.ReLU(),
    torch.nn.Linear(64, 64),
    torch.nn.ReLU(),
    torch.nn.Linear(64, 1)
).to(device)
```

<!-- ![Match Predictor NN Model](/projects/detailed/markdown/OracleLens/Match_Predictor_NN_Architecture.png) -->

The two models were combined into a single pipeline so that the predicted team performances could be used as input to the match-winner prediction neural network. This model works by taking in the input of two team IDs, determined by the team IDs within the MySQL database, and a date. These team IDs are then used to call the backend RESTful API to get the 10 previously played matches of a team to use as input to the LSTM RNN. The date is an optional parameter that when used will gather the 10 previously played matches before that date. These matches were used as input to the LSTM RNN to generate new vectors to use as input to the neural network model to predict which of the two teams would win. 

The pipeline of the model uses the FastAPI library to serve the pipeline through a server, similar to the backend RESTful API. The model can either be called directly through a call to the pipeline server or it can be called through the RESTful API on the backend side of the website, which also makes a call to the pipeline endpoint. 
<div style="text-align: center">
     <img src="/projects/detailed/markdown/OracleLens/Oracle_Lens_GenG_2024_T1_2024.png" 
          alt="Oracle Lens Predicting the Chances of Gen.G 2024 Roster against the T1 2024 Roster" 
          style="width:75%; height:auto;">
</div>

In this image, we can see the model predicting the head to head against the 2024 Gen.G and 2024 T1 rosters. This prediction is accurate given the that T1 had not beaten Gen.G for mostly the entire 2024 season, beating them only once in the 2024 League of Legends Worlds Championship semi finals.

The combined LSTM and neural network model was evaluated using accuracy, precision, recall, accuracy, and F1-score. This was to capture the general performance of the model and to see if it was better at dealing with false positives or false negatives. The data used to evaluate the model came from matches that occurred in 2025. Following the same sliding window principle used for the LSTM RNN, 788 valid matches were found that could be used for testing. The output of the pipeline was compared to the actual result of a match between two teams. 

With an accuracy of 56% and an F1-score of 69%, the model is not performing as well as we would have liked. This is because this indicates that the model is only slightly better than flipping a coin to determine which team would win. However, the model does do better when predicting which of the two teams is going to win at the cost of mislabeling which of the two teams sometimes.

With an accuracy of 56% and an F1-score of 69%, the model is not performing as well as we would have liked. This is because this indicates that the model is only slightly better than flipping a coin to determine which team would win. However, the model does do better when predicting which of the two teams is going to win at the cost of mislabeling which of the two teams sometimes.


### Overall Thoughts

Overall, this project has been a large learning opportunity for me to develop technical and decision-making skills. It provided many chances for me to apply and improve on many of the skills I’ve developed during my time at Cal Poly. While my expectations for the performance of the predictive model are not as high as I would have hoped, I did get the chance to learn, explore, and try out a lot of different deep-learning algorithms and techniques. Despite the challenges, I’m proud of the progress I’ve made on this project and the knowledge I’ve gained on the way. I hope to refine the model further and continue exploring ways to improve its performance. This project reinforced the value of persistence, experimentation, and critical thinking, and I’m excited to apply these values to future projects and real-world problems.

### Future Work

If this project were to be continued, there are a number of things that could be done to improve both the website and modeling portion of the project. For the web application, it would benefit from displaying more in-depth statistics about each of the tournaments and matches. This would mean writing more complex SQL queries to gather this data and writing more API endpoints so that these specific data points can be served to the front-end portion of the website. This would encourage more exploration into specific matches and tournaments and provide more insights into the smaller details of the game. For the machine learning side, trying to implement a time series transformer over the LSTM RNN to predict a team’s performance from their recent previous performance. This is to help with the vanishing gradient problem of LSTMs, causing them to have problems with long-term dependencies. By using a transformer, the use of attention would allow for the model to take in longer sequences and have better connections between any of the matches used for predictions.
