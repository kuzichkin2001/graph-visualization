import Graph from './graph';
import Node from './attributes/node';
import * as cytoscape from 'cytoscape';
import './styles.css';
import './modal.css';

window.oncontextmenu = (event: Event) => {
  event.preventDefault();
};

// cytoscape container
const container: HTMLElement = document.getElementById('cy') as HTMLElement;

// modal HTML Elements
const modal: HTMLElement = document.getElementById('modal') as HTMLElement;
const modalContainer: HTMLElement = document.getElementsByClassName('modal-container')[0] as HTMLElement;
const select: HTMLSelectElement = document.getElementById('content-selector') as HTMLSelectElement;
const nodeNameInput: HTMLElement = document.getElementsByClassName('node-name-input')[0] as HTMLElement;
const edgeInfoInput: HTMLElement = document.getElementsByClassName('edge-info')[0] as HTMLElement;
const submitButton: HTMLButtonElement = document.getElementById('submit-button') as HTMLButtonElement;

// algorithms buttons
const dfs: HTMLButtonElement = document.getElementById('dfs') as HTMLButtonElement;
const bfs: HTMLButtonElement = document.getElementById('bfs') as HTMLButtonElement;

// removeModal HTML Elements
const removeButton: HTMLButtonElement = document.getElementById('remove') as HTMLButtonElement;
const removeModal: HTMLElement = document.getElementById('remove-modal') as HTMLElement;
const removeSelect: HTMLSelectElement = document.getElementById('remove-content-selector') as HTMLSelectElement;
const removeNodeInput: HTMLElement = document.getElementsByClassName('node-name-input')[1] as HTMLElement;
const removeEdgeInput: HTMLElement = document.getElementsByClassName('edge-info')[1] as HTMLElement;
const removeSubmitButton: HTMLButtonElement = document.getElementById('remove-submit-button') as HTMLButtonElement;

// dfs modal html elements
const dfsModal: HTMLElement = document.getElementById('dfs-modal') as HTMLElement;
const dfsSubmitButton: HTMLButtonElement = document.getElementById('dfs-submit-button') as HTMLButtonElement;
const bfsModal: HTMLElement = document.getElementById('bfs-modal') as HTMLElement;
const bfsSubmitButton: HTMLButtonElement = document.getElementById('bfs-submit-button') as HTMLButtonElement;


dfs.addEventListener('click', (event: MouseEvent) => {
  openDfsModal();
});

dfsModal.addEventListener('click', (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    closeDfsModal();
  }
});

dfsSubmitButton.addEventListener('click', (event: MouseEvent) => {
  collectDfsInformation().then(data => {
    const elements = cy.elements();
    const dfs_path = elements.depthFirstSearch({
      root: `#${data}`,
      directed: true,
    });

    console.log(dfs_path.path);

    dfs_path.path.forEach((elem) => {
      if (elem.group() === 'nodes') {
        elem.addClass('selectedNode');
      } else {
        elem.addClass('selectedEdge');
      }
    });

    setTimeout(() => {
      dfs_path.path.forEach((elem) => {
        if (elem.group() === 'nodes') {
          elem.removeClass('selectedNode');
        } else {
          elem.removeClass('selectedEdge');
        }
      });
    }, 5000);
  });
  closeDfsModal();
});

bfs.addEventListener('click', (event: MouseEvent) => {
  openBfsModal();
});

bfsModal.addEventListener('click', (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    closeBfsModal();
  }
});

bfsSubmitButton.addEventListener('click', (event: MouseEvent) => {
  collectBfsInformation().then(data => {
    const elements = cy.elements();
    const bfs_path = elements.breadthFirstSearch({
      root: `#${data}`,
      directed: true,
    });

    console.log(bfs_path.path);

    bfs_path.path.forEach((elem) => {
      if (elem.group() === 'nodes') {
        elem.addClass('selectedNode');
      } else {
        elem.addClass('selectedEdge');
      }
    });

    setTimeout(() => {
      bfs_path.path.forEach((elem) => {
        if (elem.group() === 'nodes') {
          elem.removeClass('selectedNode');
        } else {
          elem.removeClass('selectedEdge');
        }
      });
    }, 5000);
  });
  closeBfsModal();
});

var cy = cytoscape({
  container,

  elements: [],

  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'background-color': '#ffa12f',
        'label': 'data(id)'
      }
    },

    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'label': 'data(weight)',
      }
    },

    {
      selector: '.selectedNode',
      style: {
        'background-color': '#ff0000',
        'label': 'data(id)',
      }
    },

    {
      selector: '.selectedEdge',
      style: {
        'line-color': '#000',
        'target-arrow-color': '#000',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'label': 'data(weight)',
      },
    }
  ],

  layout: {
    name: 'grid',
    rows: 1
  },

  zoom: 1,
  minZoom: 1,
  maxZoom: 3,
});

cy.on('tap', function (event: cytoscape.EventObject) {
  const target = event.target;
  currentPosition = {
    x: event.position.x,
    y: event.position.y,
  }

  if (target === cy) {
    openModal();
  } else {
    console.log('target', event);
    console.log('tap on some element');
  }
});

removeButton.addEventListener('click', (event: MouseEvent) => {
  openRemoveModal();
});

console.log(cy);

enum ElementTypes {
  NODE = 'node',
  EDGE = 'edge',
};

type ElementInfo = {
  type: ElementTypes,
  first: string,
  second?: string,
  weight?: number,
};

var graph = new Graph();

graph.serializeGraph();

dfs.addEventListener('click', (event: MouseEvent) => {
  const elements = cy.elements();
  const dfs_path = elements.depthFirstSearch({
    root: '#a',
    directed: true,
  });

  console.log(dfs_path.path);

  dfs_path.path.forEach((elem) => {
    if (elem.group() === 'nodes') {
      elem.addClass('selectedNode');
    } else {
      elem.addClass('selectedEdge');
    }
  });

  setTimeout(() => {
    dfs_path.path.forEach((elem) => {
      if (elem.group() === 'nodes') {
        elem.removeClass('selectedNode');
      } else {
        elem.removeClass('selectedEdge');
      }
    });
  }, 5000);
});

bfs.addEventListener('click', (event: MouseEvent) => {
  const elements = cy.elements();
  const bfs_path = elements.breadthFirstSearch({
    root: '#a',
    directed: true,
  });

  console.log(bfs_path.path);

  bfs_path.path.forEach((elem) => {
    if (elem.group() === 'nodes') {
      elem.addClass('selectedNode');
    } else {
      elem.addClass('selectedEdge');
    }
  });

  setTimeout(() => {
    bfs_path.path.forEach((elem) => {
      if (elem.group() === 'nodes') {
        elem.removeClass('selectedNode');
      } else {
        elem.removeClass('selectedEdge');
      }
    });
  }, 5000);
});

modal.addEventListener('click', (event: MouseEvent) => {
  if (event.currentTarget == event.target) {
    closeModal();
  }
});

removeModal.addEventListener('click', (event: MouseEvent) => {
  if (event.currentTarget === event.target) {
    closeRemoveModal();
  }
})

select.addEventListener('change', (event) => {
  const target: HTMLOptionElement = event.target as HTMLOptionElement;
  if (target.value === 'node') {
    edgeInfoInput.style.display = 'none';
    nodeNameInput.style.display = 'flex';
    type = ElementTypes.NODE;
  } else {
    nodeNameInput.style.display = 'none';
    edgeInfoInput.style.display = 'flex';
    type = ElementTypes.EDGE;
  }
});

removeSelect.addEventListener('change', (event) => {
  const target: HTMLOptionElement = event.target as HTMLOptionElement;
  if (target.value === 'node') {
    removeEdgeInput.style.display = 'none';
    removeNodeInput.style.display = 'flex';
    type = ElementTypes.NODE;
  } else {
    removeNodeInput.style.display = 'none';
    removeEdgeInput.style.display = 'flex';
    type = ElementTypes.EDGE;
  }
});

submitButton.addEventListener('click', (event: MouseEvent) => {
  collectInformation().then(data => {
    console.log('got data: ', data);
    if (data.type === ElementTypes.NODE) {
      addNode(data.first, event);
    } else if (data.type === ElementTypes.EDGE) {
      addEdge(data, event);
    }
    closeModal();
  })
});

removeSubmitButton.addEventListener('click', (event: MouseEvent) => {
  collectRemoveInformation().then(data => {
    console.log('got removement data: ', data);
    if (type === ElementTypes.NODE) {
      removeNode(data);
    } else if (type === ElementTypes.EDGE) {
      removeEdge(data);
    }
    closeRemoveModal();
  })
})

let currentPosition = {
  x: 0,
  y: 0,
};

let type: ElementTypes = ElementTypes.NODE;

function addNode(id: string, event: MouseEvent): void {
  cy.add({
    group: 'nodes',
    data: { id },
    position: { x: currentPosition.x, y: currentPosition.y },
  });

  graph.addNode(id, '#ffa12f', 10, {
    x: currentPosition.x,
    y: currentPosition.y,
  });
}

function addEdge(data: ElementInfo, event: MouseEvent): void {
  cy.add({
    group: 'edges',
    data: { id: `${data.first}${data.second}`, source: data.first, target: data.second, weight: data.weight },
  });

  const from: Node = graph.nodes.find((item: Node) => {
    return item.label === data.first;
  });

  const to: Node = graph.nodes.find((item: Node) => {
    return item.label === data.second;
  });

  graph.addEdge(from, to, data.weight);
}

function removeNode(id: string) {
  cy.remove(cy.$(`#${id}`));
}

function removeEdge(id: string) {
  cy.remove(cy.$(`#${id}`));
}

function openModal() {
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
}

function openRemoveModal() {
  removeModal.style.display = 'flex';
}

function closeRemoveModal() {
  removeModal.style.display = 'none';
}

function openDfsModal() {
  dfsModal.style.display = 'flex';
}

function closeDfsModal() {
  dfsModal.style.display = 'none';
}

function openBfsModal() {
  bfsModal.style.display = 'flex';
}

function closeBfsModal() {
  bfsModal.style.display = 'none';
}

async function collectInformation(): Promise<ElementInfo> {
  if (type === ElementTypes.NODE) {
    const elem = document.getElementById('node-name-input') as HTMLInputElement;
    console.log('passing vertex through');
    return {
      type: ElementTypes.NODE,
      first: elem.value,
    };
  } else {
    console.log('passing edge through');
    const from = document.getElementById('edge-from') as HTMLInputElement;
    const to = document.getElementById('edge-to') as HTMLInputElement;
    const weight = document.getElementById('edge-weight') as HTMLInputElement;

    return {
      type: ElementTypes.EDGE,
      first: from.value,
      second: to.value,
      weight: +weight.value,
    };
  }
}

async function collectRemoveInformation(): Promise<string> {
  if (type === ElementTypes.NODE) {
    const elem = document.getElementById('remove-node') as HTMLInputElement;
    console.log('passing vertex through');
    return elem.value;
  } else {
    console.log('passing edge through');
    const from = document.getElementById('remove-edge-from') as HTMLInputElement;
    const to = document.getElementById('remove-edge-to') as HTMLInputElement;

    return `${from.value}${to.value}`;
  }
}

async function collectDfsInformation(): Promise<string> {
  const elem = document.getElementById('dfs-node') as HTMLInputElement;
  return elem.value;
}

async function collectBfsInformation(): Promise<string> {
  const elem = document.getElementById('bfs-node') as HTMLInputElement;
  return elem.value;
}
  