
class horoscopeApp {
    constructor(appElement, selector, index) {
      this.appElement = appElement;
      this.appSelector = selector;
      this.modal = this.appElement.querySelector('.modal-body');
      this.buttons = this.modal.querySelectorAll('.btn');
      this.first_app_selector = '.app-horoscope';
      this.index = index;
      this.init();
    }
  
    async init() {
      this.appendNumberToRadioIds();
      this.buttons.forEach(btn => {
          btn.addEventListener("click", this.closeModal);
      });
    
      window.addEventListener("click", event => {
          if (event.target === this.modal) {
              this.closeModal();
          }
      });
      this.appElement
          .querySelector(".send")
          .addEventListener("click", async (event) => {
              this.handleSendButtonClick();
          });
      if (sessionStorage.getItem('form_selector') != this.first_app_selector) {
          this.capcha();
          
      }else{
        this.setInfoForm(this.first_app_selector);
        await this.delayWithProgressBar(this.first_app_selector);
        this.appElement.querySelector('.progress').style.display = 'none';
        this.appElement.querySelector('.message').style.display = 'none';
        this.appElement.querySelector('.progress-bar').style.width = '0';
        this.openModal(this.first_app_selector);
        sessionStorage.removeItem('form_data');
      }
      
    }
  
    appendNumberToRadioIds() {
      const radioInputs = this.appElement.querySelectorAll('input[type="radio"]');
      radioInputs.forEach(radio => {
        radio.id = radio.id + this.index;
        radio.name = radio.name + this.index;
        const label = document.querySelector(`label[for="${radio.id.slice(0, -1)}"]`);
        if (label) {
          label.setAttribute('for', radio.id);
        }
      });
    }

    async handleSendButtonClick() {
      this.appElement.querySelector(".send").disabled = true;
      this.appElement.querySelector(".result").style.display = "none";
      var sign = [...this.appElement.querySelectorAll('.sign  input[type="radio"]')].map(e => { if (e.checked) { return e.value } });
      sign = sign.filter(Boolean)[0];
      await this.delayWithProgressBar();
      var numbers_data = await this.postData('./horoscope/horoscope.php', {
            sign: sign,
            lang: document.querySelector('.lang').value,
            from: window.location.host,
            type: 'horoscope',
            pos: `horoscope`
      })
  
      var formValues = this.getInfoForm();
      sessionStorage.setItem('form_data', JSON.stringify(formValues));
      sessionStorage.setItem('numbers_data', numbers_data);
      sessionStorage.setItem('form_selector', this.first_app_selector);
      window.location.href = document.querySelector('#next_page').value;
    }
  

      openModal = (form_selector) => {
          document.querySelector(`${form_selector} .modal-body`).style.display = 'block';
          this.capcha();
      }
  
      closeModal = () => {
          this.modal.style.display = 'none';
          const resultElement = this.appElement.querySelector('.result');
          var numbers_data = sessionStorage.getItem('numbers_data');
          resultElement.innerHTML = numbers_data;
          sessionStorage.removeItem('numbers_data');
          sessionStorage.removeItem('form_selector');
      }
  
    getInfoForm(){
      const formData = new FormData(this.appElement);
      const formValues = {};
      for (const [key, value] of formData.entries()) {
        formValues[key] = value;
      }
      return formValues;
    }
  
    setInfoForm(selector){
      var form_data = sessionStorage.getItem('form_data');
      form_data = JSON.parse(form_data);
      this.appElement.querySelector('.send').disabled = true;
      var form = document.querySelector(`${selector}`);
      for (const [key, value] of Object.entries(form_data)) {
        const input = form.querySelector(`[name="${key}"]`);
        const checkbox = form.querySelector(`[type="radio"][value="${value}"]`);
        if (input) {
          input.value = value;
        }
        if(checkbox){
          checkbox.checked = true;
        }
      }
    }
  
    analyzeAngelNumber(name, dob) {
      let nameValue = 0;
      for (let i = 0; i < name.length; i++) {
        nameValue += name.charCodeAt(i);
      }
      let dobValue = 0;
      for (let i = 0; i < dob.length; i++) {
        if (dob[i] !== "-") {
          dobValue += parseInt(dob[i]);
        }
      }
      const sum = nameValue + dobValue;
      return sum;
    }
    async postData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "aplication/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      });
      return await response.text();
    }
    delayWithProgressBar(selector) {
      if(selector){
        selector = document.querySelector(`${selector}`);
      }else{
        selector = this.appElement;
      }
      const progressBar = selector.querySelector(`.progress-bar`);
      selector.querySelector(`.progress`).style.display = 'block';
      const message = selector.querySelector(`.message`);
      message.textContent = `${document.querySelector('#calculating_horo').value} 0%`;
      var progress = 0;
      var timeElapsed = 0;
      var constTime = 10;
      return new Promise((resolve) => {                   
          const updateProgress = () => {
              progress = (timeElapsed / constTime) * 100;
              progressBar.style.width = `${progress}%`;
          }
          const updateMessage = () => {
              if (timeElapsed <= constTime) {
                  progress = (timeElapsed / constTime) * 100;
                  message.textContent = `${document.querySelector('#calculating_horo').value} ${Math.round(progress)}%`;
              } else {
                  clearInterval(interval);
                  resolve();
                  message.textContent = `${document.querySelector('#calculating_horo').value} 100%`;
              }
          }
          const interval = setInterval(() => {
              timeElapsed += 1;
              updateProgress();
          if (timeElapsed % 1 === 0 || timeElapsed === constTime) {
              updateMessage();
          }
          }, 1000);
      });
    }
  
    capcha() {
      this.appElement.querySelector('.for-capcha').innerHTML = '';
        var input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('maxlength', "2");
        input.style.width = '50px';
        input.style.marginLeft = '1px';
        input.style.border = '1px solid #ccc';
        var canvas = document.createElement('canvas');
        canvas.height = 30;
        canvas.width = 95;
        canvas.style.backgroundColor = '#f0f0f0';
        const ctx = canvas.getContext('2d');
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operator = Math.random() < 0.5 ? '+' : '-';
        const answer = operator === '+' ? num1 + num2 : num1 - num2;
        ctx.font = '24px sans-serif';
        ctx.fillStyle = 'red';
        ctx.fillText(`${num1} ${operator} ${num2} = `, 10, 24);
        this.appElement.querySelector('.send').disabled = true;
        this.appElement.querySelector(`.for-capcha`).appendChild(canvas);
        this.appElement.querySelector(`.for-capcha`).appendChild(input);
        input.addEventListener('keyup', (event) => {
            if (event.target.value == answer) {
                event.target.closest(`form`).querySelector('.send').disabled = false;
                try{
                    input.remove();
                    canvas.remove();
                }catch(e){}
                
            }
        })
        input.addEventListener('change', (event) => {
            if (event.target.value == answer) {
                event.target.closest(`form`).querySelector('.send').disabled = false;
                try{
                    input.remove();
                    canvas.remove();
                }catch(e){}
            }
            })
      }
  }
  
  function start_horoscope() {
    const apps = document.querySelectorAll(".app-horoscope");
    apps.forEach((appElement, index) => {
      new horoscopeApp(appElement, `.app-horoscope:nth-of-type(${index + 1})`, `${index + 1}`);
    });
  }
  
  window.onload = function(){
    start_horoscope();
  }
  
  