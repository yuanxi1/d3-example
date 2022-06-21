function main() {
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
  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  let country = 0;
  const draw = async () => {
    let data = await d3.csv(csvUrl, parseRow);
    data = data.filter((d) => d[0].Province === "");

    setInterval(() => {
      const title = data[country][1].Country.split("");
      const t = svg.transition().duration(750);
      // const countryTitle = svg.append("g").attr("class", "title");
      svg
        .selectAll("text")
        .data(title, (d) => d)
        .join(
          (enter) => enter.append("text", (d) => d).text((d) => d),
          (update) => update,
          (exit) => exit.remove()
        )
        .attr("x", (d, i) => i * 16 + margin.left)
        .attr("y", margin.top / 2);

      country++;
    }, 3000);
  };
  draw();
}
