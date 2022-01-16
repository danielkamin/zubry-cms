import React, { useState, useRef } from "react";
import { Field, Stack, Flex, FieldLabel } from "@strapi/design-system";
import tinymce from "tinymce";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/plugins/code";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";
import "tinymce/skins/ui/oxide/skin.css";
import { Editor as TinyMCE } from "@tinymce/tinymce-react";
import { useLibrary, prefixFileUrlWithBackendUrl } from "@strapi/helper-plugin";

export default function Editor({ name, value, onChange, ...props }) {
  const { components } = useLibrary();
  const editorRef = useRef(null);

  const [showMediaLibrary, setShowMediaLibrary] = useState(false);

  const MediaLibraryDialog = components["media-library"];

  const handleToggleMediaLib = () => {
    setShowMediaLibrary(!showMediaLibrary);
  };

  const handleSelectAssets = (files) => {
    const formattedFiles = files.map((f) => ({
      alt: f.alternativeText || f.name,
      url: prefixFileUrlWithBackendUrl(f.url),
      mime: f.mime,
    }));

    const imgs = formattedFiles
      .map((img) => `<img src='${img.url}' alt='${img.alt}'>`)
      .join();
    onChange({
      target: {
        name: name,
        value: value + imgs,
      },
    });
    handleToggleMediaLib();
  };

  const initEditor = {
    width: "100%",
    branding: false,
    height: "400px",
    toolbar: "customInsertButton code",
    plugins: "",
    setup: function (editor) {
      editor.ui.registry.addButton("customInsertButton", {
        text: "Dodaj obrazek",
        onAction: function (_) {
          handleToggleMediaLib();
        },
      });
    },
  };

  return (
    <Field name={name}>
      <Stack size={1}>
        <Flex cols="auto auto 1fr" gap={1}>
          <FieldLabel>{name}</FieldLabel>
        </Flex>

        <Flex>
          <TinyMCE
            init={initEditor}
            ref={editorRef}
            value={value}
            onEditorChange={(editorContent) =>
              onChange({
                target: {
                  name: name,
                  value: editorContent,
                },
              })
            }
          />
        </Flex>
      </Stack>
      {showMediaLibrary && (
        <MediaLibraryDialog
          onClose={handleToggleMediaLib}
          onSelectAssets={handleSelectAssets}
        />
      )}
    </Field>
  );
}
