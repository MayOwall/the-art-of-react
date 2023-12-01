import PropTypes from "prop-types";

const MyComponent = ({ name }) => {
  return (
    <>
      <div>The limits of my language means the limits of my world.</div>
      <div>- {name}</div>
    </>
  );
};

MyComponent.defaultProps = {
  name: "아무개",
};

MyComponent.propTypes = {
  name: PropTypes.string.isRequired,
};

export default MyComponent;
