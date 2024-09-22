declare module 'jspdf' {
    interface jsPDF {
      autoTable: (options: any) => jsPDF;
    }
  }
  
  declare module 'jspdf-autotable' {
    const autoTable: (doc: jsPDF, options: any) => jsPDF;
    export default autoTable;
  }