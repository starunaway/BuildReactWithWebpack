import React from 'react';
import PropTypes from 'prop-types';

export class Provider extends React.Component {
  static childContextTypes = {
    store: () => null,
  };

  getChildContext() {
    return {
      store: this.props.store,
    };
  }

  render() {
    const {children} = this.props;
    return children;
  }
}

export function connect(mapStateToProps, mapDispatchToProps) {
  return (UIComponent) => {
    return class ContainerComponent extends React.Component {
      static contextTypes = {
        store: () => null,
      };

      constructor(props, context) {
        super(props);
        console.log(props, context);
        const {store} = context;
        const stateProps = mapStateToProps(store.getState());

        if (typeof mapDispatchToProps === 'function') {
          this.dispatchProps = mapDispatchToProps(store.dispatch);
        } else {
          let dispatchProps = {};
          Object.keys(mapDispatchToProps).forEach((key) => {
            const action = mapDispatchToProps[key];
            dispatchProps[key] = (...args) => store.dispatch(action(...args));
          });
          this.dispatchProps = dispatchProps;
        }

        this.state = {...stateProps};
        store.subscribe(() => {
          this.setState({
            ...mapStateToProps(store.getState()),
          });
        });
      }

      render() {
        const stateProps = this.state;
        console.log(stateProps);
        return <UIComponent {...stateProps} {...this.dispatchProps}></UIComponent>;
      }
    };
  };
}
