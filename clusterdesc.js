import { Component, PropTypes }  from 'react';
import { formatHTML } from './standards-utils';
import shallowEqual from 'react/lib/shallowEqual';

export class ClusterName extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    );
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  render() {
    return (<p className='cluster-desc' dangerouslySetInnerHTML={{__html:formatHTML(this.props.name)}}></p>);
  }
}

export class ClusterDesc extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    );
  }

  static propTypes = {
    msa: PropTypes.string.isRequired,
    grade: PropTypes.string.isRequired,
    wap: PropTypes.string,
  }

  render() {
    return null;
  }
}
