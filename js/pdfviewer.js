function initPDFViewer(pdfUrl, updateQuestionCallback) {
    let pdfDoc = null,
        pageNum = 1,
        pageRendering = false,
        pageNumPending = null,
        scale = 1.5,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
  
    const pdfViewerContainer = document.getElementById('pdf-viewer');
    pdfViewerContainer.innerHTML = "";
    pdfViewerContainer.appendChild(canvas);
  
    function renderPage(num) {
      pageRendering = true;
      pdfDoc.getPage(num).then(function(page) {
        const viewport = page.getViewport({ scale: scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
  
        const renderContext = { canvasContext: ctx, viewport: viewport };
        const renderTask = page.render(renderContext);
        renderTask.promise.then(function() {
          pageRendering = false;
          document.getElementById('page-number').textContent = num;
          if (updateQuestionCallback) {
            updateQuestionCallback(num);
          }
          if (pageNumPending !== null) {
            renderPage(pageNumPending);
            pageNumPending = null;
          }
        });
      });
    }
  
    function queueRenderPage(num) {
      if (pageRendering) {
        pageNumPending = num;
      } else {
        renderPage(num);
      }
    }
  
    document.getElementById('prev-page').addEventListener('click', function() {
      if (pageNum <= 1) return;
      pageNum--;
      queueRenderPage(pageNum);
    });
  
    document.getElementById('next-page').addEventListener('click', function() {
      if (pageNum >= pdfDoc.numPages) return;
      pageNum++;
      queueRenderPage(pageNum);
    });
  
    pdfjsLib.getDocument(pdfUrl).promise.then(function(pdfDoc_) {
      pdfDoc = pdfDoc_;
      document.getElementById('total-pages').textContent = pdfDoc.numPages;
      renderPage(pageNum);
    });
  }
  