//Inspired from https://codepen.io/sheefu/pen/mddGQqb.
// TODO: Needs Refactor
import React from 'react';

class Card extends React.Component {
  render() {
    return (<div className="card"
                 style={{backgroundColor: this.props.color}}
    >
      {this.props.children}
    </div>)
  }
}

class SelectableCard extends React.Component {

  render() {
    var isSelected = this.props.selected ? "selected" : "";
    var className = "selectable " + isSelected;
    const style = {color: this.props.color}
    return (
      <Card color={this.props.color}>
        <div className={className} onClick={this.props.onClick}>
          {this.props.children}
          <div className="check"><span className="checkmark" style={style}>✔</span></div>
        </div>
      </Card>
    );
  }
}

class SelectableTitleCard extends React.Component {
  render() {
    var {
      title,
      color,
      selected
    } = this.props;
    return (
      <SelectableCard onClick={this.props.onClick}
                                selected={selected} color={color}>
        <div className="content">
          <p className="game-rules">{title}</p>
        </div>
      </SelectableCard>
    );
  }
}

class SelectableCardList extends React.Component {
  constructor(props) {
    super(props);
    var selected = props.multiple ? [] : -1;
    var initialState = {
      selected: selected
    };
    this.state = initialState;
  }

  onItemSelected(index) {
    this.setState((prevState, props) => {
      if (props.multiple) {
        var selectedIndexes = prevState.selected;
        var selectedIndex = selectedIndexes.indexOf(index);
        if (selectedIndex > -1) {
          selectedIndexes.splice(selectedIndex, 1);
          props.onChange(selectedIndexes);
        } else {
          if (!(selectedIndexes.length >= props.maxSelectable)) {
            selectedIndexes.push(index);
            props.onChange(selectedIndexes);
          }
        }
        return {
          selected: selectedIndexes
        };
      } else {
        props.onChange(index);
        return {
          selected: index
        }
      }
    });
  }

  render() {
    var {
      contents,
      multiple
    } = this.props;

    var content = contents.map((cardContent, i) => {
      var {
        name,
        color
      } = cardContent;
      var selected = multiple ? this.state.selected.indexOf(i) > -1 : this.state.selected == i;
      return (
        <div key={`${name}+${i}`}
          className="column is-one-third"
        >
          <SelectableTitleCard
                               title={name}
                               color={color}
                               selected={selected}
                               onClick={(e) => this.onItemSelected(i)} />
        </div>
      );
    });
    return (<div className="columns is-multiline is-centered">{content}</div>);
  }
}

class ParticipantSelectionList extends React.Component {
  onListChanged(selected) {
    this.setState({
      selected: selected
    });
  }
  submit() {
    window.alert("Selected: " + this.state.selected);
  }
  render() {
    return (
      <div className="column">
        <h1 className="title">{this.props.title}</h1>
        <SelectableCardList
          multiple={this.props.multiple}
          maxSelectable={this.props.maxSelectable}
          contents={this.props.cardContents}
          onChange={this.onListChanged.bind(this)}/>
        <button className="jally-button" onClick={(e) => this.submit() }>
          Confirm
        </button>
      </div>);
  }
}

export default ParticipantSelectionList;