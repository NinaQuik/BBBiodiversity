function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
    console.log(sampleArray);
    //  5. Create a variable that holds the first sample in the array.


    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = sampleArray.map(sample => sample.otu_ids)[0];
    var otuLabels = sampleArray.map(sample => sample.otu_labels)[0];
    var otuValues = sampleArray.map(sample => sample.sample_values)[0];
    console.log(otuIds);
    console.log(otuLabels);
    console.log(otuValues);
  
  // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var yticks = otuIds.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse();
    //console.log( yticks);

    // 8. Create the trace for the bar chart. 
    var trace = {
      x: otuValues.slice(0, 10).reverse(),
      y: yticks,
      text: otuLabels.slice(0,10).reverse(),
      type: "bar",
      orientation: "h",
    };
    var barData = [trace];
    //console.log(barData);
    // 9. Create the layout for the bar chart. 
    var layout = {
      title: {text:"<B>Top Ten Bacteria Cultures Found</B>", font: { size: 18, color: "white" }},
      yaxis: {
        tickfont: {
          size: 14,
          color: "white"
        }
      },
      xaxis: {
        tickfont: {
          size: 14,
          color: "white"
        }
      },
      plot_bgcolor:"black",
      paper_bgcolor:"rgb(83, 78, 87)"
    };
    // Render the plot to the div tag with id "bar"
		Plotly.newPlot("bar", barData, layout); 
    
    // 1. Create the trace for the bubble chart.
    var traceBubble = {
      x: otuIds,
      y: otuValues,
      text: otuLabels,
      mode: "markers",
      marker: {
        size: otuValues,
        color: otuIds,
        colorscale: "Portland"
      }
    }; 
    var bubbleData = [traceBubble];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: {text:"<B>Bacteria Cultures Per Sample</B>", font: { size: 18 }},
      xaxis: {title: "OTU ID"},
      hovermode: "x",
      automargin: true,
      paper_bgcolor:"rgb(83, 78, 87)",
      font: {color: "white"}
    };

    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    //Build the wash frequency gauge chart
    // 1. Create a variable that contains the metadata.
    var subjectData = data.metadata;
    
    // 2. Create a variable the filters the metadata for the subject's id number
    var subjectArray = subjectData.filter(sampleObj => sampleObj.id == sample);
    console.log(subjectArray);
    // Create a variable that holds the washing frequency.
    var washFrequency = parseFloat(subjectArray[0].wfreq);
    console.log(washFrequency);

    var gaugeTrace = 
      {
        value: washFrequency,
        title: { text: "<B>Belly Button Washing Frequency</B><br>Scrubs per Week", font: { size: 18, color: "white" }},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 10] },
          bar: { color: "black" },
          steps: [
            { range: [0, 2], color: "salmon" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "khaki" },
            { range: [6, 8], color: "lightgreen" },
            { range: [8, 10], color: "cadetblue" }
          ],
        }  
      };
    var gaugeData = [gaugeTrace];

    var gaugeLayout = { width: 500, height: 450, margin: { t: 0, b: 0 },
          paper_bgcolor:"rgb(83, 78, 87)",
          font: {color: "white"}
      
    };

    Plotly.newPlot('gauge', gaugeData, gaugeLayout);

  })
}



