import React, { useEffect } from 'react';

const seconds = 3;
const numBranches = 10;
let numScreens = 0;
let currentScreen = 0;
let locked = false;

// Allows right arrow to be clickable and run grow function
document.addEventListener('click', (event) => {
    if (event.target.id === 'triangle-end-right') {
        moveRight();
    } else if (event.target.id === 'triangle-end-left') {
        moveLeft();
    } else if (/^year/.test(event.target.id)) {
        fadeTimeline();
        const currentYear = event.target.textContent;
        yearTextTitle(currentYear);
    }
});

function moveRight() {

    if (locked !== true) {
        locked = true;
        setTimeout(() => locked = false, (seconds * 1000) + 10);
        let hiddenBranchId = 'branch' + (currentScreen + 1) * numBranches;
        let hiddenYearTextId = 'year' + (currentScreen + 1) * numBranches;
        let toHideBranchId = 'branch' + (((currentScreen + 1) * numBranches) - 1);
        let toHideYearTextId = 'year' + (((currentScreen + 1) * numBranches) - 1);
        let leftEndTriangleVisibility = 'visible';
        let leftEndCircleVisibility = 'hidden';
        let rightEndTriangleVisibility = 'visible';
        let rightEndCircleVisibility = 'hidden';
        let animateBranchId = 'animate-branch-' + currentScreen;
        let animateTextId = 'animate-text-' + currentScreen;

        if (currentScreen === 0) {
            // leftEndTriangleVisibility = 'visible';
            // leftEndCircleVisibility = 'hidden';
            // rightEndTriangleVisibility = 'visible';
            // rightEndCircleVisibility = 'hidden';
        }

        if (currentScreen + 2 === numScreens) {
            rightEndTriangleVisibility = 'hidden';
            rightEndCircleVisibility = 'visible';
        }

        const hiddenBranch = document.getElementById(hiddenBranchId);
        hiddenBranch.style.visibility = 'visible';
        const hiddenYearText = document.getElementById(hiddenYearTextId);
        hiddenYearText.style.visibility = 'visible';

        const toHideBranch = document.getElementById(toHideBranchId);
        setTimeout(() => toHideBranch.style.visibility = 'hidden', (seconds * 1000) - 10);

        const toHideYearText = document.getElementById(toHideYearTextId);
        setTimeout(() => toHideYearText.style.visibility = 'hidden', (seconds * 1000) - 10);

        const leftEndTriangle = document.getElementById('triangle-end-left');
        leftEndTriangle.style.visibility = leftEndTriangleVisibility;

        const leftEndCircle = document.getElementById('circle-end-left');
        leftEndCircle.style.visibility = leftEndCircleVisibility;

        const rightEndCircle = document.getElementById('circle-end-right');
        setTimeout(() => rightEndCircle.style.visibility = rightEndCircleVisibility, (seconds * 1000));

        const rightEndTriangle = document.getElementById('triangle-end-right');
        setTimeout(() => rightEndTriangle.style.visibility = rightEndTriangleVisibility, (seconds * 1000));

        const branchElement = document.getElementsByClassName(animateBranchId);
        for (let i = 0; i < branchElement.length; i++) {
            branchElement[i].beginElement();
        }
        const textElement = document.getElementsByClassName(animateTextId);
        for (let i = 0; i < textElement.length; i++) {
            textElement[i].beginElement();
        }

        currentScreen += 1;
    }
};

function moveLeft() {
    if (locked !== true) {
        locked = true;
        let hiddenBranchId = 'branch' + (((currentScreen) * numBranches) - 1);
        let hiddenYearTextId = 'year' + (((currentScreen) * numBranches) - 1);
        let toHideBranchId = 'branch' + (currentScreen) * numBranches;
        let toHideYearTextId = 'year' + (currentScreen) * numBranches;
        let leftEndTriangleVisibility = 'visible';
        let leftEndCircleVisibility = 'hidden';
        let rightEndTriangleVisibility = 'visible';
        let rightEndCircleVisibility = 'hidden';
        let animateBranchId = 'animate-branch-l-' + (currentScreen - 1);
        let animateTextId = 'animate-text-l-' + (currentScreen - 1);

        if (currentScreen === 1) {
            leftEndTriangleVisibility = 'hidden';
            leftEndCircleVisibility = 'visible';
        }

        const hiddenBranch = document.getElementById(hiddenBranchId);
        hiddenBranch.style.visibility = 'visible';

        const hiddenYearText = document.getElementById(hiddenYearTextId);
        hiddenYearText.style.visibility = 'visible';

        const toHideBranch = document.getElementById(toHideBranchId);
        setTimeout(() => toHideBranch.style.visibility = 'hidden', (seconds * 1000) - 10);

        const toHideYearText = document.getElementById(toHideYearTextId);
        setTimeout(() => toHideYearText.style.visibility = 'hidden', (seconds * 1000) - 10);

        const leftEndTriangle = document.getElementById('triangle-end-left');
        setTimeout(() => leftEndTriangle.style.visibility = leftEndTriangleVisibility, (seconds * 1000));

        const leftEndCircle = document.getElementById('circle-end-left');
        setTimeout(() => leftEndCircle.style.visibility = leftEndCircleVisibility, (seconds * 1000));

        const rightEndCircle = document.getElementById('circle-end-right');
        rightEndCircle.style.visibility = rightEndCircleVisibility;

        const rightEndTriangle = document.getElementById('triangle-end-right');
        rightEndTriangle.style.visibility = rightEndTriangleVisibility;

        const branchElement = document.getElementsByClassName(animateBranchId);
        for (let i = 0; i < branchElement.length; i++) {
            branchElement[i].beginElement();
        }
        const textElement = document.getElementsByClassName(animateTextId);
        for (let i = 0; i < textElement.length; i++) {
            textElement[i].beginElement();
        }

        currentScreen -= 1;
    }
};

function fadeTimeline() {
    locked = true;
    console.log('fade timeline');
    const timelineAnimate = document.getElementById('timeline-animate');
    timelineAnimate.beginElement();
    const yearTimeline = document.getElementById('year-timeline');
    setTimeout(() => yearTimeline.style.visibility = 'hidden', ((seconds * 1000) / 2));
};

function yearTextTitle(year) {
    const mainTimeline = document.getElementById('timeline-svg');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const svgNS = svg.namespaceURI;

    const yearText = document.createElementNS(svgNS, 'text');
    yearText.setAttribute('font-size', '36');
    yearText.setAttribute('font-family', 'sans-serif');
    yearText.setAttribute('text-anchor', 'middle');
    yearText.setAttribute('x', 110);
    yearText.setAttribute('y', 80);
    yearText.append(year);

    mainTimeline.appendChild(yearText);
};

function grow() {
    const hiddenBranch = document.getElementById('branch10');
    hiddenBranch.style.visibility = 'visible';
    const hiddenYearText = document.getElementById('year10');
    hiddenYearText.style.visibility = 'visible';

    const toHideBranch = document.getElementById('branch9');
    setTimeout(() => toHideBranch.style.visibility = 'hidden', (seconds * 1000) - 10);

    const toHideYearText = document.getElementById('year9');
    setTimeout(() => toHideYearText.style.visibility = 'hidden', (seconds * 1000) - 10);

    const hiddenLeftEnd = document.getElementById('triangle-end-left');
    hiddenLeftEnd.style.visibility = 'visible';

    const toHideLeftEnd = document.getElementById('circle-end-left');
    toHideLeftEnd.style.visibility = 'hidden';

    const hiddenRightEnd = document.getElementById('circle-end-right');
    setTimeout(() => hiddenRightEnd.style.visibility = 'visible', (seconds * 1000));

    const toHideRightEnd = document.getElementById('triangle-end-right');
    setTimeout(() => toHideRightEnd.style.visibility = 'hidden', (seconds * 1000));

    const branchElement = document.getElementsByClassName('animate-branch-0');
    for (let i = 0; i < branchElement.length; i++) {
        branchElement[i].beginElement();
    }
    const textElement = document.getElementsByClassName('animate-text-0');
    for (let i = 0; i < textElement.length; i++) {
        textElement[i].beginElement();
    }
};

function grow2() {
    const hiddenBranch = document.getElementById('branch20');
    hiddenBranch.style.visibility = 'visible';
    const hiddenYearText = document.getElementById('year20');
    hiddenYearText.style.visibility = 'visible';

    const toHideBranch = document.getElementById('branch19');
    setTimeout(() => toHideBranch.style.visibility = 'hidden', (seconds * 1000) - 10);

    const toHideYearText = document.getElementById('year19');
    setTimeout(() => toHideYearText.style.visibility = 'hidden', (seconds * 1000) - 10);
    const branchElement = document.getElementsByClassName('animate-branch-1');
    for (let i = 0; i < branchElement.length; i++) {
        branchElement[i].beginElement();
    }
    const textElement = document.getElementsByClassName('animate-text-1');
    for (let i = 0; i < textElement.length; i++) {
        textElement[i].beginElement();
    }
};




function createSVG(firstYear, lastYear) {
    const branches = lastYear - firstYear + 1;

    numScreens = Math.ceil(branches / numBranches);
    console.log(numScreens);

    // define svg
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const svgNS = svg.namespaceURI;

    // sets size comparision parms
    svg.setAttribute('viewBox', '0 0 1040 600');

    svg.setAttribute('id', 'timeline-svg');

    const yearTimeline = document.createElementNS(svgNS, 'g');
    yearTimeline.setAttribute('id', 'year-timeline');

    const timelineOpacity = document.createElementNS(svgNS, 'animate');
    timelineOpacity.setAttribute('id', 'timeline-animate')
    timelineOpacity.setAttribute('attributeName', 'opacity');
    timelineOpacity.setAttribute('dur', (seconds / 2) + 's');
    timelineOpacity.setAttribute('keyTimes', '0;1');
    timelineOpacity.setAttribute('values', '1;0');
    timelineOpacity.setAttribute('fill', 'freeze');
    timelineOpacity.setAttribute('begin', 'indefinite');

    yearTimeline.appendChild(timelineOpacity);


    // creates main timeline
    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('stroke-linecap', 'butt');
    path.setAttribute('d', 'M20 300 L1020 300');
    path.setAttribute('stroke', 'black');
    path.setAttribute('stroke-width', '20');
    yearTimeline.appendChild(path);

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
        branch.setAttribute('id', 'branch' + i);

        if (i % numBranches === 0 && i !== 0) {
            branch.style.visibility = 'hidden';
        }

        const loops = numScreens - 1;
        let startBranchD = branchD;
        for (let j = 0; j < loops; j++) {

            const animateBranch = document.createElementNS(svgNS, 'animate');
            const animateBranchL = document.createElementNS(svgNS, 'animate');
            animateBranch.setAttribute('class', 'animate-branch-' + j);
            animateBranchL.setAttribute('class', 'animate-branch-l-' + j);
            animateBranch.setAttribute('attributeName', 'd');
            animateBranchL.setAttribute('attributeName', 'd');
            animateBranch.setAttribute('attributeType', 'XML');
            animateBranchL.setAttribute('attributeType', 'XML');
            animateBranch.setAttribute('begin', 'indefinite');
            animateBranchL.setAttribute('begin', 'indefinite');
            animateBranch.setAttribute('dur', seconds + 's');
            animateBranchL.setAttribute('dur', seconds + 's');
            animateBranch.setAttribute('fill', 'freeze');
            animateBranchL.setAttribute('fill', 'freeze');
            animateBranch.setAttribute('from', startBranchD);
            animateBranchL.setAttribute('to', startBranchD);

            let endAnimateBranchD;
            i % 2 === 0 ? endAnimateBranchD = `M${mLocation - ((j + 1) * numBranches * mDistance)} 300 L${mLocation - ((j + 1) * numBranches * mDistance)} 200` : endAnimateBranchD = `M${mLocation - ((j + 1) * numBranches * mDistance)} 300 L${mLocation - ((j + 1) * numBranches * mDistance)} 400`;
            startBranchD = endAnimateBranchD;

            animateBranch.setAttribute('to', endAnimateBranchD);
            animateBranchL.setAttribute('from', endAnimateBranchD);
            branch.appendChild(animateBranch);
            branch.appendChild(animateBranchL);


        }

        yearTimeline.appendChild(branch);
        mLocation += mDistance;
    }

    // creates text for years
    let xLocation = mDistance + 20;
    for (let i = 0; i < branches; i++) {
        let currentYear = firstYear + i;

        // creates link for text
        const anchor = document.createElementNS(svgNS, 'a');
        anchor.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'http://screamingfemales.com/' + currentYear);

        const yearText = document.createElementNS(svgNS, 'text');
        yearText.setAttribute('font-size', '36');
        yearText.setAttribute('font-family', 'sans-serif');
        yearText.setAttribute('text-anchor', 'middle');
        yearText.setAttribute('x', xLocation);
        if (i % numBranches === 0 && i !== 0) {
            yearText.style.visibility = 'hidden';
        }


        let yLocation;
        let dyValue;
        i % 2 === 0 ? yLocation = 200 : yLocation = 400;
        yearText.setAttribute('y', yLocation);

        i % 2 === 0 ? dyValue = -15 : dyValue = 40;
        yearText.setAttribute('dy', dyValue);


        // yearText.setAttribute('id', 'year' + currentYear);
        yearText.setAttribute('id', 'year' + i);
        yearText.append(currentYear);

        const loops = numScreens - 1;
        let startXLocation = xLocation;
        for (let j = 0; j < loops; j++) {
            const animateText = document.createElementNS(svgNS, 'animate');
            const animateTextL = document.createElementNS(svgNS, 'animate');
            animateText.setAttribute('class', 'animate-text-' + j);
            animateTextL.setAttribute('class', 'animate-text-l-' + j);
            animateText.setAttribute('attributeName', 'x');
            animateTextL.setAttribute('attributeName', 'x');
            animateText.setAttribute('attributeType', 'XML');
            animateTextL.setAttribute('attributeType', 'XML');
            animateText.setAttribute('begin', 'indefinite');
            animateTextL.setAttribute('begin', 'indefinite');
            animateText.setAttribute('dur', seconds + 's');
            animateTextL.setAttribute('dur', seconds + 's');
            animateText.setAttribute('fill', 'freeze');
            animateTextL.setAttribute('fill', 'freeze');
            animateText.setAttribute('from', startXLocation);
            animateTextL.setAttribute('to', startXLocation);
            animateText.setAttribute('to', startXLocation - (numBranches * mDistance));
            animateTextL.setAttribute('from', startXLocation - (numBranches * mDistance));
            startXLocation -= numBranches * mDistance;
            yearText.append(animateText);
            yearText.append(animateTextL);
        };

        xLocation += mDistance;

        // associated with year text link
        // anchor.appendChild(yearText)
        // yearTimeline.appendChild(anchor);

        yearTimeline.appendChild(yearText);
    }

    // creates timeline endcaps
    function makeEnds(cxValue, side) {
        const circle = document.createElementNS(svgNS, 'circle');
        circle.setAttribute('cx', cxValue);
        circle.setAttribute('cy', 300);
        circle.setAttribute('r', 19);
        circle.setAttribute('stroke', 'black');
        if (side === 'right') {
            circle.setAttribute('id', 'circle-end-right');
            circle.style.visibility = 'hidden';
        } else {
            circle.setAttribute('id', 'circle-end-left');
        }
        return circle;
    };
    // creates start endcap
    yearTimeline.appendChild(makeEnds(20, 'left'));
    // creates end endcap
    yearTimeline.appendChild(makeEnds(1020, 'right'));

    // create triangle endcap
    function makeTriEnds(refPoint, side) {
        const triangle = document.createElementNS(svgNS, 'polygon');
        // triangle.setAttribute('points', '270,30 330,30 300,10');
        if (side === 'left') {
            triangle.setAttribute('id', 'triangle-end-left');
            const pointsString = (refPoint + 10) + ',280 ' + (refPoint + 10) + ',320 ' + (refPoint - 20) + ',300';
            triangle.setAttribute('points', pointsString);
            triangle.style.visibility = 'hidden';
            triangle.style.cursor = 'pointer';
        } else if (side === 'right') {
            triangle.setAttribute('id', 'triangle-end-right');
            const pointsString = (refPoint - 10) + ',280 ' + (refPoint - 10) + ',320 ' + (refPoint + 20) + ',300';
            triangle.setAttribute('points', pointsString);
            triangle.style.cursor = 'pointer';
        }
        // triangle.setAttribute('points', '30,280 30,320 0,300');
        triangle.setAttribute('stroke', 'black');
        return triangle
    }

    yearTimeline.appendChild(makeTriEnds(20, 'left'));
    yearTimeline.appendChild(makeTriEnds(1020, 'right'));

    svg.appendChild(yearTimeline);
    // appends svg to div
    document.getElementById('timeline').appendChild(svg);

};


function Timeline() {
    useEffect(() => { createSVG(2005, 2020); }, []);

    return (
        <div>
            <button id='button' onClick={grow}>RUN</button>
            <button id='button2' onClick={grow2}>RUN2</button>
            <div id="timeline"></div>
        </div>
    );
};

export default Timeline;