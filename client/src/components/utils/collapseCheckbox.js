import React, { Component } from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';

class CollapseCheckbox extends Component {

  state={
    open: true,
    checked: []
  }

  componentDidMount() {
    if(this.props.initState){
      this.setState({
        open: this.props.initState
      })
    }
  }

  handleClick = () =>{
    this.setState({
      open:!this.state.open
    })
  }

  handleAngle =()=>(
    this.state.open?
      <FontAwesomeIcon
        icon={faAngleUp}
        className="icon"
      />
    :
    <FontAwesomeIcon
      icon={faAngleDown}
      className="icon"
    />
  )



  renderList = () =>(
    this.props.list?
      this.props.list.map((value)=>(
        <ListItem key={value._id} style={{padding:'0px 0px 0px 100px'}} >
          <ListItemText primary={value.name}/>
          <ListItemSecondaryAction>
              <Checkbox
                        onChange={this.handleToggle(value._id)}
                        checked={this.state.checked.indexOf(value._id)!== -1}
                        style={{padding:'0px 60px 0px 0px'}}
                        />
          </ListItemSecondaryAction>
        </ListItem>
      ))
    :null
  )

  handleToggle = (value) => () => {
    const { checked } = this.state;
  //const checked = this.state.checked;

   const currentIndex = checked.indexOf(value);
   const newChecked = [...checked];

   if(currentIndex === -1){
        newChecked.push(value)
   }else{
        newChecked.splice(currentIndex,1)
   }
   this.setState({
     checked: newChecked
   },()=>{
     this.props.handleFilters(newChecked)
   })
  }

  render() {
    return (
      <div className="collapse_items_wrapper">

        <List style={{
          borderBottom: '1px solid #FB033C'
        }}>
          <ListItem
            onClick={this.handleClick}
            style={{
              padding: '10px 10px 10px 0'
            }}
          >
            <ListItemText
              primary={this.props.title}
            />
          <span className="collapse_arrow">{this.handleAngle()}</span>

          </ListItem>
          <Collapse
            in={this.state.open}
            timeout="auto"
            unmountOnExit
          >
              <List
                component="div"
                disablePadding
              >
              <span className="collapse_arrow">{this.renderList()}</span>
              </List>

          </Collapse>
        </List>
      </div>
    );
  }

}

export default CollapseCheckbox;
