import View from './View.js';
// import icons from 'url:../../img/icons.svg';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    const parentElement = this._parentElement;
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      console.log('FROM HERE', goToPage);

      handler(goToPage);
    });
  }

  _createButton(page, type, icons) {
    return `
      <button data-goto="${page}" class="btn--inline pagination__btn--${type}">
        ${
          type === 'prev'
            ? `
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${page}</span>
        `
            : `
          <span>Page ${page}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        `
        }
      </button>
      `;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // SCENARIOS:
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `${this._createButton(curPage + 1, 'next', icons)}`;
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return `${this._createButton(curPage - 1, 'prev', icons)}`;
    }
    // Other page
    if (curPage < numPages) {
      return `
        ${this._createButton(curPage - 1, 'prev', icons)}
        ${this._createButton(curPage + 1, 'next', icons)}
      `;
    }
    // Page 1, and there are NO other pages
    return '';
  }
}
export default new PaginationView();
