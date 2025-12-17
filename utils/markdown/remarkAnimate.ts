// plugins/remarkAnimate.ts
import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'
import type { Html, Parent, Root, Text } from 'mdast'

const remarkAnimate: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, 'text', (node, node_index, parent) => {
      if (parent === undefined || node_index === undefined) {
        return
      }

      const tag_regex = /\[animate:([^\]]+)]/g
      const node_value = node.value

      let match_array: RegExpExecArray | null
      let last_index = 0
      const replacement_nodes: Array<Text | Html> = []

      while ((match_array = tag_regex.exec(node_value)) !== null) {
        if (match_array.index > last_index) {
          replacement_nodes.push({
            type: 'text',
            value: node_value.slice(last_index, match_array.index),
          })
        }
        replacement_nodes.push({
          type: 'html',
          value: `<animate>${match_array[1]}</animate>`,
        })
        last_index = tag_regex.lastIndex
      }

      if (replacement_nodes.length) {
        if (last_index < node_value.length) {
          replacement_nodes.push({
            type: 'text',
            value: node_value.slice(last_index),
          })
        }

        ;(parent as Parent).children.splice(node_index, 1, ...replacement_nodes)
        return node_index + replacement_nodes.length
      }
      return undefined
    })
  }
}

export default remarkAnimate
