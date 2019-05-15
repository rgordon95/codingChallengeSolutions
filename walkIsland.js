/*
...
.#.
...

*/


module.exports = function main(data) {
  let count = 0;
  const map = data.split('\n').map(v => v.split(''));
  const width = map[0].length;
  const length = map.length;

  const visited = new Set;

  function toSetKey(x, y) {
    return [x, y].join(',');
  }

  function walkIsland(x, y) {
      if (
        x < 0 ||
        x > width - 1 ||
        y < 0 ||
        y > length - 1
      ) {
        return;
      }

      if (visited.has(toSetKey(x, y))) {
        return;
      }

      if (map[y][x] === '.') {
        return;
      }

      // it is land
      visited.add(toSetKey(x, y));

      if (x - 1 >= 0) {
        // left
        walkIsland(x - 1, y);
      }
      if (x + 1 < width) {
        // right
        walkIsland(x + 1, y);
      }
      if (y - 1 >= 0) {
        // up
        walkIsland(x, y - 1);
      }
      if (y + 1 < length) {
        // down
        walkIsland(x, y + 1);
      }
  }

  map.forEach((line, lineNumber) => {
    line.forEach((char, colNumber) => {
      if (!visited.has(toSetKey(colNumber, lineNumber))) {
        if (char === '#') {
          count += 1;
          walkIsland(colNumber, lineNumber);
        }
      }
    })
  });

  return count;
}
