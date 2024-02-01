"use strict";

import { getTodos, token } from "./api.js";
import { appElement, loginButtonListerner, renderLogin } from "./loginPage.js";
import { listElement, renderComments } from "./renderComments.js";
import { format } from "date-fns";

    appElement.classList.remove('add-form');


    const likeEventListerner = () => {
      if (!token) {
        return;
      } else {;
      const likeButtonElements = document.querySelectorAll('.like-button');
      for (const likeButtonElement of likeButtonElements) { 
        likeButtonElement.addEventListener ('click', event => {
          event.stopPropagation();
          const index = likeButtonElement.dataset.index;
          if (comments[index].isLike === false) {
            comments[index].like++;
            comments[index].isLike = true;
          } else {
              comments[index].like--;
              comments[index].isLike = false;
            };
            renderComments({ comments, likeEventListerner });
        });
      };
    };
    };


    export const commentEventListener = () => {
      if (!token) {
        return;
      } else {
        const commentElements = document.querySelectorAll('.comment');
        for(const comment of commentElements) {
            comment.addEventListener('click', () => {
                  const textareaElement = document.querySelector ('.add-form-text');
                  const index = comment.dataset.index;
                  const text = `QUOTE_BEGIN >${comments[index].comment};
                  
    ${comments[index].name}, QUOTE_END`;
                    textareaElement.value = text.replaceAll('QUOTE_BEGIN', '').replaceAll('QUOTE_END', '');
            });
        };
      };
    };
    

    let comments = [];

    export const fetchAndRenderComments = () => {
      getTodos().then((responseData) => {
          comments = responseData.comments.map((comment) => {
            const createDate = format(new Date(comment.date), 'yyyy-MM-dd hh.mm.ss')
            return { 
            name: comment.author.name, 
            time: createDate, 
            comment: comment.text, 
            like: comment.likes, 
            isLike: false, 
            };
          }); 
        const textExpectation = document.querySelector('.title');
        textExpectation.style.display = 'none';
        renderComments({ comments, likeEventListerner })
      }).catch((error) => {
         alert('Кажется, у вас сломался интернет, попробуйте позже');
         console.warn(error);
      }); 
    };

    fetchAndRenderComments();

    const loginLinkElement = document.querySelector('.login-link');

    loginLinkElement.addEventListener('click', () => {
      listElement.style.display = 'none';
      appElement.classList.add('add-form');
      document.querySelector('.link').style.display = 'none';
      renderLogin();
      fetchAndRenderComments();
      window.scrollTo({
        top:document.querySelector('.form'),
      });
      loginButtonListerner();
    });


    console.log("It works!");