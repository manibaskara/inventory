import React, { Component } from "react";
import "./App.css";
import "h8k-components";
import ProductList from "./components/product-list";
import Cart from "./components/cart";

const title = "HackerShop";

class App extends Component {
  constructor() {
    super();
    const products = [...PRODUCTS].map((product, index) => {
      product.id = index + 1;
      product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
      product.cartQuantity = 0;
      return product;
    });
    this.state = {
      cart: {
        items: [],
      },
      products,
    };
  }

  increase = (product) => {
    let products = this.state.products;

    products = products.map((item) => {
      if (item.id === product.id) {
        item = { ...product, cartQuantity: product.cartQuantity + 1 };
      }
      return item;
    });
    let cart = this.state.cart.items;
    if (cart.length < 1) {
      cart = [
        {
          id: product.id,
          item: product.name,
          quantity: 1,
        },
      ];
    } else {
      let matched = false;
      cart = cart.map((item) => {
        if (item.id === product.id) {
          matched = true;
          item = {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      if (!matched) {
        cart.push({
          id: product.id,
          item: product.name,
          quantity: 1,
        });
      }
    }
    this.setState((state) => {
      return {
        cart: { items: cart },
        products,
      };
    });
  };

  decrease = (product) => {
    let products = this.state.products;
    products = products.map((item, index) => {
      if (item.id === product.id) {
        if (item.cartQuantity === 1) {
          item = { ...product, cartQuantity: 0 };
        } else {
          item = { ...product, cartQuantity: product.cartQuantity - 1 };
        }
      }
      return item;
    });
    let cart = this.state.cart.items;
    let oneQuantityIndex = -1;
    cart = cart.map((item, index) => {
      if (item.id === product.id) {
        if (item.quantity === 1) {
          oneQuantityIndex = index;
        } else {
          item = {
            id: product.id,
            item: product.name,
            quantity: item.quantity - 1,
          };
        }
      }
      return item;
    });
    if (oneQuantityIndex !== -1) {
      cart.splice(oneQuantityIndex, 1);
    }

    this.setState((state) => {
      return {
        cart: { items: cart },
        products,
      };
    });
  };

  render() {
    return (
      <div>
        <h8k-navbar header={title}></h8k-navbar>
        <div className="layout-row shop-component">
          <ProductList
            products={this.state.products}
            onAddToCart={this.increase}
            onIncrease={this.increase}
            onDecrease={this.decrease}
          />
          <Cart cart={this.state.cart} />
        </div>
      </div>
    );
  }
}

export const PRODUCTS = [
  {
    name: "Cap",
    price: 5,
  },
  {
    name: "HandBag",
    price: 30,
  },
  {
    name: "Shirt",
    price: 35,
  },
  {
    name: "Shoe",
    price: 50,
  },
  {
    name: "Pant",
    price: 35,
  },
  {
    name: "Slipper",
    price: 25,
  },
];
export default App;
