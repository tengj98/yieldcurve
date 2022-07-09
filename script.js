const svg = d3.select("svg")

// responsive 
svg.attr("viewBox", "0 0 960 320")

const tdata = "treasuryyieldcurve.csv"

const parsed = d3.csvParse(tdata)

d3.csv(parsed).then(function (data) { // load file then run function
    const line = d3.line()
        .x((d,i) => { return dateScale(d.date) })
        .y((d,i) => { return closeScale(d.close) })  

    svg
        .append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line)


})
            
//     var line = d3.svg.line()
//     .x(function (d) { return d.Date; })
//     .y(function (d) { return d.Value; });   


// // d3.json(url).then(function (data) { // load json file then run function
   
//    // turns string of data into date
//   const dateParse = d3.timeParse("%Y-%m-%d") // in between parentheses are the date specifiers
   
//    // replace old dataset with new dataset
//   data = data.map((d,i) => {
//     return { close: d.close, date: dateParse(d.date) }
//    }) 

//   // work out the bounds -- what is the minimum / maximum date
//   const minDate = d3.min(data, (d,i) => { return d.date })
//   const maxDate = d3.max(data, (d,i) => { return d.date })

//   const minClose = d3.min(data, (d,i) => { return d.close })
//   const maxClose = d3.max(data, (d,i) => { return d.close })

//   // make scales
//   const dateScale = d3.scaleTime()
//     .domain([minDate, maxDate])
//     .range([60, 900])

//   const closeScale = d3.scaleLinear()
//     .domain([minClose, maxClose])
//     .range([280, 60])

//   // where line should go
//   const line = d3.line()
//     .x((d,i) => { return dateScale(d.date) })
//     .y((d,i) => { return closeScale(d.close) })

//   // where area chart should go
//   const area = d3.area()
//     .x0((d,i) => { return dateScale(d.date) })
//     .x1((d,i) => { return dateScale(d.date) })
//     .y0((d,i) => { return closeScale(minClose) + 10})
//     .y1((d,i) => { return closeScale(d.close) })

//   svg
//     .append("path")
//     .datum(data)
//     .attr("class", "area")
//     .attr("d", area)

//   svg
//     .append("path")
//     .datum(data)
//     .attr("class", "line")
//     .attr("d", line)

//   const hoverGroup = svg
//     .append("g")
//     .attr("transform", "translate(-100,-100)")
  
//   // make a group for the cursor hover box
//   hoverGroup  
//     .append("rect")
//     .attr("x", -50)
//     .attr("y", -60)
//     .attr("width", 100)
//     .attr("height", 50)

//   hoverGroup  
//     .append("circle")
//     .attr("cx", 0)
//     .attr("cy", 0)
//     .attr("r", 7)
    
//   const stockText = hoverGroup
//     .append("text")
//     .attr("class", "close")
//     .attr("x", 0)
//     .attr("y", -37)
//     .text("hi")

//   const dateText = hoverGroup
//     .append("text")
//     .attr("class", "date")
//     .attr("x", 0)
//     .attr("y", -18)
//     .text("date")

//   // on is part of d3, look for interaction events 
//   svg.on("mousemove", function () {
//     // d3.mouse will give us array of two numbers 
//     const mouse = d3.mouse(this) // find out where the mouse is
//     const mouseX = mouse[0] // find out the x position of the mouse 
//     // gives me the date based on the x coordinate (but not ALIGNED to data)
//     const mouseDate = dateScale.invert(mouseX) // use date scale to find out what date it is based on mouse position
//     // use bisector to align date data by splitting it up. based on data not on pixels now
//     const bisector = d3.bisector((d) => { return d.date }).right // split data up into two 
//     const i = bisector(data, mouseDate) // figure out index across the page 
//     const dataPoint = data[i] // use index to get data

//     if (dataPoint) {
//       const x = dateScale(dataPoint.date)
//       const y = closeScale(dataPoint.close)
//       const timeFormat = d3.timeFormat("%Y-%m-%d")
//       const dateFormatted = timeFormat(dataPoint.date)

//       dateText.text(dateFormatted)
//       stockText.text(dataPoint.close)
//       // move hovergroup per mouseX's x coordinate
//       hoverGroup.attr("transform", `translate(${x},${y})`)

//     }
    
//   })

//   // remove hover tooltip when mouse is off svg
//   svg
//     .on("mouseout", function () {
//       hoverGroup.attr("transform", "translate(-999,-999)")
//     })

//  })