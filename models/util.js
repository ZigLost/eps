let EpsUtil = function () { }

/*
    1 ไร่  = 4 งาน
    1 งาน = 100 ตารางวา 
    1 วา = 2 เมตร   
    1 ไร่ = 400 ตารางวา
    1 ไร่ = 1600 ตารางเมตร
*/
EpsUtil.prototype.ConvertToSquareMeter = function(area) {
    let arr = area.split('^');
    return (parseFloat(arr[0]) * 1600) + (parseFloat(arr[1]) * 400) + (parseFloat(arr[2]) * 4) + parseFloat(arr[3]);
}

module.exports = EpsUtil;