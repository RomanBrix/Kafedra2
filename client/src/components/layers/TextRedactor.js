import React, {Component} from 'react';
import { Editor } from 'slate-react'
import { Value } from 'slate'

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: 'A line of text in a paragraph.',
                            },
                        ],
                    },
                ],
            },
        ],
    },
});

const plugins = [
    MarkHotkey({ key: 'b', type: 'bold' }),
    MarkHotkey({ key: '`', type: 'code' }),
    MarkHotkey({ key: 'i', type: 'italic' }),
    MarkHotkey({ key: '~', type: 'strikethrough' }),
    MarkHotkey({ key: 'u', type: 'underline' }),
];


export default class TextRedactor extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: initialValue,
        }
    }


    onChange = ({ value }) => {
        const content = JSON.stringify(value.toJSON());
        this.setState({ value })
    };


    onKD(event, change){
        if (event.key === '&') {
            event.preventDefault();
            change.insertText('and')
            return true
        }

        if(!event.ctrlKey) {
            return '';
        }
        switch (event.key) {
            // When "B" is pressed, add a "bold" mark to the text.
            case 'b': {
                // console.log('bbbbbb');
                event.preventDefault();
                change.addMark('bold');
                return true
            }
            // When "`" is pressed, keep our existing code block logic.
            case '`': {
                const isCode = change.value.blocks.some(block => block.type === 'code');
                event.preventDefault();
                change.setBlocks(isCode ? 'paragraph' : 'code');
                return true
            }
        }

    }






    render() {
        return (
            <div className="text-redactor">
                <Editor
                    value={this.state.value}
                    onChange={this.onChange}
                    // onKeyDown={this.onKD}
                    renderNode={this.renderNode}
                    renderMark={this.renderMark}
                    plugins={plugins}

                />
            </div>
        )
    }


    // BLOCKSS
    renderNode = props => {
        switch (props.node.type) {
            case 'code':
                return <CodeNode {...props} />
        }
    };


    //Marksssss
    renderMark = props => {
        switch (props.mark.type) {
            // case 'bold':
                // return <BoldMark {...props} />
            case 'bold':
                return <strong>{props.children}</strong>
            // Add our new mark renderers...
            case 'code':
                return <code>{props.children}</code>
            case 'italic':
                return <em>{props.children}</em>
            case 'strikethrough':
                return <del>{props.children}</del>
            case 'underline':
                return <u>{props.children}</u>
        }
    }
}


function CodeNode(props) {
    return (
        <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
    )
}

function BoldMark(props) {
    return <strong>{props.children}</strong>
}


function MarkHotkey(options) {
    // Grab our options from the ones passed in.
    const {type, key} = options;
    return {
        onKeyDown(event, change) {
            if (!event.ctrlKey || event.key !== key) {
                return
            }
            event.preventDefault();
            change.toggleMark(type);
            return true;
        }
    }
}