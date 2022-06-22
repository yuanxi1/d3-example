function main() {
  //=========Define constants=========//
  const width = window.innerWidth;
  const height = window.innerHeight;
  const margin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60,
  };
  const csvUrl =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
  const parseRow = (d) => {
    const cols = Object.keys(d);
    const vals = Object.values(d);
    const r = [];
    r.push({ Province: vals[0] });
    r.push({ Country: vals[1] });

    for (let i = 4; i < cols.length; i++) {
      r.push({ Date: cols[i], Cases: +vals[i] });
    }
    return r;
  };
  //======================================//
  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const draw = async () => {
    // Fetch and process the data
    let data = await d3.csv(csvUrl, parseRow);
    data = data.filter((d) => d[0].Province === "");

    setInterval(() => {
      const countryIndex = Math.floor(Math.random() * data.length);
      const timeSeriesData = data[countryIndex].slice(2);
      const countryName = data[countryIndex][1].Country.split("");
      //=================Title================//
      svg
        .selectAll("text")
        .data(countryName, (d) => d) //Example: countryName = [S, i, n, g, a, p, o, r, e];
        .join(
          // TODO #1
          (enter) => enter.append("text").text((d) => d),
          (update) => update,
          (exit) => exit.remove()
        )
        .attr("x", (d, i) => i * 16 + margin.left)
        .attr("y", margin.top / 2);

      //=================Chart================//
      // var x = d3
      //   .scaleTime()
      //   .domain(
      //     d3.extent(timeSeriesData, function (d) {
      //       return new Date(d.Date);
      //     })
      //   )
      //   .range([margin.left, width - margin.right]);

      // var y = d3
      //   .scaleLinear()
      //   .domain([0, d3.max(timeSeriesData, (d) => d.Cases)])
      //   .range([height - margin.bottom, margin.top]);

      // const xAxis = (g, scale = x) =>
      //   g.attr("transform", `translate(0,${height - margin.bottom})`).call(
      //     d3
      //       .axisBottom(scale)
      //       .ticks(width / 80)
      //       .tickSizeOuter(0)
      //   );

      // const yAxis = (g, scale = y) =>
      //   g
      //     .attr("transform", `translate(${margin.left},0)`)
      //     .call(d3.axisLeft(scale).ticks(height / 40))
      //     .call((g) => g.select(".domain").remove());

      // svg.selectAll(".axis").remove();
      // svg.append("g").attr("class", "axis").call(xAxis, x);
      // svg.append("g").attr("class", "axis").call(yAxis, y);

      // const line = d3
      //   .line()
      //   .x((d) => x(new Date(d.Date)))
      //   .y((d) => y(d.Cases));

      // // TODO #2
      // const path = svg
      //   .selectAll("path")
      //   .data([timeSeriesData])
      // i++;
    }, 3000);
  };
  draw();
}
