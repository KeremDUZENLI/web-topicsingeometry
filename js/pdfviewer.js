function initPDFViewer(pdfUrl, updateQuestionCallback) {
  let pdfDoc = null,
      pageNum = 1,
      pageRendering = false,
      pageNumPending = null,
      canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');

  const pdfViewerContainer = document.getElementById('pdf-viewer');
  pdfViewerContainer.innerHTML = "";
  pdfViewerContainer.appendChild(canvas);

  function renderPage(num) {
    pageRendering = true;
    pdfDoc.getPage(num).then(function(page) {
      // Get the container's width
      const containerWidth = pdfViewerContainer.clientWidth;

      // Get the page's dimensions at scale 1
      const viewportAtScale1 = page.getViewport({ scale: 1 });
      const pageWidth = viewportAtScale1.width;
      const pageHeight = viewportAtScale1.height;

      // Calculate the base scale to fit the container's width
      const baseScale = containerWidth / pageWidth;

      // Define a zoom factor for higher resolution (e.g., 2 for 200% zoom capability)
      const zoomFactor = 2;
      const renderingScale = baseScale * zoomFactor;

      // Create viewport with the rendering scale
      const viewport = page.getViewport({ scale: renderingScale });

      // Set canvas dimensions to the high-resolution size
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // Set display size to fit the container
      const displayWidth = containerWidth;
      const displayHeight = containerWidth * (pageHeight / pageWidth);
      canvas.style.width = displayWidth + 'px';
      canvas.style.height = displayHeight + 'px';

      // Render the page
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

  // Handle window resize to adjust the PDF
  window.addEventListener('resize', function() {
    if (pdfDoc) {
      renderPage(pageNum);
    }
  });
}