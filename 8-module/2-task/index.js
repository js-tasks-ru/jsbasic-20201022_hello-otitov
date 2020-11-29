import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.render();
    this.filters = {};
  }

  get template() {
    return `
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `;
  }

  render() {
    this.elem = createElement(this.template);
    this.content = this.elem.querySelector('.products-grid__inner');
    this.renderContent();
  }

  renderContent() {
    this.content.innerHTML = '';
    
    for (const product of this.products) {
      if (
        (this.filters?.noNuts && product.nuts)
        || (this.filters?.vegeterianOnly && !product.vegeterian)
        || (product.spiciness > this.filters?.maxSpiciness)
        || (this.filters?.category && product.category != this.filters?.category)
      ) {
        continue;
      }

      this.content.append(new ProductCard(product).elem);
    }
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters); 

    // можно попробывать реализовать фильтрацию, не зависимо от полей в фильтре, 
    // НО, важно чтобы имена в фильтре совпадали с именами полей в product
    // например:
    // {
    //   nuts: true/false,
    //   vegeterian: true/false,
    //   spiciness: 0/2/3/4/5... 
    // }
    // const filters = Object.entries(this.filters); // [key, value]
    // this.filtredProducts = this.products.filter(product => {
    //   filters.forEach(([key, value]) => {
    //     // проверка на число
    //     if (Number.isInteger(value)) {
    //       return (product?.[key] && product?.[key] > value) ? true : false;
    //     }
    //     return (product?.[key] && product?.[key] != value) ? false : true;
    //   });
    // });
    this.renderContent();
  }
}
