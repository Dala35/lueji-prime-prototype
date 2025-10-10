javascript
document.addEventListener('DOMContentLoaded', () => {
    const svg = d3.select("#lab-svg");
    const width = svg.node().getBoundingClientRect().width;
    const height = svg.node().getBoundingClientRect().height;

    const nodesData = [
        { id: "Intenção" },
        { id: "AlmaCode" },
        { id: "CÓDEX" },
        { id: "Manifestação" },
        { id: "Ressonância" },
        { id: "Unicidade" },
        { id: "Fluxo" },
        { id: "Intuição" },
        { id: "Eco" },
    ];

    const linksData = [
        { source: "Intenção", target: "AlmaCode" },
        { source: "AlmaCode", target: "CÓDEX" },
        { source: "CÓDEX", target: "Manifestação" },
        { source: "Manifestação", target: "Ressonância" },
        { source: "CÓDEX", target: "Unicidade" },
        { source: "CÓDEX", target: "Fluxo" },
        { source: "CÓDEX", target: "Intuição" },
        { source: "CÓDEX", target: "Eco" },
    ];

    const simulation = d3.forceSimulation(nodesData)
        .force("link", d3.forceLink(linksData).id(d => d.id).distance(150))
        .force("charge", d3.forceManyBody().strength(-400))
        .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(linksData)
        .join("line");

    const node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodesData)
        .join("circle")
        .attr("r", 15)
        .attr("fill", "var(--primary-color)")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    const label = svg.append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(nodesData)
        .enter()
        .append("text")
        .attr("x", 20)
        .attr("y", 5)
        .text(d => d.id)
        .style("fill", "#fff")
        .style("font-size", "12px");

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        label
            .attr("x", d => d.x + 20)
            .attr("y", d => d.y + 5);
    });

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
});
