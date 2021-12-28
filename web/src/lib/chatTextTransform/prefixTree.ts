import * as R from 'ramda';

type Node = {
  char: string;
  children: Node[];
  isStopWord: boolean;
};

type Root = {
  children: Node[];
};

const root: Root = { children: [] };

const addWord = (word: string) => {
  let nodes: Node[] = root.children;
  let currentNode: Node | undefined;

  for (let i = 0; i < word.length; i += 1) {
    const nodesFiltered = R.filter((x) => x.char == word[i], nodes);

    if (nodesFiltered.length === 0) {
      const rootNode: Node = {
        char: word[i],
        isStopWord: i + 1 === word.length,
        children: [],
      };
      let tmpNode = rootNode;
      i += 1;

      for (; i < word.length; i += 1) {
        const tempNode = {
          char: word[i],
          isStopWord: i + 1 === word.length,
          children: [],
        };

        tmpNode.children = [tempNode];
        tmpNode = tempNode;
      }

      if (R.isNil(currentNode)) {
        root.children = [...root.children, rootNode];
      } else {
        currentNode.children = [...currentNode.children, rootNode];
      }

      break;
    }

    currentNode = nodesFiltered[0];

    if (i + 1 == word.length) {
      currentNode.isStopWord = true;
    }

    nodes = currentNode.children;
  }
};

const hasWord = (word: string): boolean => {
  let nodes: Node[] = root.children;

  for (let i = 0; i < word.length; i += 1) {
    const nodesFiltered = R.filter((x) => x.char == word[i], nodes);

    if (nodesFiltered.length === 0) {
      return false;
    }

    const node = nodesFiltered[0];

    if (i + 1 == word.length) {
      return node.isStopWord;
    }

    nodes = node.children;
  }
};

export default { addWord, hasWord, root };
export type { Node };
