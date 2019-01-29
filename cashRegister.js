function getChanges(changes, cid){
	var iter = moneyMap.entries();
	var val = iter.next().value;
	var cidMap = new Map(cid);
	var changesInfo = {status:"", changes:[]};
	if (changes >= val[1]) {
	//more than one humdred dollars
	//do nothing
	} else {
		while (changes < val[1]){
			val = iter.next().value;
		}};
	let count = 0;
	while (changes > 0){
		if (typeof val === "undefined"){
			changesInfo.status = "INSUFFICIENT_FUNDS";
			changesInfo.changes = [];
			return (changesInfo);
		}
		let drawerCash = cidMap.get(val[0]);
		let remaining = (changes - drawerCash).toFixed(2);
		if (remaining > 0)
		{
			changes = remaining;
			changesInfo.changes.push ([val[0], drawerCash]);
		} else if (remaining === 0)
		{
			changes -= remaining;
			changes = changes.toFixed(2);
			changesInfo.status = 'OPEN';
			changesInfo.changes.push([val[0], drawerCash]);
		}
		else {
			//remaining < 0
			//toFixed will return string
			let neededCash = Number(((Math.floor(changes/val[1])) * val[1]).toFixed(2));
			if (neededCash > 0){
				changes = Number((changes - neededCash).toFixed(2));
				changesInfo.changes.push([val[0], neededCash]);
			}
		}
		val = iter.next().value;
	}
	if (changesInfo.status === ""){
		changesInfo.status = 'OPEN';
	}

	return changesInfo;
}






const moneyMap = new Map([["ONE HUNDRED", 100], ["TWENTY", 20], ["TEN", 10], ["FIVE", 5], ["ONE", 1],
			["QUARTER", 0.25], ["DIME", 0.1], ["NICKEL",0.05],["PENNY", 0.01]]);






function checkCashRegister(price, cash, cid){
	console.log("price = ", price, ", cash = ", cash);
	var changesDetail = {status:"none", changes:[]};
	

	var totalMoney = cid.reduce(function(accumulator, currentValue){
		accumulator += currentValue[1];
		return accumulator;
	},0);

	var changes = cash - price;
	if (totalMoney === changes){
		changesDetail.status = "CLOSED";
		changesDetail.changes = cid;
		return changesDetail;
	}
	if (totalMoney < changes){
		changesDetail.status = "INSUFFICIENT_FUNDS";
		changesDetail.changes = [];
		return changesDetail;
	}
	changesDetail = getChanges(changes.toFixed(2), cid);
	return(changesDetail);
}

console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], 
	["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], 
	["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

console.log("========================================================================");

console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], 
	["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], 
	["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

console.log("========================================================================");

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], 
	["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], 
	["TWENTY", 0], ["ONE HUNDRED", 0]]));

console.log("========================================================================");

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], 
	["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], 
	["TWENTY", 0], ["ONE HUNDRED", 0]]));

console.log("========================================================================");

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], 
	["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], 
	["TWENTY", 0], ["ONE HUNDRED", 0]]));

console.log("========================================================================");

