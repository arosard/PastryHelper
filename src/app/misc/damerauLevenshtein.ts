/**
 * Damerau-Levenshtein distance implementation in TypeScript.
 * Source: https://fr.wikipedia.org/wiki/Distance_de_Damerau-Levenshtein
 */

export function distanceDamerauLevenshtein(s1: string, s2: string): number {
	[s1, s2] = prefixSuffixRemoval(s1, s2);
	if (s1.length === 0 || s2.length === 0) {
		return Math.max(s1.length, s2.length);
	}
	
	let d: number[][] = Array.from({ length: s1.length + 1 }, () => new Array<number>(s2.length + 1));
	for (let i=0; i<=s1.length; i++) {
		d[i][0] = i;
	}
	for (let j=0; j<=s2.length; j++) {
		d[0][j] = j;
	}

	for (let i=1; i<=s1.length; i++) {
		for (let j=1; j<= s2.length; j++){
			const substitutionCost = s1[i-1] == s2[j-1] ? 0 : 1;
			d[i][j] = Math.min(
				d[i-1][j] + 1,
				d[i][j-1] + 1,
				d[i-1][j-1] + substitutionCost
			)
			if (i > 1 
				&& j > 1 
				&& s1[i-1] === s2[j-2]
				&& s1[i-2] === s2[j-1]
			) {
				d[i][j] = Math.min(
					d[i][j],
					d[i-2][j-2] + substitutionCost
				)               
			}
		}
	}

	return d[s1.length][s2.length];
}

export function distanceDamerauLevenshteinSubstrings(text: string, reference: string): number {
	if (text.length >= reference.length) {
		return distanceDamerauLevenshtein(text, reference);
	}

	let substrings: string[] = [];
	for (let i=0; i<=reference.length - text.length; i++) {
		substrings.push(reference.substring(i, i + text.length));
	}

	let distance = text.length;
	for (let substring of substrings) {
		const substringDistance = distanceDamerauLevenshtein(text, substring);
		if (substringDistance < distance) {
			distance = substringDistance;
		}
		if (distance === reference.length - text.length) {
			break;
		}
	}
	return distance;
}

export function limitedDistanceDamerauLevenshtein(textString: string, referenceString: string, limit: number): boolean {
	const [s1, s2] = prefixSuffixRemoval(textString, referenceString);
	if (s1.length === 0 || s2.length === 0) {
		return Math.max(s1.length, s2.length) <= limit;
	}

	const lengthDifference = Math.abs(s1.length - s2.length);
	if (lengthDifference > limit) {
		console.log(`[limitedDistanceDamerauLevenshtein] Length difference ${lengthDifference} exceeds limit ${limit}, skipping comparison`);
		return false;
	}

	const d: number[][] = Array.from({ length: s1.length + 1 }, () => new Array<number>(s2.length + 1));
	for (let i=0; i<=s1.length; i++) {
		d[i][0] = i;
	}
	for (let j=0; j<=s2.length; j++) {
		d[0][j] = j;
	}

	const jBandLimit = limit - Math.abs(s1.length - s2.length)/2;
	for (let i=1; i<=s1.length; i++) {
		const minJ = Math.max(i - jBandLimit, 1);
		const maxJ = Math.min(i + jBandLimit, s2.length);
		for (let j=minJ; j<= maxJ; j++){
			const substitutionCost = s1[i-1] == s2[j-1] ? 0 : 1;

			const valuePossibilities = []
			if (d[i-1][j] !== undefined) {
				valuePossibilities.push(d[i-1][j] + 1);
			}
			if (d[i][j-1] !== undefined) {
				valuePossibilities.push(d[i][j-1] + 1);
			}
			if (d[i-1][j-1] !== undefined) {
				valuePossibilities.push(d[i-1][j-1] + substitutionCost);
			}

			if (valuePossibilities.length === 0) {
				console.log(`[limitedDistanceDamerauLevenshtein] No valid previous values for d[${i}][${j}], skipping calculation`);
				continue;
			}

			d[i][j] = Math.min(...valuePossibilities);
			if (i > 1 
				&& j > 1 
				&& s1[i-1] === s2[j-2]
				&& s1[i-2] === s2[j-1]
			) {
				d[i][j] = Math.min(
					d[i][j],
					d[i-2][j-2] + substitutionCost
				)               
			}
		}
	}

	return d[s1.length][s2.length] <= limit;
}

export function limitedDistanceDamerauLevenshteinSubstrings(text: string, reference: string, limit: number): boolean {
	if (text.length > reference.length + limit) {
		return false;
	}

	if (text.length >= reference.length) {
		return limitedDistanceDamerauLevenshtein(text, reference, limit);
	}

	let substrings: string[] = [];
	for (let i=0; i<=reference.length - text.length; i++) {
		substrings.push(reference.substring(i, i + text.length));
	}

	for (let substring of substrings) {
		if (limitedDistanceDamerauLevenshtein(text, substring, limit)) {
			return true;
		}
	}
	return false;
}

function prefixSuffixRemoval(s1: string, s2:string): [string, string] {
	let start = 0;
	while (start < s1.length && start < s2.length && s1[start] === s2[start]) {
		start++;
	}
	let end1 = s1.length - 1;
	let end2 = s2.length - 1;
	while (end1 >= start && end2 >= start && s1[end1] === s2[end2]) {
		end1--;
		end2--;
	}
	return [s1.substring(start, end1 + 1), s2.substring(start, end2 + 1)];
}

function printMatrix(matrix: number[][]) {
    let text = `[printMatrix] Distance matrix:`;
    for (let i=0; i<matrix.length; i++) {
        text += '\n';
        for (let j=0; j<matrix[i].length; j++) {
            text += (matrix[i][j] !== undefined ? matrix[i][j] : '.') + ' ';
        }
    }
    console.log(text);
}