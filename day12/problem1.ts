import * as fs from 'fs';

const input = fs.readFileSync("input.txt", "utf8");

const lines = input.split(/[\s-]+/);
const graph = new Map<string, string[]>();
const smallCaves = new Set<string>();


for(let i = 0; i < lines.length; i+=2) {
  const firstNode = graph.get(lines[i]);
  setBigCave(lines[i]);
  setBigCave(lines[i+1]);
  if(!firstNode) {
    graph.set(lines[i], [lines[i+1]]);
  } else {
    firstNode.push(lines[i+1]);
  }
  const secondNode = graph.get(lines[i+1]);
  if(!secondNode) {
    graph.set(lines[i+1], [lines[i]]);
  } else {
    secondNode.push(lines[i]);
  }
}
console.log(dfs("start", false, new Set<string>(), ""));

function setBigCave(cave: string) {
  if(cave.charCodeAt(0) > 91) {
    smallCaves.add(cave);
  }
}

function dfs(node: string, secondTouch: boolean, touched: Set<string>, path: string): number {
  path += node;
  if(node === "end") {
    return 1;
  }
  if(touched.has(node)) {
    if(secondTouch) {
      return 0;
    } else {
      secondTouch = true;
    }
  }
  if(smallCaves.has(node)) {
    touched.add(node);
  }
  let result = 0;
  graph.get(node)?.forEach(connection => {
    const tempSet = new Set<string>();
    touched.forEach(temp => tempSet.add(temp));
    if(connection !== "start") {
      result += dfs(connection, secondTouch, tempSet, path);
    } else {
      return 0;
    }
  })

  return result;
}