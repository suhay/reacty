import yaml from 'js-yaml'

import { schemaState } from './state'
import { NavbarYamlType } from './components/navbar/type'
import {
  SectionYamlType,
  ColYamlType,
  MainYamlType,
  HeaderYamlType,
  FooterYamlType,
} from './components/layout'
import ArticleYamlType from './components/article/type'
import { GetYamlType } from './components/util/types'
import { FormYamlType } from './components/form'

export const Types = {
  NavbarYamlType,
  SectionYamlType,
  ColYamlType,
  MainYamlType,
  HeaderYamlType,
  FooterYamlType,
  ArticleYamlType,
  GetYamlType,
  FormYamlType,
}

const configBuilder = () => {
  const def = require(`../exothermic.config`)
  let user = {}
  try {
    user = require(`../../../exothermic.config`)
  } catch (e) { }

  return {
    ...def,
    ...user,
  }
}

const Schema = (addedPlugins = []) => {
  const conf = configBuilder()
  const plugins = conf.plugins.map(plug => require(`../../${plug}/src`))
  if (addedPlugins && Object.keys(addedPlugins).length > 0) {
    // Override all Types with their addedPlugins replacers
    const addedPlusStandard = { ...Types, ...addedPlugins }
    const schemaTypes = [...Object.keys(addedPlusStandard).map(
      key => addedPlusStandard[key]
    ), ...plugins.map(plugin => plugin.Type)]
    return yaml.Schema.create(schemaTypes)
  }

  return yaml.Schema.create([...Object.keys(Types).map(key => Types[key]),
    ...plugins.map(plugin => plugin.Type)])
}

schemaState.setState({ schema: () => Schema() })

export { version } from '../package.json'
export { plugins } from '../exothermic.config'
export { render, hydrate, get } from './exothermic'

export { Footer } from './components/layout/footer'
export { Main } from './components/layout/main'
export { default as Section } from './components/layout/section'
