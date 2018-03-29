import React, { Component } from 'react';
import Base from '../components/Base';

class Script extends Component {
  render() {
    let scriptTags = [],
        scriptBody = [];
    this.props.scripts.forEach((tag, index) => {
      if (typeof tag === "string") {
        scriptTags.push({'src':tag});
        scriptBody.push('');
      } else {
        let numTags = Object.keys(tag).length;
        if (numTags > 1) { // Not just a key and value
          let script = {};
          for (let i = 0; i < numTags; i++) {
            script[Base.key(tag, i)] = Base.val(tag, i);
          }
          scriptTags.push(script);
          scriptBody.push('');
        } else {
          scriptTags.push({'src':Base.val(tag)});
          scriptBody.push('');
        }
      }
    });

    return scriptTags.map((item, i) => (
      <script {...item}>{scriptBody[i]}</script>
    ));
  }
}

export default Script;

// <link rel="stylesheet" type="text/css" href="https://cdn.sstatic.net/Sites/stackoverflow/primary.css?v=46ace4ab14a1">
