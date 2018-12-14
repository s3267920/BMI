(function() {
  //如果沒有值為空陣列
  let BMIItem = JSON.parse(localStorage.getItem('BMIItem')) || [];

  let result = function() {
    let height = document.querySelector('#height');
    let heightValue = Number(height.value / 100);
    let weight = document.querySelector('#weight');
    let weightValue = Number(weight.value);
    let calculatorBtn = document.querySelector('.calculatorBtn');
    //輸入框內不可為空值，也不可以是數字以外的文字
    if (height.value !== '' && isNaN(height.value) !== true && weight.value !== '' && isNaN(weight.value) !== true) {
      //用class來做狀態的切換
      try {
        //避免報錯
        calculatorBtn.classList.add('result');
        calculatorBtn.classList.remove('calculatorBtn');
      } catch (error) {
        return false;
      }
      let BMIResult = weightValue / (heightValue * heightValue);
      //取值到小數後兩位
      let BMI = BMIResult.toFixed(2);
      status(BMI);
    } else {
      alert('請用數字輸入身高跟體重');
    }
  };
  //以BMI的數值來做顏色跟文字的切換
  function status(BMI) {
    let resultText = document.querySelector('.result_text');
    if (BMI < 18.5) {
      createInfo('過輕', BMI, '#31baf9');
      statusColor('#31baf9');
      resultText.textContent = '過輕';
      AddBMIText(BMI);
    } else if (BMI < 24) {
      createInfo('理想', BMI, '#86d73f');
      statusColor('#86d73f');
      resultText.textContent = '理想';
      AddBMIText(BMI);
    } else if (BMI < 27) {
      createInfo('過重', BMI, '#ff982d');
      statusColor('#ff982d');
      resultText.textContent = '過重';
      AddBMIText(BMI);
    } else if (BMI < 30) {
      createInfo('輕度肥胖', BMI, '#ff6c1d');
      statusColor('#ff6c1d');
      AddBMIText(BMI);
      resultText.textContent = '輕度肥胖';
    } else if (BMI < 35) {
      createInfo('中度肥胖', BMI, '#ff6c03');
      statusColor('#ff6c03');
      AddBMIText(BMI);
      resultText.textContent = '中度肥胖';
    } else {
      createInfo('重度肥胖', BMI, '#ff1200');
      statusColor('#ff1200');
      AddBMIText(BMI);
      resultText.textContent = '重度肥胖';
    }
  }
  //因結果而顏色會有變化的部分
  function statusColor(colors) {
    let resultText = document.querySelector('.result_text');
    let resultStatus = document.querySelector('.result');
    let loopIcon = document.querySelector('.result span');
    let BMIValue = document.querySelector('.BMI_value');
    resultStatus.style.color = colors;
    resultStatus.style.borderColor = colors;
    BMIValue.style.color = colors;
    loopIcon.style.backgroundColor = colors;
    resultText.style.color = colors;
  }
  function AddBMIText(BMI) {
    let newSpan = document.createElement('span');
    let BMIValue = document.querySelector('.BMI_value');
    BMIValue.textContent = BMI;
    BMIValue.appendChild(newSpan);
    newSpan.textContent = 'BMI';
  }

  function createInfo(status, BMI, colors) {
    let height = document.querySelector('#height').value;
    let weight = document.querySelector('#weight').value;
    let newDate = new Date();
    let date = newDate.getFullYear() + '-' + (newDate.getUTCMonth() + 1) + '-' + newDate.getUTCDate();
    //把數值組成物件，並 push 進 array 裡面
    let BMIInfo = {
      height: height,
      weight: weight,
      date: date,
      BMI: BMI,
      status: status,
      color: colors
    };
    BMIItem.push(BMIInfo);
    localStorageItem(BMIItem);
  }
  function localStorageItem(BMIItem) {
    //localStorage 部分
    let BMIInfoString = JSON.stringify(BMIItem);
    localStorage.setItem('BMIItem', BMIInfoString);
    let localStorageBMI = localStorage.getItem('BMIItem');
    let BMIStorage = JSON.parse(localStorageBMI);
    listUpdate(BMIStorage);
  }

  //渲染
  function listUpdate(BMIItem) {
    let BMIList = document.querySelector('#BMI_list');
    let newLi = '';
    for (let i = 0; i < BMIItem.length; i++) {
      newLi += `<li data-num="${i}"><div class="status_color" style="background-color:${
        BMIItem[i].color
      }"><a href="javascript:;" class="delete">刪除</a></div>
      <ul class="option">
        <li class="status">${BMIItem[i].status}</li>
        <li class="BMI"><span>BMI</span>${BMIItem[i].BMI}</li>
        <li class="weight"><span>weight</span>${BMIItem[i].weight}kg</li>
        <li class="height"><span>height</span>${BMIItem[i].height}cm</li>
        <li class="date">${BMIItem[i].date}</li>
      </ul>
      </li>`;
    }
    BMIList.innerHTML = newLi;
  }

  //清空所有數值跟變化
  let reset = e => {
    e.stopPropagation();
    let calculatorBtn = document.querySelector('#calculatorBtn');
    let height = document.querySelector('#height');
    let weight = document.querySelector('#weight');
    let resultText = document.querySelector('.result_text');
    let BMIValue = document.querySelector('.BMI_value');
    height.value = '';
    weight.value = '';
    calculatorBtn.classList.remove('result');
    calculatorBtn.classList.add('calculatorBtn');
    resultText.textContent = '';
    BMIValue.textContent = '看結果';
    BMIValue.style.color = '#424242';
    calculatorBtn.style.borderColor = 'transparent';
  };

  //刪除功能
  function deleteLi(e) {
    if (e.target && e.target.nodeName === 'A') {
      let num = e.target.parentNode.parentNode.dataset.num;
      BMIItem.splice(num, 1);
      // console.log(num);
      listUpdate(BMIItem);
      localStorageItem(BMIItem);
    }
  }

  //監聽部分
  let loopIcon = document.querySelector('.loopIcon');
  loopIcon.addEventListener('click', reset);
  let calculatorBtn = document.querySelector('.calculatorBtn');
  calculatorBtn.addEventListener('click', result);
  listUpdate(BMIItem);
  let BMIList = document.querySelector('#BMI_list');
  BMIList.addEventListener('click', deleteLi);
})();
