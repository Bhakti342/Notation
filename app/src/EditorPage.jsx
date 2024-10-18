import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

function EditorPage() {
  const { id: noteId } = useParams();
  const [value, setValue] = useState("");
  const socketRef = useRef();
  useEffect(() => {
    const socket = io("http://localhost:5173");
    socketRef.current = socket;
    socket.emit("get-note", noteId);
    socket.on("load-note", (note) => {
      setValue(note);
    });
    socket.on("recieve-changes", (delta) => {
      setValue(delta);
    });
    return () => {
      socket.disconnect();
    };
  }, [noteId]);

  const handleChange = (content, delta, source, editor) => {
    setValue(content);
    if (source === "user") {
      socketRef.current.emit("send-changes", content);
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/note/${noteId}`;
    navigator.clipboard.writeText(url);
    alert(`Share this url : ${url}`);
  };

  const modules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      [{ header: 1 }, { header: 2 }, "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <div className="editor-page">
      <div className="nav-bar">
        <div className="navbar-left">
          <h1>Untitled Note</h1>
        </div>
        <div className="navbar-right">
          <button className="share-button" onClick={handleShare}>
            Share
          </button>
        </div>
      </div>
      <div className="toolbar-container">
        <ReactQuill value={value} modules={modules} onChange={handleChange} />
      </div>
    </div>
  );
}
export default EditorPage;
