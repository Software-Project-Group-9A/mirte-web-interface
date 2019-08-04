var editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    mode: "python",
    lineNumbers: true,
    autoRefresh: true
});
editor.save()
