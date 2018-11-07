import React, {Component} from 'react';
// eslint-disable-next-line
import {EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';
import Editor from 'draft-js-plugins-editor';

export default class DraftJsReadOnly extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createWithContent(convertFromRaw(props.willBeContent)) || EditorState.createEmpty(),
            forSave: {}
        };

    }

    //na bistruyu ruku
    // componentWillReceiveProps(newProps){
    //     if(newProps.newsArray.length !==0){
    //         console.log('newProps');
    //         // console.log();
    //
    //         this.setState({
    //             editorState:  EditorState.createWithContent(convertFromRaw(newProps.newsArray[0].content))
    //         })
    //     }
    // }
    onChange(editorState){
        // this.setState({editorState})
    };
    render() {
        // eslint-disable-next-line
        // const { allFunctions, newsArray } = this.props;
        const { editorState } = this.state;

        return (
                <Editor
                    editorState={editorState}
                    onChange={this.onChange.bind(this)}
                    readOnly={true}
                />
        )
    }
}
