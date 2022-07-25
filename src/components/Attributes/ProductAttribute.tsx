import React from "react";

import { attributeType, sizes } from "../../constants/constant";
import {
  AttributeItem,
  AttributeValues,
  ProductAttributeProps,
} from "../../types";

import "./productAttributes.css";

class Attribute extends React.Component<ProductAttributeProps, any> {
  constructor(props: ProductAttributeProps) {
    super(props);

    this.state = { [this.props.type]: '0' };

    this.chooseAttributeValueHandler =
      this.chooseAttributeValueHandler.bind(this);
  }

  componentWillUnmount() {
    const attribute = { value: '0' };
    this.props.changeAttr(attribute, this.props.type);
  }

  chooseAttributeValueHandler(e: React.SyntheticEvent): void {
    const target = e.target as HTMLInputElement;
    this.setState((state: AttributeValues) => ({
      ...state,
      [this.props.type]: target.id,
    }));
    const attribute = { value: target.id };
    this.props.changeAttr(attribute, this.props.type);
  }

  getAttributeName(type: string, item: AttributeItem): string | undefined {
    if (type === attributeType.size) {
      return sizes[+item.value];
    } else if (type === attributeType.color) {
      return;
    } else {
      return item.displayValue;
    }
  }

  render(): JSX.Element {
    const { attribute, type } = this.props;

    return (
      <div className="product-attribute-container">
        <div className="product-title">{attribute.name}</div>
        <div className="produst-boxes">
          {attribute.items.map(
            (item: AttributeItem, index: number): JSX.Element => {
              return (
                <div
                  className={
                    type === attributeType.color ? "color-example" : "size-box"
                  }
                  id={index.toString()}
                  key={item.id}
                  style={
                    type === attributeType.color
                      ? this.state[type] === index.toString()
                        ? {
                            boxShadow: "0 0 0 1px #fff, 0 0 0 2px #5ECE7B",
                            background: item.value,
                          }
                        : { background: item.value }
                      : this.state[type] === index.toString()
                      ? { background: "black", color: "white" }
                      : {}
                  }
                  onClick={this.chooseAttributeValueHandler}
                >
                  {this.getAttributeName(type, item)}
                </div>
              );
            }
          )}
        </div>
      </div>
    );
  }
}

export default Attribute;
