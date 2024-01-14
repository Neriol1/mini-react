import { describe, it, expect } from 'vitest'
import React from '../core/React'

describe('createElement', () => {
  it('should create a vdom node without props', () => {
    const vdom = React.createElement('div', null, 'hello')
    // expect(vdom).toEqual({
    //   type: 'div',
    //   props: {
    //     children: [
    //       {
    //         type: 'TEXT_ELEMENT',
    //         props: {
    //           nodeValue: 'hello',
    //           children: [],
    //         },
    //       },
    //     ],
    //   },
    // })
    expect(vdom).toMatchInlineSnapshot(`
      {
        "props": {
          "children": [
            {
              "props": {
                "children": [],
                "nodeValue": "hello",
              },
              "type": "TEXT_ELEMENT",
            },
          ],
        },
        "type": "div",
      }
    `)

  })
  it('should create a vdom node with props', () => {
    const vdom = React.createElement('div', { id: 'foo' }, 'hello')
    expect(vdom).toEqual({
      type: 'div',
      props: {
        id: 'foo',
        children: [
          {
            type: 'TEXT_ELEMENT',
            props: {
              nodeValue: 'hello',
              children: [],
            },
          },
        ],
      },
    })
  })
  it('should create a vdom node with children', () => {
    const vdom = React.createElement(
      'div',
      { id: 'foo' },
      'hello',
      React.createElement('span', null, 'world')
    )
    expect(vdom).toEqual({
      type: 'div',
      props: {
        id: 'foo',
        children: [
          {
            type: 'TEXT_ELEMENT',
            props: {
              nodeValue: 'hello',
              children: [],
            },
          },
          {
            type: 'span',
            props: {
              children: [
                {
                  type: 'TEXT_ELEMENT',
                  props: {
                    nodeValue: 'world',
                    children: [],
                  },
                },
              ],
            },
          },
        ],
      },
    })
  })
})
