# BBBiodiversity

JavaScript, Plotly and D3.js

Belly Button Biodiversity in charts.

github page: https://ninaquik.github.io/BBBiodiversity/

## Overview
The purpose of this project is to manipulate, parse and visualize Belly Button Biodiversity data in an interactive web page.

d3.json is used to create an html select drop-down based on data stored in the [sample.js](/data/sample.js) file.  When a test subject is selected, their information is displayed in the Demographic Info panel and the following charts are rendered:

- A Plotly horizontal bar chart featuring the top ten microbial species (OTUs or operational taxonomic units) found in the selected subject’s belly button.
- A Plotly gauge chart displaying the frequency of belly button washes per week.
-	A Plotly bubble chart featuring all microbial species for the test subject, including a hover that shows the bacterial names.

## Results
![overview](/Resources/screenshot.png)

Hover text displays the OTU labels, i.e., information about the bacterial culture

![hover](/Resources/barchart.png)

![hover2](/Resources/bubblechart.png)
