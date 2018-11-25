import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import yaml from 'js-yaml'

export class Col extends Component {
  render() {
    const { data } = this.props
    const classes = data.hasOwnProperty('class') 
      ? data.class.startsWith('col') 
        ? data.class 
        : 'col ' + data.class 
      : `col`
    return (
      <div className={classes}>
        {data.content && <ReactMarkdown source={data.content} escapeHtml={false} renderers={{root:React.Fragment}} />}
        {data.items}
      </div>
    );
  }
}

export const ColYamlType = new yaml.Type('!col', {
  kind: 'mapping',
  resolve: function (data) {
    return data !== null && data.id !== null
  },
  construct: function (data) {
    data = data || {}; // in case of empty node
    return <Col data={data} key={data.id} />;
  },
  instanceOf: Col,
  represent: function (data) {
    const rtn = { _tag: '!col', ...data }
    return rtn
  }
})