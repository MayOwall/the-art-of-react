import { Component } from "react";
import PropTypes from "prop-types";

class MyComponent extends Component {
  static defaultProps = {
    name: "아무개",
  };

  static propTypes = {
    name: PropTypes.string,
    favoriteNumber: PropTypes.number.isRequired,
  };

  render() {
    const { name, favoriteNumber, children } = this.props;
    return (
      <>
        <div>안녕하세요 제 이름은 {name}입니다</div>
        <div>제가 좋아하는 숫자는 {favoriteNumber}입니다</div>
        <div>{children}</div>
      </>
    );
  }
}

export default MyComponent;
