

export function getVectorRotation(dir: cc.Vec2) { // min and max included
  const comVec = cc.v2(0, 1);
  const radian = dir.signAngle(comVec); // Find the radians between the direction vector and the contrast vector
  const degree = cc.misc.radiansToDegrees(radian);
  return Math.floor(degree) - 180
}

export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getWorldPosition(node: cc.Node): cc.Vec2 {
  return node.convertToWorldSpaceAR(cc.Vec2.ZERO)
}

export function distance(vectorA: cc.Vec2, vectorB: cc.Vec2) {
  return cc.v2(Math.abs(vectorA.x - vectorB.x), Math.abs(vectorA.y - vectorB.y))
}

export function vectorsToDegress(dirVec: cc.Vec2) {
  let comVec = cc.v2(0, 1); // Horizontal right contrast vector
  let radian = dirVec.signAngle(comVec); // Find the radians between the direction vector and the contrast vector
  let degree = cc.misc.radiansToDegrees(radian); // Convert radians to angles
  return degree;
}

export function getDistance(vecA: cc.Vec2, vecB: cc.Vec2) {
  let x = vecA.x - vecB.x
  let y = vecA.y - vecB.y
  return Math.sqrt(x * x + y * y)
}

export function getDivisibleBy(numA: number) {
  let arrNum = []
  let b = 0;
  for (let index = 0; index < numA; index++) {
    if (numA % index === 0) {
      arrNum.push(index)
    } else if (numA === 1) {
      arrNum.push(1)
    }
  }
  let rd = getRandom(0, arrNum.length - 1)
  b = arrNum[rd]
  return b
}

export function getEqual(rd1, rd2, a, b, d) {
  let c = 0;
  let stringCal;
  if (rd1 === 0 && rd2 === 0) {
    c = a + b + d
    stringCal = `${a} + ${b} + ${d} `
  } else if (rd1 === 1 && rd2 === 0) {
    c = a - b + d
    stringCal = `${a} - ${b} + ${d} `
  } else if (rd1 === 2 && rd2 === 0) {
    b = getDivisibleBy(a)
    c = a / b + d
    stringCal = `${a} / ${b} + ${d} `
  } else if (rd1 === 3 && rd2 === 0) {
    b = getRandom(2, 10)
    c = a * b + d
    stringCal = `${a} * ${b} + ${d} `
  } else if (rd1 === 0 && rd2 === 1) {
    c = a + b - d
    stringCal = `${a} + ${b} - ${d} `
  } else if (rd1 === 1 && rd2 === 1) {
    c = a - b - d
    stringCal = `${a} - ${b} - ${d} `
  } else if (rd1 === 2 && rd2 === 1) {
    b = getDivisibleBy(a)
    c = a / b - d
    stringCal = `${a} / ${b} - ${d} `
  } else if (rd1 === 3 && rd2 === 1) {
    b = getRandom(2, 10)
    c = a * b - d
    stringCal = `${a} * ${b} - ${d} `
  } else if (rd1 === 0 && rd2 === 2) {
    d = getDivisibleBy(b)
    c = a + b / d
    stringCal = `${a} + ${b} / ${d} `
  } else if (rd1 === 1 && rd2 === 2) {
    d = getDivisibleBy(b)
    c = a - b / d
    stringCal = `${a} - ${b} / ${d} `
  } else if (rd1 === 2 && rd2 === 2) {
    b = getDivisibleBy(a)
    d = getDivisibleBy(b)
    c = a / b / d
    stringCal = `${a} / ${b} / ${d} `
  } else if (rd1 === 3 && rd2 === 2) {
    b = getRandom(2, 10)
    d = getDivisibleBy(b)
    c = a * b / d
    stringCal = `${a} * ${b} / ${d} `
  } else if (rd1 === 0 && rd2 === 3) {
    d = getRandom(2, 10)
    c = a + b * d
    stringCal = `${a} + ${b} * ${d} `
  } else if (rd1 === 1 && rd2 === 3) {
    d = getRandom(2, 10)
    c = a - b * d
    stringCal = `${a} - ${b} * ${d} `
  } else if (rd1 === 2 && rd2 === 3) {
    b = getDivisibleBy(a)
    d = getRandom(2, 10)
    c = a / b * d
    stringCal = `${a} / ${b} * ${d} `
  } else if (rd1 === 3 && rd2 === 3) {
    b = getRandom(2, 10)
    d = getRandom(2, 10)
    c = a * b * d
    stringCal = `${a} * ${b} * ${d} `
  }
  return { c, stringCal }
}

export function getCalculation() {
  let a = getRandom(2, 20);
  let b = getRandom(2, 20);
  let result = 0;
  let d = getRandom(2, 20);
  let rd = getRandom(0, 3)
  let rd2 = getRandom(0, 3)
  const { c, stringCal } = getEqual(rd, rd2, a, b, d)
  result = c
  return { result, stringCal }
}

export function pad(number, targetLength) {
  return `${number}`.padStart(targetLength, '0');
}

export function getTimeFormat(time) {
  const hh = Math.floor(time / 3600);
  const mm = Math.floor(time % 3600 / 60);
  const ss = Math.floor(time % 3600 % 60);
  return `${pad(mm, 2)}:${pad(ss, 2)}`;
  // return `${pad(ss, 2)}`;
}