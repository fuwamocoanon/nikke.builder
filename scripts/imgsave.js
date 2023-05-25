function screenshot() {
    var imgshotElement = document.getElementById('main');

    html2canvas(imgshotElement, { allowTaint: true, useCORS: true }).then(function (canvas) {
        document.body.appendChild(canvas);
        var a = document.createElement('a');
        a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        a.download = 'MyNIKKE.png';
        a.click();
        document.body.removeChild(canvas);
    });
}
