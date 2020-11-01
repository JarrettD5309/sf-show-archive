import React, { useEffect } from 'react';

const runButton = document.getElementById('button');
// runButton.onclick = grow;
function grow() {
    const branchElement = document.getElementsByClassName('animate-branch-0');
    for (let i = 0; i < branchElement.length; i++) {
        branchElement[i].beginElement();
    }
    const textElement = document.getElementsByClassName('animate-text-0');
    for (let i = 0; i < textElement.length; i++) {
        textElement[i].beginElement();
    }
};
const runButton2 = document.getElementById('button2');
// runButton2.onclick = grow2;
function grow2() {
    const branchElement = document.getElementsByClassName('animate-branch-1');
    for (let i = 0; i < branchElement.length; i++) {
        branchElement[i].beginElement();
    }
    const textElement = document.getElementsByClassName('animate-text-1');
    for (let i = 0; i < textElement.length; i++) {
        textElement[i].beginElement();
    }
};



const numBranches = 10;
function createSVG(firstYear, lastYear) {
    const branches = lastYear - firstYear + 1;

    const numScreens = Math.ceil(branches / 10);
    console.log(numScreens);

    // define svg
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const svgNS = svg.namespaceURI;

    // sets size comparision parms
    svg.setAttribute('viewBox', '0 0 1040 600');

    // creates main timeline
    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('stroke-linecap', 'butt');
    path.setAttribute('d', 'M20 300 L1020 300');
    path.setAttribute('stroke', 'black');
    path.setAttribute('stroke-width', '20');
    svg.appendChild(path);

    // distance between branches
    const mDistance = 1000 / (numBranches + 1);

    // first branch = distance plus offset
    let mLocation = mDistance + 20;

    console.log(mDistance);

    // loop to create branches
    for (let i = 0; i < branches; i++) {
        const branch = document.createElementNS(svgNS, 'path');
        branch.setAttribute('stroke-linecap', 'butt');

        // ternary to alternate top and bottom branches
        let branchD;
        i % 2 === 0 ? branchD = `M${mLocation} 300 L${mLocation} 200` : branchD = `M${mLocation} 300 L${mLocation} 400`;

        branch.setAttribute('d', branchD);
        branch.setAttribute('stroke', 'black');
        branch.setAttribute('stroke-width', '10');

        const loops = numScreens - 1;
        let startBranchD = branchD;
        for (let j = 0; j < loops; j++) {

            const animateBranch = document.createElementNS(svgNS, 'animate');
            animateBranch.setAttribute('class', 'animate-branch-' + j);
            animateBranch.setAttribute('attributeName', 'd');
            animateBranch.setAttribute('attributeType', 'XML');
            animateBranch.setAttribute('begin', 'indefinite');
            animateBranch.setAttribute('dur', '3s');
            animateBranch.setAttribute('fill', 'freeze');
            animateBranch.setAttribute('from', startBranchD);

            let endAnimateBranchD;
            i % 2 === 0 ? endAnimateBranchD = `M${mLocation - ((j + 1) * 10 * mDistance)} 300 L${mLocation - ((j + 1) * 10 * mDistance)} 200` : endAnimateBranchD = `M${mLocation - ((j + 1) * 10 * mDistance)} 300 L${mLocation - ((j + 1) * 10 * mDistance)} 400`;
            startBranchD = endAnimateBranchD;

            animateBranch.setAttribute('to', endAnimateBranchD);
            branch.appendChild(animateBranch);
        }

        svg.appendChild(branch);
        mLocation += mDistance;
    }

    // creates text for years
    let xLocation = mDistance + 20;
    for (let i = 0; i < branches; i++) {
        const yearText = document.createElementNS(svgNS, 'text');
        yearText.setAttribute('font-size', '36');
        yearText.setAttribute('font-family', 'sans-serif');
        yearText.setAttribute('text-anchor', 'middle');
        yearText.setAttribute('x', xLocation);


        let yLocation;
        let dyValue;
        i % 2 === 0 ? yLocation = 200 : yLocation = 400;
        yearText.setAttribute('y', yLocation);

        i % 2 === 0 ? dyValue = -15 : dyValue = 40;
        yearText.setAttribute('dy', dyValue);

        let currentYear = firstYear + i;
        yearText.setAttribute('id', 'year' + currentYear)
        yearText.append(currentYear);

        const loops = numScreens - 1;
        let startXLocation = xLocation;
        for (let j = 0; j < loops; j++) {
            const animateText = document.createElementNS(svgNS, 'animate');
            animateText.setAttribute('class', 'animate-text-' + j);
            animateText.setAttribute('attributeName', 'x');
            animateText.setAttribute('attributeType', 'XML');
            animateText.setAttribute('begin', 'indefinite');
            animateText.setAttribute('dur', '3s');
            animateText.setAttribute('fill', 'freeze');
            animateText.setAttribute('from', startXLocation);
            animateText.setAttribute('to', startXLocation - (10 * mDistance));
            startXLocation -= 10 * mDistance;
            yearText.append(animateText);
        };

        xLocation += mDistance;

        svg.appendChild(yearText);
    }

    // creates timeline endcaps
    function makeEnds(cxValue) {
        const circle = document.createElementNS(svgNS, 'circle');
        circle.setAttribute('cx', cxValue);
        circle.setAttribute('cy', 300);
        circle.setAttribute('r', 19);
        circle.setAttribute('stroke', 'black');
        return circle;
    };
    // creates start endcap
    svg.appendChild(makeEnds(20));
    // creates end endcap
    svg.appendChild(makeEnds(1020));


    // appends svg to div
    document.getElementById('timeline').appendChild(svg);

};



function Timeline() {
    useEffect(() => { createSVG(2005, 2034); }, []);

    return (
        <div>
            <button id='button' onClick={grow}>RUN</button>
            <button id='button2' onClick={grow2}>RUN2</button>
            <div id="timeline"></div>
        </div>
    );
};

export default Timeline;