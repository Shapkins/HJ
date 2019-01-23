const throttle = ( handler, ms ) => {
  let timeout;
  return () => {
    clearTimeout( timeout );
    timeout = setTimeout( handler, ms );
  }
};

class TextEditor {
  constructor( container, storageKey = '_text-editor__content' ) {
    this.container = container;
    this.contentContainer = container.querySelector( '.text-editor__content' );
    this.hintContainer = container.querySelector( '.text-editor__hint' );
    this.filenameContainer = container.querySelector( '.text-editor__filename' );
    this.storageKey = storageKey;
    this.registerEvents();
    this.load( this.getStorageData());
  }

  registerEvents() {
    const save = throttle( this.save.bind( this ), 1000 ),
    showHint = this.showHint.bind(this),
    loadFile = this.loadFile.bind(this),
    hideHint = this.hideHint.bind(this);

    this.contentContainer.addEventListener( 'input', save );
    this.container.addEventListener('dragover', showHint);
    this.container.addEventListener('drop', loadFile);
    this.container.addEventListener('dropleave', hideHint);
  }

  loadFile(event) {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    if (files[0].type === "text/plain") {
      this.hideHint();
      this.setFilename(files[0].name);
      this.readFile(files[0]);
    } else {
      alert('должен быть один текстовый файл');
      this.hideHint();
    }
  }

  readFile(file) {
    const text = new FileReader();
    text.addEventListener('load', () => {
      this.contentContainer.value = event.target.result;
    });
    text.readAsText(file);
  }

  setFilename(filename) {
    this.filenameContainer.textContent = filename;
  }

  showHint(event) {
    event.preventDefault();
    this.hintContainer.classList.add('text-editor__hint_visible');
  }

  hideHint() {
    this.hintContainer.classList.remove('text-editor__hint_visible');
  }

  load( value ) {
    this.contentContainer.value = value || '';
  }

  getStorageData() {
    return localStorage[ this.storageKey ];
  }

  save() {
    localStorage[ this.storageKey ] = this.contentContainer.value;
  }
}

new TextEditor( document.getElementById( 'editor' ));
