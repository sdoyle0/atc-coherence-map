import { Component, PropTypes } from 'react';
import { standardCode } from './standards-utils';
import { Share } from './icons';
import classNames from 'classnames';
import shallowEqual from 'react/lib/shallowEqual';

export class Header extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    );
  }

  static propTypes = {
    grade: PropTypes.string,
    domain: PropTypes.string,
    standard: PropTypes.string,
    onClearGrade: PropTypes.func,
    onClearDomain: PropTypes.func,
    onClearStandard: PropTypes.func,
  }

  render() {
    var domain = window.cc.domains[this.props.domain];
    var { category, showSpecialPage, grade, root } = this.props;
    var categoryObj = window.cc.domains[category];
    var categoryCode;
    
    if(domain)
      var domain_code = domain.grade + '.' + domain.ordinal;
    if (category)
      categoryCode = `${grade}.${category}`;
    var fmtURL = function(strings, ...values) {
        return _(strings).zip(values.map((v) => encodeURIComponent(v))).flatten().join('');
    };
    return (
    <div className={classNames('header', {'has-standard':!!this.props.standard})}>
      <h1>
        <a href='/'>
        {
          (false && grade === 'KY.HS' && (root || domain) ) ? 
            (!root && domain ? 
              (
                <span>
                  <img src="coherencemap_logo.svg" alt="Coherence Map" width="240" className='logo-top'/>
                  <img src="/images/icon/coherencemap_logo_no_text.svg" 
                    alt="Coherence Map" width="30" height="28" className='logo-top-mobile'/>
                </span>
              )
              : (<img src="/images/icon/coherencemap_logo_no_text.svg" alt="Coherence Map" width="30" height="28" />)
            )
          
          : (<img src="/images/coherencemap_logo.svg" alt="Coherence Map" width="240" />)
        }
        </a>
      </h1>
      {
        !showSpecialPage || (showSpecialPage && !showSpecialPage.moreCourseInfo) ?
        (
          <div className="crumbs">
            {
            [
              this.props.grade ? <div key="grade" className="crumb grade" onClick={this.props.onClearGrade}>
                  <div className="label">Grade</div>
                  <div className="value">{this.props.grade}</div>
                </div> : null,

              (this.props.category || (showSpecialPage && showSpecialPage.modeling)) ? <div key="category" className="crumb category" onClick={this.props.onClearCategory}>
                  <div className="label">Category</div>
                  <div className="value">{(showSpecialPage && showSpecialPage.modeling) ? 'HS.M' : categoryCode}</div>
                </div> : null,

              (this.props.domain && !showSpecialPage) ? <div key="domain" className="crumb domain" onClick={this.props.onClearDomain}>
                <div className="label">Domain</div>
                <div className="value">{domain_code}</div>
              </div> : null,
              this.props.standard ? <div key="standard" className="crumb standard" onClick={this.props.onClearStandard}>
                <div className="label">Standard</div>
                <div className="value">{standardCode(this.props.standard)}</div>
              </div> : null
            ]
            }
            </div>
        )
        : null
      }
      
      {
        this.props.standard ? 
        
          (<div className='share' onClick={() => $(document).trigger('defineTerm', {title:'Share',desc:['Share your current view using the links below.',<span key='p2' className='sharelinks'>
              { this.props.standard ? 
               (
                <a href={fmtURL `http://twitter.com/intent/tweet/?text=${document.title + ' for ' + standardCode(this.props.standard) + ': Come check out my connections between the Common Core State Standards for Mathematics.'}&url=${window.location.href}&related=achievethecore` } target='_blank'><i className="fa fa-twitter"></i></a>
               )
               : 
               (
                <a href={fmtURL `http://twitter.com/intent/tweet/?text=The Coherence Map shows the connections between Kentucky Academic Standards for Mathematics.&url=${window.location.href}&related=achievethecore` } target='_blank'><i className="fa fa-twitter"></i></a>
               )
              }
              
              <a href={fmtURL `https://facebook.com/sharer.php?u=${window.location.href}` } target='_blank'><i className="fa fa-facebook"></i></a>
              <a href={fmtURL `https://plus.google.com/share?url=${window.location.href}` } target='_blank'><i className="fa fa-google-plus"></i></a>
              { this.props.standard ? 
                (
                  <a href={fmtURL `mailto:?subject=${document.title + ' for ' + standardCode(this.props.standard)}&body=${window.location.href}` }><i className="fa fa-envelope"></i></a>
                )
                :
                (
                  <a href={fmtURL `mailto:?subject=The Coherence Map shows the connections between Kentucky Academic Standards for Mathematics..&body=${window.location.href}` }><i className="fa fa-envelope"></i></a>
                )
              }
            </span>]})
            }>
            Share <Share />
          </div>)
        : null
      }
      {
        this.props.standard ? 
          (<div className='help'>
            {
              (<a className='button' onClick={() => $(document).trigger('showHelp')}>?</a>)
            }
            </div>)
        : null 
      }
    </div>);
  }
}
