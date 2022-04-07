import React from 'react';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';

class ListItem extends React.Component {
  render() {
    const classes =
      (this.props.item.id % 2 === 0
        ? 'custom-card-rotate-right'
        : this.props.item.id % 3 === 0
        ? 'custom-card-rotate-left'
        : '') + ' custom-card';

    return (
      <li>
        <mobiscroll.Card className={classes} theme="ios" themeVariant="light">
          <mobiscroll.CardHeader>
            <mobiscroll.CardTitle>{this.props.item.title}</mobiscroll.CardTitle>
            <mobiscroll.CardSubtitle>
              {this.props.item.desc}
            </mobiscroll.CardSubtitle>
          </mobiscroll.CardHeader>
          <mobiscroll.CardContent>
            <img draggable="false" src={this.props.item.img} />
          </mobiscroll.CardContent>
        </mobiscroll.Card>
      </li>
    );
  }
}

export default class Hello extends React.Component {
  render() {
    return (
      <div className="mbsc-padding">
        <h3>Sunrise</h3>
        <p>
          Sunrise or sun up is the instant at which the upper edge of the Sun
          appears over the horizon in the morning. The term can also refer to
          the entire process of the Sun crossing the horizon and its
          accompanying atmospheric effects.
        </p>

        <mobiscroll.Card theme="ios" themeVariant="light">
          <img src="https://img.mobiscroll.com/demos/bookpic.png" alt="alt" />
          <mobiscroll.CardFooter>
            A red sunrise near Swifts Creek, Australia
          </mobiscroll.CardFooter>{' '}
        </mobiscroll.Card>

        <p>
          Although the Sun appears to "rise" from the horizon, it is actually
          the Earth's motion that causes the Sun to appear. The illusion of a
          moving Sun results from Earth observers being in a rotating reference
          frame; this apparent motion is so convincing that most cultures had
          mythologies and religions built around the geocentric model, which
          prevailed until astronomer Nicolaus Copernicus first formulated the
          heliocentric model in the 16th century.
        </p>
      </div>
    );
  }
}
