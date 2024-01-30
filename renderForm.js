import { postTodo } from "./api.js";
import { commentEventListener, fetchAndRenderComments } from "./main.js";
import { renderComments } from "./renderComments.js";


// export const inputElement = document.querySelector ('.add-form-name');

// export const buttonElement = document.querySelector ('.add-form-button');

// export const buttonElement = document.querySelector ('.add-form-button');


export const formElement = document.querySelector('.form');

export const renderForm = () => {
    const formHTML =  `<div class="add-form">
    <input id="add-input"
      type="text"
      class="add-form-name"
      placeholder="Введите ваше имя"
    />
    <textarea id="add-textarea"
      type="textarea"
      class="add-form-text"
      placeholder="Введите ваш коментарий"
      rows="4"
    ></textarea>
    <div class="add-form-row">
      <button class="add-form-button" id="add-button">Написать</button>
    </div>
  </div>`
  formElement.innerHTML = formHTML;
  buttonElementClick();
};





export const buttonElementClick = () => {
  const buttonElement = document.querySelector ('.add-form-button')


    buttonElement.addEventListener('click', () => {
      const inputElement = document.querySelector ('.add-form-name');
      const textareaElement = document.querySelector ('.add-form-text');
      buttonElement.disabled = true;
      buttonElement.textContent = 'Комментарий загружается...';
      buttonElement.classList.remove('hover');
      buttonElementLinester();
      
  
  
      postTodo({
        name: inputElement.value,
        text: textareaElement.value,
      }).then(() => {
        console.log(1);
        return fetchAndRenderComments();
      }).then(() => {
        console.log(2);
          buttonElement.disabled = false;
          buttonElement.textContent = 'Написать';
          inputElement.value = '';
          textareaElement.value = '';
      }).catch((error) => {
         buttonElement.disabled = false;
         buttonElement.textContent = 'Написать';
         console.warn(error);
      }); 
    });
};

export const buttonElementLinester = () => {
  const textareaElement = document.querySelector ('.add-form-text');
  if (textareaElement.value === '') {
    textareaElement.classList.add('error');
      return;
  } else {
    textareaElement.classList.remove('error');
  };
};