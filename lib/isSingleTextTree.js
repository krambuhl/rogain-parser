export default function isSingleTextTree(treeList) {
  return treeList.length === 1 && treeList[0].type === 'text';
}