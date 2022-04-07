import { render } from 'react-dom';
import React, { useState } from 'react';
import { useSprings, animated, interpolate } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import './styles.css';

const cards = [
  'https://images.ctfassets.net/jotoby554kx0/4GExflYYHixT6c0bgnu4OI/b7c6ac5624f685d74a8095924c2a9fa6/CARD-09-contact.jpg',
  'https://images.ctfassets.net/jotoby554kx0/4bhIAoUyQeYysPWgIe5SCK/c1ec57abe65ca5fdf400650e382ce8f6/Card-01-sample.jpg',
  'https://images.ctfassets.net/jotoby554kx0/3wzwAUSG70EhPvHVphmKJw/400f629c41cbfee64d8f0aa04aef814b/Card-02-about.jpg',
  'https://images.ctfassets.net/jotoby554kx0/4CPyxfldz8iqMERcrakx4u/983af2270496d76401d0a64a863fc328/CARD-03-XD.jpg',
  'https://images.ctfassets.net/jotoby554kx0/4SWFGjRIXZwtcB1GgF3sk6/bd06cbc3d0def886a7497e3d830d5f3d/CARD-04-VB.jpg',
].reverse();

const rotationValue = (i, len) => {
  console.log(i);
  if (i === len - 2) return 5;
  else if (i === len - 3) return -5;
  else if (i === len - 4) return 10;
  return -1;
};

// These two are just helpers, they curate spring data, values that are later being interpolated into css
// let counter = 0;
const to = (i, len) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: rotationValue(i, len),
  delay: i * 100,
});
const from = (i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

function Deck() {
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [props, set] = useSprings(cards.length, (i) => ({
    ...to(i, cards.length),
    from: from(i),
  })); // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity,
    }) => {
      const trigger = velocity > 0.2; // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
      if (!down && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      set((i) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1; // Active cards lift up a bit
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === cards.length)
        setTimeout(() => gone.clear() || set((i) => to(i)), 600);
    }
  );
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return props.map(({ x, y, rot, scale }, i) => (
    <animated.div
      key={i}
      style={{
        transform: interpolate(
          [x, y],
          (x, y) => `translate3d(${x}px,${y}px,0)`
        ),
      }}
    >
      <animated.div
        {...bind(i)}
        style={{
          width: '407px',
          height: '226px',
          display: 'relative',
          transform: interpolate([rot, scale], trans),
          //   backgroundImage: `url(${cards[i]})`,
        }}
      >
        <img
          style={{ width: '100%', height: '100%' }}
          src={cards[i]}
          alt="helo"
          objectFit="contain"
        />
      </animated.div>
    </animated.div>
  ));
}

render(<Deck />, document.getElementById('root'));

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(<App />, document.getElementById('root'));
