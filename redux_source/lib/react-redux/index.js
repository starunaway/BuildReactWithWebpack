import React from 'react';

const ProviderContext = React.createContext(null);
export class Provider extends React.Component {
  render() {
    const {children, store} = this.props;
    // console.log(children, store);
    return <ProviderContext.Provider value={{store}}>{children}</ProviderContext.Provider>;
  }
}

export function connect(mapStateToProps, mapDispatchToProps) {
  return (UIComponent) => {
    class ContainerComponent extends React.Component {
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
    }
    ContainerComponent.contextType = ProviderContext;
    return ContainerComponent;
  };
}
