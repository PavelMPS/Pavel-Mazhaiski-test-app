import React from "react";

import { sizes, attributeType, cart } from "../../constants/constant";
import { AttributeBlockProps, AttributeItem } from "../../types";

class AttributesBlock extends React.Component<AttributeBlockProps, {}> {
  render(): JSX.Element {
    const { product, attribute, type } = this.props;

    return (
      <>
        {attribute.items.map(
          (attr: AttributeItem, index: number): JSX.Element | undefined => {
            if (attribute.id === attributeType.size) {
              return (
                <div
                  className={
                    type === cart
                      ? "cart-attribute-size-item"
                      : "attribute-size-item"
                  }
                  key={attr.id}
                  style={
                    product["Size"] === index.toString()
                      ? { background: "black", color: "white" }
                      : {}
                  }
                >
                  {sizes[attr.value]}
                </div>
              );
            } else if (attribute.id === attributeType.color) {
              return (
                <div
                  className={
                    type === cart
                      ? "cart-attribute-color-item"
                      : "attribute-color-item"
                  }
                  key={attr.id}
                  style={
                    product["Color"] === index.toString()
                      ? {
                          boxShadow: "0 0 0 1px #fff, 0 0 0 2px #5ECE7B",
                          background: attr.value,
                        }
                      : { background: attr.value }
                  }
                ></div>
              );
            } else if (attribute.id === attributeType.capacity) {
              return (
                <div
                  className={
                    type === cart
                      ? "cart-attribute-capacity-item"
                      : "attribute-capacity-item"
                  }
                  key={attr.id}
                  style={
                    product["Capacity"] === index.toString()
                      ? { background: "black", color: "white" }
                      : {}
                  }
                >
                  {attr.value}{" "}
                </div>
              );
            } else if (attribute.id === attributeType.withUSB) {
              return (
                <div
                  className={
                    type === cart
                      ? "cart-attribute-capacity-item"
                      : "attribute-capacity-item"
                  }
                  key={attr.id}
                  style={
                    product["With USB 3 ports"] === index.toString()
                      ? { background: "black", color: "white" }
                      : {}
                  }
                >
                  {attr.value}
                </div>
              );
            } else if (attribute.id === attributeType.touchId) {
              return (
                <div
                  className={
                    type === cart
                      ? "cart-attribute-capacity-item"
                      : "attribute-capacity-item"
                  }
                  key={attr.id}
                  style={
                    product["Touch ID in keyboard"] === index.toString()
                      ? { background: "black", color: "white" }
                      : {}
                  }
                >
                  {attr.value}
                </div>
              );
            }
          }
        )}
      </>
    );
  }
}

export default AttributesBlock;
