'use strict';

function handleTableClick(event) {
  if (event.target.className === 'prop__name') {
    table.dataset.sortBy = event.target.dataset.propName;
    if (event.target.dataset.dir === undefined) {
      event.target.dataset.dir = 1;
    } else {
      event.target.dataset.dir *= -1;
    }
  }
  sortTable(table.dataset.sortBy, event.target.dataset.dir)
}
