var Component = require('react').Component;
var shallowEqual = require('react/lib/shallowEqual');
var classNames = require('classnames');

var formatHTML = require('./standards-utils').formatHTML;

export class ClusterName extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    );
  }

  static propTypes = {
    name: React.PropTypes.string.isRequired,
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
    msa: React.PropTypes.string.isRequired,
    grade: React.PropTypes.string.isRequired,
    wap: React.PropTypes.string,
  }

  render() {

    return null;
  }
}
