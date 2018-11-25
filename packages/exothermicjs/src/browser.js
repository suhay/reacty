import React from 'react'
import { hydrate } from "react-dom"
import yaml from 'js-yaml'

import dragState from './state/draggables'
import Loader from './components/Loader'

const dumpTag = (tag) => {
  let represent = tag._self.represent && tag.props.data ? tag._self.represent(tag.props.data) : {}
  if (represent.items) {
    represent.items = represent.items.map(part => dumpTag(part))
  }
  else if (tag.props.children) {
    represent = {...represent, ...dumpTag(tag.props.children)}
  }
  else if (tag.props.items) {
    represent.items = tag.props.id && dragState.state.draggables[tag.props.id] ? dragState.state.draggables[tag.props.id].map(part => dumpTag(part)) : tag.props.items.map(part => dumpTag(part))
  }
  return represent
}

const dump = (data) => {
  return '---\n' + yaml.dump({
    description: data.props.data.description,
    tags: data.props.data.tags,
    page: data.props.data.page.map(part => dumpTag(part))
  }).replace(/_tag: '!(.*)'/g, '!$1')
}

hydrate(
	<Loader dump={dump} path={window.location.pathname == '/' ? 'index' : window.location.pathname.replace(/^\//, '')} />, 
	document.getElementById("__exothermic")
)