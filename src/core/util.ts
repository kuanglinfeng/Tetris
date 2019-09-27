
/**
 * 随机取[min, max) 里的一个整数值
 * @param min 
 * @param max 
 */
export function getRandom(min: number, max: number) {
  const dec = max - min
  return Math.floor(Math.random() * dec + min)
}