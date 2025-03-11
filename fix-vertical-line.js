const fs = require('fs');

// Path to the auction3.html file
const filePath = './pages/auction3.html';

// Read the file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Find and remove the vertical line annotation (currentPrice with scaleID: 'x')
  let modifiedData = data;
  
  // Look for the annotation configuration for the price curve chart
  const currentPriceAnnotationRegex = /currentPrice:\s*{[^}]*scaleID:\s*'x'[^}]*}/gs;
  modifiedData = modifiedData.replace(currentPriceAnnotationRegex, '');
  
  // Also remove any references to this annotation in the updateRoundDisplay function
  const updateAnnotationRegex = /priceCurveChart\.options\.plugins\.annotation\.annotations\.currentPrice\.value[^\n;]*/g;
  modifiedData = modifiedData.replace(updateAnnotationRegex, '');
  
  // Write the modified content back to the file
  fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('Successfully removed vertical line annotation from price curve chart');
  });
}); 