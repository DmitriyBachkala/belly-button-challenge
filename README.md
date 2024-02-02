# belly-button-challenge

For the most part, this challenge was pretty straightforward. Referencing previous code allowed me to complete most of it.


I got this code for the dropdown change event listener from chat.openai.com:
d3.select("#selDataset").on("change", function() {
    updatePlots(this.value);
});


This code was refined with chat.openai.com (specifically, ...panel.append("h6").text(`${key.toUpperCase()}: ${value}`);...)

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
