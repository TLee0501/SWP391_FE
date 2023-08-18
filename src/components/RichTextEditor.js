import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const RichTextEditor = ({ value, onChange, placeholder, height }) => {
	const [text, setText] = useState();

	useEffect(() => {
		setText(value);
	}, [value]);

	const handleChange = (value) => {
		setText(value);
		onChange && onChange(value);
	};

	return (
		<div>
			<ReactQuill
				value={text}
				onChange={handleChange}
				modules={RichTextEditor.modules}
				formats={RichTextEditor.formats}
				placeholder={placeholder}
				style={{
					height: height,
				}}
			/>
		</div>
	);
};

RichTextEditor.modules = {
	toolbar: [
		[{ header: "1" }, { header: "2" }, { font: [] }],
		[{ list: "ordered" }, { list: "bullet" }],
		["bold", "italic", "underline"],
		[{ color: [] }, { background: [] }],
		["link", "image"],
		["clean"],
	],
};

RichTextEditor.formats = [
	"header",
	"font",
	"list",
	"bullet",
	"bold",
	"italic",
	"underline",
	"color",
	"background",
	"link",
	"image",
];
