function screenshot() {
    var imgshotElement = document.getElementById('main');

    html2canvas(imgshotElement, { allowTaint: true, useCORS: true }).then(function (canvas) {
        document.body.appendChild(canvas);
        var a = document.createElement('a');
        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        a.download = 'MyNIKKE.jpg';
        a.click();
        document.body.removeChild(canvas);
    });
}
