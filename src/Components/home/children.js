import React, {
  useState,
  useEffect,
  useRef
} from 'react'
import {
  Accordion,
  Statistic,
  Container,
  Card,
  Divider,
  Header,
  Icon,
  Table,
  Responsive
} from "semantic-ui-react";

import ApiUtil from "utils/api"

import "stylesheets/home.css"

const {
  ipcRenderer
} = window;


class Content extends React.Component {
  render () {
    return (<div></div>)
  }
}
export {Content}