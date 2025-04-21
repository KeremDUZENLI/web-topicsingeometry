document.addEventListener('DOMContentLoaded', () => {
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

    version1Btn && version1Btn.classList.toggle('active', currentVersion === 1);
    version2Btn && version2Btn.classList.toggle('active', currentVersion === 2);
  }

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

  function changePage(delta) {
    const newPage = window.currentPageNum + delta;
    const totalPages = section.questions.length;
    if (newPage >= 1 && newPage <= totalPages) {
      window.currentPageNum = newPage;
      currentVersion = 1;
      loadVersion();
    }
  }

  document.getElementById('prev-page').onclick = () => changePage(-1);
  document.getElementById('next-page').onclick = () => changePage(1);

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
  pdfViewerContainer.innerHTML = '';
  pdfViewerContainer.appendChild(canvas);

  function renderPage(num) {
    pageRendering = true;
    pageNum = num;
    document.dispatchEvent(new CustomEvent('pageChanged', { detail: num }));

    pdfDoc.getPage(num).then(page => {
      const containerWidth = pdfViewerContainer.clientWidth;
      const { width: w, height: h } = page.getViewport({ scale: 1 });
      const scale = containerWidth / w;
      const viewport = page.getViewport({ scale: scale * 2 });

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = containerWidth + 'px';
      canvas.style.height = (containerWidth * h / w) + 'px';

      page.render({ canvasContext: ctx, viewport }).promise.then(() => {
        pageRendering = false;
        document.getElementById('page-number').textContent = num;

        if (typeof updateQuestionCallback === 'function') {
          updateQuestionCallback(num, 1);
        }

        if (pageNumPending !== null) {
          renderPage(pageNumPending);
          pageNumPending = null;
        }
      });
    });
  }

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