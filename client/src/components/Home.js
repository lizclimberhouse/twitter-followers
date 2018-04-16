// StaggeredMotion(actually a ???) is the waterripple thing, spring allows us to set the stiffness and dampness. preset is (TranstionMotion is same type of thing as the other motions)
// this x and y are random #'s
// making an api call but not setting headers. If I don;t call authenticate user in the controller, it doesn;t swap headers.m
  // staggered generations need a before and after.
  // the _ below is a placeholder
  // each of the followers follow the one in from of them, not folloqwing me specifiaclly.
  // in animations, everything works in 'ticks'
  // "the interpolated value of the last tick"
        // default styles: whereever followers start at x and y 
         // a render prop can actually return its children inside of its 
    // position: 'absolute', // the postion is not going to be based on the parnet, instead it will be based on the broweser window

import React, { Component } from 'react';
import { Header, Image } from 'semantic-ui-react';
import axios from 'axios';
import {
  Motion,
  StaggeredMotion,
  spring,
  presets,
} from 'react-motion';
import Moved from './Moved';

class Home extends Component {
  state = { x: 250, y: 300, followers: [], moved: [] }

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('dblclick', this.dropFollower)
    axios.get('/api/followers')
    .then( ({data}) => this.setState({ followers: data }) )
  }

  dropFollower = () => {
    const { moved, x, y } = this.state;
    const [drop, ...followers] = this.state.followers;
    this.setState({
      followers,
      moved: [...moved, { x, y, transitioned: false, ...drop}]
    });
  }

  addFollower = (id) => {
    const { moved, followers } = this.state;
    const follower = moved.find( f => f.id === id )
    this.setState({
      followers: [...followers, follower],
      moved: moved.filter( m => m.id !== id )
    })
  }

  handleMouseMove = ({ pageX: x, pageY: y }) => {
    this.setState({ x, y })
  }

  getStyles = (prevStyles) => {
    const endValue = prevStyles.map((_, i) => {
      return i === 0
        ? this.state
        : {
          x: spring(prevStyles[i - 1].x, presets.gentle),
          y: spring(prevStyles[i - 1].y, presets.gentle),
        }
    })
    return endValue
  }

  movedFollowers = () => {
    const { moved } = this.state;
    const moveable = moved.filter( m => !m.transitioned )
    return moveable.map( follower => {
      return (
        <Moved 
          {...follower} 
          key={follower.id} 
          addFollower={this.addFollower}
        />
      )
    })
  }

  render() {
    return (
      <div>
        { this.movedFollowers() }
        { this.state.followers.length > 0 &&
        <StaggeredMotion
          defaultStyles={this.state.followers.map(() => ({x: 0, y: 0}))}
          styles={this.getStyles}>
          { avatars =>
          <div style={{ width: '100%', height: '100%', position: 'absolute', background: '#EEE'}}>
            { avatars.map(({x,y}, i) => {
              let follower = this.state.followers[i];
              if (follower) {
                return (
                  <div
                    key={i}
                    style={{
                      borderRadius: '99px',
                      backgroundColor: 'white',
                      width: '50px',
                      height: '50px',
                      border: '3px solid white',
                      position: 'absolute',
                      backgroundSize: '50px',
                      backgroundImage: `url(${this.state.followers[i].img})`,
                      WebkitTransform: `translate3d(${x - 50}px, ${y - 50}px, 0)`,
                      transform: `translate3d(${x - 50}px, ${y - 50}px, 0)`,
                      zIndex: avatars.length - i,
                    }}
                  />
                )
              } else {
                return null
              }
              }
              )}
            </div>
          }
        </StaggeredMotion>
        }
      </div>
    );
  };

}

const styles = {
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    background: '#EEE',
  },
  person: {
    borderRadius: '99px',
    backgroundColor: 'white',
    width: '50px',
    height: '50px',
    border: '3px solid white',
    position: 'absolute',
    backgroundSize: '50px',
  }

}

export default Home;