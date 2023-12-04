import React, { useEffect } from 'react';

const Timeline = (props) => {
    const {
        setCurrentYear,
        setCurrentMonth,
        pageBackButton,
        setTimelineMini,
        mobile,
        noShows
    } = props;

    const seconds = 1.5;
    const numBranches = mobile ? 6 : 10;
    let numScreens = 0;
    let currentScreen = 0;

    const numMonthBranches = 6;
    let numMonthScreens = 0;
    let currentMonthScreen = 0;

    let currentYearTextElement;

    let locked = false;

    // CODE TO FIND AND USE CURRENT YEAR AS OF THE ACTUAL DATE
    // const currentDate = new Date();
    // const currentYear = currentDate.getFullYear();

    const currentYear = 2023;

    const noShowMonthColor = '#aeaeae';

    useEffect(() => {
        if (document.getElementById('timeline-svg')) {
            document.getElementById('timeline-svg').remove();
        }
        createSVG(2005, currentYear);

        // all clickable triggers
        document.addEventListener('click', handler);

        // removes event listener on unmount. DO I NEED THIS?
        return function cleanup() {
            document.removeEventListener('click', handler);
        };
    }, [mobile]);

    const handler = (event) => {
        if (locked !== true) {

            // if (event.target.id === 'triangle-end-right') {
            if (event.target.id === 'clickable-end-right') {
                moveRight();
                // } else if (event.target.id === 'triangle-end-left') {
            } else if (event.target.id === 'clickable-end-left') {
                moveLeft();
            } else if (/^year/.test(event.target.id) && event.target.id !== 'year-header-text') {
                fadeTimeline();

                const currentYear = event.target.textContent;
                let yearX;
                const yearY = event.target.getAttribute('y');
                const yearDY = event.target.getAttribute('dy');

                setCurrentYear(currentYear);

                if (currentScreen === 0) {
                    yearX = event.target.getAttribute('x');
                } else {
                    yearX = event.target.querySelector('.animate-text-' + (currentScreen - 1)).getAttribute('to')
                }
                yearTextTitle(currentYear, yearX, yearY, yearDY);

                // hide year element that was part of timeline
                currentYearTextElement = event.target;
                event.target.style.visibility = 'hidden';
                monthsTimeline();
                fadeMonthsTimelineIn();
                createBackButton();
            } else if (event.target.id === 'clickable-end-right-month') {
                moveRightMonth();
            } else if (event.target.id === 'clickable-end-left-month') {
                moveLeftMonth();
            } else if (/^month/.test(event.target.id)) {
                // prevents being able to click months with no shows
                if (document.getElementById(event.target.id).getAttribute('fill') !== noShowMonthColor) {
                    const currentMonth = event.target.textContent.toLowerCase();
                    setCurrentMonth(currentMonth);
                    setTimelineMini(true);
                }

            } else if (event.target.id === 'back-button') {
                fadeInTimeline();
                fadeOutMonthsTimeline();
                fadeOutBackButton();
                yearTextReturn();
                timelineYearVisible();

                // manages TimelinePage logic
                pageBackButton();
            }
        }

    };

    const moveRight = () => {
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
        // hiddenBranch.style.visibility = 'visible';
        hiddenBranch.style.removeProperty('visibility');
        const hiddenYearText = document.getElementById(hiddenYearTextId);
        // hiddenYearText.style.visibility = 'visible';
        hiddenYearText.style.removeProperty('visibility');


        const toHideBranch = document.getElementById(toHideBranchId);
        setTimeout(() => toHideBranch.style.visibility = 'hidden', (seconds * 1000) - 10);

        const toHideYearText = document.getElementById(toHideYearTextId);
        setTimeout(() => toHideYearText.style.visibility = 'hidden', (seconds * 1000) - 10);

        const leftEndTriangle = document.getElementById('triangle-end-left');
        leftEndTriangleVisibility === 'hidden' ? leftEndTriangle.style.visibility = leftEndTriangleVisibility : leftEndTriangle.style.removeProperty('visibility');

        // mobile clickable end caps over triangle
        const leftEndClickable = document.getElementById('clickable-end-left');
        leftEndTriangleVisibility === 'hidden' ? leftEndClickable.style.visibility = leftEndTriangleVisibility : leftEndClickable.style.removeProperty('visibility');

        const leftEndCircle = document.getElementById('circle-end-left');
        leftEndCircleVisibility === 'hidden' ? leftEndCircle.style.visibility = leftEndCircleVisibility : leftEndCircle.style.removeProperty('visibility');

        const rightEndCircle = document.getElementById('circle-end-right');
        setTimeout(() => rightEndCircleVisibility === 'hidden' ? rightEndCircle.style.visibility = rightEndCircleVisibility : rightEndCircle.style.removeProperty('visibility'), (seconds * 1000));

        const rightEndTriangle = document.getElementById('triangle-end-right');
        setTimeout(() => rightEndTriangleVisibility === 'hidden' ? rightEndTriangle.style.visibility = rightEndTriangleVisibility : rightEndTriangle.style.removeProperty('visibility'), (seconds * 1000));

        // mobile clickable end caps over triangle
        const rightEndClickable = document.getElementById('clickable-end-right');
        setTimeout(() => rightEndTriangleVisibility === 'hidden' ? rightEndClickable.style.visibility = rightEndTriangleVisibility : rightEndClickable.style.removeProperty('visibility'), (seconds * 1000));

        const branchElement = document.getElementsByClassName(animateBranchId);
        for (let i = 0; i < branchElement.length; i++) {
            branchElement[i].beginElement();
        }
        const textElement = document.getElementsByClassName(animateTextId);
        for (let i = 0; i < textElement.length; i++) {
            textElement[i].beginElement();
        }

        currentScreen += 1;
    };

    const moveLeft = () => {
        locked = true;
        setTimeout(() => locked = false, (seconds * 1000) + 10);
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
        // hiddenBranch.style.visibility = 'visible';
        hiddenBranch.style.removeProperty('visibility');

        const hiddenYearText = document.getElementById(hiddenYearTextId);
        // hiddenYearText.style.visibility = 'visible';
        hiddenYearText.style.removeProperty('visibility');

        const toHideBranch = document.getElementById(toHideBranchId);
        setTimeout(() => toHideBranch.style.visibility = 'hidden', (seconds * 1000) - 10);

        const toHideYearText = document.getElementById(toHideYearTextId);
        setTimeout(() => toHideYearText.style.visibility = 'hidden', (seconds * 1000) - 10);

        const leftEndTriangle = document.getElementById('triangle-end-left');
        setTimeout(() => leftEndTriangleVisibility === 'hidden' ? leftEndTriangle.style.visibility = leftEndTriangleVisibility : leftEndTriangle.style.removeProperty('visibility'), (seconds * 1000));

        // mobile clickable end caps over triangle
        const leftEndClickable = document.getElementById('clickable-end-left');
        setTimeout(() => leftEndTriangleVisibility === 'hidden' ? leftEndClickable.style.visibility = leftEndTriangleVisibility : leftEndClickable.style.removeProperty('visibility'), (seconds * 1000));

        const leftEndCircle = document.getElementById('circle-end-left');
        setTimeout(() => leftEndCircleVisibility === 'hidden' ? leftEndCircle.style.visibility = leftEndCircleVisibility : leftEndCircle.style.removeProperty('visibility'), (seconds * 1000));

        const rightEndCircle = document.getElementById('circle-end-right');
        rightEndCircleVisibility === 'hidden' ? rightEndCircle.style.visibility = rightEndCircleVisibility : rightEndCircle.style.removeProperty('visibility');

        const rightEndTriangle = document.getElementById('triangle-end-right');
        rightEndTriangleVisibility === 'hidden' ? rightEndTriangle.style.visibility = rightEndTriangleVisibility : rightEndTriangle.style.removeProperty('visibility');

        // mobile clickable end caps over triangle
        const rightEndClickable = document.getElementById('clickable-end-right');
        rightEndTriangleVisibility === 'hidden' ? rightEndClickable.style.visibility = rightEndTriangleVisibility : rightEndClickable.style.removeProperty('visibility');

        const branchElement = document.getElementsByClassName(animateBranchId);
        for (let i = 0; i < branchElement.length; i++) {
            branchElement[i].beginElement();
        }
        const textElement = document.getElementsByClassName(animateTextId);
        for (let i = 0; i < textElement.length; i++) {
            textElement[i].beginElement();
        }

        currentScreen -= 1;
    };

    const moveRightMonth = () => {
        locked = true;
        setTimeout(() => locked = false, (seconds * 1000) + 10);
        let hiddenBranchId = 'month-branch' + (currentMonthScreen + 1) * numMonthBranches;
        let hiddenYearTextId = 'month' + (currentMonthScreen + 1) * numMonthBranches;
        let toHideBranchId = 'month-branch' + (((currentMonthScreen + 1) * numMonthBranches) - 1);
        let toHideYearTextId = 'month' + (((currentMonthScreen + 1) * numMonthBranches) - 1);
        let leftEndTriangleVisibility = 'visible';
        let leftEndCircleVisibility = 'hidden';
        let rightEndTriangleVisibility = 'visible';
        let rightEndCircleVisibility = 'hidden';
        let animateBranchId = 'animate-month-branch-' + currentMonthScreen;
        let animateTextId = 'animate-month-text-' + currentMonthScreen;

        if (currentMonthScreen + 2 === numMonthScreens) {
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

        const leftEndTriangle = document.getElementById('triangle-end-left-month');
        leftEndTriangle.style.visibility = leftEndTriangleVisibility;

        // mobile clickable end caps over triangle
        const leftEndClickable = document.getElementById('clickable-end-left-month');
        leftEndClickable.style.visibility = leftEndTriangleVisibility;

        const leftEndCircle = document.getElementById('circle-end-left-month');
        leftEndCircle.style.visibility = leftEndCircleVisibility;

        const rightEndCircle = document.getElementById('circle-end-right-month');
        setTimeout(() => rightEndCircle.style.visibility = rightEndCircleVisibility, (seconds * 1000));

        const rightEndTriangle = document.getElementById('triangle-end-right-month');
        setTimeout(() => rightEndTriangle.style.visibility = rightEndTriangleVisibility, (seconds * 1000));

        // mobile clickable end caps over triangle
        const rightEndClickable = document.getElementById('clickable-end-right-month');
        setTimeout(() => rightEndClickable.style.visibility = rightEndTriangleVisibility, (seconds * 1000));

        const branchElement = document.getElementsByClassName(animateBranchId);
        for (let i = 0; i < branchElement.length; i++) {
            branchElement[i].beginElement();
        }
        const textElement = document.getElementsByClassName(animateTextId);
        for (let i = 0; i < textElement.length; i++) {
            textElement[i].beginElement();
        }

        currentMonthScreen += 1;
    };

    const moveLeftMonth = () => {
        locked = true;
        setTimeout(() => locked = false, (seconds * 1000) + 10);

        let hiddenBranchId = 'month-branch' + (((currentMonthScreen) * numMonthBranches) - 1);
        let hiddenYearTextId = 'month' + (((currentMonthScreen) * numMonthBranches) - 1);
        let toHideBranchId = 'month-branch' + (currentMonthScreen) * numMonthBranches;
        let toHideYearTextId = 'month' + (currentMonthScreen) * numMonthBranches;
        let leftEndTriangleVisibility = 'visible';
        let leftEndCircleVisibility = 'hidden';
        let rightEndTriangleVisibility = 'visible';
        let rightEndCircleVisibility = 'hidden';
        let animateBranchId = 'animate-month-branch-l-' + (currentMonthScreen - 1);
        let animateTextId = 'animate-month-text-l-' + (currentMonthScreen - 1);

        if (currentMonthScreen === 1) {
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

        const leftEndTriangle = document.getElementById('triangle-end-left-month');
        setTimeout(() => leftEndTriangle.style.visibility = leftEndTriangleVisibility, (seconds * 1000));

        // mobile clickable end caps over triangle
        const leftEndClickable = document.getElementById('clickable-end-left-month');
        setTimeout(() => leftEndClickable.style.visibility = leftEndTriangleVisibility, (seconds * 1000));

        const leftEndCircle = document.getElementById('circle-end-left-month');
        setTimeout(() => leftEndCircle.style.visibility = leftEndCircleVisibility, (seconds * 1000));

        const rightEndCircle = document.getElementById('circle-end-right-month');
        rightEndCircle.style.visibility = rightEndCircleVisibility;

        const rightEndTriangle = document.getElementById('triangle-end-right-month');
        rightEndTriangle.style.visibility = rightEndTriangleVisibility;

        // mobile clickable end caps over triangle
        const rightEndClickable = document.getElementById('clickable-end-right-month');
        rightEndClickable.style.visibility = rightEndTriangleVisibility;

        const branchElement = document.getElementsByClassName(animateBranchId);
        for (let i = 0; i < branchElement.length; i++) {
            branchElement[i].beginElement();
        }
        const textElement = document.getElementsByClassName(animateTextId);
        for (let i = 0; i < textElement.length; i++) {
            textElement[i].beginElement();
        }

        currentMonthScreen -= 1;
    };

    const fadeTimeline = () => {
        locked = true;
        setTimeout(() => locked = false, ((seconds * 1000) / 2) + 10);
        const timelineAnimate = document.getElementById('timeline-animate');
        timelineAnimate.beginElement();
        const yearTimeline = document.getElementById('year-timeline');
        setTimeout(() => yearTimeline.style.visibility = 'hidden', ((seconds * 1000) / 2));
    };

    const fadeInTimeline = () => {
        locked = true;
        setTimeout(() => locked = false, ((seconds * 1000) / 2) + 10);
        const yearTimeline = document.getElementById('year-timeline');
        yearTimeline.style.visibility = 'visible';
        const timelineAnimateFadeIn = document.getElementById('timeline-animate-fade-in');
        timelineAnimateFadeIn.beginElement();
    };

    const yearTextTitle = (year, xPosition, yPosition, dyPosition) => {
        const mainTimeline = document.getElementById('timeline-svg');
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const svgNS = svg.namespaceURI;

        const yearText = document.createElementNS(svgNS, 'text');
        yearText.setAttribute('id', 'year-header-text');
        yearText.setAttribute('font-size', mobile ? 50 : 36);
        yearText.setAttribute('font-family', 'sans-serif');
        yearText.setAttribute('text-anchor', 'middle');
        yearText.setAttribute('x', xPosition);
        yearText.setAttribute('y', yPosition);
        yearText.setAttribute('dy', dyPosition);
        yearText.append(year);

        const animateTextX = document.createElementNS(svgNS, 'animate');
        animateTextX.setAttribute('attributeName', 'x');
        animateTextX.setAttribute('attributeType', 'XML');
        animateTextX.setAttribute('begin', 'indefinite');
        animateTextX.setAttribute('dur', (seconds / 2) + 's');
        animateTextX.setAttribute('fill', 'freeze');
        animateTextX.setAttribute('from', xPosition);
        animateTextX.setAttribute('to', 110);

        yearText.append(animateTextX);

        const animateTextXReturn = document.createElementNS(svgNS, 'animate');
        animateTextXReturn.setAttribute('id', 'x-return');
        animateTextXReturn.setAttribute('attributeName', 'x');
        animateTextXReturn.setAttribute('attributeType', 'XML');
        animateTextXReturn.setAttribute('begin', 'indefinite');
        animateTextXReturn.setAttribute('dur', (seconds / 2) + 's');
        animateTextXReturn.setAttribute('fill', 'freeze');
        animateTextXReturn.setAttribute('to', xPosition);
        animateTextXReturn.setAttribute('from', 110);

        yearText.append(animateTextXReturn);

        const animateTextY = document.createElementNS(svgNS, 'animate');
        animateTextY.setAttribute('attributeName', 'y');
        animateTextY.setAttribute('attributeType', 'XML');
        animateTextY.setAttribute('begin', 'indefinite');
        animateTextY.setAttribute('dur', (seconds / 2) + 's');
        animateTextY.setAttribute('fill', 'freeze');
        animateTextY.setAttribute('from', yPosition);
        animateTextY.setAttribute('to', 80);

        yearText.append(animateTextY);

        const animateTextYReturn = document.createElementNS(svgNS, 'animate');
        animateTextYReturn.setAttribute('id', 'y-return');
        animateTextYReturn.setAttribute('attributeName', 'y');
        animateTextYReturn.setAttribute('attributeType', 'XML');
        animateTextYReturn.setAttribute('begin', 'indefinite');
        animateTextYReturn.setAttribute('dur', (seconds / 2) + 's');
        animateTextYReturn.setAttribute('fill', 'freeze');
        animateTextYReturn.setAttribute('to', yPosition);
        animateTextYReturn.setAttribute('from', 80);

        yearText.append(animateTextYReturn);

        const animateTextDY = document.createElementNS(svgNS, 'animate');
        animateTextDY.setAttribute('attributeName', 'dy');
        animateTextDY.setAttribute('attributeType', 'XML');
        animateTextDY.setAttribute('begin', 'indefinite');
        animateTextDY.setAttribute('dur', (seconds / 2) + 's');
        animateTextDY.setAttribute('fill', 'freeze');
        animateTextDY.setAttribute('from', dyPosition);
        animateTextDY.setAttribute('to', 0);

        yearText.append(animateTextDY);

        const animateTextDYReturn = document.createElementNS(svgNS, 'animate');
        animateTextDYReturn.setAttribute('id', 'dy-return');
        animateTextDYReturn.setAttribute('attributeName', 'dy');
        animateTextDYReturn.setAttribute('attributeType', 'XML');
        animateTextDYReturn.setAttribute('begin', 'indefinite');
        animateTextDYReturn.setAttribute('dur', (seconds / 2) + 's');
        animateTextDYReturn.setAttribute('fill', 'freeze');
        animateTextDYReturn.setAttribute('to', dyPosition);
        animateTextDYReturn.setAttribute('from', 0);

        yearText.append(animateTextDYReturn);

        mainTimeline.appendChild(yearText);
        animateTextX.beginElement();
        animateTextY.beginElement();
        animateTextDY.beginElement();
    };

    const yearTextReturn = () => {
        const yearX = document.getElementById('x-return');
        const yearY = document.getElementById('y-return');
        const yearDY = document.getElementById('dy-return');
        yearX.beginElement();
        yearY.beginElement();
        yearDY.beginElement();
        const yearHeader = document.getElementById('year-header-text');
        setTimeout(() => yearHeader.remove(), ((seconds * 1000) / 2));
    };

    const timelineYearVisible = () => {
        setTimeout(() => {
            // currentYearTextElement.style.visibility = 'visible';
            currentYearTextElement.style.removeProperty('visibility');
            currentYearTextElement = undefined;
        }, ((seconds * 1000) / 2));
    };

    const monthsTimeline = () => {
        // const currentYear = document.getElementById('year-header-text').textContent;
        currentMonthScreen = 0;
        const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        // 12 months
        const branches = 12;
        numMonthScreens = Math.ceil(branches / numMonthBranches);
        const mainTimeline = document.getElementById('timeline-svg');
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const svgNS = svg.namespaceURI;

        const monthTimeline = document.createElementNS(svgNS, 'g');
        monthTimeline.setAttribute('id', 'monthline-svg');

        // fade in parameters
        const timelineOpacity = document.createElementNS(svgNS, 'animate');
        timelineOpacity.setAttribute('id', 'month-timeline-fade-in')
        timelineOpacity.setAttribute('attributeName', 'opacity');
        timelineOpacity.setAttribute('dur', (seconds / 2) + 's');
        timelineOpacity.setAttribute('keyTimes', '0;1');
        timelineOpacity.setAttribute('values', '0;1');
        timelineOpacity.setAttribute('fill', 'freeze');
        timelineOpacity.setAttribute('begin', 'indefinite');

        monthTimeline.appendChild(timelineOpacity);

        // fade out parameters
        const timelineOpacityFadeOut = document.createElementNS(svgNS, 'animate');
        timelineOpacityFadeOut.setAttribute('id', 'month-timeline-fade-out')
        timelineOpacityFadeOut.setAttribute('attributeName', 'opacity');
        timelineOpacityFadeOut.setAttribute('dur', (seconds / 2) + 's');
        timelineOpacityFadeOut.setAttribute('keyTimes', '0;1');
        timelineOpacityFadeOut.setAttribute('values', '1;0');
        timelineOpacityFadeOut.setAttribute('fill', 'freeze');
        timelineOpacityFadeOut.setAttribute('begin', 'indefinite');

        monthTimeline.appendChild(timelineOpacityFadeOut);

        // creates main timeline
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('stroke-linecap', 'butt');
        path.setAttribute('d', 'M20 300 L1020 300');
        path.setAttribute('stroke', 'black');
        path.setAttribute('stroke-width', '20');
        monthTimeline.appendChild(path);

        // distance between branches
        const mDistance = 1000 / (numMonthBranches + 1);

        // first branch = distance plus offset
        let mLocation = mDistance + 20;

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
            branch.setAttribute('id', 'month-branch' + i);

            if (i % numMonthBranches === 0 && i !== 0) {
                branch.style.visibility = 'hidden';
            }

            const loops = numMonthScreens - 1;
            let startBranchD = branchD;
            for (let j = 0; j < loops; j++) {

                const animateBranch = document.createElementNS(svgNS, 'animate');
                const animateBranchL = document.createElementNS(svgNS, 'animate');
                animateBranch.setAttribute('class', 'animate-month-branch-' + j);
                animateBranchL.setAttribute('class', 'animate-month-branch-l-' + j);
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
                i % 2 === 0 ? endAnimateBranchD = `M${mLocation - ((j + 1) * numMonthBranches * mDistance)} 300 L${mLocation - ((j + 1) * numMonthBranches * mDistance)} 200` : endAnimateBranchD = `M${mLocation - ((j + 1) * numMonthBranches * mDistance)} 300 L${mLocation - ((j + 1) * numMonthBranches * mDistance)} 400`;
                startBranchD = endAnimateBranchD;

                animateBranch.setAttribute('to', endAnimateBranchD);
                animateBranchL.setAttribute('from', endAnimateBranchD);
                branch.appendChild(animateBranch);
                branch.appendChild(animateBranchL);


            }

            monthTimeline.appendChild(branch);
            mLocation += mDistance;
        }

        // creates text for month names
        let xLocation = mDistance + 20;
        for (let i = 0; i < branches; i++) {
            let currentMonthIndex = i;

            // creates link for text
            // const anchor = document.createElementNS(svgNS, 'a');
            // anchor.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'http://screamingfemales.com/' + monthArray[currentMonthIndex] + currentYear);

            const monthText = document.createElementNS(svgNS, 'text');
            monthText.setAttribute('font-size', mobile ? 50 : 36);
            monthText.setAttribute('font-family', 'sans-serif');
            monthText.setAttribute('text-anchor', 'middle');
            monthText.setAttribute('x', xLocation);
            if (i % numMonthBranches === 0 && i !== 0) {
                monthText.style.visibility = 'hidden';
            }


            let yLocation;
            let dyValue;
            i % 2 === 0 ? yLocation = 200 : yLocation = 400;
            monthText.setAttribute('y', yLocation);

            i % 2 === 0 ? dyValue = -15 : dyValue = 40;
            monthText.setAttribute('dy', dyValue);


            monthText.setAttribute('id', 'month' + i);
            monthText.append(monthArray[currentMonthIndex]);

            let noShowsMonth = false;
            noShows.forEach((item) => {
                let yearNum = item.year;
                let monthNum = item.month;

                if (Number(currentYearTextElement.textContent) === yearNum && (currentMonthIndex + 1) === monthNum) {
                    noShowsMonth = true;
                }
            });

            if (noShowsMonth) {
                monthText.setAttribute('fill', noShowMonthColor);
            } else {
                monthText.style.cursor = 'pointer';
            }

            const loops = numMonthScreens - 1;
            let startXLocation = xLocation;
            for (let j = 0; j < loops; j++) {
                const animateText = document.createElementNS(svgNS, 'animate');
                const animateTextL = document.createElementNS(svgNS, 'animate');
                animateText.setAttribute('class', 'animate-month-text-' + j);
                animateTextL.setAttribute('class', 'animate-month-text-l-' + j);
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
                animateText.setAttribute('to', startXLocation - (numMonthBranches * mDistance));
                animateTextL.setAttribute('from', startXLocation - (numMonthBranches * mDistance));
                startXLocation -= numMonthBranches * mDistance;
                monthText.append(animateText);
                monthText.append(animateTextL);
            };

            xLocation += mDistance;

            // associated with year text link
            // anchor.appendChild(monthText)
            // monthTimeline.appendChild(anchor);

            monthTimeline.appendChild(monthText);
        }

        // creates timeline endcaps
        const makeEnds = (cxValue, side) => {
            const circle = document.createElementNS(svgNS, 'circle');
            circle.setAttribute('cx', cxValue);
            circle.setAttribute('cy', 300);
            circle.setAttribute('r', 19);
            circle.setAttribute('stroke', 'black');
            if (side === 'right') {
                circle.setAttribute('id', 'circle-end-right-month');
                circle.style.visibility = 'hidden';
            } else {
                circle.setAttribute('id', 'circle-end-left-month');
            }
            return circle;
        };
        // creates start endcap
        monthTimeline.appendChild(makeEnds(20, 'left'));
        // creates end endcap
        monthTimeline.appendChild(makeEnds(1020, 'right'));

        // create triangle endcap
        const makeTriEnds = (refPoint, side) => {
            const triangle = document.createElementNS(svgNS, 'polygon');
            // triangle.setAttribute('points', '270,30 330,30 300,10');
            if (side === 'left') {
                triangle.setAttribute('id', 'triangle-end-left-month');
                const pointsString = (refPoint + 10) + (mobile ? ',260 ' : ',280 ') + (refPoint + 10) + (mobile ? ',340 ' : ',320 ') + (refPoint - (mobile ? 40 : 20)) + ',300';
                triangle.setAttribute('points', pointsString);
                triangle.style.visibility = 'hidden';
                triangle.style.cursor = 'pointer';
            } else if (side === 'right') {
                triangle.setAttribute('id', 'triangle-end-right-month');
                const pointsString = (refPoint - 10) + (mobile ? ',260 ' : ',280 ') + (refPoint - 10) + (mobile ? ',340 ' : ',320 ') + (refPoint + (mobile ? 40 : 20)) + ',300';
                triangle.setAttribute('points', pointsString);
                triangle.style.cursor = 'pointer';
            }
            // triangle.setAttribute('points', '30,280 30,320 0,300');
            triangle.setAttribute('stroke', 'black');
            return triangle
        }

        monthTimeline.appendChild(makeTriEnds((mobile ? 40 : 20), 'left'));
        monthTimeline.appendChild(makeTriEnds((mobile ? 1000 : 1020), 'right'));

        // create clickable area for triangle endcap
        const makeClickableEnds = (refPoint, side) => {
            const rectangle = document.createElementNS(svgNS, 'polygon');
            if (side === 'left') {
                rectangle.setAttribute('id', 'clickable-end-left-month');
                let pointsString;
                if (mobile) {
                    pointsString = (refPoint + 40) + ',225 ' + (refPoint + 40) + ',375 ' + (refPoint - 40) + ',375 ' + (refPoint - 40) + ',225';
                } else {
                    pointsString = (refPoint + 20) + ',270 ' + (refPoint + 20) + ',330 ' + (refPoint - 20) + ',330 ' + (refPoint - 20) + ',270';
                }
                rectangle.setAttribute('points', pointsString);
                rectangle.style.visibility = 'hidden';
                rectangle.style.cursor = 'pointer';
            } else if (side === 'right') {
                rectangle.setAttribute('id', 'clickable-end-right-month');
                let pointsString;
                if (mobile) {
                    pointsString = (refPoint - 40) + ',225 ' + (refPoint - 40) + ',375 ' + (refPoint + 40) + ',375 ' + (refPoint + 40) + ',225';
                } else {
                    pointsString = (refPoint - 20) + ',270 ' + (refPoint - 20) + ',330 ' + (refPoint + 20) + ',330 ' + (refPoint + 20) + ',270';
                }
                rectangle.setAttribute('points', pointsString);
                rectangle.style.cursor = 'pointer';
            }
            // rectangle.setAttribute('fill','red');
            rectangle.setAttribute('opacity', '0.0');
            return rectangle;
        };

        monthTimeline.appendChild(makeClickableEnds((mobile ? 40 : 20), 'left'));
        monthTimeline.appendChild(makeClickableEnds((mobile ? 1000 : 1020), 'right'));

        mainTimeline.appendChild(monthTimeline);

    };

    const fadeMonthsTimelineIn = () => {
        const timelineAnimate = document.getElementById('month-timeline-fade-in');
        timelineAnimate.beginElement();

    };

    const fadeOutMonthsTimeline = () => {
        const timelineAnimate = document.getElementById('month-timeline-fade-out');
        timelineAnimate.beginElement();
        const monthTimeline = document.getElementById('monthline-svg');
        setTimeout(() => monthTimeline.remove(), ((seconds * 1000) / 2));
    };

    const createBackButton = () => {
        const mainTimeline = document.getElementById('timeline-svg');
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const svgNS = svg.namespaceURI;

        const backText = document.createElementNS(svgNS, 'text');
        backText.setAttribute('id', 'back-button');
        backText.setAttribute('font-size', mobile ? 50 : 36);
        backText.setAttribute('font-family', 'sans-serif');
        backText.setAttribute('text-anchor', 'middle');
        backText.setAttribute('x', 930);
        backText.setAttribute('y', 80);
        backText.append('< Back');

        const backFadeInOpacity = document.createElementNS(svgNS, 'animate');
        backFadeInOpacity.setAttribute('id', 'back-fade-in-animate')
        backFadeInOpacity.setAttribute('attributeName', 'opacity');
        backFadeInOpacity.setAttribute('dur', (seconds / 2) + 's');
        backFadeInOpacity.setAttribute('keyTimes', '0;1');
        backFadeInOpacity.setAttribute('values', '0;1');
        backFadeInOpacity.setAttribute('fill', 'freeze');
        backFadeInOpacity.setAttribute('begin', 'indefinite');

        backText.appendChild(backFadeInOpacity);

        const backFadeOutOpacity = document.createElementNS(svgNS, 'animate');
        backFadeOutOpacity.setAttribute('id', 'back-fade-out-animate')
        backFadeOutOpacity.setAttribute('attributeName', 'opacity');
        backFadeOutOpacity.setAttribute('dur', (seconds / 2) + 's');
        backFadeOutOpacity.setAttribute('keyTimes', '0;1');
        backFadeOutOpacity.setAttribute('values', '1;0');
        backFadeOutOpacity.setAttribute('fill', 'freeze');
        backFadeOutOpacity.setAttribute('begin', 'indefinite');

        backText.appendChild(backFadeOutOpacity);

        backText.style.cursor = 'pointer';

        mainTimeline.appendChild(backText);

        const backAnimate = document.getElementById('back-fade-in-animate');
        backAnimate.beginElement();
    };

    const fadeOutBackButton = () => {
        const backAnimate = document.getElementById('back-fade-out-animate');
        backAnimate.beginElement();
        const backButton = document.getElementById('back-button');
        setTimeout(() => backButton.remove(), ((seconds * 1000) / 2));
    };

    const createSVG = (firstYear, lastYear) => {
        const branches = lastYear - firstYear + 1;

        numScreens = Math.ceil(branches / numBranches);

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

        const timelineOpacityFadeIn = document.createElementNS(svgNS, 'animate');
        timelineOpacityFadeIn.setAttribute('id', 'timeline-animate-fade-in')
        timelineOpacityFadeIn.setAttribute('attributeName', 'opacity');
        timelineOpacityFadeIn.setAttribute('dur', (seconds / 2) + 's');
        timelineOpacityFadeIn.setAttribute('keyTimes', '0;1');
        timelineOpacityFadeIn.setAttribute('values', '0;1');
        timelineOpacityFadeIn.setAttribute('fill', 'freeze');
        timelineOpacityFadeIn.setAttribute('begin', 'indefinite');

        yearTimeline.appendChild(timelineOpacityFadeIn);


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
            // const anchor = document.createElementNS(svgNS, 'a');
            // anchor.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'http://screamingfemales.com/' + currentYear);

            const yearText = document.createElementNS(svgNS, 'text');
            yearText.setAttribute('font-size', mobile ? 50 : 36);
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

            yearText.style.cursor = 'pointer';

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
        const makeEnds = (cxValue, side) => {
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
        const makeTriEnds = (refPoint, side) => {
            const triangle = document.createElementNS(svgNS, 'polygon');
            // triangle.setAttribute('points', '270,30 330,30 300,10');
            if (side === 'left') {
                triangle.setAttribute('id', 'triangle-end-left');
                const pointsString = (refPoint + 10) + (mobile ? ',260 ' : ',280 ') + (refPoint + 10) + (mobile ? ',340 ' : ',320 ') + (refPoint - (mobile ? 40 : 20)) + ',300';
                triangle.setAttribute('points', pointsString);
                triangle.style.visibility = 'hidden';
                triangle.style.cursor = 'pointer';
            } else if (side === 'right') {
                triangle.setAttribute('id', 'triangle-end-right');
                const pointsString = (refPoint - 10) + (mobile ? ',260 ' : ',280 ') + (refPoint - 10) + (mobile ? ',340 ' : ',320 ') + (refPoint + (mobile ? 40 : 20)) + ',300';
                triangle.setAttribute('points', pointsString);
                triangle.style.cursor = 'pointer';
            }
            // triangle.setAttribute('points', '30,280 30,320 0,300');
            triangle.setAttribute('stroke', 'black');
            return triangle
        }

        yearTimeline.appendChild(makeTriEnds((mobile ? 40 : 20), 'left'));
        yearTimeline.appendChild(makeTriEnds((mobile ? 1000 : 1020), 'right'));

        // create clickable area for triangle endcap
        const makeClickableEnds = (refPoint, side) => {
            const rectangle = document.createElementNS(svgNS, 'polygon');
            if (side === 'left') {
                rectangle.setAttribute('id', 'clickable-end-left');
                let pointsString;
                if (mobile) {
                    pointsString = (refPoint + 40) + ',225 ' + (refPoint + 40) + ',375 ' + (refPoint - 40) + ',375 ' + (refPoint - 40) + ',225';
                } else {
                    pointsString = (refPoint + 20) + ',270 ' + (refPoint + 20) + ',330 ' + (refPoint - 20) + ',330 ' + (refPoint - 20) + ',270';
                }
                rectangle.setAttribute('points', pointsString);
                rectangle.style.visibility = 'hidden';
                rectangle.style.cursor = 'pointer';
            } else if (side === 'right') {
                rectangle.setAttribute('id', 'clickable-end-right');
                let pointsString;
                if (mobile) {
                    pointsString = (refPoint - 40) + ',225 ' + (refPoint - 40) + ',375 ' + (refPoint + 40) + ',375 ' + (refPoint + 40) + ',225';
                } else {
                    pointsString = (refPoint - 20) + ',270 ' + (refPoint - 20) + ',330 ' + (refPoint + 20) + ',330 ' + (refPoint + 20) + ',270';
                }
                rectangle.setAttribute('points', pointsString);
                rectangle.style.cursor = 'pointer';
            }
            // rectangle.setAttribute('fill','red');
            rectangle.setAttribute('opacity', '0.0');
            return rectangle;
        };

        yearTimeline.appendChild(makeClickableEnds((mobile ? 40 : 20), 'left'));
        yearTimeline.appendChild(makeClickableEnds((mobile ? 1000 : 1020), 'right'));

        svg.appendChild(yearTimeline);
        // appends svg to div
        document.getElementById('timeline').appendChild(svg);


    };

    return (
        <div>
            <div id="timeline"></div>
        </div>
    );
};

export default Timeline;