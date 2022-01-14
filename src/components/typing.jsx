import React from "react";
import Typed from "typed.js";

const words = [
  'my Dapp',
  'your Dapp',
  'our own open source Dapp!',
]

const options = {
  strings: words,
  typeSpeed: 50,
  backSpeed: 50,
  loop: true,
  cursorChar: "|",

};

class Typing extends React.Component {
  componentDidMount() {
    // this.el refers to the <span> in the render() method
    this.typed = new Typed(this.el, options);
  }
  componentWillUnmount() {
    // Please don't forget to cleanup animation layer
    this.typed.destroy();
  }

  render() {
    return (
      <>
      <div className="m-10 text-6xl text-center text-transparent bg-clip-text title">
        Welcome to&nbsp;
        <span
          style={{  }}
          ref={(el) => {
            this.el = el;
          }}
          // className='typed-cursor'
        />
      </div>
        
      </>
    );
  }
}

export default Typing;