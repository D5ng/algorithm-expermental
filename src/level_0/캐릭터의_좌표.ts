/**
 * 문제 설명
 * 머쓱이는 RPG게임을 하고 있습니다. 게임에는 up, down, left, right 방향키가 있으며 각 키를 누르면 위, 아래, 왼쪽, 오른쪽으로 한 칸씩 이동합니다.
 * 예를 들어 [0,0]에서 up을 누른다면 캐릭터의 좌표는 [0, 1], down을 누른다면 [0, -1], left를 누른다면 [-1, 0], right를 누른다면 [1, 0]입니다.
 * 머쓱이가 입력한 방향키의 배열 keyinput와 맵의 크기 board이 매개변수로 주어집니다. 캐릭터는 항상 [0,0]에서 시작할 때 키 입력이 모두 끝난 뒤에 캐릭터의 좌표 [x, y]를 return하도록 solution 함수를 완성해주세요.
 * [0, 0]은 board의 정 중앙에 위치합니다. 예를 들어 board의 가로 크기가 9라면 캐릭터는 왼쪽으로 최대 [-4, 0]까지 오른쪽으로 최대 [4, 0]까지 이동할 수 있습니다.
 *
 * 제한사항
 * board은 [가로 크기, 세로 크기] 형태로 주어집니다.
 * board의 가로 크기와 세로 크기는 홀수입니다.
 * board의 크기를 벗어난 방향키 입력은 무시합니다.
 * 0 ≤ keyinput의 길이 ≤ 50
 * 1 ≤ board[0] ≤ 99
 * 1 ≤ board[1] ≤ 99
 * keyinput은 항상 up, down, left, right만 주어집니다.
 *
 * 입출력 예
 * keyinput	board	result
 * ["left", "right", "up", "right", "right"]	[11, 11]	[2, 1]
 * ["down", "down", "down", "down", "down"]	[7, 9]	[0, -4]
 */

function adjustBoardSize(board: number[]) {
	return board.map((value) => Math.floor(value / 2));
}

const direction = {
	left: [-1, 0],
	right: [1, 0],
	up: [0, 1],
	down: [0, -1],
};

function move(keyinput: string[], maxRange: number[]) {
	const [maxX, maxY] = maxRange;

	let x = 0;
	let y = 0;

	for (const key of keyinput) {
		const [dx, dy] = direction[key];
		x = Math.max(-maxX, Math.min(maxX, x + dx));
		y = Math.max(-maxY, Math.min(maxY, y + dy));
	}

	return [x, y];
}

function 캐릭터의_좌표(keyinput: string[], board: number[]) {
	const maxRange = adjustBoardSize(board);
	return move(keyinput, maxRange);
}

console.log(캐릭터의_좌표(["left", "right", "up", "right", "right"], [11, 11])); // [2, 1]
console.log(캐릭터의_좌표(["down", "down", "down", "down", "down"], [7, 9])); // [0, -4]
console.log(캐릭터의_좌표(["right", "right", "right", "right", "right", "left"], [9, 5])); // [3, 0]
