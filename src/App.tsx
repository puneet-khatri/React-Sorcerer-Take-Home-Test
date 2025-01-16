import React, { useEffect, useState, useCallback } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  ContentState,
  convertToRaw,
  convertFromRaw,
  Modifier,
  SelectionState,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Save } from 'lucide-react';

const STORAGE_KEY = 'draft-js-content';

function App() {
  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem(STORAGE_KEY);
    if (savedContent) {
      const content = convertFromRaw(JSON.parse(savedContent));
      return EditorState.createWithContent(content);
    }
    return EditorState.createEmpty();
  });

  const handleReturn = useCallback((e: any, editorState: EditorState) => {
    // Clear all inline styles when Enter is pressed
    const selection = editorState.getSelection();
    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
    
    // Create a new block with no styles
    const newContent = Modifier.splitBlock(currentContent, selection);
    let newEditorState = EditorState.push(editorState, newContent, 'split-block');
    
    // Clear all styles for the new block
    const styles = ['BOLD', 'RED', 'UNDERLINE'];
    styles.forEach(style => {
      newEditorState = RichUtils.toggleInlineStyle(newEditorState, style);
    });

    setEditorState(newEditorState);
    return 'handled';
  }, []);

  const handleBeforeInput = useCallback((chars: string, editorState: EditorState) => {
    const selection = editorState.getSelection();
    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
    const start = selection.getStartOffset();
    const text = currentBlock.getText();

    // Only process if we're at the start of a line and space is pressed
    if (chars === ' ' && (start === 1 || start === 2 || start === 3)) {
      const prefix = text.slice(0, start);
      let newEditorState = editorState;

      // Clear all existing styles first
      const styles = ['BOLD', 'RED', 'UNDERLINE'];
      styles.forEach(style => {
        if (currentBlock.getInlineStyleAt(0).has(style)) {
          newEditorState = RichUtils.toggleInlineStyle(newEditorState, style);
        }
      });

      if (prefix === '#') {
        newEditorState = handleFormatting(newEditorState, 'header', 1);
      } else if (prefix === '*') {
        newEditorState = handleFormatting(newEditorState, 'bold', 1);
      } else if (prefix === '**') {
        newEditorState = handleFormatting(newEditorState, 'red', 2);
      } else if (prefix === '***') {
        newEditorState = handleFormatting(newEditorState, 'underline', 3);
      }

      if (newEditorState !== editorState) {
        setEditorState(newEditorState);
        return 'handled';
      }
    }
    return 'not-handled';
  }, []);

  const handleFormatting = (editorState: EditorState, type: string, prefixLength: number) => {
    const selection = editorState.getSelection();
    const currentContent = editorState.getCurrentContent();
    
    // Create a selection for the markdown characters
    const markdownSelection = selection.merge({
      anchorOffset: 0,
      focusOffset: prefixLength,
    });

    // Remove the markdown characters
    let newContent = Modifier.removeRange(
      currentContent,
      markdownSelection,
      'backward'
    );

    // Push the new content state
    let newEditorState = EditorState.push(
      editorState,
      newContent,
      'remove-range'
    );

    // Apply the appropriate styling
    if (type === 'header') {
      newContent = Modifier.setBlockType(
        newContent,
        selection.merge({
          anchorOffset: 0,
          focusOffset: 0,
        }),
        'header-one'
      );
      newEditorState = EditorState.push(editorState, newContent, 'change-block-type');
    } else {
      // Clear any existing styles first
      const styles = ['BOLD', 'RED', 'UNDERLINE'];
      styles.forEach(style => {
        if (newEditorState.getCurrentInlineStyle().has(style)) {
          newEditorState = RichUtils.toggleInlineStyle(newEditorState, style);
        }
      });

      // Apply only the requested style
      const style = type === 'bold' ? 'BOLD' : type === 'red' ? 'RED' : 'UNDERLINE';
      newEditorState = RichUtils.toggleInlineStyle(newEditorState, style);
    }

    return newEditorState;
  };

  const handleSave = () => {
    const content = editorState.getCurrentContent();
    const rawContent = convertToRaw(content);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rawContent));
  };

  const styleMap = {
    'RED': {
      color: '#FF0000',
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Demo editor by <span className="text-blue-600">Puneet</span></h1>
                <p className="text-gray-500 mt-2">Use markdown shortcuts to format your text</p>
              </div>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <Save size={20} />
                Save
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
              <div className="prose max-w-none">
                <Editor
                  editorState={editorState}
                  onChange={setEditorState}
                  handleBeforeInput={handleBeforeInput}
                  handleReturn={handleReturn}
                  customStyleMap={styleMap}
                  placeholder="Start typing... Use # for heading, * for bold, ** for red text, and *** for underline"
                />
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-500">
              <p>Shortcuts:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><code className="bg-gray-100 px-2 py-1 rounded">#</code> for headings</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">*</code> for bold text</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">**</code> for red text</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">***</code> for underlined text</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;