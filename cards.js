import React from 'react';
import classNames from 'classnames';
import shallowEqual from 'react/lib/shallowEqual';

import './scss/card.scss';

function domainCode(d) {
  return d.grade + '.' + d.ordinal;
}

class Domain extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    );
  }

  state = {expanded: false};

  shouldComponentUpdate(nextProps, nextState) {
    return !( _.eq(nextProps, this.props) && _.eq(nextState, this.state) );
  }

  isExpanded() {
    return !this.props.shallow && this.state.expanded;
  }

  onDomainClick = () => {
    if(this.props.shallow) return;
    this.setState({expanded:false});
    this.props.onSelectDomain(this.props.domain.id);
    return;
  }

  render() {
    return <div  
      className='domain-container'>

      <button className="card domain"      
        onClick={this.onDomainClick}
        tabIndex={this.props.index + 1}>        
          <span className="domain-code">{ domainCode(this.props.domain) }</span>
          <span className="domain-name">{ this.props.domain.name }</span>
      </button>
    </div>
  }
}

class Grade extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    );
  }

  state = {expanded: false};

  _onClick = () => {
    this.setState({expanded:false}); if(this.props.selectedGrade === null) this.props.onSelectGrade(this.props.grade);
  }

  render() {
    var gradeMap = {"KY.K": "Kindergarten", "KY.1": "1st Grade", "KY.2": "2nd Grade", "KY.3": "3rd Grade",
                    "KY.4": "4th Grade", "KY.5": "5th Grade", "KY.6": "6th Grade", "KY.7": "7th Grade",
                    "KY.8": "8th Grade", "KY.HS": "High School"};

    return <div   
      className='grade-container'
      className={classNames('grade-container', { 'hs-container': (this.props.grade === 'KY.HS') })}>

      <button className="card grade" 
        onClick={this._onClick}       
        tabIndex={this.props.index + 1}>
          <span className="grade-name">{ gradeMap[this.props.grade]}</span>
      </button>

    </div>;

  }
}

export class Deck extends React.Component {x
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    );
  }

  render() {
    if (!this.props.grade) {
      return <div className='deck'>
        {
          ['KY.K',"KY.1","KY.2","KY.3","KY.4","KY.5","KY.6","KY.7", "KY.8", "KY.HS"].map((g, i) =>
            <Grade 
              // {...layouts[i]}
              category={this.props.category} 
              selectedCategory={this.props.category} 
              grade={g.toString()} 
              index={i}
              key={g} 
              selectedGrade={this.props.grade} 
              selectedDomain={this.props.domain} 
              onSelectGrade={this.props.onSelectGrade} 
              onSelectDomain={this.props.onSelectDomain} 
              onSelectCat={this.props.onSelectCat}
              onSelectModelingDomain={this.props.onSelectModelingDomain}
              showSpecialPage={this.props.showSpecialPage} 
            />
          )
          
        }
      </div>;
    } else if (!this.props.domain) {
      const domainsForGrade = [];
      for (let domainKey in window.cc.domains) {
        const domain = window.cc.domains[domainKey];
        if (domain.grade === this.props.grade) {
          domainsForGrade.push(domain);
        }
      }
      domainsForGrade.sort((domainA, domainB) => parseInt(domainA.ordering) - parseInt(domainB.ordering));
      return <div className='deck'>
        {domainsForGrade.map((domain, i) => 
            <Domain 
              // {...layouts[i]}
              domain={domain} grade={this.props.grade} 
              key={domainCode(domain).replace(/\./g,',')} 
              index={i}
              depth={i} selectedDomain={this.props.selectedDomain} 
              onSelectDomain={this.props.onSelectDomain}
            />
          )
        }
      </div>
    } else {
      return null;
    }
  }
}
