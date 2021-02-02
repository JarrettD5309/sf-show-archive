const dateFunction = (yyyymmdd, nocomma) => {
    const yearNum = yyyymmdd.slice(0,4);
    const monthNum = yyyymmdd.slice(5,7);
    const dayNum = yyyymmdd.slice(8,10);

    let monthName;

    if(monthNum==='01') {
        monthName='Jan';
    } else if (monthNum==='02') {
        monthName='Feb'
    } else if (monthNum==='03') {
        monthName='Mar'
    } else if (monthNum==='04') {
        monthName='Apr'
    } else if (monthNum==='05') {
        monthName='May'
    } else if (monthNum==='06') {
        monthName='Jun'
    } else if (monthNum==='07') {
        monthName='Jul'
    } else if (monthNum==='08') {
        monthName='Aug'
    } else if (monthNum==='09') {
        monthName='Sep'
    } else if (monthNum==='10') {
        monthName='Oct'
    } else if (monthNum==='11') {
        monthName='Nov'
    } else if (monthNum==='12') {
        monthName='Dec'
    }

    let dateString;
    if (nocomma) {
        dateString = `${monthName} ${dayNum} ${yearNum}`;
    } else {
        dateString = `${monthName} ${dayNum}, ${yearNum}`;
    }

    
    return dateString;
};

export default dateFunction;