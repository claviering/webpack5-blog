import './index.less';
import questionList from './questionList.json';

let app = function (isLogin, hasSubmit) {
  let loginUrl = 'http://fun.trendy.invcloud.cn/trendyoch/index.php/home/actdhmembercard/index/actstr/20200828';
  let postUrl = 'http://fun.trendy.invcloud.cn/trendyoch/index.php/home/actcg20200828//ajaxAnswers';
  this.initDom = function (appId, questionList) {
    let app = document.getElementById(appId);
    let domList = ''
    questionList.forEach((item, index) => {
      let optionList = '';
      item.options.forEach((option, optionIndex) => {
        let activeClass = option.selected ? 'active' : '';
        optionList = optionList + `<div 
            class="question-item ${activeClass}"
            data-index="${index}"
            data-choice="${item.choice}"
            data-choice-index="${optionIndex}"
            style="width: ${option.width || ''}">
            ${option.text}
          </div>`
      });
      domList = domList + `<div class="question-content">
        <div class="question-title-content">
          <div class="question-title index">${index + 1}、</div>
          <div class="question-title title">${item.title}</div>
        </div>
        <div class="question-options">
          ${optionList}
        </div>
      </div>`
    });
    let submit = hasSubmit ? '' : '<div class="submit">提交</div>';
    app.innerHTML = `<div class="preference-research">
      <div class="preference-research-content">
        ${domList}
        ${submit}
      </div>
    </div>`;
    initSelectEven('.preference-research');
    initSubmitEven('.submit')
  }
  function rem(document, window) {
    (function(doc, win) {
      var docEl = doc.documentElement,
          resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
          recalc = function() {
              var clientWidth = docEl.clientWidth;
              if (!clientWidth) return;
              docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
          };
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
  }
  function updateQuestion(index, questionList) {
    let questionDomList = document.querySelectorAll('.question-content');
    let questionItemDomList = questionDomList[index].querySelectorAll('.question-options > .question-item ');
    let item = questionList[index];
    item.options.forEach((option, optionIndex) => {
      if (option.selected) {
        questionItemDomList[optionIndex].classList.add('active');
      } else {
        questionItemDomList[optionIndex].classList.remove('active');
      }
    });
  }
  function initSelectEven(clickDomClass) {
    let clickDom = document.querySelector(clickDomClass);
    clickDom.onclick = function (e) {
      if (!isLogin) {
        window.location = loginUrl;
        return;
      }
      // index 第几个问题
      // choice 第几个问题能选多少个答案
      // choiceIndex 第index个问题的第 choiceIndex 个选项
      let {index, choice, choiceIndex} = e.target.dataset;
      if (!index) return;
      index = Number.parseInt(index);
      choice = Number.parseInt(choice);
      choiceIndex = Number.parseInt(choiceIndex);
      // 单选
      if (choice === 1) {
        questionList[index].options.forEach((option, tmpIndex) => {
          option.selected = tmpIndex === choiceIndex ? !option.selected : false;
          return option;
        });
      } else if (choice > 1) { // 多选
        let curChoice = 0; // 已选个数
        questionList[index].options.forEach((option, tmpIndex) => {
          if (option.selected) {
            curChoice = curChoice + 1;
          }
        });
        questionList[index].options.forEach((option, tmpIndex) => {
          if (tmpIndex === choiceIndex && curChoice <= choice) {
            option.selected = (curChoice + 1 <= choice) ? !option.selected : false;
          }
          return option;
        });
      } else if (choice === 0) { // 无限选
        questionList[index].options.forEach((option, tmpIndex) => {
          if (tmpIndex === choiceIndex) {
            option.selected = !option.selected;
          }
          return option;
        });
      }
      questionList = JSON.parse(JSON.stringify(questionList))
      updateQuestion(index, questionList);
    }
  }
  function toastShow(text) {
    let toastDom = document.querySelector('.weui-toast');
    let textDom = document.querySelector('.weui-toast__content');
    textDom.textContent = text;
    toastDom.style.display = 'block';
    setTimeout(() => {
      toastDom.style.display = 'none';
    }, 2000);
  }
  function scrollToQuestion(index) {
    let questionDomList = document.querySelectorAll('.question-content');
    questionDomList[index].scrollIntoView({behavior: 'smooth', block: 'center'});
  }
  function hiddenSubmit() {
    let submitDom = document.querySelector('.submit')
    submitDom.style.display = 'none';
  }
  function submit(list) {
    console.log('这里是请求接口');
    console.log(list);
    // axios.post(postUrl, {daan: list})
  }
  function initSubmitEven(submitClass) {
    let clickDom = document.querySelector(submitClass);
    if (!clickDom) return;
    clickDom.onclick = function () {
      let text = '问卷已提交，谢谢！';
      if (hasSubmit) {
        text = '您已经填写过了，谢谢您';
      } else {
        let hasComplete = true; // 校验问题全部都填了
        let hasSelectOption = false; // 校验问题的选项至少选一个
        for (let index = 0; index < questionList.length; index++) {
          const question = questionList[index];
          for (let optionIndex = 0; optionIndex < question.options.length; optionIndex++) {
            const option = question.options[optionIndex];
            hasSelectOption = hasSelectOption || option.selected; // 选项使用 ||，至少选一个
          }
          if (!hasSelectOption) {
            let text = '第' + (index + 1) + '个问题未选';
            scrollToQuestion(index);
            toastShow(text);
            hasComplete = false;
            return;
          }
          hasComplete = hasComplete && hasSelectOption; // 全部问题使用 && 校验全部都要填
          hasSelectOption = false;
        }
        if (!hasComplete) {
          return;
        }
        hasSubmit = true;
        hiddenSubmit();
        submit(questionList);
      }
      toastShow(text);
    }
  }
  rem(document, window);
}
let isLogin = true;
let hasSubmit = true;
let App = new app(isLogin, hasSubmit);
App.initDom('preferenceResearch', questionList)