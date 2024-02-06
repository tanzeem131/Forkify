import View from './View';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Page 1,and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton(1);
    }

    //Last pages
    if (curPage === numPages) {
      return this._generateMarkupButton(-1);
    }
    //Other page
    if (curPage < numPages) {
      return `${
        this._generateMarkupButton(1) + this._generateMarkupButton(-1)
      }`;
    }

    //Page 1, and there are No other pages
    return '';
  }

  _generateMarkupButton(num) {
    const curPage = this._data.page;
    return `
        <button data-goto="${
          num + curPage
        }" class="btn--inline pagination__btn--${num > 0 ? 'next' : 'prev'}">
            <svg class="search__icon">
               <use href="${icons}#icon-arrow-${num < 0 ? 'left' : ''}"></use>
            </svg>
            <span>Page ${num + curPage}</span>
            <svg class="search__icon">
               <use href="${icons}#icon-arrow-${num > 0 ? 'right' : ''}"></use>
            </svg>
        </button> `;
  }
}

export default new PaginationView();
