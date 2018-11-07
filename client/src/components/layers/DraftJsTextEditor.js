import React, {Component} from 'react';
// eslint-disable-next-line
import { EditorState, RichUtils, DefaultDraftBlockRenderMap, convertToRaw, convertFromRaw} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
// eslint-disable-next-line
import Immutable from "immutable";

export default class DraftJsTextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: props.content ? EditorState.createWithContent(convertFromRaw(props.content)) : EditorState.createEmpty()
        };
        this.handleKeyCommand = this.handleKeyCommand.bind(this);

    }
    onChange(editorState){
        this.setState({editorState});
        this.props.getContentForSave(convertToRaw(editorState.getCurrentContent()));
    };

    toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }


    makeSmth(arg){
        this.onChange(RichUtils.toggleInlineStyle(
            this.state.editorState,
            arg
        ));
    }

    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }


    render() {
        // eslint-disable-next-line
        const { allFunctions, ourDate } = this.props;
        const { editorState } = this.state;
        return (
            <div className="DraftJsTextEditor">
                <div className="controls">
                    <BlockStyleControls
                        editorState={editorState}
                        onToggle={this.toggleBlockType.bind(this)}
                    />
                    <div className="top">
                        <button onClick={()=>{
                            this.makeSmth('BOLD')
                        }}>Bold</button>
                        <button onClick={()=>{
                            this.makeSmth('ITALIC')
                        }}>Italic</button>
                        <button onClick={()=>{
                            this.makeSmth('UNDERLINE')
                        }}>UnderLine</button>
                    </div>
                </div>
                {/*<button onClick={()=>{*/}
                    {/*this.setState({*/}
                        {/*forSave: convertToRaw(editorState.getCurrentContent())*/}
                    {/*});*/}
                    {/*// console.log(ourDate || new Date());*/}
                    {/*// console.log(convertToRaw(editorState.getCurrentContent()));*/}
                    {/*allFunctions('Add events', {*/}
                        {/*title: 'Six One Event',*/}
                        {/*date: ourDate || new Date(),*/}
                        {/*desc: convertToRaw(editorState.getCurrentContent())*/}
                    {/*});*/}
                {/*}}>Save</button>*/}
                {/*<button onClick={()=>{*/}

                    {/*// this.setState({*/}
                    {/*//     editorState: EditorState.createWithContent(convertFromRaw(this.state.forSave))*/}
                    {/*// })*/}

                    {/*allFunctions('Get Events');*/}
                {/*}}>Load</button>*/}
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange.bind(this)}
                    handleKeyCommand={this.handleKeyCommand}
                />
            </div>
        )
    }
}





const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    // {label: 'H5', style: 'header-five'},
    // {label: 'H6', style: 'header-six'},
    // {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    // {label: 'Code Block', style: 'code-block'},
    {label: 'Text', style: 'unstyled'},

];
class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }

        return (
            <div className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </div>
        );
    }
}

const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};
