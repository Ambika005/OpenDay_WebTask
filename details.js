window.onload = function() {
    const img = localStorage.getItem("result0");
    const dname = localStorage.getItem("result1");
    const desc = localStorage.getItem("result2");
    const link = localStorage.getItem("result3");
    const block = localStorage.getItem("result4");

    document.getElementById('department-details').innerHTML = `
        ${img}
        ${dname}
        ${desc}
        ${block}
    //     <h2>Link: <a href="${link}" target="_blank">${link}</a></h2>
    // `;
    <h2> <a href="#" target="_blank">${link}</a></h2>

}
