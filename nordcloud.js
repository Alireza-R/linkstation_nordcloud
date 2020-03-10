
/**
 * You can run this code by simply running "node nodecloud.js" in terminal
 * Requirements: you need nodejs installed on your system
 */


//Device points as input for testing
var device_points = [
    [0, 0],
    [100, 100],
    [15, 10],
    [18, 18]
];

/**
 * Find the best linkstation for a device point
 */
function findBestLinkStation(device_point) {

    // Link Station points and reach
    var linkStations = [
        {power:0, s_points: [0, 0], reach: 10},
        {power:0, s_points: [10, 0], reach: 12},
        {power:0, s_points: [20, 20], reach: 5}
    ]; // we set power to 0 at this step but will calculate it later
    
    var bestLinkStation = linkStations.map(function (linkStation) {
        linkStation.power = getLinkStationPower(
            getDistanceBetween(device_point, linkStation.s_points),
            linkStation.reach
        );
        return linkStation;
        }).filter(function (linkStation) {
            return linkStation.power > 0; //remove those that have zero power
        }).sort(function (linkStationA, linkStationB) {
            return linkStationA.power > linkStationB.power;
        }).pop();

    return bestLinkStation;
}

/**
 * Calculate the power of link station to given distance
 */
function getLinkStationPower(distance, reach) {
    if (distance > reach) {
        return 0;
    }
    else {
        return Math.pow((reach - distance), 2);
    } 
}

/**
 * Mathematical function to calculate between two points in 
 * a two-dimentional space
 */
function getDistanceBetween(pointsA, pointsB) {
    var distance = Math.sqrt( Math.pow(Math.abs(pointsA[0] - pointsB[0]), 2)
        + Math.pow(Math.abs(pointsA[1] - pointsB[1]), 2)
    );
    return distance;
}

/**
 * Print the output power for each point
 */
for (let num = 0; num < device_points.length ; num++) {
    var linkStation= findBestLinkStation(device_points[num])
    if(!linkStation) {
        console.log("No link station within reach for point: ", device_points[num][0], ",", device_points[num][1]);
    }
    else{
        console.log("Best link station for point", device_points[num][0], ",", device_points[num][1]
        , " is: ", linkStation.s_points[0], ",", linkStation.s_points[1], " with power ", linkStation.power);
    }
}

