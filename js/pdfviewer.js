document.addEventListener('DOMContentLoaded', () => {
  window.currentPageNum = 1

  const pdfVersions = {
    dot: {
      1: 'pdf/dot_product_v1.pdf',
      2: 'pdf/dot_product_v2.pdf',
      questions: questions_dot_product
    },
    cross: {
      1: 'pdf/cross_product_v1.pdf',
      2: 'pdf/cross_product_v2.pdf',
      questions: questions_cross_product
    }
  };

  const version1Btn = document.getElementById('version1-btn');
  const version2Btn = document.getElementById('version2-btn');
  const path = window.location.pathname;
  const sectionKey = path.includes('dot_product') ? 'dot' : path.includes('cross_product') ? 'cross' : None;
  const section = pdfVersions[sectionKey];

  let currentVersion = 1;
  window.currentPageNum = 1;

  function loadVersion() {
    const pdfUrl = section[currentVersion];
    const questions = section.questions;

    initPDFViewer(pdfUrl, pageNum => updateQuestion(pageNum, questions), window.currentPageNum);
    document.getElementById('total-pages').textContent = questions.length;

    // Update active button styling
    version1Btn && version1Btn.classList.toggle('active', currentVersion === 1);
    version2Btn && version2Btn.classList.toggle('active', currentVersion === 2);
  }

  // Wire up version buttons if present
  if (version1Btn && version2Btn) {
    version1Btn.addEventListener('click', () => {
      if (currentVersion !== 1) {
        currentVersion = 1;
        loadVersion();
      }
    });
    version2Btn.addEventListener('click', () => {
      if (currentVersion !== 2) {
        currentVersion = 2;
        loadVersion();
      }
    });
  }

  // Initial load
  loadVersion();
});


function initPDFViewer(pdfUrl, updateQuestionCallback, initialPageNum = 1) {
  let pdfDoc = null,
      pageNum = initialPageNum,
      pageRendering = false,
      pageNumPending = null,
      canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');

  const pdfViewerContainer = document.getElementById('pdf-viewer');
  pdfViewerContainer.innerHTML = "";
  pdfViewerContainer.appendChild(canvas);

  function renderPage(num) {
    pageRendering = true;
    pageNum = num;
    document.dispatchEvent(new CustomEvent('pageChanged', { detail: num }));

    pdfDoc.getPage(num).then(function(page) {
      // Fit to container width with high-DPI support
      const containerWidth = pdfViewerContainer.clientWidth;
      const viewportAtScale1 = page.getViewport({ scale: 1 });
      const pageWidth = viewportAtScale1.width;
      const pageHeight = viewportAtScale1.height;
      const baseScale = containerWidth / pageWidth;
      const zoomFactor = 2;
      const renderingScale = baseScale * zoomFactor;
      const viewport = page.getViewport({ scale: renderingScale });

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = containerWidth + 'px';
      canvas.style.height = (containerWidth * (pageHeight / pageWidth)) + 'px';

      const renderContext = { canvasContext: ctx, viewport: viewport };
      page.render(renderContext).promise.then(function() {
        pageRendering = false;
        document.getElementById('page-number').textContent = num;
        updateQuestionCallback && updateQuestionCallback(num);
        if (pageNumPending !== null) {
          renderPage(pageNumPending);
          pageNumPending = null;
        }
      });
    });
  }

  function queueRender(num) {
    pageRendering ? (pageNumPending = num) : renderPage(num);
  }

  document.getElementById('prev-page').onclick = () => {
    if (pageNum > 1) queueRender(--pageNum);
  };
  document.getElementById('next-page').onclick = () => {
    if (pdfDoc && pageNum < pdfDoc.numPages) queueRender(++pageNum);
  };

  pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
    pdfDoc = pdf;
    document.getElementById('total-pages').textContent = pdfDoc.numPages;
    renderPage(pageNum);
  });

  window.onresize = () => pdfDoc && renderPage(pageNum);
  document.addEventListener('pageChanged', e => {
    if (typeof e.detail === 'number') {
      window.currentPageNum = e.detail;
    }
  });
}