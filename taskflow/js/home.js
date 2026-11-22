const taskData = getJSON(STORAGE.tasks, []);
const today = new Date();
document.querySelector('#todayDate').textContent = today.toLocaleDateString('vi-VN', { weekday:'long', day:'2-digit', month:'2-digit' });

const done = taskData.filter(task => task.status === 'done').length;
const doing = taskData.filter(task => task.status === 'doing').length;
const percent = taskData.length ? Math.round(done / taskData.length * 100) : 0;
document.querySelector('#totalStat').textContent = taskData.length;
document.querySelector('#doingStat').textContent = doing;
document.querySelector('#doneStat').textContent = done;
document.querySelector('#progressText').textContent = percent + '%';
document.querySelector('#progressBar').style.width = percent + '%';

const list = document.querySelector('#homeTaskList');
const visible = taskData.slice(0, 4);
if (!visible.length) {
  list.innerHTML = '<div class="mini-task"><i></i><span>Chưa có công việc nào</span></div>';
} else {
  list.innerHTML = visible.map(task => `<div class="mini-task ${task.status === 'done' ? 'done' : ''}"><i></i><span>${escapeHTML(task.name)}</span></div>`).join('');
}

function escapeHTML(value) {
  const div = document.createElement('div');
  div.textContent = value;
  return div.innerHTML;
}
