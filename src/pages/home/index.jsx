import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { observer } from "mobx-react";

import { Button, Icon } from "@blueprintjs/core";

import FormModal from '../../components/formModal';
import ImgItem from './imgItem';
import HomeStore from "./homeStore";

import "./home.scss";

@observer
class Home extends Component{

  myHomeStore = new HomeStore();

  componentDidMount(){
    this.myHomeStore.changeImg();
  }

  handleClose=()=>{
    this.myHomeStore.showLoginModal(false);
  };

  defaultImgItem() {
    const style = {
      width: this.myHomeStore.loadedImgNum === this.myHomeStore.imgList.length ? 0 : "100%",
      opacity: this.myHomeStore.loadedImgNum === this.myHomeStore.imgList.length ? 0 : 1
    };
    return(
      <div className="mask" style={style}>
        <div className="bubblingG">
          <span id="bubblingG_1">
          </span>
          <span id="bubblingG_2">
          </span>
          <span id="bubblingG_3">
          </span>
        </div>
      </div>
    );
  } 

  render(){
    return(                 
      <div className="home">
        { this.defaultImgItem() }
        {
          this.myHomeStore.imgList.map((img, index)=>{
            return(
              <ImgItem 
                key={index} 
                store={this.myHomeStore} 
                img={img}
                index={index}
              />  
            );
          })
        }
        <Button className="pt-minimal enterBtn" rightIconName="direction-right">
          <Link to="/main/articles">进入博客</Link>
        </Button>
        <Icon className="login" iconName="user"
          onClick={()=>{this.myHomeStore.showLoginModal(true)}}
        />
        <FormModal
          head={<span>{this.myHomeStore.isLoginTab ? "Sign in to Blog" : "Create an account"}</span>}
          loginInfo={this.myHomeStore.loginInfo}
          isOpen={this.myHomeStore.loginModalShow} 
          inputGroup={this.myHomeStore.activeInputGroup}
          buttons={this.myHomeStore.actionButtons}
          onChange={this.myHomeStore.handleChange}
          onBlur={this.myHomeStore.handleBlur}
          onSubmit={()=>{this.myHomeStore.handleSubmit(this.props.history)}}
          onKeyUp={this.handleKeyUp}
          onHide={this.handleClose}
          {...this.myHomeStore.initalState}
        />
      </div>  		
    );
  }
}

export default withRouter(Home);