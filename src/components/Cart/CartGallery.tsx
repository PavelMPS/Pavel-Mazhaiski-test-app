import React from "react";

import { left, right } from "../../constants/constant";
import { GalleryProps, GalleryState } from "../../types";

import "./cartGallery.css";

class CartGallery extends React.Component<GalleryProps, GalleryState> {
  constructor(props: GalleryProps) {
    super(props);

    this.state = { choosingImage: this.props.gallery[0], counter: 0 };
    
    this.gallerySwitcherHandler = this.gallerySwitcherHandler.bind(this);
  }

  gallerySwitcherHandler(e: React.SyntheticEvent): void {
    const target = e.target as HTMLInputElement;
    let counter = this.state.counter;
    const gallery = this.props.gallery;

    switch (target.id) {
      case left:
        counter === 0
          ? this.setState({
              choosingImage: gallery[gallery.length - 1],
              counter: gallery.length - 1,
            })
          : this.setState({
              choosingImage: gallery[counter - 1],
              counter: counter - 1,
            });
        break;
      case right:
        counter === gallery.length - 1
          ? this.setState({ choosingImage: gallery[0], counter: 0 })
          : this.setState({
              choosingImage: gallery[counter + 1],
              counter: counter + 1,
            });
        break;
    }
  }

  render(): JSX.Element {
    return (
      <div
        className="cart-image-container"
        style={{ backgroundImage: `url(${this.state.choosingImage})` }}
      >
        <div
          className="cart-gallery-maintance"
          onClick={this.gallerySwitcherHandler}
        >
          <div className="cart-left-arrow">
            <div className="left" id="left">{`<`}</div>
          </div>
          <div className="cart-right-arrow">
            <div className="right" id="right">{`>`}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartGallery;
