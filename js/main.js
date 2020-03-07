class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = '';
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.type();
      this.isDeleting = false;
    }
  
    type() {
      // geçerli kelime
      const current = this.wordIndex % this.words.length;
      // Tam metni alma
      const fullTxt = this.words[current];
  
      // silinip silinmediğini kontrol etme
      if(this.isDeleting) {
        // karakteri sil
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        // karakter ekle
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
  
      
      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  
      // başlama hızı
      let typeSpeed = 50;
  
      if(this.isDeleting) {
        typeSpeed /= 1;
      }
  
      
      if(!this.isDeleting && this.txt === fullTxt) {
        
        typeSpeed = this.wait;
       
        this.isDeleting = true;
      } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        
        this.wordIndex++;
       
        typeSpeed = 50;
      }
  
      setTimeout(() => this.type(), typeSpeed);
    }
  }
  
  document.addEventListener('DOMContentLoaded', init);
  
  function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    new TypeWriter(txtElement, words, wait);
  }