function loadDataInfo(idx, i) {
    console.log(url[idx][i]);
    d3.csv(url[idx][i]).then(data => {
        let message = '';
        message += "File Size: " + Math.round(d3.csvFormat(data).length / 1024) + " kB\n\n";
        message += "Rows: " + data.length + " rows\n\n"; // Excluding the header row
        message += "Columns: " + data.columns.length + " columns\n\n";
        document.querySelector('.box1 pre').textContent = '';
        document.querySelector('.box1 pre').textContent = message;

        if (idx === 1 && i > 0) {

            document.querySelector('.box2').innerHTML = '';
            document.querySelector('.box2').innerHTML = "Data obtained from:<br><br>Kaggle";
            document.querySelector('.box3').innerHTML = '';
            document.querySelector('.box3').innerHTML = "Visualized through:<br><br>d3.js";

            var width = 670,
                height = 400;

            var x = d3.scaleBand().range([0, width]).padding(0.1);
            var y = d3.scaleLinear().range([height, 0]);

            var svg = d3.select("#display").append("svg")
                .attr("width", width + 60)
                .attr("height", height + 60)
                .append("g")
                .attr("transform", "translate(" + 55 + "," + 15 + ")");

            if (tabs[idx][i] === "country") {
                console.log("country");
                data.forEach(function (d) {
                    d.AverageTemperature = +d.AverageTemperature;
                });

                x.domain(data.map(function (d) { return d.Year; }));
                y.domain([23, d3.max(data, function (d) { return d.AverageTemperature; })]);

                svg.selectAll(".graphbar")
                    .data(data)
                    .enter().append("rect")
                    .attr("class", "graphbar")
                    .attr("x", function (d) { return x(d.Year); })
                    .attr("width", x.bandwidth())
                    .attr("y", function (d) { return y(d.AverageTemperature); })
                    .attr("height", function (d) { return height - y(d.AverageTemperature); });

                svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x))
                    .append("text")
                    .attr("y", 35)
                    .attr("x", 350)
                    .attr("text-anchor", "end")
                    .attr("font-size", "1rem")
                    .style("font-family", "Roboto")
                    .style("fill", "black")
                    .text("Year");

                svg.append("g")
                    .call(d3.axisLeft(y).tickFormat(function (d) {
                        return d;
                    }).ticks(15))
                    .append("text")
                    .attr("y", -35)
                    .attr("x", -150)
                    .attr("transform", "rotate(270)")
                    .attr("text-anchor", "end")
                    .attr("font-size", "1rem")
                    .style("font-family", "Roboto")
                    .style("fill", "black")
                    .text("Average Temperature");
            }
            else if (tabs[idx][i] === "global average") {
                console.log("global average");
                data.forEach(function (d) {
                    d.LandAverageTemperature = +d.LandAverageTemperature;
                });

                x.domain(data.map(function (d) { return d.Year; }));
                y.domain([8, d3.max(data, function (d) { return d.LandAverageTemperature; })]);

                svg.selectAll(".graphbar")
                    .data(data)
                    .enter().append("rect")
                    .attr("class", "graphbar")
                    .attr("x", function (d) { return x(d.Year); })
                    .attr("width", x.bandwidth())
                    .attr("y", function (d) { return y(d.LandAverageTemperature); })
                    .attr("height", function (d) { return height - y(d.LandAverageTemperature); });

                svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x))
                    .append("text")
                    .attr("y", 35)
                    .attr("x", 350)
                    .attr("text-anchor", "end")
                    .attr("font-size", "1rem")
                    .style("font-family", "Roboto")
                    .style("fill", "black")
                    .text("Year");

                svg.append("g")
                    .call(d3.axisLeft(y).tickFormat(function (d) {
                        return d;
                    }).ticks(15))
                    .append("text")
                    .attr("y", -35)
                    .attr("x", -150)
                    .attr("transform", "rotate(270)")
                    .attr("text-anchor", "end")
                    .attr("font-size", "1rem")
                    .style("font-family", "Roboto")
                    .style("fill", "black")
                    .text("Land Average Temperature");
            }
            else if (tabs[idx][i] === "global max") {
                console.log("global max");
                data.forEach(function (d) {
                    d.LandMaxTemperature = +d.LandMaxTemperature;
                });

                x.domain(data.map(function (d) { return d.Year; }));
                y.domain([20, d3.max(data, function (d) { return d.LandMaxTemperature; })]);

                svg.selectAll(".graphbar")
                    .data(data)
                    .enter().append("rect")
                    .attr("class", "graphbar")
                    .attr("x", function (d) { return x(d.Year); })
                    .attr("width", x.bandwidth())
                    .attr("y", function (d) { return y(d.LandMaxTemperature); })
                    .attr("height", function (d) { return height - y(d.LandMaxTemperature); });

                svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x))
                    .append("text")
                    .attr("y", 35)
                    .attr("x", 350)
                    .attr("text-anchor", "end")
                    .attr("font-size", "1rem")
                    .style("font-family", "Roboto")
                    .style("fill", "black")
                    .text("Year");

                svg.append("g")
                    .call(d3.axisLeft(y).tickFormat(function (d) {
                        return d;
                    }).ticks(15))
                    .append("text")
                    .attr("y", -35)
                    .attr("x", -150)
                    .attr("transform", "rotate(270)")
                    .attr("text-anchor", "end")
                    .attr("font-size", "1rem")
                    .style("font-family", "Roboto")
                    .style("fill", "black")
                    .text("Land Max Temperature");
            }
        }
        else if (idx === 1 && i === 0) {
            const display = document.querySelector('#display');
            const img1 = document.createElement('img');
            img1.src = "../Outputs/byMajorCity.png";
            img1.classList.add('major-city');
            const img2 = document.createElement('img');
            img2.src = "../Outputs/byMajorCityBars.png";
            img2.classList.add('major-city');
            display.appendChild(img1);
            display.appendChild(img2);
            document.querySelector('.box2').innerHTML = '';
            document.querySelector('.box2').innerHTML = "Data obtained from:<br><br>Kaggle";
            document.querySelector('.box3').innerHTML = '';
            document.querySelector('.box3').innerHTML = "Visualized through:<br><br>Tableau";
        }
        else {
            document.querySelector('.box2').innerHTML = '';
            document.querySelector('.box2').innerHTML = "Data obtained from:<br><br>Our World in Data";
            document.querySelector('.box3').innerHTML = '';
            document.querySelector('.box3').innerHTML = "Visualized through:<br><br>R";
            if (i === 0) {
                const display = document.querySelector('#display');
                const img = document.createElement('img');
                img.src = "../Outputs/Annual.png";
                img.classList.add('co2-emissions');
                display.appendChild(img);
            }
            else if (i === 1) {
                const display = document.querySelector('#display');
                const img = document.createElement('img');
                img.src = "../Outputs/Absolute.png";
                img.classList.add('co2-emissions');
                display.appendChild(img);
            }
            else if (i === 2) {
                const display = document.querySelector('#display');
                const img = document.createElement('img');
                img.src = "../Outputs/Cummulative.png";
                img.classList.add('co2-emissions');
                display.appendChild(img);
            }
            else {
                const display = document.querySelector('#display');
                const img = document.createElement('img');
                img.src = "../Outputs/Share.png";
                img.classList.add('co2-emissions');
                display.appendChild(img);
            }
        }

    });
}