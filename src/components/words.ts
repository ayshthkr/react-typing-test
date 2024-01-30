const string =
	'the one than of these made to letter each and may only please my you do thank a new two for order copy we but department your they many that so like is there had be very such this other his will should work on no most have information use our year program are office appreciate more years with me as enclosed it some at service by am or business not now if their which also would know from about us up an company has were all them was who can out any make been when time he send before good meeting much take under further what received hope how first above state being get plan just check find area its because possible day interest must insurance into date way well form over same sales last month used wish matter again additional call opportunity today might percent special upon interested then account line mail material due number days since next cost three could necessary however present available shall return feel school let amount here per future after forward give course through report policy city price people best sure see those want part during complete need request home paid credit following both able pay where members copies full general him free note believe list committee payment equipment few without application sent soon stock until own public high attached board enclosing hospital regarding money pleased given card receive life attention total period tax months advise job malting bill come past write concern within look position case week offer recent system back prices rates set building items federal customers while type basis employees important book long personal property invoice provide name think having better reply receipt great loan increase several supply less charge national products contract happy therefore association';

function shuffle(array: string[]) {
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex > 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array;
}

export function getWords() {
	return shuffle(string.split(' ')).splice(0, 60).join(' ');
}
