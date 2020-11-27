import React, { Component } from "react";
import styles from "./Tags.module.css";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import CancelIcon from "@material-ui/icons/Cancel";


class TagsInput extends Component {
  constructor(props) {
    super(props);
    this.tagId = 0;
  }
  state = {
    inputSize: 1,
    inputValue: "",
    tagsArray: []
  };
  onDivClick = (ev) => {
    document.querySelector("."+styles.tagsComponent+">input").focus();
  };
  onInputChange = (event) => {
    event.persist();
    let eve = event;

    let value = eve.target.value;
    let size = Math.max(1, value.length);
    value =
      value[value.length - 1] === ","
        ? value.slice(0, value.length - 1)
        : value;
    if (value.length < 80) {
      this.setState({
        inputSize: size > 30 ? 30 : size,
        inputValue: value
      });
    } else {
      alert("maxlength reached");
    }
  };
  
  onKeyDown = (event) => {
    event.persist();
    if (
      (event.key === "Enter" || event.key === ",") &&
      this.state.inputValue !== ""
    ) {
      let array = this.state.tagsArray;
      let value = this.state.inputValue;
      let index = array.findIndex((i) => {
        return i.value === value;
      });
      console.log("index", index);
      if (index === -1) {
        value=value.trim()
        array.push({
          id: this.tagId,
          value
        });
        this.props.changeTagsArray(array)
        this.setState(
          {
            inputSize: 1,
            inputValue: "",
          },
          () => {
            console.log("Set ", this.state);
            this.tagId += 1;
          }
        );
      }
    }else if (
      this.state.inputValue === "" &&
      this.state.inputSize === 1 &&
      event.key === "Backspace"
    ) {
      let array = this.state.tagsArray;
      console.log("Inp backspace");
      array.pop();
     this.props.changeTagsArray(array)
    }
  };
  deleteTag = (id) => {
    let array = this.state.tagsArray;
    let index = array.findIndex((i) => {
      return i["id"] === id;
    });
    array.splice(index, 1);
    this.props.changeTagsArray(array)
  };
  render() {
    return (
      <div onClick={this.onDivClick} className={styles.tagsComponent}>
        {this.props.tagsArray.map((i) => (
          <Button
            key={i.id}
            className={styles.button}
            style={{ padding: 2, backgroundColor: "#ebebeb", borderRadius: 30,
    marginRight: 8,
    marginTop: 5,
    height: '100%',
    textTransform: 'lowercase',
    fontSize: 12,
    paddingTop: 2,
    paddingBottom: 2 }}
            variant="outlined"
          >
            {i["value"]}
            <IconButton
              onClick={() => this.deleteTag(i.id)}
              style={{ fontSize: 3, marginLeft: 6, padding: 2, color: "white" }}
            >
              <CancelIcon style={{ fontSize: 16, color: "rgb(0,0,0,0.87)" }} />
            </IconButton>
          </Button>
        ))}
        <input

          onChange={this.onInputChange}
          onKeyPress={this.onKeyPress}
          onKeyDown={this.onKeyDown}
          value={this.state.inputValue}
          type="text"
          size={this.state.inputSize}
        />
      </div>
    );
  }
}

export default TagsInput;