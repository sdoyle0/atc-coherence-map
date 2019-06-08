import { Component } from 'react';
import classNames from 'classnames';

export default class CourseInfoModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (<div className={classNames('modal-wrapper', this.props.modalClass)}>
      <div className='modal-bg' style={{opacity: this.props.modalBG ? 1 : 0}} onClick={this.props.modalOnClose}></div>
      <div className='modal'>
        <h2>{this.props.modalTitle}</h2>
        {this.props.children}
        <button onClick={this.props.onClickButtonModal} ref='dismiss'>{this.props.modalCTA||'Dismiss'}</button>
        {this.props.modalClose ? <button className='close' onClick={this.props.modalOnClose}><i className="fa fa-times"></i></button> : null}</div>
    </div>);
  }
}
