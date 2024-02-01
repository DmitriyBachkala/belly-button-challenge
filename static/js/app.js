// URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// fetch the data from the URL
d3.json(url).then(data => {
    console.log(data); 
});


// Function to initialize the dashboard
function init() {
    var dropdown = d3.select("#selDataset");

    d3.json(url).then(data => {
        data.names.forEach(name => {
            dropdown.append("option").text(name).property("value", name);
        });

        updatePlots(data.names[0]);
    });
}

// Function to update the metadata display (Demografic info)
function updateMetadata(sample) {
    d3.json(url).then(data => {
        var metadataArray = data.metadata.filter(obj => obj.id == sample);
        var metadata = metadataArray[0];

        // Select the panel
        var panel = d3.select("#sample-metadata");

        // Clear any previous metadata
        panel.html("");

        // Add each key-value pair to the panel
        Object.entries(metadata).forEach(([key, value]) => {
            panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}

// Function for plots
function updatePlots(sample) {
    d3.json(url).then(data => {
        var result = data.samples.filter(obj => obj.id == sample)[0];

        // Bar chart data
        var barData = [{
            y: result.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
            x: result.sample_values.slice(0, 10).reverse(),
            text: result.otu_labels.slice(0, 10).reverse(),
            type: 'bar',
            orientation: 'h'
        }];

        // Bubble chart data
        var bubbleData = [{
            x: result.otu_ids,
            y: result.sample_values,
            text: result.otu_labels,
            mode: 'markers',
            marker: {
                size: result.sample_values,
                color: result.otu_ids,
                colorscale: 'Earth'
            }
        }];

        // Bar chart layout
        var barLayout = {
            margin: { t: 15, l: 150 }
        };

        // Bubble chart layout
        var bubbleLayout = {
            height: 500,
            width: 1200
        };

        // Plot the charts
        Plotly.newPlot('bar', barData, barLayout);
        Plotly.newPlot('bubble', bubbleData, bubbleLayout);

        updateMetadata(sample);
    });
}

// Dropdown change event listener
d3.select("#selDataset").on("change", function() {
    updatePlots(this.value);
});

// Initialize the dashboard
init();