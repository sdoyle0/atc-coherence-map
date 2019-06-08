import { Component, PropTypes }  from 'react';
import shallowEqual from 'react/lib/shallowEqual';

import classNames from 'classnames';

export class Collapse extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ]),
    title: PropTypes.string.isRequired,
    onAdjustParentHeight: PropTypes.func,
    onExpand: PropTypes.func,
    onCollapse: PropTypes.func,
    minHeight: PropTypes.number,
    disabled: PropTypes.bool
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.open != nextState.open;
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    );
  }

  state = {open: this.props.disabled};

  _onClick = () => {
    if(this.props.disabled) return;
    if(this.props.onExpand && !this.state.open) this.props.onExpand();
    if(this.props.onCollapse && this.state.open) this.props.onCollapse();
    this.setState({open:!this.state.open});
    window.disableScrollTop = true;
    setTimeout(() => {
      window.disableScrollTop = false;
    }, 1000);
    // if (this.props.isProgressions) {
    //   window.disableScrollTop = true;
    //   setTimeout(() => {
    //     window.disableScrollTop = false;
    //   }, 1000);
    // }
  };

  componentWillUnmount() {
    window.disableScrollTop = false;
  }

  componentDidUpdate() {
    var domnode = React.findDOMNode(this);
    var minHeight = this.props.minHeight || 60;
    domnode.style.maxHeight = minHeight + 'px';
    if(domnode && domnode.scrollHeight && this.state.open) {
      domnode.style.maxHeight = domnode.scrollHeight + 'px';
      if(this.props.onAdjustParentHeight) this.props.onAdjustParentHeight(domnode.scrollHeight - minHeight);
    }
    else {
      if(this.props.onAdjustParentHeight) this.props.onAdjustParentHeight(-domnode.scrollHeight + minHeight);
    }
  }

  render() {
      return (
        <div 
          style={{minHeight:this.props.minHeight||60}} 
            className={classNames('collapse', {'open':this.state.open, disabled:this.props.disabled})}>
            <div className="collapse-header" onClick={this._onClick}>
              <h3>{this.props.title}</h3>
              <i className={classNames('fa', this.state.open ? 'fa-chevron-up': 'fa-chevron-down')}></i>
            </div>
            {this.props.children}
        </div>
      );
  }

}
