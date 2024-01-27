import { login, setToken } from "./api.js";
import { fetchAndRenderComments } from "./main.js";
import { listElement } from "./renderComments.js";
import { renderForm } from "./renderForm.js";

export const appElement = document.querySelector('.app');

export const renderLogin = () => {
    const loginHTML = `
      <h3 class="form-title">Форма входа</h3>
      <div class="form-row">
        <input type="text" class="input login-input" placeholder="Логин" />
        <input
          type="text"
          class="input password-input"
          placeholder="Пароль"
        />
      </div>
      <br />
      <button class="button login-button">Войти</button>
    </div>`
    appElement.innerHTML = loginHTML;
};


export function loginButtonListerner () {
  const loginButtonElement = document.querySelector('.login-button');
  const loginInputElement = document.querySelector('.login-input');
  const passworInputElement = document.querySelector('.password-input');

  loginButtonElement.addEventListener('click', () => {
      login({ 
          login: loginInputElement.value,
          password: passworInputElement.value,
      }).then((response) => {
        if(response.status === 400) {
          alert('Неверные логин или пароль');
          throw new Error('Ошибка 400');
        }else {  
            listElement.style.display = 'flex';
            appElement.style.display = 'none';
            renderForm();     
            return response.json();
        };
      }).then((responseData) => {
          const inputElement = document.querySelector ('.add-form-name');
          setToken(responseData.user.token);
          inputElement.value = responseData.user.name;
          inputElement.setAttribute("readonly", "readonly");
      }).then(() => {
        return fetchAndRenderComments();
      });
  });
};



