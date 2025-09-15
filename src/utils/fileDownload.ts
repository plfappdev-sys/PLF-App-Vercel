// Utility functions for file downloads in React Native and web environments

/**
 * Download content as a file (works for web and mobile)
 * @param content The file content to download
 * @param filename The name of the file to download
 * @param mimeType The MIME type of the file
 */
export const downloadFile = async (
  content: string, 
  filename: string, 
  mimeType: string = 'text/plain'
): Promise<void> => {
  try {
    // Check if we're in a web environment
    if (typeof document !== 'undefined') {
      // Web environment - use Blob and download link
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL object
      setTimeout(() => URL.revokeObjectURL(url), 100);
      
      console.log(`File downloaded: ${filename}`);
    } else {
      // React Native environment - use Share API or file system
      try {
        // Try to use Expo Sharing if available
        // @ts-ignore - Expo Sharing might not be available in all environments
        if (typeof Share !== 'undefined') {
          // @ts-ignore
          await Share.share({
            message: content,
            title: filename,
          });
        } else {
          // Fallback: just log the content for debugging
          console.log(`File content for ${filename}:`, content);
          alert(`File content ready for ${filename}. This would be saved to device storage in a real app.`);
        }
      } catch (error) {
        console.error('Error sharing file:', error);
        // Fallback to alert with content
        alert(`File: ${filename}\n\n${content.substring(0, 500)}${content.length > 500 ? '...' : ''}`);
      }
    }
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};

/**
 * Download HTML content as a file (for PDF reports)
 * @param htmlContent The HTML content to download
 * @param filename The name of the file to download
 */
export const downloadHTMLReport = async (htmlContent: string, filename: string): Promise<void> => {
  return downloadFile(htmlContent, filename, 'text/html');
};

/**
 * Download CSV content as a file
 * @param csvContent The CSV content to download
 * @param filename The name of the file to download
 */
export const downloadCSVReport = async (csvContent: string, filename: string): Promise<void> => {
  return downloadFile(csvContent, filename, 'text/csv');
};

/**
 * Generate a filename with timestamp for reports
 * @param reportType The type of report (e.g., 'fund_status', 'member_statement')
 * @param extension The file extension (e.g., '.html', '.csv')
 */
export const generateReportFilename = (reportType: string, extension: string = '.html'): string => {
  const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
  return `PLF_${reportType}_${timestamp}${extension}`;
};

/**
 * Check if the current environment supports file downloads
 */
export const supportsFileDownloads = (): boolean => {
  return typeof document !== 'undefined' || 
         // @ts-ignore - Check if Expo Sharing is available
         (typeof Share !== 'undefined' && typeof Share.share === 'function');
};
