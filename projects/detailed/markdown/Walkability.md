# Analysis of Walkability throughout the United States

May 2025 - June 2025

Observable Notebook: [The Importance of Walkability](https://observablehq.com/@chocoknight/the-importance-of-walkability)

Relevant Skills: JavaScript ([Arquero](https://idl.uw.edu/arquero/), [Vega-Lite](https://vega.github.io/vega-lite/), [D3](https://d3js.org/))

### Context
This project aims to explore the importance and availability of walkability throughout the United States. This is so that people reading the article can gain a better understanding of walkabiltiy and its benefits.

Walkable neighborhoods comes with a lot of benefits. With everything being closer together, people are encouraged to be more active which helps them stay healthier. This leads to health benefits like reduced cardiovascular disease or obesity rates. People are also able to lower their carbon footprint when they chose to walk, bike, or take public transportation compared to choosing to drive everywhere they need to go.

Walkable cities also encourage more social interaction within the community. Interactions with others in the community tends to increase in walkable cities, leading to a stronger sense of community and better mental health. 

By making the article interactive and mostly visual, it was meant to encourage a deeper exploration into the topic, where people can become more engrossed into the topic. We chose to use choropleths to make it easier to explore specific parts of the United States and regression plot to make it easier to see the various corrleations walkability had with other health factors. 

### Visualizations
<div style="text-align: center">
    <img src="/projects/detailed/markdown/Walkability/USA%20Walkability%20GIF.gif" 
        alt="Walkability of the United States" 
        style="width:75%; height:auto;">
</div>

The focus of this choropleth was to make it easier for people to explore how walkability is across the United States. It allows for people to select specific states and counties to see how walkability can change drastically depending on the location. This visualization was made using the [D3](https://d3js.org/) library. 

<div style="text-align: center">
    <img src="/projects/detailed/markdown/Walkability/Heart%20Disease%20GIF.gif" 
        alt="Walkability and Heart Disease Correlation" 
        style="width:75%; height:auto;">
</div>

The aim of these regression plots was to show the various correlation between walkability and various factors of cardiovascular disease. By allowing selectable options for various attributes to cardiovascular disease, it allows for people to see the how decrease walkability can lead to an increase of health risks. This visualization was made using the [Vega-Lite](https://vega.github.io/vega-lite/) library. 

<div style="text-align: center">
    <img src="/projects/detailed/markdown/Walkability/State%20Obesity%20GIF.gif" 
        alt="Walkability and Obesity Correlation" 
        style="width:75%; height:auto;">
</div>

The aim of this choropleth was to show the relationship between walkability and obesity in the various states and their counties. This visualization was made using the [D3](https://d3js.org/) library. 

<!-- ![Walkability of the United States](/projects/detailed/markdown/Walkability/USA%20Walkability%20GIF.gif)
![Walkability and Heart Disease Correlation](/projects/detailed/markdown/Walkability/Heart%20Disease%20GIF.gif)
![Walkability and Obesity Correlation](/projects/detailed/markdown/Walkability/State%20Obesity%20GIF.gif) -->