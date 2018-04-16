import React from 'react';
import { Motion } from 'react-motion';

class Moved extends React.Component {
  state = { ...this.props }

  componentDidMount() {
    this.interval = setInterval( () => {
      this.moveAvatar()
    }, 100)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  moveAvatar = () => {
    const { x, y, transitioned } = this.state;
    const stepX = x / 10;
    const stepY = y / 10;
    if (x <= 0 && y <= 0)
      this.setState({ transitioned: true });
    if (!transitioned)
      this.setState({ x: x - stepX, y: y - stepY })
  }

  render() {
    const { id, x, y, img } = this.state;
    return (
      <Motion key={id} defaultStyle={{x, y}} style={{x, y}}>
        { avatar =>
            <div
              onClick={() => this.props.addFollower(id)}
              style={{
                borderRadius: '99px',
                backgroundColor: 'white',
                width: '50px',
                height: '50px',
                border: '3px solid white',
                position: 'absolute',
                backgroundSize: '50px',
                backgroundImage: `url(${img})`,
                WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
                transform: `translate3d(${x}px, ${y}px, 0)`,
                zIndex: 10
              }}
            >
            </div>
        }
      </Motion>
    )
  }
}

export default Moved