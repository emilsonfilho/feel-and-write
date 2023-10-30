export const getCurrentPage = () => {
    const pathSegments = window.location.pathname.split('/');
    const lastSegment = pathSegments.pop(); // Remove o último segmento da URL
    if (lastSegment === 'index.html') {
      // Se o último segmento for 'index.html', use o anterior
      return pathSegments.pop();
    }
    return lastSegment;
  }