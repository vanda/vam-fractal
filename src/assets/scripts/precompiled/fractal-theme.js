// Custom Nav Collapser
const treeComponents = document.querySelector('#tree-components');
const treeComponentsCollapse = document.createElement('div');

treeComponentsCollapse.classList.add('Navigation__collapser');
treeComponentsCollapse.title = 'Collapse tree';
treeComponents.insertBefore(treeComponentsCollapse, treeComponents.childNodes[0])
treeComponentsCollapse.addEventListener('click', () => {
  Array.from(treeComponents.querySelectorAll('.Tree-collection:not(.is-closed)>.Tree-collectionLabel'), (el) => {
    el.click();
  });
});
