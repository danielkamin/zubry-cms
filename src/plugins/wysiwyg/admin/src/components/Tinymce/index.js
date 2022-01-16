import React from "react";
import PropTypes from "prop-types";
import { Editor } from "@tinymce/tinymce-react";
const TinyEditor = ({ onChange, name, value }) => {
  return (
    <Editor
      apiKey={process.env.TINY_API_KEY}
      value={value}
      tagName={name}
      onEditorChange={(editorContent) => {
        onChange({ target: { name, value: editorContent } });
      }}
      outputFormat="html"
      init={{ selector: "textarea", menubar: false }}
    />
  );
};
TinyEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};
export default TinyEditor;
