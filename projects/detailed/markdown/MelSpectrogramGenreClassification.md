## Music Genre Classification from Mel Spectrograms

### Introduction 
The goal of this project was to design a neural network capable of detecting the genre of different song samples. Classifying a song into a single genre can be difficult because several factors determine the genre of the song, including tempo, melody, instruments used, and many other features. There are also features of a song that determine genre that cannot be explicitly heard from the song, including geographical location or historical period. By using spectrograms, we aimed to consolidate many of the numeric audio features of a song into one aspect to be used in genre classification. For our approach to solving this problem, we turned 30-second samples of songs into mel spectrograms to be used as input into a convolutional neural network. These neural networks were then trained to classify these spectrograms into one of ten music genres.

### Data
The data we used included 1000 different audio files and their respective mel spectrograms. There was an equal distribution of audio files for the 10 different genres, and an almost equal distribution of spectrograms, as one of the jazz spectrograms was missing. 

<img src="/projects/detailed/markdown/MelSpectrogramGenreClassification/Jazz_Mel_Spectrogram.png" 
     alt="Jazz Mel Spectrogram" 
     style="width:50%; height:auto;">

<!-- ![Jazz Mel Spectrogram](/projects/detailed/markdown/MelSpectrogramGenreClassification/Jazz_Mel_Spectrogram.png) -->

This is a mel spectrogram for one of the jazz music samples.

We decided to use mel spectrograms as our predicting features as we felt that they captured various features and patterns, like tempo or pitch. Despite being given spectrograms, we decided to train the model using our own spectrograms made with Librosa and PyTorch. This was because when taking a closer look at the provided spectrograms, the time axis of spectrograms was compressed, which lowered the evaluation metrics when compared to less compressed time axis spectrograms. Additionally, the given spectrograms came as RGB images even though spectrograms have time and frequency axes with brightness corresponding to amplitude. This means that spectrograms should be treated as images with one channel. Treating them as three-channeled images made training more time-consuming.

Because of the small dataset, we used data augmentation to increase the total number of different spectrograms we had. Three different data augmentation methods were used: gaussian noise, pitch adjustment, and reordering. The noise was randomly sampled from 0-0.01 and added to the time series representation of each song. The pitch adjustment meant lowering and raising the pitch of the song between -2 and 2 steps- normally sampled, before turning it into a spectrogram. For reordering, we picked a random timestamp to cut the song into two halves and swapped the order. This was because we felt that the genre of the song should largely be the same despite the order difference. However, we did limit the reordering to only making one cut per song as we felt reordering too much could affect how the genre was detected. By doing data augmentation, we were able to triple the size of our dataset. 

### Method

Our solution was to train a CNN that took a one-channel spectrogram as input and passed it to three rounds of convolutions with kernel size 3x3 and stride 1. The first max pooling was performed with kernel 2x2 and stride 2 while the next two were 4x4 and stride 4. Then the data was flattened and passed to a fully connected layer with a hidden layer of size 2056 and 10 outputs. ReLU was performed after each convolutional layer and the hidden layer. Torch’s Adam optimizer was used with a learning rate of 3e-4, weight decay of 3e-5 with cross-entropy loss, and run for 15 epochs. This model was trained with full augmentation (pitch, noise, reordering) and augmentation without a pitch on a 70% to 30% test split.

```
from torch import nn

model  = nn.Sequential(
        nn.Conv2d(1, 32, 3,  stride=1, padding=1),
        nn.ReLU(),
        nn.Conv2d(32, 32, 3,  stride=1, padding=1),
        nn.ReLU(),
        nn.MaxPool2d(2, stride=2),

        nn.Conv2d(32, 64, 3,  stride=1, padding=1),
        nn.ReLU(),
        nn.Conv2d(64, 64, 3,  stride=1, padding=1),
        nn.ReLU(),
        nn.MaxPool2d(4, stride=4),

        nn.Conv2d(64, 128, 3,  stride=1, padding=1),
        nn.ReLU(),
        nn.Conv2d(128, 128, 3,  stride=1, padding=1),
        nn.ReLU(),
        nn.MaxPool2d(4, stride=4),

        nn.Flatten(),
        nn.Linear(5120 ,2056),
        nn.ReLU(),
        nn.Linear(2056 ,10),
    )
```

### Results

With Pitch Augmentation

<!-- <img src="/projects/detailed/markdown/MelSpectrogramGenreClassification/CNN_With_Pitch_Augmentation_HeatMap.png" 
     alt="CNN With Pitch Augmentation HeatMap" 
     style="width:50%; height:auto;">

<img src="/projects/detailed/markdown/MelSpectrogramGenreClassification/CNN_With_Pitch_Augmentation_Results.png" 
     alt="CNN With Pitch Augmentation Results" 
     style="width:50%; height:auto;"> -->

![CNN With Pitch Augmentation HeatMap](/projects/detailed/markdown/MelSpectrogramGenreClassification/CNN_With_Pitch_Augmentation_HeatMap.png)
![CNN With Pitch Augmentation Results](/projects/detailed/markdown/MelSpectrogramGenreClassification/CNN_With_Pitch_Augmentation_Results.png)

Without Pitch Augmentation

![CNN Without Pitch Augmentation HeatMap](/projects/detailed/markdown/MelSpectrogramGenreClassification/CNN_Without_Pitch_Augmentation_HeatMap.png)
![CNN Without Pitch Augmentation Results](/projects/detailed/markdown/MelSpectrogramGenreClassification/CNN_Without_Pitch_Augmentation_Results.png)

### Future Work

If we continue this project further, there are several things we could do to improve the outcome of this model. Something we wanted to implement but struggled with due to complexity and time was to implement a recurrent convolutional neural network. This is because a recurrent network would take advantage of the linear time series aspect of the spectrograms. By implementing a recurrent convolutional neural network, we predict that this would do better in classifying song genres as we would be taking full advantage of the way spectrograms are meant to be read. We tried to initially implement this idea using the vision transformer, however trying to fine-tune the pre-trained model did not go as well as we would have liked. Another model we would have liked to try would be to do convolutional neural network classifications on different kinds of spectrograms and then combine their output into a multi-level perceptron to do classification. This way we might be able to differentiate the small differences in the similar genres, like blues or rock, by not limiting ourselves to only using mel spectrograms. 
