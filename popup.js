document.getElementById('find').addEventListener('click', function() {
  let word = document.getElementById('word').value;
  if (word) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: highlightWord,
        args: [word]
      });
    });
  }
});

function highlightWord(word) {
  
  document.querySelectorAll('span.highlight').forEach(function(element) {
    element.replaceWith(element.textContent);
  });

  
  console.log("before", document.body.innerHTML);
  let regex = new RegExp(word, 'gi');
  const modifiedHtml = document.body.innerHTML.replace(regex, function(matched) {
    return `<span class="highlight" style="background-color: yellow;">${matched}</span>`;
  });
  console.log("after", modifiedHtml);
  document.body.innerHTML = modifiedHtml;
}




  