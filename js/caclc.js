
function calculateSavings() {
    const people = parseInt(document.getElementById("people").value);
    const system = document.getElementById("system").value;

    let annualCost = 0;
    let ghgEmissions = 0;

    // Data based on the provided information
    const data = {
        '1': {
            'heat_pump': { 'annual_cost': 125, 'ghg_emissions': 1.8 },
            'solar': { 'annual_cost': 65, 'ghg_emissions': 1.0 },
            'electric': { 'annual_cost': 475, 'ghg_emissions': 7.0 },
            'gas': { 'annual_cost': 315, 'ghg_emissions': 5.4 }
        },
        '2': {
            'heat_pump': { 'annual_cost': 190, 'ghg_emissions': 2.8 },
            'solar': { 'annual_cost': 100, 'ghg_emissions': 1.5 },
            'electric': { 'annual_cost': 730, 'ghg_emissions': 10.8 },
            'gas': { 'annual_cost': 420, 'ghg_emissions': 7.1 }
        },
        // Add data for 3 and 4 people
    };

    // Extrapolate data for 5 and 6 people
    for (let i = 3; i <= 6; i++) {
        data[i] = {};
        for (const [systemType, values] of Object.entries(data['1'])) {
            const costDiff = data['2'][systemType]['annual_cost'] - data['1'][systemType]['annual_cost'];
            const ghgDiff = data['2'][systemType]['ghg_emissions'] - data['1'][systemType]['ghg_emissions'];
            data[i][systemType] = {
                'annual_cost': data['1'][systemType]['annual_cost'] + costDiff * (i - 1),
                'ghg_emissions': data['1'][systemType]['ghg_emissions'] + ghgDiff * (i - 1)
            };
        }
    }

    if (data[people] && data[people][system]) {
        annualCost = data[people][system]['annual_cost'];
        ghgEmissions = data[people][system]['ghg_emissions'];
    }

    document.getElementById("annual-savings").innerText = annualCost;
    document.getElementById("ghg-emissions").innerText = ghgEmissions;
}
