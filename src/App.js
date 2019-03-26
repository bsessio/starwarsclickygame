// Imports all the things
import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-responsive-modal";
import SWCard from "./components/SWCard";
import Wrapper from "./components/Wrapper";
import sw1 from "./sw1.json";
import sw2 from "./sw2.json";
import sw3 from "./sw3.json";
import sw4 from "./sw4.json";
import cloneslvl1 from "./cloneslvl1.json";
import cloneslvl2 from "./cloneslvl2.json";
import cloneslvl3 from "./cloneslvl3.json";
import cloneslvl4 from "./cloneslvl4.json";
import "./App.css";

// Builds an array from the imported jsons.
const sw = [sw1, sw2, sw3, sw4, cloneslvl1, cloneslvl2, cloneslvl3, cloneslvl4];

// Builds a shuffler function to shuffle the array of sw we will pass into it.
const shuffle = random => {
  for (let j = random.length - 1; j > 0; j--) {
    const randomizer = Math.floor(Math.random() * (j + 1));
    [random[j], random[randomizer]] = [random[randomizer], random[j]];
  }
  return random;
};

// Defines i to 0
let i = 0,
// Shuffles the SW array into a new, shuffled array.
   newSW = shuffle(sw[i]),
// Some global variables to avoid error objection later. https://i.kym-cdn.com/photos/images/newsfeed/001/264/842/220.png
   modalText,
   right,
   reset,
   win,
   lose,
   levelReset,
   levelDown,
   levelUp;

//  So begins the App.
class App extends React.Component {
  // Defines initial states.
  state = {
    // Uses the shuffled SW array
    swchars: newSW,
    // An empty array we will fill with clicked on images.
    chosen: [],
    // Current win streak for this level
    count: 0,
    // Whether the modal is open or closed.
    open: false,
  };

  // A function that serves as Reset because I am the wettest, and can't figure out how to use it elsewhere correctly.
  levelReset = () => 
   // Resets all State variables other than modal, which polices its own dang self.
    this.setState({
      chosen: [],
      count: 0,
      swchars: newSW
    });

  // Function for the level down button.
  levelDown = () => {
    // Checks if the current level is 1[zeroth in array]. 
    // If it is, it'll just shuffle for you and reset the game.
    // If it isn't, it'll decrement the level by 1, going back a level.
    i === 0 ? i=0 : i--;
    newSW = shuffle(sw[i]);
    this.levelReset();
  };

  // Function for the level up button.
  levelUp = () => {
    // Checks if the current level is 8[seventh in array]. 
    // If it is, it'll just shuffle for you and reset the game.
    // If it isn't, it'll increment the level by 1.
    i === 7 ? i=7: i++;
    newSW = shuffle(sw[i]);
    this.levelReset();
  };

  // Modal open and close functions
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  // When you select a picture...
  select = id => {
    // When correctly choosing a new picture...
    right = () =>
      this.setState({
        // Adds the chosen picture to the chosen array
        chosen: [
          ...this.state.chosen,
          this.state.swchars.find(sw => sw.id === id)
        ],
        // Increases the count by 1
        count: parseFloat(this.state.count) + 1
      });

    // When resetting the game...
    reset = () =>
      // Sets all the states back to base.
      this.setState({
        chosen: [],
        count: 0,
        swchars: newSW
      });

    // When winning a level...
    win = () => {
      // Increments the sw array by 1.
      i++;
      // If the index being incremented is 8...
      if (i === 8) {
        // Sets index to 0
        i = 0;
        // Redefines newSW with a fresh shuffle
        newSW = shuffle(sw[i]);
        // Resets
        reset();
        // Notifies of victory!
        modalText = "You won! Try again?";
        this.onOpenModal();
      // If the index being incremented is NOT 8...
      } else {
        // If the index being incremented is 4...
        if (i === 4) {
          // Redefines a newSW with a fresh shuffle.
          newSW = shuffle(sw[i]);
          // Resets
          reset();
          // Notifies that the game is about to CRAZY MODE
          modalText = "Ready for hardmode?";
          this.onOpenModal();
        }
        // Otherwise, it shuffles and resets.
        newSW = shuffle(sw[i]);
        reset();
      }
    };

    // When losing...
    lose = () => {
      // Resets index to 0...
      i = 0;
      // Redefines a newSW with a fresh shuffle
      newSW = shuffle(sw[i]);
      // Resets
      reset();
      // Notifies of loss
      modalText = "You lose.";
      this.onOpenModal();
    };

    // So, back to selections! When you click anything, it redefines newSW with a fresh shuffle.
    newSW = shuffle(newSW);
    // Searches if the chosen array has a match for the image you're clicking
    // If not...
    if (!this.state.chosen.find(sw => sw.id === id)) {
      // Executes Right function
      right();
      // Checks for your total equalling the full length of the array [aka win condition]
      if (this.state.count === this.state.swchars.length - 1) {
        // Triggers win
        win();
      // Otherwise, just sets the newly shuffled array.
      } else {
        this.setState({
          swchars: newSW
        });
      }
    // If you DO have a match to a chosen array item...
    } else {
      // Executes Lose function.
      lose();
    }
  };

  // Render the page. Hoo boy, here we go.
  render() {
    // Modal stuff
    const { open } = this.state;
    // Actually sends stuff for rendering.
    return (
      <>
        {/* More modal stuff */}
        <Modal
          open={open}
          classNames={{ modal: "modalStyle" }}
          onClose={this.onCloseModal}
          center
        >
          <h2 className="modalText">{modalText}</h2>
        </Modal>
        {/* Level Up and Level Down buttons, with click handlers executing functions above */}
        <button className="levelDown" onClick={() => this.levelDown()}>
          Level Down
        </button>
        <button className="levelUp" onClick={() => this.levelUp()}>
          Level Up
        </button>
        {/* The scorekeeper */}
        <h1 className="score">
          {this.state.count} / {this.state.swchars.length} <br />
          Right
        </h1>
        {/* The level register */}
        <h1 className="level">
          Level <br /> {parseFloat(i) + 1}
        </h1>
        {/* Game title */}
        <h1 className="title">
          Star
          <br />
          Wars
          <br />
          Clicky
          <br />
          Game
        </h1>
        {/* Game instructions */}
        <h1 className="game">
          Don't
          <br />
          click
          <br />
          anything
          <br />
          twice
        </h1>
        {/* Card structure */}
        <Wrapper>
          {this.state.swchars.map(swchar => (
            <SWCard
              key={swchar.name}
              id={swchar.id}
              image={swchar.image}
              select={this.select}
            />
          ))}
        </Wrapper>
      </>
    );
  }
}
// Exports
export default App;
